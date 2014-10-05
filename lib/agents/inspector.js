'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function InspectorAgent(client) {
  if (!(this instanceof InspectorAgent))
    return new InspectorAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(InspectorAgent, BaseAgent);
_.extend(InspectorAgent, require('./inspector.types'));
module.exports = InspectorAgent;

/**
 * Enables inspector domain notifications.
 */
InspectorAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 * Disables inspector domain notifications.
 */
InspectorAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * Resets all domains.
 */
InspectorAgent.prototype.reset =
function reset() {
  throw new Error('Not implemented');
};
