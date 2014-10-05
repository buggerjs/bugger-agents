'use strict';

var util = require('util');

var _ = require('lodash');
var Bluebird = require('bluebird');

var BaseAgent = require('./base');

function IndexedDBAgent(client) {
  if (!(this instanceof IndexedDBAgent))
    return new IndexedDBAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(IndexedDBAgent, BaseAgent);
_.extend(IndexedDBAgent, require('./indexed-db.types'));
module.exports = IndexedDBAgent;

/**
 * Enables events from backend.
 */
IndexedDBAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 * Disables events from backend.
 */
IndexedDBAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * Requests database names for given security origin.
 * 
 * @param {string} securityOrigin Security origin.
 * 
 * @returns {Array.<string>} databaseNames Database names for origin.
 */
IndexedDBAgent.prototype.requestDatabaseNames =
function requestDatabaseNames() {
  return Bluebird.resolve({ databaseNames: [] });
};

/**
 * Requests database with given name in given frame.
 * 
 * @param {string} securityOrigin Security origin.
 * @param {string} databaseName Database name.
 * 
 * @returns {DatabaseWithObjectStores} databaseWithObjectStores Database with an array of object stores.
 */
IndexedDBAgent.prototype.requestDatabase =
function requestDatabase() {
  throw new Error('Not implemented');
};

/**
 * Requests data from object store or index.
 * 
 * @param {string} securityOrigin Security origin.
 * @param {string} databaseName Database name.
 * @param {string} objectStoreName Object store name.
 * @param {string} indexName Index name, empty string for object store data requests.
 * @param {integer} skipCount Number of records to skip.
 * @param {integer} pageSize Number of records to fetch.
 * @param {KeyRange=} keyRange Key range.
 * 
 * @returns {Array.<DataEntry>} objectStoreDataEntries Array of object store data entries.
 * @returns {boolean} hasMore If true, there are more entries to fetch in the given range.
 */
IndexedDBAgent.prototype.requestData =
function requestData() {
  throw new Error('Not implemented');
};

/**
 * Clears all entries from an object store.
 * 
 * @param {string} securityOrigin Security origin.
 * @param {string} databaseName Database name.
 * @param {string} objectStoreName Object store name.
 * 
 * 
 */
IndexedDBAgent.prototype.clearObjectStore =
function clearObjectStore() {
  throw new Error('Not implemented');
};
