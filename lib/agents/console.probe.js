'use strict';

// This function will be injected into the target process.
// It has to be self-contained and has no access the `module`,
// `exports`, `require`, etc.
function injectConsoleProbe() {
  var bugger = global.__bugger__;
  if (!bugger) {
    process.stderr.write(
      'injectConsoleProbe: Could not find __bugger__\n');
    return false;
  }

  if (typeof bugger.registerProbe !== 'function') {
    process.stderr.write(
      'injectConsoleProbe: bugger.registerProbe is not a function\n');
    return false;
  }

  var util = bugger.require('util');

  var slice = Array.prototype.slice;

  function toRemoteObjects(params) {
    if (params.length === 0) return;

    return params.map(function(param, idx) {
      return {
        type: 'string',
        value: String(param)
      };
    });
  }

  function ConsoleProbe(sendEvent) {
    this._sendEvent = sendEvent;
  }

  ConsoleProbe.prototype._wrap = function wrap(level, original) {
    var sendEvent = this._sendEvent;

    return function() {
      var text = util.format.apply(this, arguments);

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
  };

  ConsoleProbe.prototype.enable = function enable() {
    console.log = this._wrap('log', console.log);
    console.info = this._wrap('log', console.info);
    console.warn = this._wrap('warning', console.warn);
    console.error = this._wrap('error', console.error);
  };

  bugger.registerProbe('Console', ConsoleProbe);
  return true;
}

module.exports = injectConsoleProbe;
