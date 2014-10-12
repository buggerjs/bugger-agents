// This function will be injected into the target process.
// It has to be self-contained and has no access the `module`,
// `exports`, `require`, etc.
function NetworkProbe(sendEvent, bugger) {
  var util = bugger.require('util');
  var url = bugger.require('url');
  var STATUS_CODES = bugger.require('http').STATUS_CODES || {};

  var makeStackTrace = bugger.makeStackTrace;

  var lastRequestId = 0;

  function _renderHeaders(req) {
    var headers = req._headers;
    if (!headers) return {};

    var out = {}, names = Object.keys(headers);
    names.forEach(function(name) {
      out[req._headerNames[name]] = headers[name];
    });

    return out;
  }

  var DEFAULT_MIME = 'text/plain';
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

  function _patchLib(lib) {
    var originalRequest = lib.request;

    function request(options, onResponse) {
      if (typeof options === 'string') {
        options = url.parse(options);
      }

      var requestId = '' + (++lastRequestId);
      var loaderId = requestId;
      var documentURL = url.format(options.uri || options);

      var cReq = originalRequest(options);
      var originalEnd = cReq.end;
      function end() {
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
        sendEvent('Network.requestWillBeSent', data);
        return originalEnd.apply(this, arguments);
      };
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
        sendEvent('Network.responseReceived', data);
        // console.log('Network.responseReceived', data);
      }
      cReq.on('response', patchResponse);

      if (onResponse !== undefined) {
        cReq.on('response', onResponse);
      }

      return cReq;
    }

    lib.request = request;
  }

  function enable() {
    // Setup http/https listeners
    _patchLib(bugger.require('http'));
    _patchLib(bugger.require('https'));
  }

  this.enable = enable;
}

module.exports = NetworkProbe;
