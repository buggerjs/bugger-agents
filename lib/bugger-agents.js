'use strict';

var _ = require('lodash');

var V8Client = require('bugger-v8-client');

var bundledAgents = require('./agents');

function BuggerAgents(debugClient) {
  if (!this instanceof BuggerAgents) {
    return new BuggerAgents(debugClient);
  }

  if (debugClient === undefined) {
    debugClient = V8Client.getDebugClient();
  }

  if (debugClient === null || typeof debugClient !== 'object') {
    throw new Error('Invalid debug client: ' + debugClient);
  }

  this._client = debugClient;
}

BuggerAgents.prototype.getClient = function() {
  return this._client;
};

BuggerAgents.registerAgent = function(name, initFunction) {
  Object.defineProperty(BuggerAgents.prototype, name, {
    get: function() {
      var agent = initFunction(this.getClient());
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
