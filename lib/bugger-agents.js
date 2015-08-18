'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var fs = require('fs');

var _ = require('lodash');
var debug = require('debug')('bugger-agents:bugger-agents');
var Bluebird = require('bluebird');
var V8Client = require('bugger-v8-client');

var bundledAgents = require('./agents');
var ensureBaseInstrumentation = require('./base-instrumentation');
var Backchannel = require('./backchannel');
var connectToWebsocketClient = require('./websocket-transport');

var DEFAULT_DEFINES = [
  '/agents/probe-utils.js'
].map(function(path) {
  return {
    id: 'native://bugger-agents/lib' + path,
    source: fs.readFileSync(__dirname + path, 'utf8')
  };
});

function BuggerAgents(debugClient, child) {
  if (!(this instanceof BuggerAgents)) {
    return new BuggerAgents(debugClient);
  }
  EventEmitter.call(this);

  if (debugClient === undefined) {
    debugClient = V8Client.getDebugClient();
  }

  if (debugClient === null || typeof debugClient !== 'object') {
    throw new Error('Invalid debug client: ' + debugClient);
  }

  this._client = debugClient;
  this._child = child;
  this._initialized = [];
  this._forwardEvent = function(debugEvent) {
    // TODO: Find a proper, consistent pattern for this.
    // Or potentially store the response bodies in the debugged
    // process and access them `__bugger__.probes.Network.getResponseBody`
    if(debugEvent.method === 'Network.dataReceived') {
      this.Network._onDataReceived(debugEvent.params);
    }

    this.emit('debugEvent', debugEvent);
  }.bind(this);

  this._backchannel = new Backchannel();
  this._backchannel.on('debugEvent', this._forwardEvent);

  var self = this;
  this._child.on('forked', function() {
    debug('Child forked: %j', self._child.pid);
    self.injectFoundation()
      .then(function() {
        self._child.emit('online');
      }, function(err) {
        self.emit('error', err);
      });
  });

  this._client.on('error', function(err) {
    if (err.code === 'ECONNREFUSED') {
      self._client.emit('disconnect');
    } else {
      self.emit('error', err);
    }
  });
}
util.inherits(BuggerAgents, EventEmitter);

BuggerAgents.prototype.getChild = function() {
  return this._child;
};

BuggerAgents.prototype.getClient = function() {
  return this._client;
};

BuggerAgents.prototype.callMethod = function callMethod(method, params) {
  var match = (method || '').match(/^([^.]+)\.(.+)$/);

  if (!match) {
    return Bluebird.reject(
      new Error('Invalid method: ' + method));
  }

  var domain = match[1], methodName = match[2];
  var agent = this[domain];
  if (!agent || typeof agent[methodName] !== 'function') {
    return Bluebird.reject(
      new Error('Method not implemented: ' + method));
  }

  return Bluebird.try(agent[methodName], [params], agent);
};

function verifyFoundationResult(result) {
  if (typeof result === 'string') {
    throw new Error(result);
  } else if (result !== true) {
    throw new Error('Unexpected result: ' + result);
  }
}

BuggerAgents.prototype.injectFoundation = function injectFoundation() {
  var agents = this;
  var client = this.getClient();
  var sendEventInit = this._backchannel.createSenderInit();

  var expression =
    '(' + ensureBaseInstrumentation.toString() + ')' +
    '(' + sendEventInit + ', ' + JSON.stringify(DEFAULT_DEFINES) + ');';
  return client
    .prepareGlobalRequire()
    .then(function() { return client.evalSimple(expression); })
    .then(verifyFoundationResult)
    .then(function() { return agents; });
};

BuggerAgents.prototype.dispose = function dispose() {
  if (this._backchannel) {
    this._backchannel.removeListener('debugEvent', this._forwardEvent);
    try { this._backchannel.close(); }
    catch (err) {
      debug('Failed to close backchannel', err);
    }
  }

  this._initialized.forEach(function(agent) {
    agent.removeListener('debugEvent', this._forwardEvent);
  }, this);
};

BuggerAgents.prototype.connectToWebsocketClient =
function _connectToWebsocketClient(client) {
  return connectToWebsocketClient(this, client);
};

function attachAgents(debugClient, child) {
  return new BuggerAgents(debugClient, child).injectFoundation();
}

function registerAgent(name, initFunction) {
  Object.defineProperty(BuggerAgents.prototype, name, {
    get: function() {
      var agent = initFunction(this.getClient(), this.getChild());
      agent.on('debugEvent', this._forwardEvent);
      this._initialized.push(name);
      Object.defineProperty(this, name, { value: agent });
      return agent;
    }
  });
}

_.each(bundledAgents, function(initFunction, name) {
  registerAgent(name, initFunction);
});

module.exports = attachAgents;

module.exports.registerAgent = registerAgent;

module.exports.attachToPort = function(debugPort, child) {
  return attachAgents(V8Client.getDebugClient(debugPort), child);
};
