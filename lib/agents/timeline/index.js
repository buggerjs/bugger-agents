'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function TimelineAgent(client) {
  if (!(this instanceof TimelineAgent))
    return new TimelineAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(TimelineAgent, BaseAgent);
_.extend(TimelineAgent, require('./types'));
module.exports = TimelineAgent;

/**
 * Deprecated.
 * 
 * @param {integer=} maxCallStackDepth Samples JavaScript stack traces up to <code>maxCallStackDepth</code>, defaults to 5.
 * @param {boolean=} bufferEvents Whether instrumentation events should be buffered and returned upon <code>stop</code> call.
 * @param {string=} liveEvents Coma separated event types to issue although bufferEvents is set.
 * @param {boolean=} includeCounters Whether counters data should be included into timeline events.
 * @param {boolean=} includeGPUEvents Whether events from GPU process should be collected.
 */
TimelineAgent.prototype.start =
function start() {
  throw new Error('Not implemented');
};

/**
 * Deprecated.
 */
TimelineAgent.prototype.stop =
function stop() {
  throw new Error('Not implemented');
};

/**
 * Deprecated.
 */
TimelineAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 * Deprecated.
 */
TimelineAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};
