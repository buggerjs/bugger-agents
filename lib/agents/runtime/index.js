'use strict';

var util = require('util');

var _ = require('lodash');
var Bluebird = require('bluebird');

var BaseAgent = require('../base');

var nextExecutionContextId = 1;

function jsonImport(chunks) {
  return JSON.parse(chunks.join(''));
}

function toPlainValue(res) {
  var refs = res.refs;

  function _getFromRef(handle) {
    return _toPlainValue(_.find(refs, function(refObj) {
      return String(refObj.handle) === String(handle);
    }));
  }

  function _toPlainObject(raw) {
    if (raw.className === 'Array') {
      return raw.properties.reduce(function(arr, prop) {
        if (prop.name === 'length') return arr;
        arr[+prop.name] = _getFromRef(prop.ref);
        return arr;
      }, []);
    }
    return raw.properties.reduce(function(obj, prop) {
      obj[prop.name] = _getFromRef(prop.ref);
      return obj;
    }, {});
  }

  function _toPlainValue(raw) {
    switch (raw.type) {
      case 'object':
        return _toPlainObject(raw);

      case 'number':
      case 'string':
      case 'boolean':
      case 'undefined':
        return raw.value;
    }
    console.log(raw, refs);
    return undefined;
  }

  return _toPlainValue(res.body);
}

function RuntimeAgent(client, child) {
  if (!(this instanceof RuntimeAgent))
    return new RuntimeAgent(client, child);

  BaseAgent.call(this, client, child);

  this._mainExecutionContextId = nextExecutionContextId++;

  var self = this;
  child.on('exit', function() {
    self._debugEvent('executionContextsCleared');
  });

  child.on('online', function() {
    self._injectProbe();
  });
}
util.inherits(RuntimeAgent, BaseAgent);
_.extend(RuntimeAgent, require('./types'));
module.exports = RuntimeAgent;

/**
 * Evaluates expression on global object.
 * 
 * @param {string} expression Expression to evaluate.
 * @param {string=} objectGroup Symbolic group name that can be used to release multiple objects.
 * @param {boolean=} includeCommandLineAPI Determines whether Command Line API should be available during the evaluation.
 * @param {boolean=} doNotPauseOnExceptionsAndMuteConsole Specifies whether evaluation should stop on exceptions and mute console. Overrides setPauseOnException state.
 * @param {ExecutionContextId=} contextId Specifies in which isolated context to perform evaluation. Each content script lives in an isolated context and this parameter may be used to specify one of those contexts. If the parameter is omitted or 0 the evaluation will be performed in the context of the inspected page.
 * @param {boolean=} returnByValue Whether the result is expected to be a JSON object that should be sent by value.
 * @param {boolean=} generatePreview Whether preview should be generated for the result.
 * 
 * @returns {RemoteObject} result Evaluation result.
 * @returns {boolean=} wasThrown True if the result was thrown during the evaluation.
 * @returns {Debugger.ExceptionDetails=} exceptionDetails Exception details.
 */
RuntimeAgent.prototype.evaluate =
function evaluate(params) {
  var expression = params.expression;
  var objectGroup = params.objectGroup;
  var noBreak = params.doNotPauseOnExceptionsAndMuteConsole;
  var returnByValue = params.returnByValue;

  if (!objectGroup && !returnByValue && noBreak) {
    return this.client.evalNoBreak(expression);
  }
  if (!objectGroup && !returnByValue && !noBreak) {
    return this.client.evalWithBreak(expression);
  }

  if (expression === 'location.href' || expression === 'location.hostname || location.href') {
    // HACK
    return Bluebird.resolve({
      result: { value: 'about:blank', type: 'string' } });
  }

  if (returnByValue) {
    return this.client.evalSimple(expression)
      .then(function(value) {
        return {
          result: { value: value },
          wasThrown: false
        };
      }, function(error) {
        return {
          result: { value: error.message, type: 'string' },
          wasThrown: true
        };
      });
  }

  var forwardedExpression = '__bugger__.probes.Runtime.evaluate(' +
    JSON.stringify(expression) + ', ' + JSON.stringify(objectGroup) + ')';

  var opts = {
    global: true,
    expression: forwardedExpression,
    'disable_break': noBreak
  };
  // TODO: honor noBreak
  return this.client._sendRequest('evaluate', opts)
    .then(toPlainValue)
    .then(function(json) {
      try {
        return jsonImport(json);
      } catch (err) {
        console.error('Got invalid JSON:', json);
        throw err;
      }
    });
};

RuntimeAgent.prototype._callFunctionOnHandle =
function _callFunctionOnHandle(params) {
  var objectId = params.objectId;
  if (!params.returnByValue) {
    throw new Error('Not implemented (can only return by value)');
  }
  var handle = objectId.split(':').pop();
  var fn = params.functionDeclaration;
  var args = params.arguments || [];

  var ctx = [
    { name: 'thisArg', handle: handle }
  ].concat(args.map(function(arg, idx) {
    return _.extend({ name: 'arg' + idx }, arg);
  }));

  var opts = {
    global: true,
    expression: '(' + fn + ').call(' + _.pluck(ctx, 'name').join(', ') + ')',
    'disable_break': !!params.doNotPauseOnExceptionsAndMuteConsole,
    'additional_context': ctx
  };

  return this.client._sendRequest('evaluate', opts)
    .then(function(res) {
      return {
        result: { type: 'object', value: toPlainValue(res) },
        wasThrown: false
      };
    });
};

