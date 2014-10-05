'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function CanvasAgent(client) {
  if (!(this instanceof CanvasAgent))
    return new CanvasAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(CanvasAgent, BaseAgent);
_.extend(CanvasAgent, require('./canvas.types'));
module.exports = CanvasAgent;

/**
 * Enables Canvas inspection.
 */
CanvasAgent.prototype.enable =
function enable() {
  throw new Error('Not implemented');
};

/**
 * Disables Canvas inspection.
 */
CanvasAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {TraceLogId} traceLogId
 */
CanvasAgent.prototype.dropTraceLog =
function dropTraceLog() {
  throw new Error('Not implemented');
};

/**
 * Checks if there is any uninstrumented canvas in the inspected page.
 * 
 * @returns {boolean} result
 */
CanvasAgent.prototype.hasUninstrumentedCanvases =
function hasUninstrumentedCanvases() {
  throw new Error('Not implemented');
};

/**
 * Starts (or continues) a canvas frame capturing which will be stopped automatically after the next frame is prepared.
 * 
 * @param {Page.FrameId=} frameId Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed.
 * 
 * @returns {TraceLogId} traceLogId Identifier of the trace log containing captured canvas calls.
 */
CanvasAgent.prototype.captureFrame =
function captureFrame() {
  throw new Error('Not implemented');
};

/**
 * Starts (or continues) consecutive canvas frames capturing.
 * The capturing is stopped by the corresponding stopCapturing command.
 * 
 * @param {Page.FrameId=} frameId Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed.
 * 
 * @returns {TraceLogId} traceLogId Identifier of the trace log containing captured canvas calls.
 */
CanvasAgent.prototype.startCapturing =
function startCapturing() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {TraceLogId} traceLogId
 */
CanvasAgent.prototype.stopCapturing =
function stopCapturing() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {TraceLogId} traceLogId
 * @param {integer=} startOffset
 * @param {integer=} maxLength
 * 
 * @returns {TraceLog} traceLog
 */
CanvasAgent.prototype.getTraceLog =
function getTraceLog() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {TraceLogId} traceLogId
 * @param {integer} stepNo Last call index in the trace log to replay (zero based).
 * 
 * @returns {ResourceState} resourceState
 * @returns {number} replayTime Replay time (in milliseconds).
 */
CanvasAgent.prototype.replayTraceLog =
function replayTraceLog() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {TraceLogId} traceLogId
 * @param {ResourceId} resourceId
 * 
 * @returns {ResourceState} resourceState
 */
CanvasAgent.prototype.getResourceState =
function getResourceState() {
  throw new Error('Not implemented');
};

/**
 * Evaluates a given trace call argument or its result.
 * 
 * @param {TraceLogId} traceLogId
 * @param {integer} callIndex Index of the call to evaluate on (zero based).
 * @param {integer} argumentIndex Index of the argument to evaluate (zero based). Provide <code>-1</code> to evaluate call result.
 * @param {string=} objectGroup String object group name to put result into (allows rapid releasing resulting object handles using <code>Runtime.releaseObjectGroup</code>).
 * 
 * @returns {Runtime.RemoteObject=} result Object wrapper for the evaluation result.
 * @returns {ResourceState=} resourceState State of the <code>Resource</code> object.
 */
CanvasAgent.prototype.evaluateTraceLogCallArgument =
function evaluateTraceLogCallArgument() {
  throw new Error('Not implemented');
};
