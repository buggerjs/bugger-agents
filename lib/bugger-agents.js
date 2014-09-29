'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var _ = require('lodash');

var Bluebird = require('bluebird');
var V8Client = require('bugger-v8-client');

var bundledAgents = require('./agents');

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

BuggerAgents.prototype.dispose = function dispose() {
  this._initialized.forEach(function(agent) {
    agent.removeListener('debugEvent', this._forwardEvent);
  }, this);
};

BuggerAgents.registerAgent = function(name, initFunction) {
  Object.defineProperty(BuggerAgents.prototype, name, {
    get: function() {
      var agent = initFunction(this.getClient());
      agent.on('debugEvent', this._forwardEvent);
      this._initialized.push(name);
      Object.defineProperty(this, name, { value: agent });
      return agent;
    }
  });
};

_.each(bundledAgents, function(initFunction, name) {
  BuggerAgents.registerAgent(name, initFunction);
});

BuggerAgents.attachToPort = function(debugPort) {
  var debugClient = V8Client.getDebugClient(debugPort);
  return new BuggerAgents(debugClient);
};

module.exports = BuggerAgents;
