'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function ServiceWorkerAgent(client) {
  if (!(this instanceof ServiceWorkerAgent))
    return new ServiceWorkerAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(ServiceWorkerAgent, BaseAgent);
_.extend(ServiceWorkerAgent, require('./service-worker.types'));
module.exports = ServiceWorkerAgent;

/**
 */
ServiceWorkerAgent.prototype.enable =
function enable() {
  // ignore
};

/**
 */
ServiceWorkerAgent.prototype.disable =
function disable() {
  // ignore
};

/**
 * 
 * @param {string} workerId
 * @param {string} message
 */
ServiceWorkerAgent.prototype.sendMessage =
function sendMessage() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} workerId
 */
ServiceWorkerAgent.prototype.stop =
function stop() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} scopeURL
 */
ServiceWorkerAgent.prototype.unregister =
function unregister() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} scopeURL
 */
ServiceWorkerAgent.prototype.updateRegistration =
function updateRegistration() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} scopeURL
 */
ServiceWorkerAgent.prototype.startWorker =
function startWorker() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} versionId
 */
ServiceWorkerAgent.prototype.stopWorker =
function stopWorker() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} versionId
 */
ServiceWorkerAgent.prototype.inspectWorker =
function inspectWorker() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} versionId
 */
ServiceWorkerAgent.prototype.skipWaiting =
function skipWaiting() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {boolean} debugOnStart
 */
ServiceWorkerAgent.prototype.setDebugOnStart =
function setDebugOnStart() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} origin
 * @param {string} registrationId
 * @param {string} data
 */
ServiceWorkerAgent.prototype.deliverPushMessage =
function deliverPushMessage() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {TargetID} targetId
 * 
 * @returns {TargetInfo} targetInfo
 */
ServiceWorkerAgent.prototype.getTargetInfo =
function getTargetInfo() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {TargetID} targetId
 */
ServiceWorkerAgent.prototype.activateTarget =
function activateTarget() {
  throw new Error('Not implemented');
};
