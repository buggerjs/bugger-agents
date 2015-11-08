'use strict';

var path = require('path');
var util = require('util');

var _ = require('lodash');
var Bluebird = require('bluebird');
var debug = require('debug')('bugger-agents:page');

var BaseAgent = require('../base');

function PageAgent(client, child) {
  if (!(this instanceof PageAgent))
    return new PageAgent(client, child);

  BaseAgent.call(this, client, child);

  var cwd = (child._meta && child._meta.cwd) || process.cwd();
  var processUrl = 'file://' + path.join(cwd, '.bugger');

  this.rootFrame = {
    id: 'bugger-frame',
    loaderId: 'loader-id',
    url: processUrl,
    securityOrigin: '*',
    mimeType: 'text/plain'
  };

  var self = this;
  child.on('forked', function() {
    self._debugEvent('frameStartedLoading', { frameId: self.rootFrame.id });
  });
  child.on('online', function() {
    self._debugEvent('frameNavigated', { frame: self.rootFrame });
  });
}
util.inherits(PageAgent, BaseAgent);
_.extend(PageAgent, require('./types'));
module.exports = PageAgent;

/**
 * Enables page domain notifications.
 */
PageAgent.prototype.enable =
function enable(params) {
  return this._ignore('enable', params);
};

/**
 * Disables page domain notifications.
 */
PageAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {string} scriptSource
 * 
 * @returns {ScriptIdentifier} identifier Identifier of the added script.
 */
PageAgent.prototype.addScriptToEvaluateOnLoad =
function addScriptToEvaluateOnLoad() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {ScriptIdentifier} identifier
 */
PageAgent.prototype.removeScriptToEvaluateOnLoad =
function removeScriptToEvaluateOnLoad() {
  throw new Error('Not implemented');
};

/**
 * Reloads given page optionally ignoring the cache.
 * 
 * @param {boolean=} ignoreCache If true, browser cache is ignored (as if the user pressed Shift+refresh).
 * @param {string=} scriptToEvaluateOnLoad If set, the script will be injected into all frames of the inspected page after reload.
 */
PageAgent.prototype.reload =
function reload(params) {
  if (params.ignoreCache) {
    this.child.spawn();
  }
};

/**
 * Navigates current page to the given URL.
 * 
 * @param {string} url URL to navigate the page to.
 * 
 * @returns {FrameId} frameId Frame id that will be navigated.
 */
PageAgent.prototype.navigate =
function navigate() {
  throw new Error('Not implemented');
};

/**
 * Returns navigation history for the current page.
 * 
 * 
 * 
 * @returns {integer} currentIndex Index of the current navigation history entry.
 * @returns {Array.<NavigationEntry>} entries Array of navigation history entries.
 */
PageAgent.prototype.getNavigationHistory =
function getNavigationHistory() {
  throw new Error('Not implemented');
};

/**
 * Navigates current page to the given history entry.
 * 
 * @param {integer} entryId Unique id of the entry to navigate to.
 */
PageAgent.prototype.navigateToHistoryEntry =
function navigateToHistoryEntry() {
  throw new Error('Not implemented');
};

/**
 * Returns all browser cookies.
 * Depending on the backend support, will return detailed cookie information in the <code>cookies</code> field.
 * 
 * @returns {Array.<Network.Cookie>} cookies Array of cookie objects.
 */
PageAgent.prototype.getCookies =
function getCookies() {
  throw new Error('Not implemented');
};

/**
 * Deletes browser cookie with given name, domain and path.
 * 
 * @param {string} cookieName Name of the cookie to remove.
 * @param {string} url URL to match cooke domain and path.
 */
PageAgent.prototype.deleteCookie =
function deleteCookie() {
  throw new Error('Not implemented');
};

/**
 * Returns present frame / resource tree structure.
 * 
 * @returns {FrameResourceTree} frameTree Present frame / resource tree structure.
 */
PageAgent.prototype.getResourceTree =
function getResourceTree() {
  debug('Returning fake resource tree');
  return Bluebird.resolve({
    frameTree: {
      frame: this.rootFrame,
      childFrames: [],
      resources: []
    }
  });
};

/**
 * Returns content of the given resource.
 * 
 * @param {FrameId} frameId Frame id to get resource for.
 * @param {string} url URL of the resource to get content for.
 * 
 * @returns {string} content Resource content.
 * @returns {boolean} base64Encoded True, if content was served as base64.
 */
PageAgent.prototype.getResourceContent =
function getResourceContent(params) {
  if (params.url === this.rootFrame.url) {
    return this.client.getMeta()
      .then(function(meta) {
        return {
          content: JSON.stringify(meta, null, 2) + '\n',
          base64Encoded: false
        };
      });
  }
  throw new Error('Not implemented');
};

/**
 * Searches for given string in resource content.
 * 
 * @param {FrameId} frameId Frame id for resource to search in.
 * @param {string} url URL of the resource to search in.
 * @param {string} query String to search for.
 * @param {boolean=} caseSensitive If true, search is case sensitive.
 * @param {boolean=} isRegex If true, treats string parameter as regex.
 * 
 * @returns {Array.<Debugger.SearchMatch>} result List of search matches.
 */
