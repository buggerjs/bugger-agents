'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function TracingAgent(client) {
  if (!(this instanceof TracingAgent))
    return new TracingAgent(client);

  BaseAgent.call(this, TracingAgent, client);
}
util.inherits(TracingAgent, BaseAgent);
_.extend(TracingAgent, require('./tracing.types'));
module.exports = TracingAgent;

/**
 * Start trace events collection.
 * 
 * @param {string} categories Category/tag filter
 * @param {string} options Tracing options
 * @param {number=} bufferUsageReportingInterval If set, the agent will issue bufferUsage events at this interval, specified in milliseconds
 */
TracingAgent.prototype.start =
function start() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Stop trace events collection.
 */
TracingAgent.prototype.end =
function end() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Gets supported tracing categories.
 * 
 * @returns {Array.<string>} categories A list of supported tracing categories.
 */
TracingAgent.prototype.getCategories =
function getCategories() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
