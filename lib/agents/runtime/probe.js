'use strict';

var EventEmitter = require('events').EventEmitter;
var vm = require('vm');
var Module = require('module');
var Path = require('path');

var jsonExport = require('../probe-utils').jsonExport;
var ObjectGroup = require('../object-group');

var probe = module.exports = new EventEmitter();

function createContext() {
  var contextFilename = Path.resolve('bugger-repl');
  var context = vm.createContext(Object.create(null)); // Could also use global

  Object.getOwnPropertyNames(global).forEach(function(name) {
    Object.defineProperty(context, name, Object.getOwnPropertyDescriptor(global, name));
  });

  context.global = context;
  context.global.global = context;

  var m = context.module = new Module(contextFilename);
  m.filename = contextFilename;
  m.paths = Module._nodeModulePaths(contextFilename);

  m._compile('exports.require = require;');
  context.require = m.exports.require;
  context.exports = m.exports = {};

  context.__filename = contextFilename;
  context.__dirname = Path.dirname(contextFilename);

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

    return jsonExport({
      result: ObjectGroup.add(objectGroup, result),
      wasThrown: false
    });
  } catch (err) {
    return jsonExport({
      result: { type: 'string', value: err.message },
      wasThrown: true,
      exceptionDetails: {
        text: err.message
      }
    });
  }
};

function transferRemoteIfExists(objectGroup, obj, out, prop) {
  if (obj.hasOwnProperty(prop)) {
    out[prop] = ObjectGroup.add(objectGroup, obj[prop]);
  }
}

function getOwnObjectProperties(objectGroup, obj) {
  var names = Object.getOwnPropertyNames(obj);
  return names.map(function(name) {
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
}

probe.getProperties = function getProperties(objectId, ownProperties, accessorPropertiesOnly) {
  if (accessorPropertiesOnly) return [ '[]' ];

  var lookup = ObjectGroup.parseAndGet(objectId);
  var objectGroup = lookup.objectGroup;
  var obj = lookup.value;

  var props = getOwnObjectProperties(objectGroup, obj);

  return jsonExport(props);
};

probe.callFunctionOn = function callFunctionOn(objectId, fn, args, returnByValue) {
  var lookup = ObjectGroup.parseAndGet(objectId);
  var objectGroup = lookup.objectGroup;
  var obj = lookup.value;

  var result = fn.apply(obj, args);
  if (returnByValue) {
    return jsonExport({ type: 'object', value: result });
  } else {
    return jsonExport(ObjectGroup.add(objectGroup, result));
  }
};
