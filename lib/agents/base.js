'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var fs = require('fs');
var path = require('path');

var _ = require('lodash');
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

// START: REMOVE

// This injects a self-contained module into the remote process.
// It should not rely on any 3rd party modules.
function registerProbe(domain, dirname, source) {
  var bugger = global.__bugger__;
  if (!bugger) {
    return 'registerProbe: Could not find __bugger__';
  }

  if (typeof bugger.registerProbe !== 'function') {
    return 'registerProbe: bugger.registerProbe is not a function';
  }

  return bugger.registerProbe(domain, dirname, source);
}

BaseAgent.prototype._injectProbe =
function injectProbe() {
  var domain = this._domain;
  var dirname = _.kebabCase(domain);
  var probeFile = path.resolve(__dirname, dirname, 'probe.js');
  var source = fs.readFileSync(probeFile, 'utf8');
  var expression =
    '(' + registerProbe.toString() + ')' +
    '(' + JSON.stringify(domain) +
    ', ' + JSON.stringify(dirname) +
    ', ' + JSON.stringify(source) + ');';
  return this.client.evalSimple(expression)
    .then(function(result) {
      if (typeof result === 'string') {
        throw new Error(result);
      }
      else if (result !== true) {
        throw new Error('Unexpected error while injecting ' + domain + ' probe: ' + result);
      }
    });
};

// END: REMOVE

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
