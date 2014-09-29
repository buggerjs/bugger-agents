'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function LayerTreeAgent(client) {
  if (!(this instanceof LayerTreeAgent))
    return new LayerTreeAgent(client);

  BaseAgent.call(this, LayerTreeAgent, client);
}
util.inherits(LayerTreeAgent, BaseAgent);
_.extend(LayerTreeAgent, require('./layer-tree.types'));
module.exports = LayerTreeAgent;

/**
 * Enables compositing tree inspection.
 */
LayerTreeAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables compositing tree inspection.
 */
LayerTreeAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns the layer tree structure of the current page.
 * 
 * @param {DOM.NodeId=} nodeId Root of the subtree for which we want to gather layers (return entire tree if not specified)
 * 
 * @returns {Array.<Layer>} layers Child layers.
 */
LayerTreeAgent.prototype.getLayers = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Provides the reasons why the given layer was composited.
 * 
 * @param {LayerId} layerId The id of the layer for which we want to get the reasons it was composited.
 * 
 * @returns {Array.<string>} compositingReasons A list of strings specifying reasons for the given layer to become composited.
 */
LayerTreeAgent.prototype.compositingReasons = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
