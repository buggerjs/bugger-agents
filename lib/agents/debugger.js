'use strict';

var util = require('util');

var _ = require('lodash');
var Bluebird = require('bluebird');
var debug = require('debug')('bugger-agents:debugger');

var BaseAgent = require('./base');

function DebuggerAgent(client) {
  if (!(this instanceof DebuggerAgent))
    return new DebuggerAgent(client);

  BaseAgent.call(this, client);

  this.handlePaused = this._handlePaused.bind(this);
  this.handleAfterCompile = this._handleAfterCompile.bind(this);
  this._scriptCache = {};
}
util.inherits(DebuggerAgent, BaseAgent);
_.extend(DebuggerAgent, require('./debugger.types'));
module.exports = DebuggerAgent;

DebuggerAgent.prototype._handlePaused =
function handlePaused(e) {
  var data = {
    reason: e.reason,
    // TODO: handle data from exception break (?)
    callFrames: e.backtrace.callFrames,
    data: {
      description: '<TODO: exception details>'
    }
  };
  this._debugEvent('paused', data);
};

DebuggerAgent.prototype._handleAfterCompile =
function handleAfterCompile(e) {
  this._scriptParsed(e.script);
};

DebuggerAgent.prototype._scriptParsed =
function scriptParsed(script) {
  this._scriptCache[script.scriptId] = script;

  debug('Found script', script.url || script.scriptId);
  if (script.url) {
    // Ignoring eval scripts for now
    this._debugEvent('scriptParsed', script);
  }
};

/**
 * Enables debugger for the given page.
 * Clients should not assume that the debugging has been enabled until the result for this command is received.
 */
DebuggerAgent.prototype.enable =
function enable() {
  var self = this, client = this.client;
  client.on('paused', this.handlePaused);
  client.on('afterCompile', this.handleAfterCompile);

  return client.getScriptsWithSource()
    .then(function(scripts) {
      _.each(scripts, self._scriptParsed, self);

      // Wait until all scripts are parsed, then emit paused
      if (!client.running) {
        client.triggerPausedEvent();
      }
    });
};

/**
 * Resumes JavaScript execution.
 */
DebuggerAgent.prototype.resume =
function resume() {
  return this.client.resume();
};

/**
 * Disables debugger for given page.
 */
DebuggerAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * Activates / deactivates all breakpoints on the page.
 * 
 * @param {boolean} active New value for breakpoints active state.
 */
DebuggerAgent.prototype.setBreakpointsActive =
function setBreakpointsActive() {
  throw new Error('Not implemented');
};

/**
 * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
 * 
 * @param {boolean} skipped New value for skip pauses state.
 * @param {boolean=} untilReload Whether page reload should set skipped to false.
 */
DebuggerAgent.prototype.setSkipAllPauses =
function setSkipAllPauses(params) {
  return this._ignore('setSkipAllPauses', params);
};

/**
 * Sets JavaScript breakpoint at given location specified either by URL or URL regex.
 * Once this command is issued, all existing parsed scripts will have breakpoints resolved and returned in <code>locations</code> property.
 * Further matching script parsing will result in subsequent <code>breakpointResolved</code> events issued.
 * This logical breakpoint will survive page reloads.
 * 
 * @param {integer} lineNumber Line number to set breakpoint at.
 * @param {string=} url URL of the resources to set breakpoint on.
 * @param {string=} urlRegex Regex pattern for the URLs of the resources to set breakpoints on. Either <code>url</code> or <code>urlRegex</code> must be specified.
 * @param {integer=} columnNumber Offset in the line to set breakpoint at.
 * @param {string=} condition Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
 * @param {boolean=} isAntibreakpoint Creates pseudo-breakpoint that prevents debugger from pausing on exception at this location.
 * 
 * @returns {BreakpointId} breakpointId Id of the created breakpoint for further reference.
 * @returns {Array.<Location>} locations List of the locations this breakpoint resolved into upon addition.
 */
