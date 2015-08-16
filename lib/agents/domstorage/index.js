'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function DOMStorageAgent(client) {
  if (!(this instanceof DOMStorageAgent))
    return new DOMStorageAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(DOMStorageAgent, BaseAgent);
_.extend(DOMStorageAgent, require('./types'));
module.exports = DOMStorageAgent;

/**
 * Enables storage tracking, storage events will now be delivered to the client.
 */
DOMStorageAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 * Disables storage tracking, prevents storage events from being sent to the client.
 */
DOMStorageAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {StorageId} storageId
 * 
 * @returns {Array.<Item>} entries
 */
DOMStorageAgent.prototype.getDOMStorageItems =
function getDOMStorageItems() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {StorageId} storageId
 * @param {string} key
 * @param {string} value
 */
DOMStorageAgent.prototype.setDOMStorageItem =
function setDOMStorageItem() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {StorageId} storageId
 * @param {string} key
 */
DOMStorageAgent.prototype.removeDOMStorageItem =
function removeDOMStorageItem() {
  throw new Error('Not implemented');
};
