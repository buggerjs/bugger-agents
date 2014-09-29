'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function ApplicationCacheAgent(client) {
  if (!(this instanceof ApplicationCacheAgent))
    return new ApplicationCacheAgent(client);

  BaseAgent.call(this, ApplicationCacheAgent, client);
}
util.inherits(ApplicationCacheAgent, BaseAgent);
_.extend(ApplicationCacheAgent, require('./application-cache.types'));
module.exports = ApplicationCacheAgent;

/**
 * Returns array of frame identifiers with manifest urls for each frame containing a document associated with some application cache.
 * 
 * @returns {Array.<FrameWithManifest>} frameIds Array of frame identifiers with manifest urls for each frame containing a document associated with some application cache.
 */
ApplicationCacheAgent.prototype.getFramesWithManifests = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Enables application cache domain notifications.
 */
ApplicationCacheAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns manifest URL for document in the given frame.
 * 
 * @param {Page.FrameId} frameId Identifier of the frame containing document whose manifest is retrieved.
 * 
 * @returns {string} manifestURL Manifest URL for document in the given frame.
 */
ApplicationCacheAgent.prototype.getManifestForFrame = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns relevant application cache data for the document in given frame.
 * 
 * @param {Page.FrameId} frameId Identifier of the frame containing document whose application cache is retrieved.
 * 
 * @returns {ApplicationCache} applicationCache Relevant application cache data for the document in given frame.
 */
ApplicationCacheAgent.prototype.getApplicationCacheForFrame = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};