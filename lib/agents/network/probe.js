'use strict';

var EventEmitter = require('events').EventEmitter;
var Url = require('url');
var http = require('http');

var makeStackTrace = require('../probe-utils').makeStackTrace;

var STATUS_CODES = http.STATUS_CODES || {};
var DEFAULT_MIME = 'text/plain';

var probe = module.exports = new EventEmitter();
probe._lastRequestId = 0;

function wrap(obj, method, wrapper) {
  var original = obj[method];
  if (typeof original !== 'function') {
    console.error('No method %s found on object', method);
    return;
  }
  if (isBuggerPatched(original)) return;
  var wrapped = wrapper(original);
  markBuggerPatched(wrapped);
  obj[method] = wrapped;
}

function markBuggerPatched(obj) {
  Object.defineProperty(obj, '__isBuggerPatched', {
    enumerable: false,
    value: true
  });
}

function isBuggerPatched(obj) {
  return obj.__isBuggerPatched === true;
}

function clone(obj) {
  return Object.keys(obj).reduce(function(out, key) {
    out[key] = obj[key];
    return out;
  }, {});
}

function captureErrorEvent(ee, onError) {
  var originalEmit = ee.emit;
  ee.emit = function emitIntercept(event, error) {
    if (event === 'error') { onError(error); }
    return originalEmit.apply(this, arguments);
  };
  return ee;
}

probe.enable = function enable() {
  wrap(http, 'request', wrapRequest);
};

function wrapRequest(originalRequest) {
  return function request(options, onResponse) {
    var protocol, documentURL, splitPath, urlOptions;
    if (typeof options === 'string') {
      documentURL = options;
      urlOptions = Url.parse(options);
      protocol = urlOptions.protocol || 'http:';
    } else {
      protocol = options.protocol || (options._defaultAgent && options._defaultAgent.protocol) || 'http:';
      urlOptions = clone(options);
      urlOptions.protocol = protocol;
      if (typeof urlOptions.path === 'string' && urlOptions.pathname === undefined) {
        splitPath = urlOptions.path.split('?');
        urlOptions.pathname = splitPath[0];
        urlOptions.search = splitPath[1];
      }
      documentURL = Url.format(urlOptions.uri || urlOptions);
    }

    var initiator = {
      type: 'script',
      stackTrace: makeStackTrace(request)
    };

    var requestId = '' + (++probe._lastRequestId);
    var loaderId = '' + process.pid;
    var wasAborted = false;

    var postData = ''; // TODO: capture POST data/cReq.write
    var totalLength = 0;

    var timing = { requestTime: Date.now() / 1000 };
    var requestTime = process.hrtime();
    function trackTime(type) {
      var hrt = process.hrtime(requestTime);
      timing[type] = hrt[0] * 1e3 + hrt[1] / 1e6;
    }

    function sendRequestInfo() {
      var data = {
        requestId: requestId,
        loaderId: loaderId,
        documentURL: documentURL,
        request: {
          headers: _renderHeaders(cReq),
          method: cReq.method,
          postData: postData,
          url: documentURL
        },
        type: 'XHR',
        timestamp: timing.requestTime,
        wallTime: timing.requestTime,
        initiator: initiator
      };
      probe.emit('requestWillBeSent', data);
    }

    function onRequestSent() {
      /* jshint validthis:true */
      trackTime('sendEnd');
      sendRequestInfo();
    }

    function onLookup() {
      trackTime('dnsEnd');
    }

    function onSocket(socket) {
      function onConnect() {
        trackTime('connectEnd');
        if (!socket.ssl) {
          trackTime('sendStart');
        }
      }

      function onSecure() {
        trackTime('sslEnd');
        trackTime('sendStart');
      }

      trackTime('connectStart');
      socket.once('connect', onConnect);
      socket.once('secure', onSecure);
      if (socket.ssl) {
        wrap(socket.ssl, 'onhandshakestart', function(original) {
          return function onTlsHandshakeStart() {
            trackTime('sslStart');
            return original.apply(this, arguments);
          };
        });
      }

      trackTime('dnsStart');
      if (socket.address()) {
        onLookup();
      } else {
        socket.once('lookup', onLookup);
      }
    }

    function onRequestFailed(error) {
      probe.emit('loadingFailed', {
        requestId: requestId,
        timestamp: makeTimestamp(),
        type: 'XHR',
        errorText: error.message,
        canceled: wasAborted
      });
    }

    var cReq = originalRequest(options);

    function interceptRequestBodyChunk(original) {
      return function write(chunk) {
        if (typeof chunk === 'string' || Buffer.isBuffer(chunk)) {
          postData += chunk.toString();
        } else {
          console.error('Could not intercept', typeof chunk);
        }
        return original.apply(this, arguments);
      };
    }

    // TODO: Do we need to handle _writev as well?
    wrap(cReq, 'write', interceptRequestBodyChunk);

    cReq.on('finish', onRequestSent);
    captureErrorEvent(cReq, onRequestFailed);

    if (cReq.socket) {
      onSocket(cReq.socket);
    } else {
      cReq.once('socket', onSocket);
    }

    function patchResponse(cRes) {
      captureErrorEvent(cRes, onRequestFailed);
      trackTime('receiveHeadersEnd');

      var mimeType = _getMimeType(cRes.headers);

      var data = {
        requestId: requestId,
        loaderId: loaderId,
        timestamp: makeTimestamp(),
        type: 'XHR',
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

      // TODO: this potentially changes the streaming mode

      cRes.on('data', function(chunk) {
        if (!Buffer.isBuffer(chunk)) {
          chunk = new Buffer(chunk);
        }
        totalLength += chunk.length;
        probe.emit('dataReceived', {
          requestId: requestId,
          timestamp: makeTimestamp(),
          dataLength: chunk.length,
          encodedDataLength: chunk.length,
          chunkBase64: chunk.toString('base64')
        });
      });

      cRes.on('end', function() {
        probe.emit('loadingFinished', {
          requestId: requestId,
          timestamp: makeTimestamp(),
          dataLength: totalLength,
          encodedDataLength: totalLength
        });
      });
    }
    cReq.on('response', patchResponse);

    if (onResponse !== undefined) {
      cReq.on('response', onResponse);
    }

    return cReq;
  };
}

function makeTimestamp() {
  return Date.now() / 1000;
}

function _renderHeaders(req) {
  var headers = req._headers;
  if (!headers) return {};

  var out = {}, names = Object.keys(headers);
  names.forEach(function(name) {
    out[req._headerNames[name]] = String(headers[name]);
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
      out[key] = String(value);
    }
  }
  return out;
}
