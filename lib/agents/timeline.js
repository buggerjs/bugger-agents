'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function TimelineAgent(client) {
  if (!(this instanceof TimelineAgent))
    return new TimelineAgent(client);

  BaseAgent.call(this, TimelineAgent, client);
}
util.inherits(TimelineAgent, BaseAgent);
_.extend(TimelineAgent, require('./timeline.types'));
module.exports = TimelineAgent;

/**
 * Starts capturing instrumentation events.
 * 
 * @param {integer=} maxCallStackDepth Samples JavaScript stack traces up to <code>maxCallStackDepth</code>, defaults to 5.
 * @param {boolean=} includeDomCounters Whether DOM counters data should be included into timeline events.
 * @param {boolean=} includeNativeMemoryStatistics Whether native memory usage statistics should be reported as part of timeline events.
 */
TimelineAgent.prototype.start = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Stops capturing instrumentation events.
 */
TimelineAgent.prototype.stop = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
