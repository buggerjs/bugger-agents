'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function PageAgent(client) {
  if (!(this instanceof PageAgent))
    return new PageAgent(client);

  BaseAgent.call(this, PageAgent, client);
}
util.inherits(PageAgent, BaseAgent);
_.extend(PageAgent, require('./page.types'));
module.exports = PageAgent;

/**
 * Enables page domain notifications.
 */
PageAgent.prototype.enable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables page domain notifications.
 */
PageAgent.prototype.disable = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {string} scriptSource
 * 
 * @returns {ScriptIdentifier} identifier Identifier of the added script.
 */
PageAgent.prototype.addScriptToEvaluateOnLoad = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * 
 * @param {ScriptIdentifier} identifier
 */
PageAgent.prototype.removeScriptToEvaluateOnLoad = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Reloads given page optionally ignoring the cache.
 * 
 * @param {boolean=} ignoreCache If true, browser cache is ignored (as if the user pressed Shift+refresh).
 * @param {string=} scriptToEvaluateOnLoad If set, the script will be injected into all frames of the inspected page after reload.
 * @param {string=} scriptPreprocessor Script body that should evaluate to function that will preprocess all the scripts before their compilation.
 */
PageAgent.prototype.reload = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Navigates current page to the given URL.
 * 
 * @param {string} url URL to navigate the page to.
 */
PageAgent.prototype.navigate = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns navigation history for the current page.
 * 
 * 
 * 
 * @returns {integer} currentIndex Index of the current navigation history entry.
 * @returns {Array.<NavigationEntry>} entries Array of navigation history entries.
 */
PageAgent.prototype.getNavigationHistory = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Navigates current page to the given history entry.
 * 
 * @param {integer} entryId Unique id of the entry to navigate to.
 */
PageAgent.prototype.navigateToHistoryEntry = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns all browser cookies.
 * Depending on the backend support, will either return detailed cookie information in the <code>cookie</code> field or string cookie representation using <code>cookieString</code>.
 * 
 * @returns {Array.<Cookie>} cookies Array of cookie objects.
 * @returns {string} cookiesString document.cookie string representation of the cookies.
 */
PageAgent.prototype.getCookies = function() {
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
PageAgent.prototype.deleteCookie = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns present frame / resource tree structure.
 * 
 * @returns {FrameResourceTree} frameTree Present frame / resource tree structure.
 */
PageAgent.prototype.getResourceTree = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
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
PageAgent.prototype.getResourceContent = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
 * @returns {Array.<SearchMatch>} result List of search matches.
 */
PageAgent.prototype.searchInResource = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
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
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets given markup as the document's HTML.
 * 
 * @param {FrameId} frameId Frame id to set HTML for.
 * @param {string} html HTML content to set.
 */
PageAgent.prototype.setDocumentContent = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Overrides the values of device screen dimensions (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight, and "device-width"/"device-height"-related CSS media query results) and the font scale factor.
 * 
 * @param {integer} width Overriding width value in pixels (minimum 0, maximum 10000000). 0 disables the override.
 * @param {integer} height Overriding height value in pixels (minimum 0, maximum 10000000). 0 disables the override.
 * @param {number} fontScaleFactor Overriding font scale factor value (must be positive). 1 disables the override.
 * @param {boolean} fitWindow Whether a view that exceeds the available browser window area should be scaled down to fit.
 */
PageAgent.prototype.setDeviceMetricsOverride = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that backend shows paint rectangles
 * 
 * @param {boolean} result True for showing paint rectangles
 */
PageAgent.prototype.setShowPaintRects = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that backend shows debug borders on layers
 * 
 * @param {boolean} show True for showing debug borders
 */
PageAgent.prototype.setShowDebugBorders = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that backend shows the FPS counter
 * 
 * @param {boolean} show True for showing the FPS counter
 */
PageAgent.prototype.setShowFPSCounter = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that backend enables continuous painting
 * 
 * @param {boolean} enabled True for enabling cointinuous painting
 */
PageAgent.prototype.setContinuousPaintingEnabled = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that backend shows scroll bottleneck rects
 * 
 * @param {boolean} show True for showing scroll bottleneck rects
 */
PageAgent.prototype.setShowScrollBottleneckRects = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Determines if scripts can be executed in the page.
 * 
 * @returns {string allowed|disabled|forbidden} result Script execution status: "allowed" if scripts can be executed, "disabled" if script execution has been disabled through page settings, "forbidden" if script execution for the given page is not possible for other reasons.
 */
PageAgent.prototype.getScriptExecutionStatus = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Switches script execution in the page.
 * 
 * @param {boolean} value Whether script execution should be disabled in the page.
 */
PageAgent.prototype.setScriptExecutionDisabled = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Overrides the Geolocation Position or Error.
 * 
 * @param {number=} latitude Mock longitude
 * @param {number=} longitude Mock latitude
 * @param {number=} accuracy Mock accuracy
 */
PageAgent.prototype.setGeolocationOverride = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Clears the overriden Geolocation Position and Error.
 */
PageAgent.prototype.clearGeolocationOverride = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Overrides the Device Orientation.
 * 
 * @param {number} alpha Mock alpha
 * @param {number} beta Mock beta
 * @param {number} gamma Mock gamma
 */
PageAgent.prototype.setDeviceOrientationOverride = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Clears the overridden Device Orientation.
 */
PageAgent.prototype.clearDeviceOrientationOverride = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Toggles mouse event-based touch event emulation.
 * 
 * @param {boolean} enabled Whether the touch event emulation should be enabled.
 */
PageAgent.prototype.setTouchEmulationEnabled = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Emulates the given media for CSS media queries.
 * 
 * @param {string} media Media type to emulate. Empty string disables the override.
 */
PageAgent.prototype.setEmulatedMedia = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Capture page screenshot.
 * 
 * @param {string jpeg|png=} format Image compression format.
 * @param {integer=} quality Compression quality from range [0..100].
 * @param {integer=} maxWidth Maximum screenshot width.
 * @param {integer=} maxHeight Maximum screenshot height.
 * 
 * @returns {string} data Base64-encoded image data (PNG).
 * @returns {number} deviceScaleFactor Device scale factor.
 * @returns {number} pageScaleFactor Page scale factor.
 * @returns {DOM.Rect} viewport Viewport in CSS pixels.
 */
PageAgent.prototype.captureScreenshot = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Starts sending each frame using the <code>screencastFrame</code> event.
 * 
 * @param {string jpeg|png=} format Image compression format.
 * @param {integer=} quality Compression quality from range [0..100].
 * @param {integer=} maxWidth Maximum screenshot width.
 * @param {integer=} maxHeight Maximum screenshot height.
 */
PageAgent.prototype.startScreencast = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Stops sending each frame in the <code>screencastFrame</code>.
 */
PageAgent.prototype.stopScreencast = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
 * 
 * @param {boolean} accept Whether to accept or dismiss the dialog.
 * @param {string=} promptText The text to enter into the dialog prompt before accepting. Used only if this is a prompt dialog.
 */
PageAgent.prototype.handleJavaScriptDialog = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Paints viewport size upon main frame resize.
 * 
 * @param {boolean} show Whether to paint size or not.
 * @param {boolean=} showGrid Whether to paint grid as well.
 */
PageAgent.prototype.setShowViewportSizeOnResize = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Force accelerated compositing mode for inspected page.
 * 
 * @param {boolean} force Whether to force accelerated compositing or not.
 */
PageAgent.prototype.setForceCompositingMode = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
