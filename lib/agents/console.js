'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function ConsoleAgent(client) {
  if (!(this instanceof ConsoleAgent))
    return new ConsoleAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(ConsoleAgent, BaseAgent);
_.extend(ConsoleAgent, require('./console.types'));
module.exports = ConsoleAgent;

function injectConsoleProbe() {
}

/**
 * Enables console domain, sends the messages collected so far to the client by means of the <code>messageAdded</code> notification.
 */
ConsoleAgent.prototype.enable =
function enable() {
  return this.client.evalSimple(injectConsoleProbe)
    .then(_.noop);
};

/**
 * Disables console domain, prevents further console messages from being reported to the client.
 */
ConsoleAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * Clears console messages collected in the browser.
 */
ConsoleAgent.prototype.clearMessages =
function clearMessages() {
  throw new Error('Not implemented');
};

/**
 * Toggles monitoring of XMLHttpRequest.
 * If <code>true</code>, console will receive messages upon each XHR issued.
 * 
 * @param {boolean} enabled Monitoring enabled state.
 */
ConsoleAgent.prototype.setMonitoringXHREnabled =
function setMonitoringXHREnabled() {
  throw new Error('Not implemented');
};

/**
 * Enables console to refer to the node with given id via $x (see Command Line API for more details $x functions).
 * 
 * @param {DOM.NodeId} nodeId DOM node id to be accessible by means of $x command line API.
 */
ConsoleAgent.prototype.addInspectedNode =
function addInspectedNode() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {integer} heapObjectId
 */
ConsoleAgent.prototype.addInspectedHeapObject =
function addInspectedHeapObject() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {boolean} enabled Switch console.timeline to tracing based.
 */
ConsoleAgent.prototype.setTracingBasedTimeline =
function setTracingBasedTimeline() {
  throw new Error('Not implemented');
};
