'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function PowerAgent(client) {
  if (!(this instanceof PowerAgent))
    return new PowerAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(PowerAgent, BaseAgent);
_.extend(PowerAgent, require('./power.types'));
module.exports = PowerAgent;

/**
 * Start power events collection.
 * 
 * 
 */
PowerAgent.prototype.start =
function start() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Stop power events collection.
 * 
 * 
 */
PowerAgent.prototype.end =
function end() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Tells whether power profiling is supported.
 * 
 * @returns {boolean} result True if power profiling is supported.
 */
PowerAgent.prototype.canProfilePower =
function canProfilePower() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Describes the accuracy level of the data provider.
 * 
 * @returns {string high|moderate|low} result
 */
PowerAgent.prototype.getAccuracyLevel =
function getAccuracyLevel() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
