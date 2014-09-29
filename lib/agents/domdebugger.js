'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function DOMDebuggerAgent(client) {
  if (!(this instanceof DOMDebuggerAgent))
    return new DOMDebuggerAgent(client);

  BaseAgent.call(this, DOMDebuggerAgent, client);
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
DOMDebuggerAgent.prototype.setDOMBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Removes DOM breakpoint that was set using <code>setDOMBreakpoint</code>.
 * 
 * @param {DOM.NodeId} nodeId Identifier of the node to remove breakpoint from.
 * @param {DOMBreakpointType} type Type of the breakpoint to remove.
 */
DOMDebuggerAgent.prototype.removeDOMBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets breakpoint on particular DOM event.
 * 
 * @param {string} eventName DOM Event name to stop on (any DOM event will do).
 */
DOMDebuggerAgent.prototype.setEventListenerBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Removes breakpoint on particular DOM event.
 * 
 * @param {string} eventName Event name.
 */
DOMDebuggerAgent.prototype.removeEventListenerBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets breakpoint on particular native event.
 * 
 * @param {string} eventName Instrumentation name to stop on.
 */
DOMDebuggerAgent.prototype.setInstrumentationBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Removes breakpoint on particular native event.
 * 
 * @param {string} eventName Instrumentation name to stop on.
 */
DOMDebuggerAgent.prototype.removeInstrumentationBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets breakpoint on XMLHttpRequest.
 * 
 * @param {string} url Resource URL substring. All XHRs having this substring in the URL will get stopped upon.
 */
DOMDebuggerAgent.prototype.setXHRBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Removes breakpoint from XMLHttpRequest.
 * 
 * @param {string} url Resource URL substring.
 */
DOMDebuggerAgent.prototype.removeXHRBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
