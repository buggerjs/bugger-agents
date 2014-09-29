'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function ProfilerAgent(client) {
  if (!(this instanceof ProfilerAgent))
    return new ProfilerAgent(client);

  BaseAgent.call(this, ProfilerAgent, client);
}
util.inherits(ProfilerAgent, BaseAgent);
_.extend(ProfilerAgent, require('./profiler.types'));
module.exports = ProfilerAgent;

/**
 */
ProfilerAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
ProfilerAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
ProfilerAgent.prototype.start = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @returns {ProfileHeader} header The header of the recorded profile.
 */
ProfilerAgent.prototype.stop = function() {
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
