'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function NetworkAgent(client) {
  if (!(this instanceof NetworkAgent))
    return new NetworkAgent(client);

  BaseAgent.call(this, NetworkAgent, client);
}
util.inherits(NetworkAgent, BaseAgent);
_.extend(NetworkAgent, require('./network.types'));
module.exports = NetworkAgent;

/**
 * Enables network tracking, network events will now be delivered to the client.
 */
NetworkAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables network tracking, prevents network events from being sent to the client.
 */
NetworkAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Allows overriding user agent with the given string.
 * 
 * @param {string} userAgent User agent to use.
 */
NetworkAgent.prototype.setUserAgentOverride = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Specifies whether to always send extra HTTP headers with the requests from this page.
 * 
 * @param {Headers} headers Map with extra HTTP headers.
 */
NetworkAgent.prototype.setExtraHTTPHeaders = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns content served for the given request.
 * 
 * @param {RequestId} requestId Identifier of the network request to get content for.
 * 
 * @returns {string} body Response body.
 * @returns {boolean} base64Encoded True, if content was sent as base64.
 */
NetworkAgent.prototype.getResponseBody = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * This method sends a new XMLHttpRequest which is identical to the original one.
 * The following parameters should be identical: method, url, async, request body, extra headers, withCredentials attribute, user, password.
 * 
 * @param {RequestId} requestId Identifier of XHR to replay.
 */
NetworkAgent.prototype.replayXHR = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Tells whether clearing browser cache is supported.
 * 
 * @returns {boolean} result True if browser cache can be cleared.
 */
NetworkAgent.prototype.canClearBrowserCache = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Clears browser cache.
 */
NetworkAgent.prototype.clearBrowserCache = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Tells whether clearing browser cookies is supported.
 * 
 * @returns {boolean} result True if browser cookies can be cleared.
 */
NetworkAgent.prototype.canClearBrowserCookies = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Clears browser cookies.
 */
NetworkAgent.prototype.clearBrowserCookies = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Toggles ignoring cache for each request.
 * If <code>true</code>, cache will not be used.
 * 
 * @param {boolean} cacheDisabled Cache disabled state.
 */
NetworkAgent.prototype.setCacheDisabled = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
NetworkAgent.prototype.loadResourceForFrontend = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
