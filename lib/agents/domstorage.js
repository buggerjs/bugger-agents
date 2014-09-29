'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function DOMStorageAgent(client) {
  if (!(this instanceof DOMStorageAgent))
    return new DOMStorageAgent(client);

  BaseAgent.call(this, DOMStorageAgent, client);
}
util.inherits(DOMStorageAgent, BaseAgent);
_.extend(DOMStorageAgent, require('./domstorage.types'));
module.exports = DOMStorageAgent;

/**
 * Enables storage tracking, storage events will now be delivered to the client.
 */
DOMStorageAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables storage tracking, prevents storage events from being sent to the client.
 */
DOMStorageAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {StorageId} storageId
 * 
 * @returns {Array.<Item>} entries
 */
DOMStorageAgent.prototype.getDOMStorageItems = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {StorageId} storageId
 * @param {string} key
 * @param {string} value
 */
DOMStorageAgent.prototype.setDOMStorageItem = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {StorageId} storageId
 * @param {string} key
 */
DOMStorageAgent.prototype.removeDOMStorageItem = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