PageAgent.prototype.searchInResource =
function searchInResource() {
  throw new Error('Not implemented');
};

/**
 * Searches for given string in frame / resource tree structure.
 * 
 * @param {string} text String to search for.
 * @param {boolean=} caseSensitive If true, search is case sensitive.
 * @param {boolean=} isRegex If true, treats string parameter as regex.
 * 
 * @returns {Array.<SearchResult>} result List of search results.
 */
PageAgent.prototype.searchInResources = function() {
  throw new Error('Not implemented');
};

/**
 * Sets given markup as the document's HTML.
 * 
 * @param {FrameId} frameId Frame id to set HTML for.
 * @param {string} html HTML content to set.
 */
PageAgent.prototype.setDocumentContent =
function setDocumentContent() {
  throw new Error('Not implemented');
};

/**
 * Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results).
 * 
 * @param {integer} width Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
 * @param {integer} height Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
 * @param {number} deviceScaleFactor Overriding device scale factor value. 0 disables the override.
 * @param {boolean} mobile Whether to emulate mobile device. This includes viewport meta tag, overlay scrollbars, text autosizing and more.
 * @param {boolean} fitWindow Whether a view that exceeds the available browser window area should be scaled down to fit.
 * @param {number=} scale Scale to apply to resulting view image. Ignored in |fitWindow| mode.
 * @param {number=} offsetX X offset to shift resulting view image by. Ignored in |fitWindow| mode.
 * @param {number=} offsetY Y offset to shift resulting view image by. Ignored in |fitWindow| mode.
 * @param {integer=} screenWidth Overriding screen width value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
 * @param {integer=} screenHeight Overriding screen height value in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
 * @param {integer=} positionX Overriding view X position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
 * @param {integer=} positionY Overriding view Y position on screen in pixels (minimum 0, maximum 10000000). Only used for |mobile==true|.
 */
PageAgent.prototype.setDeviceMetricsOverride =
function setDeviceMetricsOverride() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend shows paint rectangles
 * 
 * @param {boolean} result True for showing paint rectangles
 */
PageAgent.prototype.setShowPaintRects =
function setShowPaintRects() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend shows debug borders on layers
 * 
 * @param {boolean} show True for showing debug borders
 */
PageAgent.prototype.setShowDebugBorders =
function setShowDebugBorders() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend shows the FPS counter
 * 
 * @param {boolean} show True for showing the FPS counter
 */
PageAgent.prototype.setShowFPSCounter =
function setShowFPSCounter() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend enables continuous painting
 * 
 * @param {boolean} enabled True for enabling cointinuous painting
 */
PageAgent.prototype.setContinuousPaintingEnabled =
function setContinuousPaintingEnabled() {
  throw new Error('Not implemented');
};

/**
 * Requests that backend shows scroll bottleneck rects
 * 
 * @param {boolean} show True for showing scroll bottleneck rects
 */
PageAgent.prototype.setShowScrollBottleneckRects =
function setShowScrollBottleneckRects() {
  throw new Error('Not implemented');
};

/**
 * Determines if scripts can be executed in the page.
 * 
 * @returns {string allowed|disabled|forbidden} result Script execution status: "allowed" if scripts can be executed, "disabled" if script execution has been disabled through page settings, "forbidden" if script execution for the given page is not possible for other reasons.
 */
PageAgent.prototype.getScriptExecutionStatus =
function getScriptExecutionStatus() {
  throw new Error('Not implemented');
};

/**
 * Switches script execution in the page.
 * 
 * @param {boolean} value Whether script execution should be disabled in the page.
 */
PageAgent.prototype.setScriptExecutionDisabled =
function setScriptExecutionDisabled() {
  throw new Error('Not implemented');
};

/**
 * Overrides the Geolocation Position or Error.
 * Omitting any of the parameters emulates position unavailable.
 * 
 * @param {number=} latitude Mock latitude
 * @param {number=} longitude Mock longitude
 * @param {number=} accuracy Mock accuracy
 */
PageAgent.prototype.setGeolocationOverride =
function setGeolocationOverride() {
  throw new Error('Not implemented');
};

/**
 * Clears the overriden Geolocation Position and Error.
 */
PageAgent.prototype.clearGeolocationOverride =
function clearGeolocationOverride() {
  throw new Error('Not implemented');
};

/**
 * Overrides the Device Orientation.
 * 
 * @param {number} alpha Mock alpha
 * @param {number} beta Mock beta
 * @param {number} gamma Mock gamma
 */
PageAgent.prototype.setDeviceOrientationOverride =
function setDeviceOrientationOverride() {
  throw new Error('Not implemented');
};

/**
 * Clears the overridden Device Orientation.
 */
PageAgent.prototype.clearDeviceOrientationOverride =
function clearDeviceOrientationOverride() {
  throw new Error('Not implemented');
};

