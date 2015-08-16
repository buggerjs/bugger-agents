'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function TracingAgent(client) {
  if (!(this instanceof TracingAgent))
    return new TracingAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(TracingAgent, BaseAgent);
_.extend(TracingAgent, require('./types'));
module.exports = TracingAgent;

/**
 * Start trace events collection.
 * 
 * @param {string=} categories Category/tag filter
 * @param {string=} options Tracing options
 * @param {number=} bufferUsageReportingInterval If set, the agent will issue bufferUsage events at this interval, specified in milliseconds
 */
TracingAgent.prototype.start =
function start() {
  throw new Error('Not implemented');
};

/**
 * Stop trace events collection.
 */
TracingAgent.prototype.end =
function end() {
  throw new Error('Not implemented');
};

/**
 * Gets supported tracing categories.
 * 
 * @returns {Array.<string>} categories A list of supported tracing categories.
 */
TracingAgent.prototype.getCategories =
function getCategories() {
  throw new Error('Not implemented');
};

/**
 * Request a global memory dump.
 * 
 * @returns {string} dumpGuid GUID of the resulting global memory dump.
 * @returns {boolean} success True iff the global memory dump succeeded.
 */
TracingAgent.prototype.requestMemoryDump =
function requestMemoryDump() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
