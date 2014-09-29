'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function CanvasAgent(client) {
  if (!(this instanceof CanvasAgent))
    return new CanvasAgent(client);

  BaseAgent.call(this, CanvasAgent, client);
}
util.inherits(CanvasAgent, BaseAgent);
_.extend(CanvasAgent, require('./canvas.types'));
module.exports = CanvasAgent;

/**
 * Enables Canvas inspection.
 */
CanvasAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables Canvas inspection.
 */
CanvasAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {TraceLogId} traceLogId
 */
CanvasAgent.prototype.dropTraceLog = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Checks if there is any uninstrumented canvas in the inspected page.
 * 
 * @returns {boolean} result
 */
CanvasAgent.prototype.hasUninstrumentedCanvases = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Starts (or continues) a canvas frame capturing which will be stopped automatically after the next frame is prepared.
 * 
 * @param {Page.FrameId=} frameId Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed.
 * 
 * @returns {TraceLogId} traceLogId Identifier of the trace log containing captured canvas calls.
 */
CanvasAgent.prototype.captureFrame = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Starts (or continues) consecutive canvas frames capturing.
 * The capturing is stopped by the corresponding stopCapturing command.
 * 
 * @param {Page.FrameId=} frameId Identifier of the frame containing document whose canvases are to be captured. If omitted, main frame is assumed.
 * 
 * @returns {TraceLogId} traceLogId Identifier of the trace log containing captured canvas calls.
 */
CanvasAgent.prototype.startCapturing = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {TraceLogId} traceLogId
 */
CanvasAgent.prototype.stopCapturing = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {TraceLogId} traceLogId
 * @param {integer=} startOffset
 * @param {integer=} maxLength
 * 
 * @returns {TraceLog} traceLog
 */
CanvasAgent.prototype.getTraceLog = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {TraceLogId} traceLogId
 * @param {integer} stepNo Last call index in the trace log to replay (zero based).
 * 
 * @returns {ResourceState} resourceState
 * @returns {number} replayTime Replay time (in milliseconds).
 */
CanvasAgent.prototype.replayTraceLog = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {TraceLogId} traceLogId
 * @param {ResourceId} resourceId
 * 
 * @returns {ResourceState} resourceState
 */
CanvasAgent.prototype.getResourceState = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
CanvasAgent.prototype.evaluateTraceLogCallArgument = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
