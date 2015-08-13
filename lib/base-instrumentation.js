/* global __bugger__:false */
/* jshint strict:false, globalstrict:false */

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
function ensureBaseInstrumentation(makeSendEvent) {
  if (global.__bugger__ && global.__bugger__.probes) return true;

  var bugger = global.__bugger__;
  var require = bugger.require;

  if (typeof require !== 'function') {
    return '`require` not in scope, injecting instrumentation won\'t work';
  }

  if (typeof makeSendEvent !== 'function') {
    return 'A makeSendEvent function is required for base instrumentation';
  }

  var Module;
  try {
    Module = require('module');
  } catch (err) {
    return err.message;
  }

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
  bugger.makeStackTrace = makeStackTrace;

  function toRemoteObject(value) {
    return {
      type: 'string',
      value: String(value)
    };
  }
  bugger.toRemoteObject = toRemoteObject;

  function toRemoteObjects(params) {
    if (params.length === 0) return [];
    return params.map(toRemoteObject);
  }
  bugger.toRemoteObjects = toRemoteObjects;

  var sendEvent = makeSendEvent(require);

  if (typeof sendEvent !== 'function') {
    return 'makeSendEvent did not create a function';
  }

  var probes = bugger.probes = {};

  function registerProbe(domain, source) {
    if (probes.hasOwnProperty(domain)) return true;

    var id = 'native://bugger-agents/lib/agents/' + domain.toLowerCase() + '.probe.js';
    var m = new Module(id);
    m._compile(source, id);
    var probe = probes[domain] = m.exports;
    if (probe.enable) probe.enable();
    var originalEmit = probe.emit;
    probe.emit = function __emit(name, data) {
      sendEvent(domain + '.' + name, data);
      return originalEmit.apply(this, arguments);
    }
    return true;
  }
  bugger.registerProbe = registerProbe;

  Object.defineProperty(global, '__bugger__', {
    value: bugger
  });

  return true;
}

module.exports = ensureBaseInstrumentation;
