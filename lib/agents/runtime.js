'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function RuntimeAgent(client) {
  if (!(this instanceof RuntimeAgent))
    return new RuntimeAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(RuntimeAgent, BaseAgent);
_.extend(RuntimeAgent, require('./runtime.types'));
module.exports = RuntimeAgent;

/**
 * Evaluates expression on global object.
 * 
 * @param {string} expression Expression to evaluate.
 * @param {string=} objectGroup Symbolic group name that can be used to release multiple objects.
 * @param {boolean=} includeCommandLineAPI Determines whether Command Line API should be available during the evaluation.
 * @param {boolean=} doNotPauseOnExceptionsAndMuteConsole Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.
 * @param {Runtime.ExecutionContextId=} contextId Specifies in which isolated context to perform evaluation. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
 * @param {boolean=} returnByValue Whether the result is expected to be a JSON object that should be sent by value.
 * @param {boolean=} generatePreview Whether preview should be generated for the result.
 * 
 * @returns {RemoteObject} result Evaluation result.
 * @returns {boolean=} wasThrown True if the result was thrown during the evaluation.
 * @returns {Debugger.ExceptionDetails=} exceptionDetails Exception details.
 */
RuntimeAgent.prototype.evaluate =
function evaluate() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Calls function with given declaration on the given object.
 * Object group of the result is inherited from the target object.
 * 
 * @param {RemoteObjectId} objectId Identifier of the object to call function on.
 * @param {string} functionDeclaration Declaration of the function to call.
 * @param {Array.<CallArgument>=} arguments Call arguments. All call arguments must belong to the same JavaScript world as the target object.
 * @param {boolean=} doNotPauseOnExceptionsAndMuteConsole Specifies whether function call should stop on exceptions and mute console. Overrides setPauseOnException state.
 * @param {boolean=} returnByValue Whether the result is expected to be a JSON object which should be sent by value.
 * @param {boolean=} generatePreview Whether preview should be generated for the result.
 * 
 * @returns {RemoteObject} result Call result.
 * @returns {boolean=} wasThrown True if the result was thrown during the evaluation.
 */
RuntimeAgent.prototype.callFunctionOn =
function callFunctionOn() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns properties of a given object.
 * Object group of the result is inherited from the target object.
 * 
 * @param {RemoteObjectId} objectId Identifier of the object to return properties for.
 * @param {boolean=} ownProperties If true, returns properties belonging only to the element itself, not to its prototype chain.
 * @param {boolean=} accessorPropertiesOnly If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.
 * 
 * @returns {Array.<PropertyDescriptor>} result Object properties.
 * @returns {Array.<InternalPropertyDescriptor>=} internalProperties Internal object properties (only of the element itself).
 */
RuntimeAgent.prototype.getProperties =
function getProperties() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Releases remote object with given id.
 * 
 * @param {RemoteObjectId} objectId Identifier of the object to release.
 */
RuntimeAgent.prototype.releaseObject =
function releaseObject() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Releases all remote objects that belong to a given group.
 * 
 * @param {string} objectGroup Symbolic object group name.
 */
RuntimeAgent.prototype.releaseObjectGroup =
function releaseObjectGroup() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Tells inspected instance(worker or page) that it can run in case it was started paused.
 */
RuntimeAgent.prototype.run =
function run() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event.
 * When the reporting gets enabled the event will be sent immediately for each existing execution context.
 */
RuntimeAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 * Disables reporting of execution contexts creation.
 */
RuntimeAgent.prototype.disable =
function disable() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @returns {boolean} result True if the Runtime is in paused on start state.
 */
RuntimeAgent.prototype.isRunRequired =
function isRunRequired() {
  return this._ignore('isRunRequired')
    .then(function() { return false; });
};
