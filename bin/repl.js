#!/usr/bin/env node
'use strict';

var vm = require('vm');
var execFile = require('child_process').execFile;
var Repl = require('repl');

var _ = require('lodash');

var bundledAgents = require('../lib/agents');
var buggerV8Client = require('../');
var attachToPort = buggerV8Client.attachToPort;

function withAgents(filename, args, debugBreak) {
  if (!Array.isArray(args)) { args = []; }
  if (typeof debugBreak === 'undefined') debugBreak = true;

  var debugPrefix = debugBreak ? '--debug-brk=' : '--debug=';

  var debugPort = 5858;

  var withNodeArgs = [
    debugPrefix + debugPort,
    filename
  ].concat(args);

  var child = execFile(process.argv[0], withNodeArgs, {
    cwd: process.cwd(), env: process.env
  });

  child.on('exit', function(exitCode) {
    console.log('Child died:', exitCode);
    process.exit(exitCode);
  });

  if (process.env.BUGGER_PIPE_STDOUT) {
    child.stdout.pipe(process.stdout);
  }

  process.on('exit', function() {
    try { child.kill(); } catch (e) {}
  });

  return attachToPort(debugPort);
}

withAgents(
  process.argv[2],
  process.argv.slice(3),
  !process.env.BUGGER_NO_BREAK
).then(function(agents) {
  function fancyPromiseEval(code, context, file, cb) {
    var err, result, script;
    // first, create the Script object to check the syntax
    try {
      script = vm.createScript(code, {
        filename: file,
        displayErrors: false
      });
    } catch (e) {
      return cb(e);
    }

    if (!err) {
      try {
        result = script.runInContext(context, { displayErrors: false });
      } catch (e) {
        return cb(e);
      }
    }

    if (result && typeof result.nodeify === 'function') {
      result.nodeify(cb);
    } else {
      cb(null, result);
    }
  }

  var repl = Repl.start({
    prompt: 'bugger> ',
    eval: fancyPromiseEval
  });

  _.each(bundledAgents, function(initFunction, name) {
    Object.defineProperty(repl.context, name, {
      enumerable: true,
      get: function() {
        return agents[name];
      }
    })
  });
  // _.each(DebugClient.prototype, function(fn, cmdName) {
  //   if (typeof fn === 'function')
  //     repl.context[cmdName] = fn.bind(bugger);
  // });
});
