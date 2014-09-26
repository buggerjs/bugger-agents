'use strict';

var Bluebird = require('bluebird');

var lastDebugPort = 5858;

module.exports = function withBugger(name, args, debugBreak) {
  if (!Array.isArray(args)) { args = []; }
  if (typeof debugBreak === 'undefined') debugBreak = true;

  var debugPrefix = debugBreak ? '--debug-brk=' : '--debug=';

  var execFile = require('child_process').execFile;
  var path = require('path');

  var attachToPort = require('../../').attachToPort;

  var rootDir = path.join(__dirname, '..', '..');
  var filename = path.join(rootDir, 'example', name);

  beforeEach(function(done) {
    // cleanup
    this.child = null;
    this.debugClient = null;
    this.agents = null;
    this.debugPort = (++lastDebugPort);

    var withNodeArgs = [
      debugPrefix + this.debugPort,
      filename
    ].concat(args);
    var child = this.child =
      execFile(process.argv[0], withNodeArgs, {
        cwd: process.cwd(), env: process.env
      });

    child.captureOutput = function() {
      return new Bluebird(function(resolve) {
        var buffered = '';

        child.stdout.on('data', function(chunk) {
          buffered += chunk.toString('utf8');
        });

        child.on('exit', function() {
          resolve(buffered);
        });
      });
    };

    if (process.env.BUGGER_PIPE_CHILD) {
      this.child.stdout.pipe(process.stdout);
    }
    this.agents = attachToPort(this.debugPort);
    this.debugClient = this.agents._client;

    if (debugBreak) {
      this.debugClient.nextEvent('paused').nodeify(done);
    } else {
      done();
    }
  });

  afterEach(function(done) {
    if (this.debugClient.connected) {
      this.debugClient.on('close', function() { done(); });
    } else if (!this.child.connected) {
      return done();
    } else {
      this.child.on('exit', function() { done(); });
    }
    this.child.kill();
  });
};
