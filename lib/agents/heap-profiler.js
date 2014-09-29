'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function HeapProfilerAgent(client) {
  if (!(this instanceof HeapProfilerAgent))
    return new HeapProfilerAgent(client);

  BaseAgent.call(this, HeapProfilerAgent, client);
}
util.inherits(HeapProfilerAgent, BaseAgent);
_.extend(HeapProfilerAgent, require('./heap-profiler.types'));
module.exports = HeapProfilerAgent;

/**
 * 
 * @returns {Array.<ProfileHeader>} headers
 */
HeapProfilerAgent.prototype.getProfileHeaders = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
HeapProfilerAgent.prototype.startTrackingHeapObjects = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
HeapProfilerAgent.prototype.stopTrackingHeapObjects = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {integer} uid
 */
HeapProfilerAgent.prototype.getHeapSnapshot = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {integer} uid
 */
HeapProfilerAgent.prototype.removeProfile = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
HeapProfilerAgent.prototype.clearProfiles = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {boolean=} reportProgress If true 'reportHeapSnapshotProgress' events will be generated while snapshot is being taken.
 */
HeapProfilerAgent.prototype.takeHeapSnapshot = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 */
HeapProfilerAgent.prototype.collectGarbage = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {HeapSnapshotObjectId} objectId
 * @param {string=} objectGroup Symbolic group name that can be used to release multiple objects.
 * 
 * @returns {Runtime.RemoteObject} result Evaluation result.
 */
HeapProfilerAgent.prototype.getObjectByHeapObjectId = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {Runtime.RemoteObjectId} objectId Identifier of the object to get heap object id for.
 * 
 * @returns {HeapSnapshotObjectId} heapSnapshotObjectId Id of the heap snapshot object corresponding to the passed remote object id.
 */
HeapProfilerAgent.prototype.getHeapObjectId = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
