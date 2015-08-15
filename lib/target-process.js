'use strict';

var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;
var path = require('path');
var util = require('util');

var debug = require('debug')('bugger-agents:target-process');

function TargetProcess(meta) {
  EventEmitter.call(this);

  var self = this;
  this._onChildExit = function _onChildExit(code, signal) {
    self._setChild(null);
    self.emit('exit', code, signal);
  };

  this._meta = meta;
  this._pid = meta.pid || false;
  this._child = null;
  this._running = false;
  this._isSpawning = false;
}
util.inherits(TargetProcess, EventEmitter);

Object.defineProperties(TargetProcess.prototype, {
  pid: {
    enumerable: true,
    get: function() { return this._pid; }
  },
  debugPort: {
    enumerable: true,
    get: function() { return this._meta.debugPort; }
  }
});

TargetProcess.prototype.kill = function kill(signal) {
  if (this._child) { // only do this if we control the process
    process.kill(this.pid, signal);
  }
};

TargetProcess.prototype._setChild = function _setChild(child) {
  if (this._child) {
    this._child.removeListener('exit', this._onChildExit);
  }
  if (child) {
    this._pid = child.pid;
    child.on('exit', this._onChildExit);
  } else {
    this._pid = false;
  }
  this._child = child;
};

TargetProcess.prototype.spawn = function _spawn() {
  if (this._isSpawning) {
    debug('spawn called twice');
    return;
  }
  this._isSpawning = true;
  var target = this;
  var meta = this._meta;

  function spawnChild() {
    var spawnArgs = meta.execArgv.concat([ meta.mainModule ], meta.argv);
    var spawnOptions = {
      cwd: meta.cwd || process.cwd(),
      env: meta.env || process.env,
      stdio: meta.silent ? 'pipe' : 'inherit',
      detached: false
    };

    var child = spawn(meta.execPath, spawnArgs, spawnOptions);
    target._setChild(child);
    target.emit('forked', child);
    target._isSpawning = false;
  }

  if (this._child) {
    this.once('exit', spawnChild);
    this.kill();
  } else {
    spawnChild();
  }
};

TargetProcess.fork = function fork(modulePath, argv, options) {
  if (argv && !Array.isArray(argv)) {
    options = argv;
    argv = [];
  } else {
    options = options || {};
    argv = argv || [];
  }

  var debugPort = options.debugPort || 5858;
  var debugBreak = typeof options.debugBreak === 'boolean' ? options.debugBreak : true;
  var debugPrefix = debugBreak ? '--debug-brk=' : '--debug=';
  var execArgv = (options.execArgv || []).concat([ debugPrefix + debugPort ]);

  var cwd = options.cwd || process.cwd();

  var target = TargetProcess.fromMetaData({
    cwd: cwd,
    env: options.env || process.env,
    execPath: options.execPath || process.execPath,
    execArgv: execArgv,
    mainModule: path.resolve(cwd, modulePath),
    argv: argv,
    debugPort: debugPort
  });

  target.spawn();

  return target;
};

TargetProcess.fromMetaData = function fromMetaData(meta) {
  return new TargetProcess(meta);
};

module.exports = TargetProcess;
