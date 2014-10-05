'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Bluebird = require('bluebird');
var debug = require('debug')('bugger-agents:base');

function ensureRunning(client, expected) {
  return new Bluebird(function(resolve, reject) {
    function testRunning(running) {
      if (running === expected) {
        resolve();
      } else {
        reject(new Error(expected ?
          'Expected the app to be running' :
          'Expected the app to be paused'));
      }
    }
    if (typeof client.running === 'boolean') {
      testRunning(client.running);
    } else {
      client.nextEvent('running').then(testRunning);
    }
  });
}

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
