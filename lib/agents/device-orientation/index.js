'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function DeviceOrientationAgent(client) {
  if (!(this instanceof DeviceOrientationAgent))
    return new DeviceOrientationAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(DeviceOrientationAgent, BaseAgent);
_.extend(DeviceOrientationAgent, require('./types'));
module.exports = DeviceOrientationAgent;

/**
 * Overrides the Device Orientation.
 * 
 * @param {number} alpha Mock alpha
 * @param {number} beta Mock beta
 * @param {number} gamma Mock gamma
 */
DeviceOrientationAgent.prototype.setDeviceOrientationOverride =
function setDeviceOrientationOverride() {
  throw new Error('Not implemented');
};

/**
 * Clears the overridden Device Orientation.
 */
DeviceOrientationAgent.prototype.clearDeviceOrientationOverride =
function clearDeviceOrientationOverride() {
  throw new Error('Not implemented');
};