DebuggerAgent.prototype.setBreakpointByUrl =
function setBreakpointByUrl(params) {
  if (params.url) {
    return this.client.setBreakpointByUrl(
      params.url,
      params.lineNumber,
      params.columnNumber,
      params.condition
    ).then(function(result) {
      return {
        breakpointId: result.breakpointId,
        locations: result.actualLocations
      };
    });
  }
  console.log(params);
  throw new Error('Not implemented');
};

/**
 * Sets JavaScript breakpoint at a given location.
 * 
 * @param {Location} location Location to set breakpoint in.
 * @param {string=} condition Expression to use as a breakpoint condition. When specified, debugger will only stop on the breakpoint if this expression evaluates to true.
 * 
 * @returns {BreakpointId} breakpointId Id of the created breakpoint for further reference.
 * @returns {Location} actualLocation Location this breakpoint resolved into.
 */
DebuggerAgent.prototype.setBreakpoint =
function setBreakpoint() {
  throw new Error('Not implemented');
};

/**
 * Removes JavaScript breakpoint.
 * 
 * @param {BreakpointId} breakpointId
 */
DebuggerAgent.prototype.removeBreakpoint =
function removeBreakpoint(params) {
  return this.client.removeBreakpoint(params.breakpointId)
    .then(_.noop);
};

/**
 * Continues execution until specific location is reached.
 * 
 * @param {Location} location Location to continue to.
 * @param {boolean=} interstatementLocation Allows breakpoints at the intemediate positions inside statements.
 */
DebuggerAgent.prototype.continueToLocation =
function continueToLocation() {
  throw new Error('Not implemented');
};

/**
 * Steps over the statement.
 */
DebuggerAgent.prototype.stepOver =
function stepOver() {
  return this.client.stepOver();
};

/**
 * Steps into the function call.
 */
DebuggerAgent.prototype.stepInto =
function stepInto() {
  return this.client.stepInto();
};

/**
 * Steps out of the function call.
 */
DebuggerAgent.prototype.stepOut =
function stepOut() {
  return this.client.stepOut();
};

/**
 * Stops on the next JavaScript statement.
 */
DebuggerAgent.prototype.pause =
function pause() {
  throw new Error('Not implemented');
};

/**
 * Searches for given string in script content.
 * 
 * @param {ScriptId} scriptId Id of the script to search in.
 * @param {string} query String to search for.
 * @param {boolean=} caseSensitive If true, search is case sensitive.
 * @param {boolean=} isRegex If true, treats string parameter as regex.
 * 
 * @returns {Array.<Page.SearchMatch>} result List of search matches.
 */
DebuggerAgent.prototype.searchInContent =
function searchInContent() {
  throw new Error('Not implemented');
};

/**
 * Always returns true.
 * 
 * @returns {boolean} result True if <code>setScriptSource</code> is supported.
 */
DebuggerAgent.prototype.canSetScriptSource =
function canSetScriptSource() {
  throw new Error('Not implemented');
};

/**
 * Edits JavaScript source live.
 * 
 * @param {ScriptId} scriptId Id of the script to edit.
 * @param {string} scriptSource New content of the script.
 * @param {boolean=} preview  If true the change will not actually be applied. Preview mode may be used to get result description without actually modifying the code.
 * 
 * @returns {Array.<CallFrame>=} callFrames New stack trace in case editing has happened while VM was stopped.
 * @returns {Object=} result VM-specific description of the changes applied.
 * @returns {StackTrace=} asyncStackTrace Async stack trace, if any.
 * 
 * @throws {SetScriptSourceError} 
 */
DebuggerAgent.prototype.setScriptSource =
function setScriptSource() {
  throw new Error('Not implemented');
};

/**
 * Restarts particular call frame from the beginning.
 * 
 * @param {CallFrameId} callFrameId Call frame identifier to evaluate on.
 * 
 * @returns {Array.<CallFrame>} callFrames New stack trace.
 * @returns {Object} result VM-specific description.
 * @returns {StackTrace=} asyncStackTrace Async stack trace, if any.
 */
DebuggerAgent.prototype.restartFrame =
function restartFrame() {
  throw new Error('Not implemented');
};

/**
 * Returns source for the script with given id.
 * 
 * @param {ScriptId} scriptId Id of the script to get source for.
 * 
 * @returns {string} scriptSource Script source.
 */
