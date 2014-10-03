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
 * @param {string} functionName Name of the function.
 * @param {Array.<Scope>=} scopeChain Scope chain for this closure.
 */
exports.FunctionDetails =
function FunctionDetails(props) {
  this.location = props.location;
  this.functionName = props.functionName;
  this.scopeChain = props.scopeChain;
};

/**
 * Collection entry.
 * 
 * @param {Runtime.RemoteObject=} key Entry key of a map-like collection, otherwise not provided.
 * @param {Runtime.RemoteObject} value Entry value.
 */
exports.CollectionEntry =
function CollectionEntry(props) {
  this.key = props.key;
  this.value = props.value;
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
 * @param {Runtime.RemoteObject=} returnValue The value being returned, if the function is at return point.
 */
exports.CallFrame =
function CallFrame(props) {
  this.callFrameId = props.callFrameId;
  this.functionName = props.functionName;
  this.location = props.location;
  this.scopeChain = props.scopeChain;
  this.this = props.this;
  this.returnValue = props.returnValue;
};

/**
 * JavaScript call stack, including async stack traces.
 * 
 * @param {Array.<CallFrame>} callFrames Call frames of the stack trace.
 * @param {string=} description String label of this stack trace. For async traces this may be a name of the function that initiated the async call.
 * @param {StackTrace=} asyncStackTrace Async stack trace, if any.
 */
exports.StackTrace =
function StackTrace(props) {
  this.callFrames = props.callFrames;
  this.description = props.description;
  this.asyncStackTrace = props.asyncStackTrace;
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
 * Detailed information on exception (or error) that was thrown during script compilation or execution.
 * 
 * @param {string} text Exception text.
 * @param {string=} url URL of the message origin.
 * @param {integer=} line Line number in the resource that generated this message.
 * @param {integer=} column Column number in the resource that generated this message.
 * @param {Console.StackTrace=} stackTrace JavaScript stack trace for assertions and error messages.
 */
exports.ExceptionDetails =
function ExceptionDetails(props) {
  this.text = props.text;
  this.url = props.url;
  this.line = props.line;
  this.column = props.column;
  this.stackTrace = props.stackTrace;
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

/**
 * Information about the promise.
 * 
 * @param {integer} id Unique id of the promise.
 * @param {string pending|resolved|rejected} status Status of the promise.
 * @param {integer=} parentId Id of the parent promise.
 * @param {Console.CallFrame=} callFrame Top call frame on promise creation.
 */
exports.PromiseDetails =
function PromiseDetails(props) {
  this.id = props.id;
  this.status = props.status;
  this.parentId = props.parentId;
  this.callFrame = props.callFrame;
};
