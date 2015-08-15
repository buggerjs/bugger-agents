'use strict';

var _ = require('lodash');

var TargetProcess = require('../lib/target-process');
var buggerV8Client = require('../');
var attachToPort = buggerV8Client.attachToPort;

function withAgents(filename, args, debugBreak) {
  var target = TargetProcess.fork(filename, args, {
    debugBreak: debugBreak,
    silent: !process.env.BUGGER_PIPE_CHILD
  });

  process.on('exit', function() {
    try { target.kill(); } catch (e) {}
  });

  return attachToPort(target.debugPort, target);
}

module.exports = withAgents(
  process.argv[2],
  process.argv.slice(3),
  !process.env.BUGGER_NO_BREAK
);
