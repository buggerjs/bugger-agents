'use strict';

var EventEmitter = require('events').EventEmitter;
var vm = require('vm');
var Module = require('module');
var Path = require('path');

// ---- ObjectGroup -----

function createRemoteObject(objectId, value) {
  // TODO: proper subtype handling etc.
  return {
    type: 'object',
    objectId: objectId
  };
}

function createRemoteFunction(objectId, value) {
  return {
    type: 'function',
    objectId: objectId
  };
}

function ObjectGroup(name) {
  this.name = name;
  this.refs = Object.create(null);
  this.lastId = 0;
}

ObjectGroup.prototype._createObjectMirror =
function _createObjectMirror(value) {
  if (value === null) {
    return { type: 'object', subtype: 'null' };
  }

  return this._cached(value, createRemoteObject);
}

ObjectGroup.prototype._createFunctionMirror =
function _createFunctionMirror(value) {
  return this._cached(value, createRemoteFunction);
}

ObjectGroup.prototype._cached =
function _cached(value, presenter) {
  var objectId;
  for (objectId in this.refs) {
    if (this.refs[objectId] === value) {
      return presenter(objectId, value);
    }
  }

  objectId = 'mirror:' + this.name + ':' + (++this.lastId);
  this.refs[objectId] = value;
  return presenter(objectId, value);
};

ObjectGroup.prototype.add = function add(value) {
  switch (typeof value) {
    case 'undefined':
    case 'string':
    case 'number':
    case 'boolean':
      return { type: typeof value, value: value };

    case 'function':
      return this._createFunctionMirror(value);

    case 'object':
      return this._createObjectMirror(value);
  }
  console.log('TODO: Store %j in group %j', typeof value, this.name);
  throw new Error('Not implemented: ' + typeof value);
}

ObjectGroup._groups = {};
function addToObjectGroup(objectGroup, value) {
  if (!ObjectGroup._groups[objectGroup]) {
    ObjectGroup._groups[objectGroup] = new ObjectGroup(objectGroup);
  }
  return ObjectGroup._groups[objectGroup].add(value);
};

function getByObjectId(objectId) {
  var parts = objectId.split(':');
  var objectGroup = parts[1];
  return ObjectGroup._groups[objectGroup].refs[objectId];
}

// ---- /ObjectGroup ----

var probe = module.exports = new EventEmitter();

function createContext() {
  var contextFilename = Path.resolve('bugger-repl');
  var context = vm.createContext(Object.create(null)); // Could also use global

  for (var i in global) {
    context[i] = global[i];
  }

  context.global = context;
  context.global.global = context;
  context.module = new Module(contextFilename);
  context.module.filename = contextFilename;
  context.require = context.module.require;
  context.exports = context.module.exports;
  context.module.paths = Module._nodeModulePaths(contextFilename);

  return context;
}

var evalContext = createContext();

probe.evaluate = function evaluate(expression, objectGroup) {
  var script, result;

  try {
    if (expression === 'this') {
      result = evalContext;
    } else {
      script = vm.createScript(expression, {
        filename: objectGroup,
        displayErrors: false
      });

      result = script.runInContext(evalContext, { displayErrors: false });
    }

    return JSON.stringify({
      result: addToObjectGroup(objectGroup, result),
      wasThrown: false
    });
  } catch (err) {
    return JSON.stringify({
      result: { type: 'string', value: err.message },
      wasThrown: true
    });
  }
};

function transferRemoteIfExists(objectGroup, obj, out, prop) {
  if (obj.hasOwnProperty(prop)) {
    out[prop] = addToObjectGroup(objectGroup, obj[prop]);
  }
}

probe.getProperties = function getProperties(objectId, ownProperties, accessorPropertiesOnly) {
  if (accessorPropertiesOnly) return [ '[]' ];

  var parts = objectId.split(':');
  var objectGroup = parts[1];

  var obj = getByObjectId(objectId);
  var names = Object.getOwnPropertyNames(obj);

  var props = names.map(function(name) {
    var desc = Object.getOwnPropertyDescriptor(obj, name);
    var out = {
      name: '' + name,
      writable: !!desc.writable,
      configurable: !!desc.configurable,
      enumerable: !!desc.enumerable,
      isOwn: true
    };
    transferRemoteIfExists(objectGroup, desc, out, 'value');
    transferRemoteIfExists(objectGroup, desc, out, 'get');
    transferRemoteIfExists(objectGroup, desc, out, 'set');
    return out;
  });

  var str = JSON.stringify(props);
  var chunks = [];
  for (var start = 0; start < str.length; start += 80) {
    chunks.push(str.substr(start, 80));
  }
  return chunks;
}

probe.callFunctionOn = function callFunctionOn(objectId, fn, args) {
  var obj = getByObjectId(objectId);
  var result = fn.apply(evalContext, args);
  return result;
};
