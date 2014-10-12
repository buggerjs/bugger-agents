'use strict';

// This function will be injected into the target process.
// It has to be self-contained and has no access the `module`,
// `exports`, `require`, etc.
function ConsoleProbe(sendEvent, bugger) {
  var util = bugger.require('util');

  var toRemoteObjects = bugger.toRemoteObjects;
  var slice = Array.prototype.slice;

  function _wrap(level, original) {
    return function log() {
      var text = util.format.apply(null, arguments);

      sendEvent('Console.messageAdded', {
        message: {
          level: level,
          source: 'javascript',
          text: text,
          parameters: toRemoteObjects(slice.call(arguments))
        }
      });
      return original.apply(console, arguments);
    };
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
