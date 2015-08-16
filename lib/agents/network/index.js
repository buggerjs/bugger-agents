'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function NetworkAgent(client, child) {
  if (!(this instanceof NetworkAgent))
    return new NetworkAgent(client, child);

  BaseAgent.call(this, client, child);

  var self = this;
  child.on('online', function() {
    self._injectProbe();
  });
}
util.inherits(NetworkAgent, BaseAgent);
_.extend(NetworkAgent, require('./types'));
module.exports = NetworkAgent;

/**
 * Enables network tracking, network events will now be delivered to the client.
 */
NetworkAgent.prototype.enable =
function enable() {
  return this._injectProbe();
};

/**
 * Disables network tracking, prevents network events from being sent to the client.
 */
NetworkAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * Allows overriding user agent with the given string.
 * 
 * @param {string} userAgent User agent to use.
 */
NetworkAgent.prototype.setUserAgentOverride =
function setUserAgentOverride() {
  throw new Error('Not implemented');
};

/**
 * Specifies whether to always send extra HTTP headers with the requests from this page.
 * 
 * @param {Headers} headers Map with extra HTTP headers.
 */
NetworkAgent.prototype.setExtraHTTPHeaders =
function setExtraHTTPHeaders() {
  // E.g. fire php will use this
};

/**
 * Returns content served for the given request.
 * 
 * @param {RequestId} requestId Identifier of the network request to get content for.
 * 
 * @returns {string} body Response body.
 * @returns {boolean} base64Encoded True, if content was sent as base64.
 */
NetworkAgent.prototype.getResponseBody =
function getResponseBody() {
  throw new Error('Not implemented');
};

/**
 * This method sends a new XMLHttpRequest which is identical to the original one.
 * The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.
 * 
 * @param {RequestId} requestId Identifier of XHR to replay.
 */
NetworkAgent.prototype.replayXHR =
function replayXHR() {
  throw new Error('Not implemented');
};

/**
 * Tells whether clearing browser cache is supported.
 * 
 * @returns {boolean} result True if browser cache can be cleared.
 */
NetworkAgent.prototype.canClearBrowserCache =
function canClearBrowserCache() {
  throw new Error('Not implemented');
};

/**
 * Clears browser cache.
 */
NetworkAgent.prototype.clearBrowserCache =
function clearBrowserCache() {
  throw new Error('Not implemented');
};

/**
 * Tells whether clearing browser cookies is supported.
 * 
 * @returns {boolean} result True if browser cookies can be cleared.
 */
NetworkAgent.prototype.canClearBrowserCookies =
function canClearBrowserCookies() {
  throw new Error('Not implemented');
};

/**
 * Clears browser cookies.
 */
NetworkAgent.prototype.clearBrowserCookies =
function clearBrowserCookies() {
  throw new Error('Not implemented');
};

/**
 * Toggles ignoring cache for each request.
 * If <code>true</code>, cache will not be used.
 * 
 * @param {boolean} cacheDisabled Cache disabled state.
 */
NetworkAgent.prototype.setCacheDisabled =
function setCacheDisabled() {
  throw new Error('Not implemented');
};

/**
 * Loads a resource in the context of a frame on the inspected page without cross origin checks.
 * 
 * @param {Page.FrameId} frameId Frame to load the resource from.
 * @param {string} url URL of the resource to load.
 * @param {Network.Headers=} requestHeaders Request headers.
 * 
 * @returns {number} statusCode HTTP status code.
 * @returns {Network.Headers} responseHeaders Response headers.
 * @returns {string} content Resource content.
 */
NetworkAgent.prototype.loadResourceForFrontend =
function loadResourceForFrontend() {
  throw new Error('Not implemented');
};

/**
 * Tells whether emulation of network conditions is supported.
 * 
 * @returns {boolean} result True if emulation of network conditions is supported.
 */
NetworkAgent.prototype.canEmulateNetworkConditions =
function canEmulateNetworkConditions() {
  return false;
};

/**
 * Activates emulation of network conditions.
 * 
 * @param {boolean} offline True to emulate internet disconnection.
 * @param {number} latency Additional latency (ms).
 * @param {number} downloadThroughput Maximal aggregated download throughput.
 * @param {number} uploadThroughput Maximal aggregated upload throughput.
 */
NetworkAgent.prototype.emulateNetworkConditions =
function emulateNetworkConditions() {
  throw new Error('Not implemented');
};

/**
 * Toggles monitoring of XMLHttpRequest.
 * If <code>true</code>, console will receive messages upon each XHR issued.
 * 
 * @param {boolean} enabled Monitoring enabled state.
 */
NetworkAgent.prototype.setMonitoringXHREnabled =
function setMonitoringXHREnabled() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns all browser cookies.
 * Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.
 * 
 * @returns {Array.<Cookie>} cookies Array of cookie objects.
 */
NetworkAgent.prototype.getCookies =
function getCookies() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Deletes browser cookie with given name, domain and path.
 * 
 * @param {string} cookieName Name of the cookie to remove.
 * @param {string} url URL to match cooke domain and path.
 */
NetworkAgent.prototype.deleteCookie =
function deleteCookie() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * For testing.
 * 
 * @param {integer} maxTotalSize Maximum total buffer size.
 * @param {integer} maxResourceSize Maximum per-resource size.
 */
NetworkAgent.prototype.setDataSizeLimitsForTest =
function setDataSizeLimitsForTest() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
