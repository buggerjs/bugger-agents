'use strict';

// First stage: evaluated from TcpBackchannel properties
function makeSendEvent(filename) {
  // Send stage: evaluated inside of the base-instrumentation
  return function withRequire(require) {
    var net = require('net');

    var queue = [];

    var client = net.connect({ path: filename }, flushQueue);
    client.unref();

    function write(data) {
      var chunk = JSON.stringify(data) + '\n';
      // process.stdout.write(chunk);
      client.write(chunk);
    }

    function flushQueue() {
      var q = queue;
      queue = false;
      q.forEach(write);
    }

    function writeOrQueue(data) {
      if (queue) {
        queue.push(data);
      } else {
        write(data);
      }
    }

    // The actual sendEvent function
    return function sendEvent(method, params) {
      writeOrQueue({ method: method, params: params });
    };
  };
}

var EventEmitter = require('events').EventEmitter;
var net = require('net');
var util = require('util');
var path = require('path');
var os = require('os');

var debug = require('debug')('bugger-agents:backchannel:tcp');

function TcpBackchannel() {
  EventEmitter.call(this);

  var filename = path.join(os.tmpdir(), 'bugger-' + process.pid + '.sock');

  var server = net.createServer(this._onConnection.bind(this));
  server.listen(filename, function() {
    debug('Listening');
  });
  server.unref();

  this.filename = filename;
  this.server = server;

  debug('Created', this.filename);
}
util.inherits(TcpBackchannel, EventEmitter);

TcpBackchannel.prototype._onConnection =
function _onConnection(conn) {
  debug('Got connection on', this.filename);

  var self = this;

  function onLine(line) {
    var debugEvent;
    try {
      debugEvent = JSON.parse(line);
      debug('Forwarding event', debugEvent.method);
    } catch (err) {
      debug('Error parsing event', err);
    }

    if (debugEvent) {
      self.emit('debugEvent', debugEvent);
    }
  }

  var buffer = '';
  conn.setEncoding('utf8');

  conn.on('data', function(chunk) {
    buffer += chunk;
    var idx;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      onLine(buffer.slice(0, idx));
      buffer = buffer.slice(idx + 1);
    }
  });
};

TcpBackchannel.prototype.createSenderInit =
function createSenderInit() {
  return '(' + makeSendEvent.toString() + ')' +
    '(' + JSON.stringify(this.filename) + ')';
};

TcpBackchannel.prototype.close =
function close() {};

module.exports = TcpBackchannel;
