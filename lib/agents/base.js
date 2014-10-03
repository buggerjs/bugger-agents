'use strict';

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Bluebird = require('bluebird');

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

  var self = this;
  this._withClient = function(action, expectedRunning) {
    if (typeof expectedRunning === 'boolean') {
      return ensureRunning(client, expectedRunning)
                .then(action.bind(self, client));
    }
    return Bluebird.resolve(client).bind(self).then(action);
  };
}
util.inherits(BaseAgent, EventEmitter);

module.exports = BaseAgent;
