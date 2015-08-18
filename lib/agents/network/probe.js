'use strict';

var EventEmitter = require('events').EventEmitter;
var Url = require('url');
var http = require('http');
var https = require('https');

var makeStackTrace = require('../probe-utils').makeStackTrace;

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

    var postData = ''; // TODO: capture POST data/cReq.write

    var requestTime = makeTimestamp();
    var timing = { requestTime: requestTime };
    function trackTime(type) {
      var timestamp = makeTimestamp();
      timing[type] = timestamp - requestTime;
      return timestamp;
    }

    function renderRequest() {
      return {
        headers: _renderHeaders(cReq),
        method: cReq.method,
        postData: postData,
        url: documentURL
      };
    }

    var cReq = originalRequest(options);
    var originalEnd = cReq.end;
    function end() {
      /* jshint validthis:true */
      var data = {
        requestId: requestId,
        loaderId: loaderId,
        documentURL: documentURL,
        request: renderRequest(),
        type: 'XHR',
        timestamp: requestTime,
        wallTime: makeTimestamp(),
        initiator: {
          type: 'script',
          stackTrace: makeStackTrace(end)
        }
      };
      probe.emit('requestWillBeSent', data);
      return originalEnd.apply(this, arguments);
    }
    cReq.end = end;

    function onLookup() {
      trackTime('dnsEnd');
      console.log('lookup done');
    }

    function onSocket(socket) {
      trackTime('connectStart');
      socket.once('connect', function() {
        trackTime('connectEnd');
      });

      if (socket.address()) {
        trackTime('dnsStart');
      } else {
        socket.once('lookup', onLookup);
      }
    }

    if (cReq.socket) {
      onSocket(cReq.socket);
    } else {
      cReq.once('socket', onSocket);
    }

    function patchResponse(cRes) {
      var mimeType = _getMimeType(cRes.headers);

      var data = {
        requestId: requestId,
        loaderId: loaderId,
        timestamp: trackTime('receiveHeadersEnd'),
        type: 'XHR',
        request: renderRequest(),
        response: {
          timing: timing,
          connectionId: requestId,
          connectionReused: false,
          requestHeaders: _renderHeaders(cReq),
          headers: _formatIncomingHeaders(cRes.rawHeaders),
          mimeType: mimeType,
          status: cRes.statusCode,
          statusText: STATUS_CODES[cRes.statusCode] || '?',
          url: documentURL
        }
      };
      probe.emit('responseReceived', data);

      probe.emit('dataReceived', {
        requestId: requestId,
        timestamp: makeTimestamp(),
        dataLength: 0,
        encodedDataLength: 0
      });

      probe.emit('loadingFinished', {
        requestId: requestId,
        timestamp: makeTimestamp(),
        encodedDataLength: 0
      });
    }
    cReq.on('response', patchResponse);

    if (onResponse !== undefined) {
      cReq.on('response', onResponse);
    }

    return cReq;
  }

  lib.request = request;
}

function makeTimestamp() {
  return Date.now() / 1000;
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

function _formatIncomingHeaders(rawHeaders) {
  var out = {}, idx, key, value;
  for (idx = 0; idx < rawHeaders.length; idx += 2) {
    key = rawHeaders[idx];
    value = rawHeaders[idx + 1];
    if (typeof out[key] === 'string') {
      out[key] += '\n' + value;
    } else {
      out[key] = value;
    }
  }
  return out;
}
