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
 * Strart trace events collection.
 * 
 * @param {string} categories Category/tag filter
 */
TracingAgent.prototype.start = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Stop trace events collection.
 */
TracingAgent.prototype.end = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
