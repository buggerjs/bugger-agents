'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Profile header.
 * 
 * @param {string} title Profile title.
 * @param {integer} uid Unique identifier of the profile.
 */
exports.ProfileHeader =
function ProfileHeader(props) {
  this.title = props.title;
  this.uid = props.uid;
};

/**
 * CPU Profile node.
 * Holds callsite information, execution statistics and child nodes.
 * 
 * @param {string} functionName Function name.
 * @param {Debugger.ScriptId} scriptId Script identifier.
 * @param {string} url URL.
 * @param {integer} lineNumber Line number.
 * @param {integer} hitCount Number of samples where this node was on top of the call stack.
 * @param {number} callUID Call UID.
 * @param {Array.<CPUProfileNode>} children Child nodes.
 * @param {string} deoptReason The reason of being not optimized. The function may be deoptimized or marked as don't optimize.
 * @param {integer=} id Unique id of the node.
 */
exports.CPUProfileNode =
function CPUProfileNode(props) {
  this.functionName = props.functionName;
  this.scriptId = props.scriptId;
  this.url = props.url;
  this.lineNumber = props.lineNumber;
  this.hitCount = props.hitCount;
  this.callUID = props.callUID;
  this.children = props.children;
  this.deoptReason = props.deoptReason;
  this.id = props.id;
};

/**
 * Profile.
 * 
 * @param {CPUProfileNode} head
 * @param {number} startTime Profiling start time in seconds.
 * @param {number} endTime Profiling end time in seconds.
 * @param {Array.<integer>=} samples Ids of samples top nodes.
 */
exports.CPUProfile =
function CPUProfile(props) {
  this.head = props.head;
  this.startTime = props.startTime;
  this.endTime = props.endTime;
  this.samples = props.samples;
};

/**
 * Heap snashot object id.
 */
exports.HeapSnapshotObjectId = String;
