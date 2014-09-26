'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Breakpoint identifier.
 */
exports.BreakpointId = String;

/**
 * Unique script identifier.
 */
exports.ScriptId = String;

/**
 * Call frame identifier.
 */
exports.CallFrameId = String;

/**
 * Location in the source code.
 * 
 * @param {ScriptId} scriptId Script identifier as reported in the <code>Debugger.scriptParsed</code>.
 * @param {integer} lineNumber Line number in the script (0-based).
 * @param {integer=} columnNumber Column number in the script (0-based).
 */
exports.Location =
function Location(props) {
  this.scriptId = props.scriptId;
  this.lineNumber = props.lineNumber;
  this.columnNumber = props.columnNumber;
};

/**
 * Information about the function.
 * 
 * @param {Location} location Location of the function.
 * @param {string=} name Name of the function. Not present for anonymous functions.
 * @param {string=} displayName Display name of the function(specified in 'displayName' property on the function object).
 * @param {string=} inferredName Name of the function inferred from its initial assignment.
 * @param {Array.<Scope>=} scopeChain Scope chain for this closure.
 */
exports.FunctionDetails =
function FunctionDetails(props) {
  this.location = props.location;
  this.name = props.name;
  this.displayName = props.displayName;
  this.inferredName = props.inferredName;
  this.scopeChain = props.scopeChain;
};

/**
 * JavaScript call frame.
 * Array of call frames form the call stack.
 * 
 * @param {CallFrameId} callFrameId Call frame identifier. This identifier is only valid while the virtual machine is paused.
 * @param {string} functionName Name of the JavaScript function called on this call frame.
 * @param {Location} location Location in the source code.
 * @param {Array.<Scope>} scopeChain Scope chain for this call frame.
 * @param {Runtime.RemoteObject} this <code>this</code> object for this call frame.
 */
exports.CallFrame =
function CallFrame(props) {
  this.callFrameId = props.callFrameId;
  this.functionName = props.functionName;
  this.location = props.location;
  this.scopeChain = props.scopeChain;
  this.this = props.this;
};

/**
 * Scope description.
 * 
 * @param {string global|local|with|closure|catch} type Scope type.
 * @param {Runtime.RemoteObject} object Object representing the scope. For <code>global</code> and <code>with</code> scopes it represents the actual object; for the rest of the scopes, it is artificial transient object enumerating scope variables as its properties.
 */
exports.Scope =
function Scope(props) {
  this.type = props.type;
  this.object = props.object;
};

/**
 * Error data for setScriptSource command.
 * compileError is a case type for uncompilable script source error.
 * 
 * @param {{message: string, lineNumber: integer, columnNumber: integer}=} compileError
 */
exports.SetScriptSourceError =
function SetScriptSourceError(props) {
  this.compileError = props.compileError;
};
