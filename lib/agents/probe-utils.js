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

function toRemoteObject(value) {
  return {
    type: 'string',
    value: String(value)
  };
}
exports.toRemoteObject = toRemoteObject;

function toRemoteObjects(params) {
  if (params.length === 0) return [];
  return params.map(toRemoteObject);
}
exports.toRemoteObjects = toRemoteObjects;
