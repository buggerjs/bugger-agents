'use strict';

// copied from bugger-v8-client, types/script
var CORE_PATTERN = /^[\w]+\.js$/;
function filenameToUrl(name) {
  if (typeof name !== 'string') return name;
  if (CORE_PATTERN.test(name)) {
    return 'native://node/lib/' + name;
  } else if (name.indexOf('native://') === 0) {
    return name;
  } else {
    return 'file://' + name.replace(/\\/g, '/');
  }
}

function makeStackTrace(fn) {
  var backup = Error.prepareStackTrace;
  Error.prepareStackTrace = function(_, stack) { return stack; };
  var err = new Error();
  Error.captureStackTrace(err, fn);
  var stack = err.stack;
  Error.prepareStackTrace = backup;

  return stack.map(function(frame) {
    return {
      url: filenameToUrl(frame.getFileName()),
      functionName: frame.getFunctionName(),
      lineNumber: frame.getLineNumber(),
      columnNumber: frame.getColumnNumber()
    };
  });
}
exports.makeStackTrace = makeStackTrace;

function jsonExport(data) {
  var str = JSON.stringify(data);
  var chunks = [];
  for (var start = 0; start < str.length; start += 80) {
    chunks.push(str.substr(start, 80));
  }
  return chunks;
}
exports.jsonExport = jsonExport;
