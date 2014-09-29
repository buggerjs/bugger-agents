'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function InspectorAgent(client) {
  if (!(this instanceof InspectorAgent))
    return new InspectorAgent(client);

  BaseAgent.call(this, InspectorAgent, client);
}
util.inherits(InspectorAgent, BaseAgent);
_.extend(InspectorAgent, require('./inspector.types'));
module.exports = InspectorAgent;

/**
 * Enables inspector domain notifications.
 */
InspectorAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables inspector domain notifications.
 */
InspectorAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Resets all domains.
 */
InspectorAgent.prototype.reset = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