DebuggerAgent.prototype.getScriptSource =
function getScriptSource(params) {
  var scriptId = params.scriptId;

  if (this._scriptCache[scriptId]) {
    return Bluebird.resolve({
      scriptSource: this._scriptCache[scriptId].sourceCode
    });
  }
  throw new Error('Not implemented');
};

/**
 * Returns detailed information on given function.
 * 
 * @param {Runtime.RemoteObjectId} functionId Id of the function to get location for.
 * 
 * @returns {FunctionDetails} details Information about the function.
 */
DebuggerAgent.prototype.getFunctionDetails =
function getFunctionDetails(params) {
  var functionId = params.functionId;
  return this.client.lookupFunctionDetails(functionId)
    .then(function(details) { return { details: details }; });
};

/**
 * Defines pause on exceptions state.
 * Can be set to stop on all exceptions, uncaught exceptions or no exceptions.
 * Initial pause on exceptions state is <code>none</code>.
 * 
 * @param {string none|uncaught|all} state Pause on exceptions mode.
 */
DebuggerAgent.prototype.setPauseOnExceptions =
function setPauseOnExceptions(params) {
  return Bluebird.all([
    this.client.setexceptionbreak({
      type: 'all', enabled: params.state === 'all' }),
    this.client.setexceptionbreak({
      type: 'uncaught', enabled: params.state === 'uncaught' })
  ]).then(_.noop);
};

/**
 * Evaluates expression on a given call frame.
 * 
 * @param {CallFrameId} callFrameId Call frame identifier to evaluate on.
 * @param {string} expression Expression to evaluate.
 * @param {string=} objectGroup String object group name to put result into (allows rapid releasing resulting object handles using <code>releaseObjectGroup</code>).
 * @param {boolean=} includeCommandLineAPI Specifies whether command line API should be available to the evaluated expression, defaults to false.
 * @param {boolean=} doNotPauseOnExceptionsAndMuteConsole Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.
 * @param {boolean=} returnByValue Whether the result is expected to be a JSON object that should be sent by value.
 * @param {boolean=} generatePreview Whether preview should be generated for the result.
 * 
 * @returns {Runtime.RemoteObject} result Object wrapper for the evaluation result.
 * @returns {boolean=} wasThrown True if the result was thrown during the evaluation.
 * @returns {Debugger.ExceptionDetails=} exceptionDetails Exception details.
 */
DebuggerAgent.prototype.evaluateOnCallFrame =
function evaluateOnCallFrame(params) {
  var callFrameId = params.callFrameId;
  var expression = params.expression;
  var objectGroup = null; // params.objectGroup;
  var noBreak = params.doNotPauseOnExceptionsAndMuteConsole;
  var returnByValue = params.returnByValue;

  if (!objectGroup && !returnByValue && noBreak) {
    return this.client.evalNoBreak(expression, callFrameId);
  }
  if (!objectGroup && !returnByValue && !noBreak) {
    return this.client.evalWithBreak(expression, callFrameId);
  }
  return this._ignore('evaluateOnCallFrame', params);
};

/**
 * Compiles expression.
 * 
 * @param {string} expression Expression to compile.
 * @param {string} sourceURL Source url to be set for the script.
 * @param {Runtime.ExecutionContextId=} executionContextId Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
 * 
 * @returns {ScriptId=} scriptId Id of the script.
 * @returns {ExceptionDetails=} exceptionDetails Exception details.
 */
DebuggerAgent.prototype.compileScript =
function compileScript() {
  throw new Error('Not implemented');
};

/**
 * Runs script with given id in a given context.
 * 
 * @param {ScriptId} scriptId Id of the script to run.
 * @param {Runtime.ExecutionContextId=} executionContextId Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
 * @param {string=} objectGroup Symbolic group name that can be used to release multiple objects.
 * @param {boolean=} doNotPauseOnExceptionsAndMuteConsole Specifies whether script run should stop on exceptions and mute console. Overrides setPauseOnException state.
 * 
 * @returns {Runtime.RemoteObject} result Run result.
 * @returns {ExceptionDetails=} exceptionDetails Exception details.
 */
