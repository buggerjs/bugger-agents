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
function ensureBaseInstrumentation(makeSendEvent, defaultDefines, includePaths) {
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
  var Path = require('path');

  var sendEvent = makeSendEvent(require);

  if (typeof sendEvent !== 'function') {
    return 'makeSendEvent did not create a function';
  }

  function jsonExport(data) {
    var str = JSON.stringify(data);
    if (str === undefined) {
      return str;
    }
    var chunks = [];
    for (var start = 0; start < str.length; start += 80) {
      chunks.push(str.substr(start, 80));
    }
    return chunks;
  }
  bugger.jsonExport = jsonExport;

  function setupDefine() {
    var moduleCache = bugger._moduleCache = {};
    var buggerNativePrefix = 'native://bugger-agents/lib';
    var contextFilename = Path.resolve('bugger-context');

    function wrapBuggerNativeRequire(parent) {
      var original = parent.require;
      return function buggerNativeRequire(modulePath) {
        if (modulePath[0] === '.') {
          var dir = Path.dirname(parent.id.substr(buggerNativePrefix.length));
          modulePath = buggerNativePrefix + Path.resolve(dir, modulePath);
        }

        if (modulePath.indexOf(buggerNativePrefix) === 0) {
          if (moduleCache[modulePath]) {
            return moduleCache[modulePath].exports;
          } else if (moduleCache[modulePath + '.js']) {
            return moduleCache[modulePath + '.js'].exports;
          } else if (moduleCache[modulePath + '/index.js']) {
            return moduleCache[modulePath + '/index.js'].exports;
          }
          throw new Error('Module not found: ' + modulePath);
        }

        return original.apply(this, arguments);
      };
    }

    function buggerDefineNative(id, source) {
      if (id.indexOf(buggerNativePrefix) !== 0) {
        throw new Error('Invalid definition of ' + id);
      }
      var m = new Module(id);
      moduleCache[id] = m;
      m.paths = Module._nodeModulePaths(contextFilename).concat(includePaths);
      m.require = wrapBuggerNativeRequire(m);
      m._compile(source, id);
      return m;
    }
    bugger.define = buggerDefineNative;

    (defaultDefines || []).forEach(function(def) {
      buggerDefineNative(def.id, def.source);
    });
  }

  function setupProbes() {
    var probes = bugger.probes = {};

    function registerProbe(domain, dirname, source) {
      if (probes.hasOwnProperty(domain)) return true;

      var id = 'native://bugger-agents/lib/agents/' + dirname + '/probe.js';
      var m = bugger.define(id, source);
      var probe = probes[domain] = m.exports;
      if (probe.enable) probe.enable();
      var originalEmit = probe.emit;
      probe.emit = function __emit(name, data) {
        sendEvent(domain + '.' + name, data);
        return originalEmit.apply(this, arguments);
      };
      return true;
    }
    bugger.registerProbe = registerProbe;
  }

  setupDefine();
  setupProbes();

  bugger.ObjectGroup = bugger._moduleCache['native://bugger-agents/lib/agents/object-group.js'].exports;

  return true;
}

module.exports = ensureBaseInstrumentation;
