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
 * Search result for resource.
 * 
 * @param {string} url Resource URL.
 * @param {FrameId} frameId Resource frame id.
 * @param {number} matchesCount Number of matches in the resource content.
 */
exports.SearchResult =
function SearchResult(props) {
  this.url = props.url;
  this.frameId = props.frameId;
  this.matchesCount = props.matchesCount;
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
