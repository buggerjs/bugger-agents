/* global __bugger__:false */
'use strict';

var EventEmitter = require('events').EventEmitter;
var Url = require('url');
var http = require('http');
var https = require('https');

// TODO: Maybe it's possible to make this a require('../base-instrumentation')
var makeStackTrace = __bugger__.makeStackTrace;

var STATUS_CODES = http.STATUS_CODES || {};
var DEFAULT_MIME = 'text/plain';

var probe = module.exports = new EventEmitter();
probe._lastRequestId = 0;

probe.enable = function enable() {
  // Setup http/https listeners
  _patchLib(http);
  _patchLib(https);
};

function _patchLib(lib) {
  var originalRequest = lib.request;

  function request(options, onResponse) {
    if (typeof options === 'string') {
      options = Url.parse(options);
    }

    var requestId = '' + (++probe._lastRequestId);
    var loaderId = '' + process.pid;
    var documentURL = Url.format(options.uri || options);

    var cReq = originalRequest(options);
    var originalEnd = cReq.end;
    function end() {
      /* jshint validthis:true */
      var data = {
        requestId: requestId,
        loaderId: loaderId,
        documentURL: documentURL,
        request: {
          headers: _renderHeaders(cReq),
          method: cReq.method,
          postData: '', // TODO: capture POST data/cReq.write
          url: documentURL
        },
        timestamp: Date.now(),
        initiator: {
          type: 'script',
          stackTrace: makeStackTrace(end)
        }
      };
      probe.emit('requestWillBeSent', data);
      return originalEnd.apply(this, arguments);
    }
    cReq.end = end;

    function patchResponse(cRes) {
      var mimeType = _getMimeType(cRes.headers);

      var data = {
        requestId: requestId,
        loaderId: loaderId,
        timestamp: Date.now(),
        type: 'XHR',
        response: {
          connectionId: requestId,
          connectionReused: false,
          headers: _removeArraysFromHeaders(cRes.headers),
          mimeType: mimeType,
          status: cRes.statusCode,
          statusText: STATUS_CODES[cRes.statusCode] || '?',
          url: documentURL
        }
      };
      probe.emit('responseReceived', data);
    }
    cReq.on('response', patchResponse);

    if (onResponse !== undefined) {
      cReq.on('response', onResponse);
    }

    return cReq;
  }

  lib.request = request;
}

function _renderHeaders(req) {
  var headers = req._headers;
  if (!headers) return {};

  var out = {}, names = Object.keys(headers);
  names.forEach(function(name) {
    out[req._headerNames[name]] = headers[name];
  });

  return out;
}

function _getMimeType(headers) {
  if (typeof headers['content-type'] === 'string') {
    return headers['content-type'].split(';')[0] || DEFAULT_MIME;
  }
  return DEFAULT_MIME;
}

function _removeArraysFromHeaders(headers) {
  var out = {}, names = Object.keys(headers);
  names.forEach(function(name) {
    var value = headers[name];
    if (Array.isArray(value)) {
      value = value.join('\n');
    }
    out[name] = value;
  });
  return out;
}
