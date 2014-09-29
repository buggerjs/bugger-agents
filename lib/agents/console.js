'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function ConsoleAgent(client) {
  if (!(this instanceof ConsoleAgent))
    return new ConsoleAgent(client);

  BaseAgent.call(this, ConsoleAgent, client);
}
util.inherits(ConsoleAgent, BaseAgent);
_.extend(ConsoleAgent, require('./console.types'));
module.exports = ConsoleAgent;

/**
 * Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification.
 */
ConsoleAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables console domain, prevents further console messages from being reported to the client.
 */
ConsoleAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Clears console messages collected in the browser.
 */
ConsoleAgent.prototype.clearMessages = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Toggles monitoring of XMLHttpRequest.
 * If <code>true</code>, console will receive messages upon each XHR issued.
 * 
 * @param {boolean} enabled Monitoring enabled state.
 */
ConsoleAgent.prototype.setMonitoringXHREnabled = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
 * 
 * @param {DOM.NodeId} nodeId DOM node id to be accessible by means of $x command line API.
 */
ConsoleAgent.prototype.addInspectedNode = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {integer} heapObjectId
 */
ConsoleAgent.prototype.addInspectedHeapObject = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
