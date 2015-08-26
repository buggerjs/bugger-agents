'use strict';

var fs = require('fs');
var path = require('path');

var _ = require('lodash');
var Bluebird = require('bluebird');

function ProbeProxy(client, domain) {
  this.client = client;
  this.domain = domain;

  this._responses = {};
}
module.exports = ProbeProxy;

ProbeProxy.prototype._getResponseResolver =
function _getResponseResolver(seq) {
  if (!this._responses[seq]) {
    var resolver = this._responses[seq] = {};
    resolver.promise = new Bluebird(function(resolve, reject) {
      resolver.resolve = resolve;
      resolver.reject = reject;
    });
  }
  return this._responses[seq];
};

ProbeProxy.prototype._getResponse =
function _getResponse(seq) {
  return this._getResponseResolver(seq).promise;
};

ProbeProxy.prototype._handleBuggerProbeResponse =
function _handleBuggerProbeResponse(data) {
  var resolver = this._getResponseResolver(data.seq);
  if (data.error) {
    resolver.reject(new Error(data.error.message));
  } else {
    resolver.resolve(data.result);
  }
};

ProbeProxy.prototype.inject =
function injectProbe() {
  var domain = this.domain;
  var dirname = _.kebabCase(domain);
  var probeFile = path.resolve(__dirname, dirname, 'probe.js');
  var source = fs.readFileSync(probeFile, 'utf8');
  var expression =
    '(' + registerProbe.toString() + ')' +
    '(' + JSON.stringify(domain) +
    ', ' + JSON.stringify(dirname) +
    ', ' + JSON.stringify(source) + ');';
  return this.client.evalSimple(expression)
    .then(function(result) {
      if (typeof result === 'string') {
        throw new Error(result);
      }
      else if (result !== true) {
        throw new Error('Unexpected error while injecting ' + domain + ' probe: ' + result);
      }
    });
};

ProbeProxy.prototype.callProbeMethodProxy =
function callProbeMethodProxy(name) {
  var args = [].slice.call(arguments, 1);
  var expression = [
    '__bugger__.jsonExport((', callProbeMethod.toString(), ')(',
    JSON.stringify(this.domain), ', ',
    JSON.stringify(name), ', ',
    JSON.stringify(args), '))'
  ].join('');
  return this.client
    .evalSimple(expression)
    .then(jsonImport)
    .then(function(result) {
      if (Array.isArray(result)) {
        return result[0];
      } else if (typeof result === 'string') {
        throw new Error(result);
      } else if (typeof result === 'number') {
        return this._getResponse(result);
      } else {
        throw new Error('Unexpected response: ' + result);
      }
    }.bind(this));
};

ProbeProxy.prototype.createMethodProxy =
function createMethodProxy(name) {
  this[name] = this.callProbeMethodProxy.bind(this, name);
};

function jsonImport(chunks) {
  if (chunks === undefined) {
    return;
  }
  return JSON.parse(chunks.join(''));
}

function callProbeMethod(domain, name, args) {
  var probe = global.__bugger__.probes[domain];
  if (!probe) {
    return 'No probe found for ' + domain;
  }
  if (typeof probe[name] !== 'function') {
    return 'Probe for ' + domain + ' has no method named ' + name;
  }
  var result = probe[name].apply(probe, args);
  if (result && typeof result.then === 'function') {
    probe.__nextProxyResponseIdx = probe.__nextProxyResponseIdx || 1;
    var idx = probe.__nextProxyResponseIdx++;
    result.then(function(value) {
      probe.emit('_buggerProbeResponse', { seq: idx, result: value });
    }, function(err) {
      probe.emit('_buggerProbeResponse', { seq: idx, error: { message: err.message, stack: err.stack } });
    });
    return idx;
  } else {
    return [ result ];
  }
}

// This injects a self-contained module into the remote process.
// It should not rely on any 3rd party modules.
function registerProbe(domain, dirname, source) {
  var bugger = global.__bugger__;
  if (!bugger) {
    return 'registerProbe: Could not find __bugger__';
  }

  if (typeof bugger.registerProbe !== 'function') {
    return 'registerProbe: bugger.registerProbe is not a function';
  }

  return bugger.registerProbe(domain, dirname, source);
}
