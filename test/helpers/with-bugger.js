'use strict';

var Bluebird = require('bluebird');

var lastDebugPort = 5858;

module.exports = function withBugger(name, args) {
  if (!Array.isArray(args)) { args = []; }

  var debugPrefix = '--debug-brk=';

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

    this.child.stdout.pipe(process.stdout);
    this.child.stderr.pipe(process.stderr);
    attachToPort(this.debugPort)
      .then(function(agents) {
        this.agents = agents;
        this.debugClient = agents.getClient();
      }.bind(this))
      .nodeify(done);
  });

  afterEach(function(done) {
    if (this.debugClient && this.debugClient.connected) {
      this.debugClient.on('close', function() { done(); });
    } else if (!this.child || !this.child.connected) {
      return done();
    } else {
      this.child.on('exit', function() { done(); });
    }
    this.child.kill();
  });
};
