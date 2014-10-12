'use strict';

// This function will be injected into the target process.
// It has to be self-contained and has no access the `module`,
// `exports`, `require`, etc.
function ConsoleProbe(sendEvent, bugger) {
  var util = bugger.require('util');

  var makeStackTrace = bugger.makeStackTrace;
  var toRemoteObjects = bugger.toRemoteObjects;
  var slice = Array.prototype.slice;

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

      sendEvent('Console.messageAdded', {
        message: {
          level: level,
          source: 'javascript',
          text: text,
          parameters: toRemoteObjects(slice.call(arguments)),
          stackTrace: trace,
          url: url, line: line, column: column
        }
      });
      return original.apply(console, arguments);
    }
    return writeLog;
  }

  function enable() {
    console.log = _wrap('log', console.log);
    console.info = _wrap('log', console.info);
    console.warn = _wrap('warning', console.warn);
    console.error = _wrap('error', console.error);
  }

  this.enable = enable;
}

module.exports = ConsoleProbe;
