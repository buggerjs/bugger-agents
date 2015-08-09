'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function RenderingAgent(client) {
  if (!(this instanceof RenderingAgent))
    return new RenderingAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(RenderingAgent, BaseAgent);
_.extend(RenderingAgent, require('./rendering.types'));
module.exports = RenderingAgent;

/**
 * Requests that backend shows paint rectangles
 * 
 * @param {boolean} result True for showing paint rectangles
 */
RenderingAgent.prototype.setShowPaintRects =
function setShowPaintRects() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend shows debug borders on layers
 * 
 * @param {boolean} show True for showing debug borders
 */
RenderingAgent.prototype.setShowDebugBorders =
function setShowDebugBorders() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend shows the FPS counter
 * 
 * @param {boolean} show True for showing the FPS counter
 */
RenderingAgent.prototype.setShowFPSCounter =
function setShowFPSCounter() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend enables continuous painting
 * 
 * @param {boolean} enabled True for enabling cointinuous painting
 */
RenderingAgent.prototype.setContinuousPaintingEnabled =
function setContinuousPaintingEnabled() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend shows scroll bottleneck rects
 * 
 * @param {boolean} show True for showing scroll bottleneck rects
 */
RenderingAgent.prototype.setShowScrollBottleneckRects =
function setShowScrollBottleneckRects() {
  throw new Error('Not implemented');
};
