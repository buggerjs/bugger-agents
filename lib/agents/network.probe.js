'use strict';

// This function will be injected into the target process.
// It has to be self-contained and has no access the `module`,
// `exports`, `require`, etc.
function NetworkProbe(sendEvent, bugger) {
  var util = bugger.require('util');

  function enable() {
    // Setup http/https listeners
  }

  this.enable = enable;
}

module.exports = NetworkProbe;
