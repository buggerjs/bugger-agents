'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function ProfilerAgent(client) {
  if (!(this instanceof ProfilerAgent))
    return new ProfilerAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(ProfilerAgent, BaseAgent);
_.extend(ProfilerAgent, require('./profiler.types'));
module.exports = ProfilerAgent;

/**
 */
ProfilerAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 */
ProfilerAgent.prototype.disable =
function disable() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
ProfilerAgent.prototype.start =
function start() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @returns {CPUProfile} profile Recorded profile.
 */
ProfilerAgent.prototype.stop =
function stop() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @returns {Array.<ProfileHeader>} headers
 */
ProfilerAgent.prototype.getProfileHeaders = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {integer} uid
 * 
 * @returns {CPUProfile} profile
 */
ProfilerAgent.prototype.getCPUProfile = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {string} type
 * @param {integer} uid
 */
ProfilerAgent.prototype.removeProfile = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
ProfilerAgent.prototype.clearProfiles = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Changes CPU profiler sampling interval.
 * Must be called before CPU profiles recording started.
 * 
 * @param {integer} interval New sampling interval in microseconds.
 */
ProfilerAgent.prototype.setSamplingInterval =
function setSamplingInterval(params) {
  return this._ignore('setSamplingInterval', params);
};
