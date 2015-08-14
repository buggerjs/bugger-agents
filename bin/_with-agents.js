'use strict';

var execFile = require('child_process').execFile;

var _ = require('lodash');

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

  if (process.env.BUGGER_PIPE_CHILD) {
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  }

  process.on('exit', function() {
    try { child.kill(); } catch (e) {}
  });

  return attachToPort(debugPort);
}

module.exports = withAgents(
  process.argv[2],
  process.argv.slice(3),
  !process.env.BUGGER_NO_BREAK
);
