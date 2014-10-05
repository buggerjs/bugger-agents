'use strict';

var util = require('util');

var _ = require('lodash');
var Bluebird = require('bluebird');

var BaseAgent = require('./base');

function WorkerAgent(client) {
  if (!(this instanceof WorkerAgent))
    return new WorkerAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(WorkerAgent, BaseAgent);
_.extend(WorkerAgent, require('./worker.types'));
module.exports = WorkerAgent;

/**
 */
WorkerAgent.prototype.enable =
function enable() {
  throw new Error('Not implemented');
};

/**
 */
WorkerAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {integer} workerId
 * @param {Object} message
 */
WorkerAgent.prototype.sendMessageToWorker =
function sendMessageToWorker() {
  throw new Error('Not implemented');
};

/**
 * Tells whether browser supports workers inspection.
 * 
 * @returns {boolean} result True if browser has workers support.
 */
WorkerAgent.prototype.canInspectWorkers =
function canInspectWorkers() {
  return Bluebird.resolve({ result: false });
};

/**
 * 
 * @param {integer} workerId
 */
WorkerAgent.prototype.connectToWorker =
function connectToWorker() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {integer} workerId
 */
WorkerAgent.prototype.disconnectFromWorker =
function disconnectFromWorker() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {boolean} value
 */
WorkerAgent.prototype.setAutoconnectToWorkers =
function setAutoconnectToWorkers(params) {
  return this._ignore('setAutoconnectToWorkers', params);
};
