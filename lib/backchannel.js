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
var debug = require('debug')('bugger-agents:backchannel');

function Backchannel() {
  EventEmitter.call(this);

  this.directory = path.join(os.tmpdir(), 'bugger-123');

  this.handleFileAdded = this._handleFileAdded.bind(this);
  this.handleFileChange = this._handleFileChange.bind(this);

  if (fs.existsSync(this.directory)) {
    rimraf(this.directory); // cleanup
  }
  fs.mkdirSync(this.directory);

  this.watcher = fs.watch(this.directory, { persistent: false });
  this.watcher.on('change', this.handleFileChange);

  debug('Backchannel setup', this.directory);
}
util.inherits(Backchannel, EventEmitter);

Backchannel.prototype._handleFileChange =
function handleFileChange(type, filename) {
  if (type === 'rename') {
    this._handleFileAdded(path.join(this.directory, filename));
  }
}

Backchannel.prototype._handleFileAdded =
function handleFileAdded(filepath) {
  debug('File added', arguments);
  fs.readFile(filepath, 'utf8', function(err, contents) {
    if (err) return;

    var debugEvent = JSON.parse(contents);
    debug('Forwarding event', debugEvent.method);

    this.emit('debugEvent', debugEvent);
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
