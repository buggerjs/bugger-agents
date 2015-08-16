'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var fs = require('fs');
var path = require('path');

var Bluebird = require('bluebird');
var debug = require('debug')('bugger-agents:base');

// This injects a self-contained module into the remote process.
// It should not rely on any 3rd party modules.
function registerProbe(domain, source) {
  var bugger = global.__bugger__;
  if (!bugger) {
    return 'registerProbe: Could not find __bugger__';
  }

  if (typeof bugger.registerProbe !== 'function') {
    return 'registerProbe: bugger.registerProbe is not a function';
  }

  return bugger.registerProbe(domain, source);
}

function BaseAgent(client, child) {
  EventEmitter.call(this);
  this.client = client;
  this.child = child;

  this._domain = this.constructor.name.replace(/Agent$/, '');
}
util.inherits(BaseAgent, EventEmitter);

BaseAgent.prototype._injectProbe =
function injectProbe() {
  var domain = this._domain;
  var probeFile = path.resolve(__dirname, domain.toLowerCase(), 'probe.js');
  var source = fs.readFileSync(probeFile, 'utf8');
  var expression =
    '(' + registerProbe.toString() + ')' +
    '(' + JSON.stringify(domain) +
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
