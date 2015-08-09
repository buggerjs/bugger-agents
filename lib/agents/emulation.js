'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function EmulationAgent(client) {
  if (!(this instanceof EmulationAgent))
    return new EmulationAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(EmulationAgent, BaseAgent);
_.extend(EmulationAgent, require('./rendering.types'));
module.exports = EmulationAgent;

/**
 * Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results).
 * 
 * @param {integer} width Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
 * @param {integer} height Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
 * @param {number} deviceScaleFactor Overriding device scale factor value. 0 disables the override.
 * @param {boolean} mobile Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more.
 * @param {boolean} fitWindow Whether a view that exceeds the available browser window area should be scaled down to fit.
 * @param {number=} scale Scale to apply to resulting view image. Ignored in |fitWindow| mode.
 * @param {number=} offsetX X offset to shift resulting view image by. Ignored in |fitWindow| mode.
 * @param {number=} offsetY Y offset to shift resulting view image by. Ignored in |fitWindow| mode.
 * @param {integer=} screenWidth Overriding screen width value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
 * @param {integer=} screenHeight Overriding screen height value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
 * @param {integer=} positionX Overriding view X position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
 * @param {integer=} positionY Overriding view Y position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
 */
EmulationAgent.prototype.setDeviceMetricsOverride =
function setDeviceMetricsOverride() {
  throw new Error('Not implemented');
};

/**
 * Clears the overriden device metrics.
 */
EmulationAgent.prototype.clearDeviceMetricsOverride =
function clearDeviceMetricsOverride() {
  throw new Error('Not implemented');
};

/**
 * Requests that scroll offsets and page scale factor are reset to initial values.
 */
EmulationAgent.prototype.resetScrollAndPageScaleFactor =
function resetScrollAndPageScaleFactor() {
  throw new Error('Not implemented');
};

/**
 * Sets a specified page scale factor.
 * 
 * @param {number} pageScaleFactor Page scale factor.
 */
EmulationAgent.prototype.setPageScaleFactor =
function setPageScaleFactor() {
  throw new Error('Not implemented');
};

/**
 * Switches script execution in the page.
 * 
 * @param {boolean} value Whether script execution should be disabled in the page.
 */
EmulationAgent.prototype.setScriptExecutionDisabled =
function setScriptExecutionDisabled() {
  throw new Error('Not implemented');
};

/**
 * Overrides the Geolocation Position or Error.
 * Omitting any of the parameters emulates position unavailable.
 * 
 * @param {number=} latitude Mock latitude
 * @param {number=} longitude Mock longitude
 * @param {number=} accuracy Mock accuracy
 */
EmulationAgent.prototype.setGeolocationOverride =
function setGeolocationOverride() {
  throw new Error('Not implemented');
};

/**
 * Clears the overriden Geolocation Position and Error.
 */
EmulationAgent.prototype.clearGeolocationOverride =
function clearGeolocationOverride() {
  throw new Error('Not implemented');
};

/**
 * Toggles mouse event-based touch event emulation.
 * 
 * @param {boolean} enabled Whether the touch event emulation should be enabled.
 * @param {string mobile|desktop=} configuration Touch/gesture events configuration. Default: current platform.
 */
EmulationAgent.prototype.setTouchEmulationEnabled =
function setTouchEmulationEnabled() {
  throw new Error('Not implemented');
};

/**
 * Emulates the given media for CSS media queries.
 * 
 * @param {string} media Media type to emulate. Empty string disables the override.
 */
EmulationAgent.prototype.setEmulatedMedia =
function setEmulatedMedia() {
  throw new Error('Not implemented');
};

/**
 * Tells whether emulation is supported.
 * 
 * @returns {boolean} result True if emulation is supported.
 */
EmulationAgent.prototype.canEmulate =
function canEmulate() {
  return false;
};
