'use strict';

// First stage: evaluated from Backchannel properties
function makeSendEvent(directory) {
  // Send stage: evaluated inside of the base-instrumentation
  return function withRequire(require) {
    'use strict';

    var fs = require('fs');
    var path = require('path');

    var lastEventIdx = 0;
    var base = 'event-' + process.pid + '-';

    // The actual sendEvent function
    return function sendEvent(method, params) {
      var eventFile = path.join(directory, base + (++lastEventIdx));
      var json = JSON.stringify({ method: method, params: params });
      try {
        fs.writeFileSync(eventFile, json);
      } catch (writeErr) {
        process.stderr.write(
          '[bugger/backchannel] Failed to send event: ' +
          writeErr.message + '\n');
      }
    };
  };
}

var os = require('os');
var fs = require('fs');
var path = require('path');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var rimraf = require('rimraf').sync;
var chokidar = require('chokidar');

function Backchannel() {
  EventEmitter.call(this);

  this.directory = path.join(os.tmpdir(), 'bugger-123');

  this.handleFileAdded = this._handleFileAdded.bind(this);

  this.watcher = chokidar.watch(this.directory);
  this.watcher.on('add', this.handleFileAdded);

  if (fs.existsSync(this.directory)) {
    rimraf(this.directory); // cleanup
  }

  fs.mkdirSync(this.directory);
}
util.inherits(Backchannel, EventEmitter);

Backchannel.prototype._handleFileAdded =
function handleFileAdded(filepath) {
  fs.readFile(filepath, 'utf8', function(err, contents) {
    if (err) return;

    this.emit('debugEvent', JSON.parse(contents));
  }.bind(this));
};

Backchannel.prototype.createSenderInit =
function createSenderInit() {
  return '(' + makeSendEvent.toString() + ')' +
    '(' + JSON.stringify(this.directory) + ')';
};

Backchannel.prototype.close =
function close() {};

module.exports = Backchannel;
