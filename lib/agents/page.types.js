'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Resource type as it was perceived by the rendering engine.
 */
exports.ResourceType = String;

/**
 * Unique frame identifier.
 */
exports.FrameId = String;

/**
 * Information about the Frame on the page.
 * 
 * @param {string} id Frame unique identifier.
 * @param {string=} parentId Parent frame identifier.
 * @param {Network.LoaderId} loaderId Identifier of the loader associated with this frame.
 * @param {string=} name Frame's name as specified in the tag.
 * @param {string} url Frame document's URL.
 * @param {string} securityOrigin Frame document's security origin.
 * @param {string} mimeType Frame document's mimeType as determined by the browser.
 */
exports.Frame =
function Frame(props) {
  this.id = props.id;
  this.parentId = props.parentId;
  this.loaderId = props.loaderId;
  this.name = props.name;
  this.url = props.url;
  this.securityOrigin = props.securityOrigin;
  this.mimeType = props.mimeType;
};

/**
 * Information about the Frame hierarchy along with their cached resources.
 * 
 * @param {Frame} frame Frame information for this tree item.
 * @param {Array.<FrameResourceTree>=} childFrames Child frames.
 * @param {Array.<{url: string, type: ResourceType, mimeType: string, failed: boolean=, canceled: boolean=}>} resources Information about frame resources.
 */
exports.FrameResourceTree =
function FrameResourceTree(props) {
  this.frame = props.frame;
  this.childFrames = props.childFrames;
  this.resources = props.resources;
};

/**
 * Search match for resource.
 * 
 * @param {number} lineNumber Line number in resource content.
 * @param {string} lineContent Line with match content.
 */
exports.SearchMatch =
function SearchMatch(props) {
  this.lineNumber = props.lineNumber;
  this.lineContent = props.lineContent;
};

/**
 * Cookie object
 * 
 * @param {string} name Cookie name.
 * @param {string} value Cookie value.
 * @param {string} domain Cookie domain.
 * @param {string} path Cookie path.
 * @param {number} expires Cookie expires.
 * @param {integer} size Cookie size.
 * @param {boolean} httpOnly True if cookie is http-only.
 * @param {boolean} secure True if cookie is secure.
 * @param {boolean} session True in case of session cookie.
 */
exports.Cookie =
function Cookie(props) {
  this.name = props.name;
  this.value = props.value;
  this.domain = props.domain;
  this.path = props.path;
  this.expires = props.expires;
  this.size = props.size;
  this.httpOnly = props.httpOnly;
  this.secure = props.secure;
  this.session = props.session;
};

/**
 * Unique script identifier.
 */
exports.ScriptIdentifier = String;

/**
 * Navigation history entry.
 * 
 * @param {integer} id Unique id of the navigation history entry.
 * @param {string} url URL of the navigation history entry.
 * @param {string} title Title of the navigation history entry.
 */
exports.NavigationEntry =
function NavigationEntry(props) {
  this.id = props.id;
  this.url = props.url;
  this.title = props.title;
};

/**
 * Quota information
 * 
 * @param {number} temporary Quota for temporary storage shared among all security origins
 * @param {number} persistent Quota for persistent storage for the security origin.
 */
exports.Quota =
function Quota(props) {
  this.temporary = props.temporary;
  this.persistent = props.persistent;
};

/**
 * Usage information
 * 
 * @param {Array.<Page.UsageItem>} temporary Temporary storage usage.
 * @param {Array.<Page.UsageItem>} persistent Persistent storage usage.
 * @param {Array.<Page.UsageItem>} syncable Syncable storage.
 */
exports.Usage =
function Usage(props) {
  this.temporary = props.temporary;
  this.persistent = props.persistent;
  this.syncable = props.syncable;
};

/**
 * Usage information for a client and storage type
 * 
 * @param {string filesystem|database|appcache|indexeddatabase} id Item id.
 * @param {number} value Item usage value.
 */
exports.UsageItem =
function UsageItem(props) {
  this.id = props.id;
  this.value = props.value;
};

/**
 * Visible page viewport
 * 
 * @param {number} scrollX X scroll offset in CSS pixels.
 * @param {number} scrollY Y scroll offset in CSS pixels.
 * @param {number} contentsWidth Contents width in CSS pixels.
 * @param {number} contentsHeight Contents height in CSS pixels.
 * @param {number} pageScaleFactor Page scale factor.
 * @param {number} minimumPageScaleFactor Minimum page scale factor.
 * @param {number} maximumPageScaleFactor Maximum page scale factor.
 */
exports.Viewport =
function Viewport(props) {
  this.scrollX = props.scrollX;
  this.scrollY = props.scrollY;
  this.contentsWidth = props.contentsWidth;
  this.contentsHeight = props.contentsHeight;
  this.pageScaleFactor = props.pageScaleFactor;
  this.minimumPageScaleFactor = props.minimumPageScaleFactor;
  this.maximumPageScaleFactor = props.maximumPageScaleFactor;
};

/**
 * Screencast frame metadata
 * 
 * @param {number} deviceScaleFactor Device scale factor.
 * @param {DOM.Rect} viewport Viewport in CSS pixels.
 * @param {number=} offsetTop Top offset in DIP.
 * @param {number=} offsetBottom Bottom offset in DIP.
 * @param {number} pageScaleFactor Page scale factor.
 * @param {number} pageScaleFactorMin Page scale factor min.
 * @param {number} pageScaleFactorMax Page scale factor max.
 * @param {number} deviceWidth Device screen width in DIP.
 * @param {number} deviceHeight Device screen height in DIP.
 * @param {number} scrollOffsetX Position of horizontal scroll in CSS pixels.
 * @param {number} scrollOffsetY Position of vertical scroll in CSS pixels.
 */
exports.ScreencastFrameMetadata =
function ScreencastFrameMetadata(props) {
  this.deviceScaleFactor = props.deviceScaleFactor;
  this.viewport = props.viewport;
  this.offsetTop = props.offsetTop;
  this.offsetBottom = props.offsetBottom;
  this.pageScaleFactor = props.pageScaleFactor;
  this.pageScaleFactorMin = props.pageScaleFactorMin;
  this.pageScaleFactorMax = props.pageScaleFactorMax;
  this.deviceWidth = props.deviceWidth;
  this.deviceHeight = props.deviceHeight;
  this.scrollOffsetX = props.scrollOffsetX;
  this.scrollOffsetY = props.scrollOffsetY;
};
