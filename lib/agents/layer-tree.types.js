'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Unique RenderLayer identifier.
 */
exports.LayerId = String;

/**
 * Information about a compositing layer.
 * 
 * @param {LayerId} layerId The unique id for this layer.
 * @param {LayerId=} parentLayerId The id of parent (not present for root).
 * @param {DOM.NodeId=} nodeId The id for the node associated with this layer.
 * @param {number} offsetX Offset from parent layer, X coordinate.
 * @param {number} offsetY Offset from parent layer, X coordinate.
 * @param {number} width Layer width.
 * @param {number} height Layer height.
 * @param {Array.<number>=} transform Transformation matrix for layer, default is identity matrix
 * @param {number=} anchorX Transform anchor point X, absent if no transform specified
 * @param {number=} anchorY Transform anchor point Y, absent if no transform specified
 * @param {number=} anchorZ Transform anchor point Z, absent if no transform specified
 * @param {integer} paintCount Indicates how many time this layer has painted.
 * @param {boolean=} invisible Set if layer is not visible.
 */
exports.Layer =
function Layer(props) {
  this.layerId = props.layerId;
  this.parentLayerId = props.parentLayerId;
  this.nodeId = props.nodeId;
  this.offsetX = props.offsetX;
  this.offsetY = props.offsetY;
  this.width = props.width;
  this.height = props.height;
  this.transform = props.transform;
  this.anchorX = props.anchorX;
  this.anchorY = props.anchorY;
  this.anchorZ = props.anchorZ;
  this.paintCount = props.paintCount;
  this.invisible = props.invisible;
};
