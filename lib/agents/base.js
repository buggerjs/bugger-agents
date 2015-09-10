'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Bluebird = require('bluebird');
var debug = require('debug')('bugger-agents:base');

var ProbeProxy = require('./probe-proxy');

function BaseAgent(client, child) {
  EventEmitter.call(this);
  this.client = client;
  this.child = child;

  this._domain = this.constructor.name.replace(/Agent$/, '');
}
util.inherits(BaseAgent, EventEmitter);

BaseAgent.prototype._handleBuggerProbeResponse =
function _handleBuggerProbeResponse(data) {
  this.probe._handleBuggerProbeResponse(data);
};

BaseAgent.prototype._setupProbe =
function setupProbe(methods) {
  var probe = this.probe = new ProbeProxy(this.client, this._domain);

  (methods || []).forEach(function(method) {
    probe.createMethodProxy(method);
  });

  this.child.on('online', function() {
    probe.inject();
  });
  probe.inject();
};

BaseAgent.prototype._ignore = function(name, params) {
  debug('Ignoring: %s.%s', this.constructor.name, name, params);
  return Bluebird.resolve();
};

BaseAgent.prototype._debugEvent = function(name, data) {
  this.emit('debugEvent', {
    method: this._domain + '.' + name,
    params: data
  });
};

module.exports = BaseAgent;
