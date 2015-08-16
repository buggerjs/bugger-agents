'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function HeapProfilerAgent(client) {
  if (!(this instanceof HeapProfilerAgent))
    return new HeapProfilerAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(HeapProfilerAgent, BaseAgent);
_.extend(HeapProfilerAgent, require('./types'));
module.exports = HeapProfilerAgent;

/**
 * 
 * @returns {Array.<ProfileHeader>} headers
 */
HeapProfilerAgent.prototype.getProfileHeaders = function() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {boolean=} trackAllocations
 */
HeapProfilerAgent.prototype.startTrackingHeapObjects =
function startTrackingHeapObjects() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {boolean=} reportProgress If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken when the tracking is stopped.
 */
HeapProfilerAgent.prototype.stopTrackingHeapObjects =
function stopTrackingHeapObjects() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {integer} uid
 */
HeapProfilerAgent.prototype.getHeapSnapshot = function() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {integer} uid
 */
HeapProfilerAgent.prototype.removeProfile = function() {
  throw new Error('Not implemented');
};

/**
 */
HeapProfilerAgent.prototype.clearProfiles = function() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {boolean=} reportProgress If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
 */
HeapProfilerAgent.prototype.takeHeapSnapshot =
function takeHeapSnapshot() {
  throw new Error('Not implemented');
};

/**
 */
HeapProfilerAgent.prototype.collectGarbage =
function collectGarbage() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {HeapSnapshotObjectId} objectId
 * @param {string=} objectGroup Symbolic group name that can be used to release multiple objects.
 * 
 * @returns {Runtime.RemoteObject} result Evaluation result.
 */
HeapProfilerAgent.prototype.getObjectByHeapObjectId =
function getObjectByHeapObjectId() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {Runtime.RemoteObjectId} objectId Identifier of the object to get heap object id for.
 * 
 * @returns {HeapSnapshotObjectId} heapSnapshotObjectId Id of the heap snapshot object corresponding to the passed remote object id.
 */
HeapProfilerAgent.prototype.getHeapObjectId =
function getHeapObjectId() {
  throw new Error('Not implemented');
};

/**
 */
HeapProfilerAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 */
HeapProfilerAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
 * 
 * @param {HeapSnapshotObjectId} heapObjectId Heap snapshot object id to be accessible by means of $x command line API.
 */
HeapProfilerAgent.prototype.addInspectedHeapObject =
function addInspectedHeapObject() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
