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
LayerTreeAgent.prototype.enable =
function enable() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables compositing tree inspection.
 */
LayerTreeAgent.prototype.disable =
function disable() {
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
LayerTreeAgent.prototype.compositingReasons =
function compositingReasons() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns the layer snapshot identifier.
 * 
 * @param {LayerId} layerId The id of the layer.
 * 
 * @returns {SnapshotId} snapshotId The id of the layer snapshot.
 */
LayerTreeAgent.prototype.makeSnapshot =
function makeSnapshot() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns the snapshot identifier.
 * 
 * @param {string} data Base64-encoded snapshot data.
 * 
 * @returns {SnapshotId} snapshotId The id of the snapshot.
 */
LayerTreeAgent.prototype.loadSnapshot =
function loadSnapshot() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Releases layer snapshot captured by the back-end.
 * 
 * @param {SnapshotId} snapshotId The id of the layer snapshot.
 */
LayerTreeAgent.prototype.releaseSnapshot =
function releaseSnapshot() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {SnapshotId} snapshotId The id of the layer snapshot.
 * @param {integer=} minRepeatCount The maximum number of times to replay the snapshot (1, if not specified).
 * @param {number=} minDuration The minimum duration (in seconds) to replay the snapshot.
 * 
 * @returns {Array.<PaintProfile>} timings The array of paint profiles, one per run.
 */
LayerTreeAgent.prototype.profileSnapshot =
function profileSnapshot() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Replays the layer snapshot and returns the resulting bitmap.
 * 
 * @param {SnapshotId} snapshotId The id of the layer snapshot.
 * @param {integer=} fromStep The first step to replay from (replay from the very start if not specified).
 * @param {integer=} toStep The last step to replay to (replay till the end if not specified).
 * @param {number=} scale The scale to apply while replaying (defaults to 1).
 * 
 * @returns {string} dataURL A data: URL for resulting image.
 */
LayerTreeAgent.prototype.replaySnapshot =
function replaySnapshot() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Replays the layer snapshot and returns canvas log.
 * 
 * @param {SnapshotId} snapshotId The id of the layer snapshot.
 * 
 * @returns {Array.<Object>} commandLog The array of canvas function calls.
 */
LayerTreeAgent.prototype.snapshotCommandLog =
function snapshotCommandLog() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
