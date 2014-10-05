'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function TimelineAgent(client) {
  if (!(this instanceof TimelineAgent))
    return new TimelineAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(TimelineAgent, BaseAgent);
_.extend(TimelineAgent, require('./timeline.types'));
module.exports = TimelineAgent;

/**
 * Starts capturing instrumentation events.
 * 
 * @param {integer=} maxCallStackDepth Samples JavaScript stack traces up to <code>maxCallStackDepth</code>, defaults to 5.
 * @param {boolean=} bufferEvents Whether instrumentation events should be buffered and returned upon <code>stop</code> call.
 * @param {string=} liveEvents Coma separated event types to issue although bufferEvents is set.
 * @param {boolean=} includeCounters Whether counters data should be included into timeline events.
 * @param {boolean=} includeGPUEvents Whether events from GPU process should be collected.
 */
TimelineAgent.prototype.start =
function start() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Stops capturing instrumentation events.
 */
TimelineAgent.prototype.stop =
function stop() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Enables timeline.
 * After this call, timeline can be started from within the page (for example upon console.timeline).
 */
TimelineAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 * Disables timeline.
 */
TimelineAgent.prototype.disable =
function disable() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
