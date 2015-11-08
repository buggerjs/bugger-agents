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

var lastIdx = 0;
var lastName = null;

probe.start =
function start() {
  return new Promise(function(resolve) {
    lastName = 'Profile ' + (++lastIdx);
    profiler.startProfiling(lastName, true);
    resolve();
  });
};

probe.stop =
function stop() {
  return new Promise(function(resolve) {
    var profile = profiler.stopProfiling(lastName);
    resolve({ profile: profile });
  });
};
