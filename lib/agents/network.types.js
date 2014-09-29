'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Unique loader identifier.
 */
exports.LoaderId = String;

/**
 * Unique request identifier.
 */
exports.RequestId = String;

/**
 * Number of seconds since epoch.
 */
exports.Timestamp = Number;

/**
 * Request / response headers as keys / values of JSON object.
 */
exports.Headers =
function Headers() {
  
};

/**
 * Timing information for the request.
 * 
 * @param {number} requestTime Timing's requestTime is a baseline in seconds, while the other numbers are ticks in milliseconds relatively to this requestTime.
 * @param {number} proxyStart Started resolving proxy.
 * @param {number} proxyEnd Finished resolving proxy.
 * @param {number} dnsStart Started DNS address resolve.
 * @param {number} dnsEnd Finished DNS address resolve.
 * @param {number} connectStart Started connecting to the remote host.
 * @param {number} connectEnd Connected to the remote host.
 * @param {number} sslStart Started SSL handshake.
 * @param {number} sslEnd Finished SSL handshake.
 * @param {number} sendStart Started sending request.
 * @param {number} sendEnd Finished sending request.
 * @param {number} receiveHeadersEnd Finished receiving response headers.
 */
exports.ResourceTiming =
function ResourceTiming(props) {
  this.requestTime = props.requestTime;
  this.proxyStart = props.proxyStart;
  this.proxyEnd = props.proxyEnd;
  this.dnsStart = props.dnsStart;
  this.dnsEnd = props.dnsEnd;
  this.connectStart = props.connectStart;
  this.connectEnd = props.connectEnd;
  this.sslStart = props.sslStart;
  this.sslEnd = props.sslEnd;
  this.sendStart = props.sendStart;
  this.sendEnd = props.sendEnd;
  this.receiveHeadersEnd = props.receiveHeadersEnd;
};

/**
 * HTTP request data.
 * 
 * @param {string} url Request URL.
 * @param {string} method HTTP request method.
 * @param {Headers} headers HTTP request headers.
 * @param {string=} postData HTTP POST request data.
 */
exports.Request =
function Request(props) {
  this.url = props.url;
  this.method = props.method;
  this.headers = props.headers;
  this.postData = props.postData;
};

/**
 * HTTP response data.
 * 
 * @param {string} url Response URL. This URL can be different from CachedResource.url in case of redirect.
 * @param {number} status HTTP response status code.
 * @param {string} statusText HTTP response status text.
 * @param {Headers} headers HTTP response headers.
 * @param {string=} headersText HTTP response headers text.
 * @param {string} mimeType Resource mimeType as determined by the browser.
 * @param {Headers=} requestHeaders Refined HTTP request headers that were actually transmitted over the network.
 * @param {string=} requestHeadersText HTTP request headers text.
 * @param {boolean} connectionReused Specifies whether physical connection was actually reused for this request.
 * @param {number} connectionId Physical connection id that was actually used for this request.
 * @param {boolean=} fromDiskCache Specifies that the request was served from the disk cache.
 * @param {ResourceTiming=} timing Timing information for the given request.
 */
exports.Response =
function Response(props) {
  this.url = props.url;
  this.status = props.status;
  this.statusText = props.statusText;
  this.headers = props.headers;
  this.headersText = props.headersText;
  this.mimeType = props.mimeType;
  this.requestHeaders = props.requestHeaders;
  this.requestHeadersText = props.requestHeadersText;
  this.connectionReused = props.connectionReused;
  this.connectionId = props.connectionId;
  this.fromDiskCache = props.fromDiskCache;
  this.timing = props.timing;
};

/**
 * WebSocket request data.
 * 
 * @param {Headers} headers HTTP response headers.
 */
exports.WebSocketRequest =
function WebSocketRequest(props) {
  this.headers = props.headers;
};

/**
 * WebSocket response data.
 * 
 * @param {number} status HTTP response status code.
 * @param {string} statusText HTTP response status text.
 * @param {Headers} headers HTTP response headers.
 */
exports.WebSocketResponse =
function WebSocketResponse(props) {
  this.status = props.status;
  this.statusText = props.statusText;
  this.headers = props.headers;
};

/**
 * WebSocket frame data.
 * 
 * @param {number} opcode WebSocket frame opcode.
 * @param {boolean} mask WebSocke frame mask.
 * @param {string} payloadData WebSocke frame payload data.
 */
exports.WebSocketFrame =
function WebSocketFrame(props) {
  this.opcode = props.opcode;
  this.mask = props.mask;
  this.payloadData = props.payloadData;
};

/**
 * Information about the cached resource.
 * 
 * @param {string} url Resource URL. This is the url of the original network request.
 * @param {Page.ResourceType} type Type of this resource.
 * @param {Response=} response Cached response data.
 * @param {number} bodySize Cached response body size.
 */
exports.CachedResource =
function CachedResource(props) {
  this.url = props.url;
  this.type = props.type;
  this.response = props.response;
  this.bodySize = props.bodySize;
};

/**
 * Information about the request initiator.
 * 
 * @param {string parser|script|other} type Type of this initiator.
 * @param {Console.StackTrace=} stackTrace Initiator JavaScript stack trace, set for Script only.
 * @param {string=} url Initiator URL, set for Parser type only.
 * @param {number=} lineNumber Initiator line number, set for Parser type only.
 */
exports.Initiator =
function Initiator(props) {
  this.type = props.type;
  this.stackTrace = props.stackTrace;
  this.url = props.url;
  this.lineNumber = props.lineNumber;
};