DebuggerAgent.prototype.runScript =
function runScript() {
  throw new Error('Not implemented');
};

/**
 * Sets overlay message.
 * 
 * @param {string=} message Overlay message to display when paused in debugger.
 */
DebuggerAgent.prototype.setOverlayMessage =
function setOverlayMessage(params) {
  return this._ignore('setOverlayMessage', params);
};

/**
 * Changes value of variable in a callframe or a closure.
 * Either callframe or function must be specified.
 * Object-based scopes are not supported and must be mutated manually.
 * 
 * @param {integer} scopeNumber 0-based number of scope as was listed in scope chain. Only 'local', 'closure' and 'catch' scope types are allowed. Other scopes could be manipulated manually.
 * @param {string} variableName Variable name.
 * @param {Runtime.CallArgument} newValue New variable value.
 * @param {CallFrameId=} callFrameId Id of callframe that holds variable.
 * @param {Runtime.RemoteObjectId=} functionObjectId Object id of closure (function) that holds variable.
 */
DebuggerAgent.prototype.setVariableValue =
function setVariableValue(params) {
  function parseFrameId(id) {
    if (!id) return undefined;
    return parseInt(id.replace('frame:', ''), 10);
  }

  var context = {
    frame: parseFrameId(params.callFrameId),
    scope: params.scopeNumber
  };
  var name = params.variableName;
  var value = params.newValue;
  return this.client.setVariableValue(name, value, context);
};

/**
 * Lists all positions where step-in is possible for a current statement in a specified call frame
 * 
 * @param {CallFrameId} callFrameId Id of a call frame where the current statement should be analized
 * 
 * @returns {Array.<Location>=} stepInPositions experimental
 */
DebuggerAgent.prototype.getStepInPositions =
function getStepInPositions() {
  throw new Error('Not implemented');
};

/**
 * Returns call stack including variables changed since VM was paused.
 * VM must be paused.
 * 
 * @returns {Array.<CallFrame>} callFrames Call stack the virtual machine stopped on.
 * @returns {StackTrace=} asyncStackTrace Async stack trace, if any.
 */
DebuggerAgent.prototype.getBacktrace =
function getBacktrace() {
  throw new Error('Not implemented');
};

/**
 * Makes backend skip steps in the sources with names matching given pattern.
 * VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
 * 
 * @param {string=} script Regular expression defining the scripts to ignore while stepping.
 * @param {boolean=} skipContentScripts True, if all content scripts should be ignored.
 */
DebuggerAgent.prototype.skipStackFrames =
function skipStackFrames(params) {
  return this._ignore('skipStackFrames', params);
};

/**
 * Returns entries of given collection.
 * 
 * @param {Runtime.RemoteObjectId} objectId Id of the collection to get entries for.
 * 
 * @returns {Array.<CollectionEntry>} entries Array of collection entries.
 */
DebuggerAgent.prototype.getCollectionEntries =
function getCollectionEntries() {
  throw new Error('Not implemented');
};

/**
 * Enables or disables async call stacks tracking.
 * 
 * @param {integer} maxDepth Maximum depth of async call stacks. Setting to <code>0</code> will effectively disable collecting async call stacks (default).
 */
DebuggerAgent.prototype.setAsyncCallStackDepth =
function setAsyncCallStackDepth() {
  return Bluebird.resolve();
};

/**
 * Enables promise tracking, information about <code>Promise</code>s created or updated will now be stored on the backend.
 */
DebuggerAgent.prototype.enablePromiseTracker =
function enablePromiseTracker() {
  throw new Error('Not implemented');
};

/**
 * Disables promise tracking.
 */
DebuggerAgent.prototype.disablePromiseTracker =
function disablePromiseTracker() {
  throw new Error('Not implemented');
};

/**
 * Returns detailed information about all <code>Promise</code>s that were created or updated after the <code>enablePromiseTracker</code> command, and have not been garbage collected yet.
 * 
 * @returns {Array.<PromiseDetails>} promises Information about stored promises.
 */
DebuggerAgent.prototype.getPromises =
function getPromises() {
  throw new Error('Not implemented');
};
