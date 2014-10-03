if (!global.__bugger__) {
  global.__bugger__ = {
    require: require('native_module').require,
    versions: {
      'bugger-agents': require('./package.json').version
    },
    probes: {}
  };
}
// TODO: announce debug port to ~/.bugger.d/ports.json
// Use ~/bugger.d/ports.lock to make sure only one process writes at a time.
// If the lock was acquired too long ago by another process,
// then it can be invalidated.
// The lock file contains the pid and the time.
module.exports = function findAvailableDebugPort(cb) {
  'use strict';
  if (typeof cb !== 'function') cb = function() {};
};
