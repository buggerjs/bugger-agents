'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var _ = require('lodash');

var Bluebird = require('bluebird');
var V8Client = require('bugger-v8-client');

var bundledAgents = require('./agents');
var ensureBaseInstrumentation = require('./base-instrumentation');

function BuggerAgents(debugClient) {
  if (!this instanceof BuggerAgents) {
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
  this._initialized = [];
  this._forwardEvent = function(debugEvent) {
    this.emit('debugEvent', debugEvent);
  }.bind(this);
}
util.inherits(BuggerAgents, EventEmitter);

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

function waitForPaused(client) {
  return client._sendRequest('version')
    .then(function() {
      if (client.running === false) {
        return Bluebird.resolve();
      }
      return client.nextEvent('paused');
    });
}

BuggerAgents.prototype.injectFoundation = function injectFoundation() {
  var client = this.getClient();
  return waitForPaused(client).then(function() {
    return client
      .evalSimple(ensureBaseInstrumentation, 0)
      .then(verifyFoundationResult);
  });
};

BuggerAgents.prototype.dispose = function dispose() {
  this._initialized.forEach(function(agent) {
    agent.removeListener('debugEvent', this._forwardEvent);
  }, this);
};

function attachAgents(debugClient) {
  var agents = new BuggerAgents(debugClient);
  return agents.injectFoundation()
    .then(function() { return agents; });
}

function registerAgent(name, initFunction) {
  Object.defineProperty(BuggerAgents.prototype, name, {
    get: function() {
      var agent = initFunction(this.getClient());
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

module.exports.attachToPort = function(debugPort) {
  return attachAgents(V8Client.getDebugClient(debugPort));
};
