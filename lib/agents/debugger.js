'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function DebuggerAgent(client) {
  if (!(this instanceof DebuggerAgent))
    return new DebuggerAgent(client);

  BaseAgent.call(this, DebuggerAgent, client);
}
util.inherits(DebuggerAgent, BaseAgent);

DebuggerAgent.prototype.enable = function() {
  return this._withClient(function(client) {
    return client.connect().then(_.noop);
  });
};

DebuggerAgent.prototype.resume = function() {
  return this._withClient(function(client) {
    return client.resume();
  }, false);
};

module.exports = DebuggerAgent;
