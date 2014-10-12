'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var _ = require('lodash');
var Bluebird = require('bluebird');
var debug = require('debug')('bugger-agents:base');

// This function will be injected into the target process.
// It has to be self-contained and has no access the `module`,
// `exports`, `require`, etc.
function registerProbe(domain, ProbeClass) {
  var bugger = global.__bugger__;
  if (!bugger) {
    return 'registerProbe: Could not find __bugger__';
  }

  if (typeof bugger.registerProbe !== 'function') {
    return 'registerProbe: bugger.registerProbe is not a function';
  }

  bugger.registerProbe(domain, ProbeClass);
  return true;
}

function BaseAgent(client) {
  EventEmitter.call(this);
  this.client = client;

  this._domain = this.constructor.name.replace(/Agent$/, '');
}
util.inherits(BaseAgent, EventEmitter);

BaseAgent.prototype._injectProbe =
function injectProbe(ProbeClass) {
  var expression =
    '(' + registerProbe.toString() + ')' +
    '(' + JSON.stringify(this._domain) +
    ', ' + ProbeClass.toString() + ');';
  return this.client.evalSimple(expression)
    .then(_.noop); // TODO: turn strings into exception
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
