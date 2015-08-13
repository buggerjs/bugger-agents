'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function CacheStorageAgent(client) {
  if (!(this instanceof CacheStorageAgent))
    return new CacheStorageAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(CacheStorageAgent, BaseAgent);
_.extend(CacheStorageAgent, require('./cache-storage.types'));
module.exports = CacheStorageAgent;

/**
 * Requests cache names.
 * 
 * @param {string} securityOrigin Security origin.
 * 
 * @returns {Array.<Cache>} caches Caches for the security origin.
 */
CacheStorageAgent.prototype.requestCacheNames =
function requestCacheNames() {
  return { caches: [] };
};

/**
 * Requests data from cache.
 * 
 * @param {CacheId} cacheId ID of cache to get entries from.
 * @param {integer} skipCount Number of records to skip.
 * @param {integer} pageSize Number of records to fetch.
 * 
 * @returns {Array.<DataEntry>} cacheDataEntries Array of object store data entries.
 * @returns {boolean} hasMore If true, there are more entries to fetch in the given range.
 */
CacheStorageAgent.prototype.requestEntries =
function requestEntries() {
  throw new Error('Not implemented');
};

/**
 * Deletes a cache.
 * 
 * @param {CacheId} cacheId Id of cache for deletion.
 */
CacheStorageAgent.prototype.deleteCache =
function deleteCache() {
  throw new Error('Not implemented');
};

/**
 * Deletes a cache entry.
 * 
 * @param {CacheId} cacheId Id of cache where the entry will be deleted.
 * @param {string} request URL spec of the request.
 */
CacheStorageAgent.prototype.deleteEntry =
function deleteEntry() {
  throw new Error('Not implemented');
};
