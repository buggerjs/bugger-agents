'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Bluebird = require('bluebird');
var debug = require('debug')('bugger-agents:base');

function BaseAgent(client) {
  EventEmitter.call(this);
  this.client = client;

  this._domain = this.constructor.name.replace(/Agent$/, '');
}
util.inherits(BaseAgent, EventEmitter);

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
