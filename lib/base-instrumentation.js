/* global __bugger__:false */
'use strict';

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
