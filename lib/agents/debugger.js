'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function DebuggerAgent(client) {
  if (!(this instanceof DebuggerAgent))
    return new DebuggerAgent(client);

  BaseAgent.call(this, DebuggerAgent, client);
}
util.inherits(DebuggerAgent, BaseAgent);
_.extend(DebuggerAgent, require('./debugger.types'));
module.exports = DebuggerAgent;

/**
 * Enables debugger for the given page.
 * Clients should not assume that the debugging has been enabled until the result for this command is received.
 */
DebuggerAgent.prototype.enable = function() {
  return this._withClient(function(client) {
    return client.connect().then(_.noop);
  });
};

/**
 * Resumes JavaScript execution.
 */
DebuggerAgent.prototype.resume = function() {
  return this._withClient(function(client) {
    return client.resume();
  }, false);
};

/**
 * Disables debugger for given page.
 */
DebuggerAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Activates / deactivates all breakpoints on the page.
 * 
 * @param {boolean} active New value for breakpoints active state.
 */
DebuggerAgent.prototype.setBreakpointsActive = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Makes page not interrupt on any pauses (breakpoint, exception, dom exception etc).
 * 
 * @param {boolean} skipped New value for skip pauses state.
 * @param {boolean=} untilReload Whether page reload should set skipped to false.
 */
DebuggerAgent.prototype.setSkipAllPauses = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
DebuggerAgent.prototype.setBreakpointByUrl = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
DebuggerAgent.prototype.setBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Removes JavaScript breakpoint.
 * 
 * @param {BreakpointId} breakpointId
 */
DebuggerAgent.prototype.removeBreakpoint = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Continues execution until specific location is reached.
 * 
 * @param {Location} location Location to continue to.
 * @param {boolean=} interstatementLocation Allows breakpoints at the intemediate positions inside statements.
 */
DebuggerAgent.prototype.continueToLocation = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Steps over the statement.
 */
DebuggerAgent.prototype.stepOver = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Steps into the function call.
 */
DebuggerAgent.prototype.stepInto = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Steps out of the function call.
 */
DebuggerAgent.prototype.stepOut = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Stops on the next JavaScript statement.
 */
DebuggerAgent.prototype.pause = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
DebuggerAgent.prototype.searchInContent = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Always returns true.
 * 
 * @returns {boolean} result True if <code>setScriptSource</code> is supported.
 */
DebuggerAgent.prototype.canSetScriptSource = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
 * 
 * @throws {SetScriptSourceError} 
 */
DebuggerAgent.prototype.setScriptSource = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Restarts particular call frame from the beginning.
 * 
 * @param {CallFrameId} callFrameId Call frame identifier to evaluate on.
 * 
 * @returns {Array.<CallFrame>} callFrames New stack trace.
 * @returns {Object} result VM-specific description.
 */
DebuggerAgent.prototype.restartFrame = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns source for the script with given id.
 * 
 * @param {ScriptId} scriptId Id of the script to get source for.
 * 
 * @returns {string} scriptSource Script source.
 */
DebuggerAgent.prototype.getScriptSource = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns detailed informtation on given function.
 * 
 * @param {Runtime.RemoteObjectId} functionId Id of the function to get location for.
 * 
 * @returns {FunctionDetails} details Information about the function.
 */
DebuggerAgent.prototype.getFunctionDetails = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Defines pause on exceptions state.
 * Can be set to stop on all exceptions, uncaught exceptions or no exceptions.
 * Initial pause on exceptions state is <code>none</code>.
 * 
 * @param {string none|uncaught|all} state Pause on exceptions mode.
 */
DebuggerAgent.prototype.setPauseOnExceptions = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
 */
DebuggerAgent.prototype.evaluateOnCallFrame = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Compiles expression.
 * 
 * @param {string} expression Expression to compile.
 * @param {string} sourceURL Source url to be set for the script.
 * 
 * @returns {ScriptId=} scriptId Id of the script.
 * @returns {string=} syntaxErrorMessage Syntax error message if compilation failed.
 */
DebuggerAgent.prototype.compileScript = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Runs script with given id in a given context.
 * 
 * @param {ScriptId} scriptId Id of the script to run.
 * @param {Runtime.ExecutionContextId=} contextId Specifies in which isolated context to perform script run. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
 * @param {string=} objectGroup Symbolic group name that can be used to release multiple objects.
 * @param {boolean=} doNotPauseOnExceptionsAndMuteConsole Specifies whether script run should stop on exceptions and mute console. Overrides setPauseOnException state.
 * 
 * @returns {Runtime.RemoteObject} result Run result.
 * @returns {boolean=} wasThrown True if the result was thrown during the script run.
 */
DebuggerAgent.prototype.runScript = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets overlay message.
 * 
 * @param {string=} message Overlay message to display when paused in debugger.
 */
DebuggerAgent.prototype.setOverlayMessage = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
DebuggerAgent.prototype.setVariableValue = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Lists all positions where step-in is possible for a current statement in a specified call frame
 * 
 * @param {CallFrameId} callFrameId Id of a call frame where the current statement should be analized
 * 
 * @returns {Array.<Location>=} stepInPositions experimental
 */
DebuggerAgent.prototype.getStepInPositions = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns call stack including variables changed since VM was paused.
 * VM must be paused.
 * 
 * @returns {Array.<CallFrame>} callFrames Call stack the virtual machine stopped on.
 */
DebuggerAgent.prototype.getBacktrace = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Makes backend skip steps in the sources with names matching given pattern.
 * VM will try leave blacklisted scripts by performing 'step in' several times, finally resorting to 'step out' if unsuccessful.
 * 
 * @param {string=} script Regular expression defining the scripts to ignore while stepping.
 */
DebuggerAgent.prototype.skipStackFrames = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