/**
 * Toggles mouse event-based touch event emulation.
 * 
 * @param {boolean} enabled Whether the touch event emulation should be enabled.
 * @param {string mobile|desktop=} configuration Touch/gesture events configuration. Default: current platform.
 */
PageAgent.prototype.setTouchEmulationEnabled =
function setTouchEmulationEnabled(params) {
  return this._ignore('setTouchEmulationEnabled', params);
};

/**
 * Emulates the given media for CSS media queries.
 * 
 * @param {string} media Media type to emulate. Empty string disables the override.
 */
PageAgent.prototype.setEmulatedMedia =
function setEmulatedMedia() {
  throw new Error('Not implemented');
};

/**
 * Capture page screenshot.
 * 
 * 
 * 
 * @returns {string} data Base64-encoded image data (PNG).
 */
PageAgent.prototype.captureScreenshot =
function captureScreenshot() {
  throw new Error('Not implemented');
};

/**
 * Starts sending each frame using the <code>screencastFrame</code> event.
 * 
 * @param {string jpeg|png=} format Image compression format.
 * @param {integer=} quality Compression quality from range [0..100].
 * @param {integer=} maxWidth Maximum screenshot width.
 * @param {integer=} maxHeight Maximum screenshot height.
 */
PageAgent.prototype.startScreencast =
function startScreencast() {
  throw new Error('Not implemented');
};

/**
 * Stops sending each frame in the <code>screencastFrame</code>.
 */
PageAgent.prototype.stopScreencast =
function stopScreencast() {
  throw new Error('Not implemented');
};

/**
 * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
 * 
 * @param {boolean} accept Whether to accept or dismiss the dialog.
 * @param {string=} promptText The text to enter into the dialog prompt before accepting. Used only if this is a prompt dialog.
 */
PageAgent.prototype.handleJavaScriptDialog =
function handleJavaScriptDialog() {
  throw new Error('Not implemented');
};

/**
 * Paints viewport size upon main frame resize.
 * 
 * @param {boolean} show Whether to paint size or not.
 * @param {boolean=} showGrid Whether to paint grid as well.
 */
PageAgent.prototype.setShowViewportSizeOnResize =
function setShowViewportSizeOnResize(params) {
  return this._ignore('setShowViewportSizeOnResize', params);
};

/**
 * Force accelerated compositing mode for inspected page.
 * 
 * @param {boolean} force Whether to force accelerated compositing or not.
 */
PageAgent.prototype.setForceCompositingMode = function() {
  throw new Error('Not implemented');
};

/**
 * Clears the overriden device metrics.
 */
PageAgent.prototype.clearDeviceMetricsOverride =
function clearDeviceMetricsOverride() {
  throw new Error('Not implemented');
};

/**
 * Requests that scroll offsets and page scale factor are reset to initial values.
 */
PageAgent.prototype.resetScrollAndPageScaleFactor =
function resetScrollAndPageScaleFactor() {
  throw new Error('Not implemented');
};

/**
 * Sets a specified page scale factor.
 * 
 * @param {number} pageScaleFactor Page scale factor.
 */
PageAgent.prototype.setPageScaleFactor =
function setPageScaleFactor() {
  throw new Error('Not implemented');
};

/**
 * Tells whether screencast is supported.
 * 
 * @returns {boolean} result True if screencast is supported.
 */
PageAgent.prototype.canScreencast =
function canScreencast() {
  return Bluebird.resolve({ result: false });
};

/**
 * Tells whether emulation is supported.
 * 
 * @returns {boolean} result True if emulation is supported.
 */
PageAgent.prototype.canEmulate =
function canEmulate() {
  return Bluebird.resolve({ result: false });
};

PageAgent.prototype.hasTouchInputs =
function hasTouchInputs() {
  // Don't ask me where this is documented or even mentioned
  return Bluebird.resolve({ result: false });
};

/**
 * Queries more detailed quota and usage data than Storage API provides.
 * 
 * @param {string} securityOrigin Security origin quota and usage requested for
 * 
 * @returns {Quota} quota Quota for requested security origin.
 * @returns {Usage} usage Current usage for requested security origin.
 */
PageAgent.prototype.queryUsageAndQuota =
function queryUsageAndQuota() {
  throw new Error('Not implemented');
};

/**
 * Shows / hides color picker
 * 
 * @param {boolean} enabled Shows / hides color picker
 */
PageAgent.prototype.setColorPickerEnabled =
function setColorPickerEnabled() {
  return this._ignore('setColorPickerEnabled');
};

/**
 * Acknowledges that a screencast frame has been received by the frontend.
 * 
 * @param {integer} frameNumber Frame number.
 */
PageAgent.prototype.screencastFrameAck =
function screencastFrameAck() {
  throw new Error('Not implemented');
};

/**
 * Sets overlay message.
 * 
 * @param {string=} message Overlay message to display when paused in debugger.
 */
PageAgent.prototype.setOverlayMessage =
function setOverlayMessage() {
  // Ignore. We don't have any additional UI.
};
