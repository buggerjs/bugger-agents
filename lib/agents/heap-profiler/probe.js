/* global Promise */
'use strict';

var EventEmitter = require('events').EventEmitter;

var profiler;
try {
  profiler = require('v8-profiler');
} catch (err) {
  console.error('Could not require v8-profiler:\n%s', err.stack);
  console.error(
    'Install v8-profiler in the project directory via:\n\n  npm install v8-profiler');
  profiler = {
    takeSnapshot: function() {},
    startProfiling: function() {},
    stopProfiling: function() {}
  };
}

var probe = module.exports = new EventEmitter();

function reportHeapSnapshotProgress(done, total) {
  probe.emit('reportHeapSnapshotProgress', {
    done: done,
    total: total,
    finished: done === total
  });
}

function addHeapSnapshotChunk(chunk) {
  probe.emit('addHeapSnapshotChunk', { chunk: chunk });
}

probe.takeHeapSnapshot =
function takeHeapSnapshot(reportProgress) {
  return new Promise(function(resolve) {
    var snapshot = profiler.takeSnapshot(reportProgress ? reportHeapSnapshotProgress : false);

    snapshot.serialize(addHeapSnapshotChunk, function end() {
      snapshot.delete();
      resolve();
    });
  });
};
