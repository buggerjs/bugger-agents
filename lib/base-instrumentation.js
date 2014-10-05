/* global __bugger__:false */
'use strict';

/**
 * Take control of another process
 *
 * One of the nastier problems when trying to inject instrumentation
 * for node core into a process is that it's next to impossible
 * to retrieve references to them from a global context.
 *
 * In previous versions of bugger the way around was that bugger had to
 * control the main module - including ugly hacks to conceil itself when
 * it then handed control over to the actual script.
 *
 * This takes a different approach. The general idea is the following:
 *
 * 1. In order to properly attach itself (and get around race conditions),
 *    bugger requires the debugged process to start in a paused state.
 *
 * 2. The initial paused state for a process is - fortunately - inside of
 *    a proper module.
 *
 * 3. Yes, that means that the top stack frame (0) has `require` in scope.
 *
 * 4. Once we have `require`, we have the `module` module and can define our
 *    own, global require function.
 *
 * 5. Smooth sailing from here on!
 *
 * So as soon as we attach, we evaluate this function on the top frame.
 * Instrumentation registers itself on `__bugger__.probes` and uses
 * `__bugger__.require` to load any modules in needs, both core modules
 * and absolute filenames will work.
 */
function ensureBaseInstrumentation() {
  if (global.__bugger__) return true;

  if (typeof require !== 'function') {
    return '`require` not in scope, injecting instrumentation won\'t work';
  }

  var loadModule = require('module')._load;

  Object.defineProperty(global, '__bugger__', {
    value: {
      require: function buggerRequire(request) {
        return loadModule(request, null, false);
      },
      probes: {}
    }
  });

  try {
    __bugger__.require('path'); // make sure it works
  } catch (err) {
    return err.message;
  }

  return true;
}

module.exports = ensureBaseInstrumentation;