'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function WorkerAgent(client) {
  if (!(this instanceof WorkerAgent))
    return new WorkerAgent(client);

  BaseAgent.call(this, WorkerAgent, client);
}
util.inherits(WorkerAgent, BaseAgent);
_.extend(WorkerAgent, require('./worker.types'));
module.exports = WorkerAgent;

/**
 */
WorkerAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
WorkerAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {integer} workerId
 * @param {Object} message
 */
WorkerAgent.prototype.sendMessageToWorker = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Tells whether browser supports workers inspection.
 * 
 * @returns {boolean} result True if browser has workers support.
 */
WorkerAgent.prototype.canInspectWorkers = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {integer} workerId
 */
WorkerAgent.prototype.connectToWorker = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {integer} workerId
 */
WorkerAgent.prototype.disconnectFromWorker = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {boolean} value
 */
WorkerAgent.prototype.setAutoconnectToWorkers = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
