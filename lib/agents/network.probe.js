'use strict';

// This function will be injected into the target process.
// It has to be self-contained and has no access the `module`,
// `exports`, `require`, etc.
function injectNetworkProbe() {
  var bugger = global.__bugger__;
  if (!bugger) {
    console.error('injectNetworkProbe: Could not find __bugger__');
    return false;
  }

  if (typeof bugger.registerProbe !== 'function') {
    console.error(
      'injectNetworkProbe: bugger.registerProbe is not a function');
    return false;
  }

  function NetworkProbe(sendEvent) {
    this._send = sendEvent;
  }

  NetworkProbe.prototype.enable = function enable() {
    // Setup http/https listeners
  };

  bugger.registerProbe('Network', NetworkProbe);
  return true;
}

module.exports = injectNetworkProbe;