RuntimeAgent.prototype._callFunctionOnMirror =
function _callFunctionOnMirror(params) {
  var objectId = params.objectId;
  if (!params.returnByValue) {
    throw new Error('Not implemented (can only return by value)');
  }

  var fn = params.functionDeclaration;
  var ctx = (params.arguments || []).map(function(arg, idx) {
    return _.extend({ name: 'arg' + idx }, arg);
  });

  var expression = '__bugger__.probes.Runtime.callFunctionOn(' +
    JSON.stringify(objectId) + ', (' + fn + '), [' +
    _.pluck(ctx, 'name').join(', ') + '])';

  var opts = {
    global: true,
    expression: expression,
    'disable_break': !!params.doNotPauseOnExceptionsAndMuteConsole,
    'additional_context': ctx
  };

  return this.client._sendRequest('evaluate', opts)
    .then(function(res) {
      return {
        result: { type: 'object', value: toPlainValue(res) },
        wasThrown: false
      };
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
function callFunctionOn(params) {
  var objectId = params.objectId;
  if (objectId.indexOf('mirror:') === 0) {
    return this._callFunctionOnMirror(params);
  } else if (objectId.indexOf('scope-handle:') === 0) {
    return this._callFunctionOnHandle(params);
  } else {
    throw new Error('Not implemented: ' + objectId);
  }
};

RuntimeAgent.prototype._getPropertiesOfMirror =
function _getPropertiesOfMirror(params) {
  var objectId = params.objectId;
  var ownProperties = !!params.ownProperties;
  var accessors = !!params.accessorPropertiesOnly;

  var expression = '__bugger__.probes.Runtime.getProperties(' +
    [ JSON.stringify(objectId), ownProperties, accessors ].join(', ') + ')';

  return this.client.evalSimple(expression)
    .then(function(res) {
      if (!Array.isArray(res)) {
        return { result: [] };
      } else {
        return { result: jsonImport(res) };
      }
    });
};

/**
 * Returns properties of a given object.
 * Object group of the result is inherited from the target object.
 * 
 * @param {RemoteObjectId} objectId Identifier of the object to return properties for.
 * @param {boolean=} ownProperties If true, returns properties belonging only to the element itself, not to its prototype chain.
 * @param {boolean=} accessorPropertiesOnly If true, returns accessor properties (with getter/setter) only; internal properties are not returned either.
 * @param {boolean=} generatePreview Whether preview should be generated for the results.
 * 
 * @returns {Array.<PropertyDescriptor>} result Object properties.
 * @returns {Array.<InternalPropertyDescriptor>=} internalProperties Internal object properties (only of the element itself).
 * @returns {Debugger.ExceptionDetails=} exceptionDetails Exception details.
 */
RuntimeAgent.prototype.getProperties =
function getProperties(params) {
  var objectId = params.objectId;
  if (objectId.indexOf('mirror:') === 0) {
    return this._getPropertiesOfMirror(params);
  }
  var ownProperties = !!params.ownProperties;

  return this.client.lookupProperties(objectId, ownProperties)
    .then(function(properties) {
      return { result: properties };
    });
};

/**
 * Releases remote object with given id.
 * 
 * @param {RemoteObjectId} objectId Identifier of the object to release.
 */
RuntimeAgent.prototype.releaseObject =
function releaseObject() {
  throw new Error('Not implemented');
};

/**
 * Releases all remote objects that belong to a given group.
 * 
 * @param {string} objectGroup Symbolic object group name.
 */
RuntimeAgent.prototype.releaseObjectGroup =
function releaseObjectGroup(params) {
  return this._ignore('releaseObjectGroup', params);
};

/**
 * Tells inspected instance(worker or page) that it can run in case it was started paused.
 */
RuntimeAgent.prototype.run =
function run() {
  throw new Error('Not implemented');
};

RuntimeAgent.prototype._sendExecutionContexts =
function sendExecutionContexts() {
  this._debugEvent('executionContextCreated', {
    context: {
      frameId: 'bugger-frame',
      id: this._mainExecutionContextId
    }
  });
};

/**
 * Enables reporting of execution contexts creation by means of <code>executionContextCreated</code> event.
 * When the reporting gets enabled the event will be sent immediately for each existing execution context.
 */
RuntimeAgent.prototype.enable =
function enable() {
  this._sendExecutionContexts();
  return this._injectProbe();
};

/**
 * Disables reporting of execution contexts creation.
 */
RuntimeAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
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

/**
 * 
 * @param {boolean} enabled
 */
RuntimeAgent.prototype.setCustomObjectFormatterEnabled =
function setCustomObjectFormatterEnabled() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
