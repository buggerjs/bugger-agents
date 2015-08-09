'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function DOMDebuggerAgent(client) {
  if (!(this instanceof DOMDebuggerAgent))
    return new DOMDebuggerAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(DOMDebuggerAgent, BaseAgent);
_.extend(DOMDebuggerAgent, require('./domdebugger.types'));
module.exports = DOMDebuggerAgent;

/**
 * Sets breakpoint on particular operation with DOM.
 * 
 * @param {DOM.NodeId} nodeId Identifier of the node to set breakpoint on.
 * @param {DOMBreakpointType} type Type of the operation to stop upon.
 */
DOMDebuggerAgent.prototype.setDOMBreakpoint =
function setDOMBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>.
 * 
 * @param {DOM.NodeId} nodeId Identifier of the node to remove breakpoint from.
 * @param {DOMBreakpointType} type Type of the breakpoint to remove.
 */
DOMDebuggerAgent.prototype.removeDOMBreakpoint =
function removeDOMBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Sets breakpoint on particular DOM event.
 * 
 * @param {string} eventName DOM Event name to stop on (any DOM event will do).
 * @param {string=} targetName EventTarget interface name to stop on. If equal to <code>"*"</code> or not provided, will stop on any EventTarget.
 */
DOMDebuggerAgent.prototype.setEventListenerBreakpoint =
function setEventListenerBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Removes breakpoint on particular DOM event.
 * 
 * @param {string} eventName Event name.
 * @param {string=} targetName EventTarget interface name.
 */
DOMDebuggerAgent.prototype.removeEventListenerBreakpoint =
function removeEventListenerBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Sets breakpoint on particular native event.
 * 
 * @param {string} eventName Instrumentation name to stop on.
 */
DOMDebuggerAgent.prototype.setInstrumentationBreakpoint =
function setInstrumentationBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Removes breakpoint on particular native event.
 * 
 * @param {string} eventName Instrumentation name to stop on.
 */
DOMDebuggerAgent.prototype.removeInstrumentationBreakpoint =
function removeInstrumentationBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Sets breakpoint on XMLHttpRequest.
 * 
 * @param {string} url Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
 */
DOMDebuggerAgent.prototype.setXHRBreakpoint =
function setXHRBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Removes breakpoint from XMLHttpRequest.
 * 
 * @param {string} url Resource URL substring.
 */
DOMDebuggerAgent.prototype.removeXHRBreakpoint =
function removeXHRBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Returns event listeners of the given object.
 * 
 * @param {Runtime.RemoteObjectId} objectId Identifier of the object to return listeners for.
 * 
 * @returns {Array.<EventListener>} listeners Array of relevant listeners.
 */
DOMDebuggerAgent.prototype.getEventListeners =
function getEventListeners() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
