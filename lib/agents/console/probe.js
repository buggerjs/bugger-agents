'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var probeUtils = require('../probe-utils');
var ObjectGroup = require('../object-group');

var makeStackTrace = probeUtils.makeStackTrace;
var slice = Array.prototype.slice;

var probe = module.exports = new EventEmitter();

probe.enable = function enable() {
  console.log = _wrap('log', console.log);
  console.info = _wrap('log', console.info);
  console.warn = _wrap('warning', console.warn);
  console.error = _wrap('error', console.error);
};

function addToConsoleGroup(object) {
  return ObjectGroup.add('console', object);
}

function _wrap(level, original) {
  function writeLog() {
    var text = util.format.apply(null, arguments);
    var trace = makeStackTrace(writeLog);

    var url, column, line;
    if (trace.length > 0 && trace[0].url) {
      url = trace[0].url;
      line = trace[0].lineNumber;
      column = trace[0].columnNumber;
    }

    probe.emit('messageAdded', {
      message: {
        level: level,
        source: 'javascript',
        text: text,
        parameters: slice.call(arguments).map(addToConsoleGroup),
        stackTrace: trace,
        url: url, line: line, column: column
      }
    });
    return original.apply(console, arguments);
  }
  return writeLog;
}
