'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * 
 * @param {number=} size Size of the block in bytes if available
 * @param {string} name Unique name used to identify the component that allocated this block
 * @param {Array.<MemoryBlock>=} children
 */
exports.MemoryBlock =
function MemoryBlock(props) {
  this.size = props.size;
  this.name = props.name;
  this.children = props.children;
};

/**
 * 
 * @param {Array.<string>} strings An array of strings that were found since last update.
 * @param {Array.<integer>} nodes An array of nodes that were found since last update.
 * @param {Array.<integer>} edges An array of edges that were found since last update.
 * @param {Array.<integer>} baseToRealNodeId An array of integers for nodeId remapping. Even nodeId has to be mapped to the following odd nodeId.
 */
exports.HeapSnapshotChunk =
function HeapSnapshotChunk(props) {
  this.strings = props.strings;
  this.nodes = props.nodes;
  this.edges = props.edges;
  this.baseToRealNodeId = props.baseToRealNodeId;
};
