'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function DOMAgent(client) {
  if (!(this instanceof DOMAgent))
    return new DOMAgent(client);

  BaseAgent.call(this, DOMAgent, client);
}
util.inherits(DOMAgent, BaseAgent);
_.extend(DOMAgent, require('./dom.types'));
module.exports = DOMAgent;

/**
 * Returns the root DOM node to the caller.
 * 
 * @returns {Node} root Resulting node.
 */
DOMAgent.prototype.getDocument =
function getDocument() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that children of the node with given id are returned to the caller in form of <code>setChildNodes</code> events where not only immediate children are retrieved, but all children down to the specified depth.
 * 
 * @param {NodeId} nodeId Id of the node to get children for.
 * @param {integer=} depth The maximum depth at which children should be retrieved, defaults to 1. Use -1 for the entire subtree or provide an integer larger than 0.
 */
DOMAgent.prototype.requestChildNodes =
function requestChildNodes() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Executes <code>querySelector</code> on a given node.
 * 
 * @param {NodeId} nodeId Id of the node to query upon.
 * @param {string} selector Selector string.
 * 
 * @returns {NodeId} nodeId Query selector result.
 */
DOMAgent.prototype.querySelector =
function querySelector() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Executes <code>querySelectorAll</code> on a given node.
 * 
 * @param {NodeId} nodeId Id of the node to query upon.
 * @param {string} selector Selector string.
 * 
 * @returns {Array.<NodeId>} nodeIds Query selector result.
 */
DOMAgent.prototype.querySelectorAll =
function querySelectorAll() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets node name for a node with given id.
 * 
 * @param {NodeId} nodeId Id of the node to set name for.
 * @param {string} name New node's name.
 * 
 * @returns {NodeId} nodeId New node's id.
 */
DOMAgent.prototype.setNodeName =
function setNodeName() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets node value for a node with given id.
 * 
 * @param {NodeId} nodeId Id of the node to set value for.
 * @param {string} value New node's value.
 */
DOMAgent.prototype.setNodeValue =
function setNodeValue() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Removes node with given id.
 * 
 * @param {NodeId} nodeId Id of the node to remove.
 */
DOMAgent.prototype.removeNode =
function removeNode() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets attribute for an element with given id.
 * 
 * @param {NodeId} nodeId Id of the element to set attribute for.
 * @param {string} name Attribute name.
 * @param {string} value Attribute value.
 */
DOMAgent.prototype.setAttributeValue =
function setAttributeValue() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets attributes on element with given id.
 * This method is useful when user edits some existing attribute value and types in several attribute name/value pairs.
 * 
 * @param {NodeId} nodeId Id of the element to set attributes for.
 * @param {string} text Text with a number of attributes. Will parse this text using HTML parser.
 * @param {string=} name Attribute name to replace with new attributes derived from text in case text parsed successfully.
 */
DOMAgent.prototype.setAttributesAsText =
function setAttributesAsText() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Removes attribute with given name from an element with given id.
 * 
 * @param {NodeId} nodeId Id of the element to remove attribute from.
 * @param {string} name Name of the attribute to remove.
 */
DOMAgent.prototype.removeAttribute =
function removeAttribute() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns event listeners relevant to the node.
 * 
 * @param {NodeId} nodeId Id of the node to get listeners for.
 * @param {string=} objectGroup Symbolic group name for handler value. Handler value is not returned without this parameter specified.
 * 
 * @returns {Array.<EventListener>} listeners Array of relevant listeners.
 */
DOMAgent.prototype.getEventListenersForNode =
function getEventListenersForNode() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns node's HTML markup.
 * 
 * @param {NodeId} nodeId Id of the node to get markup for.
 * 
 * @returns {string} outerHTML Outer HTML markup.
 */
DOMAgent.prototype.getOuterHTML =
function getOuterHTML() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets node HTML markup, returns new node id.
 * 
 * @param {NodeId} nodeId Id of the node to set markup for.
 * @param {string} outerHTML Outer HTML markup to set.
 */
DOMAgent.prototype.setOuterHTML =
function setOuterHTML() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Searches for a given string in the DOM tree.
 * Use <code>getSearchResults</code> to access search results or <code>cancelSearch</code> to end this search session.
 * 
 * @param {string} query Plain text or query selector or XPath search query.
 * @param {boolean=} includeUserAgentShadowDOM True to search in user agent shadow DOM.
 * 
 * @returns {string} searchId Unique search session identifier.
 * @returns {integer} resultCount Number of search results.
 */
DOMAgent.prototype.performSearch =
function performSearch() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns search results from given <code>fromIndex</code> to given <code>toIndex</code> from the sarch with the given identifier.
 * 
 * @param {string} searchId Unique search session identifier.
 * @param {integer} fromIndex Start index of the search result to be returned.
 * @param {integer} toIndex End index of the search result to be returned.
 * 
 * @returns {Array.<NodeId>} nodeIds Ids of the search result nodes.
 */
DOMAgent.prototype.getSearchResults =
function getSearchResults() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Discards search results from the session with the given id.
 * <code>getSearchResults</code> should no longer be called for that search.
 * 
 * @param {string} searchId Unique search session identifier.
 */
DOMAgent.prototype.discardSearchResults =
function discardSearchResults() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that the node is sent to the caller given the JavaScript node object reference.
 * All nodes that form the path from the node to the root are also sent to the client as a series of <code>setChildNodes</code> notifications.
 * 
 * @param {Runtime.RemoteObjectId} objectId JavaScript object id to convert into node.
 * 
 * @returns {NodeId} nodeId Node id for given object.
 */
DOMAgent.prototype.requestNode =
function requestNode() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Enters the 'inspect' mode.
 * In this mode, elements that user is hovering over are highlighted.
 * Backend then generates 'inspectNodeRequested' event upon element selection.
 * 
 * @param {boolean} enabled True to enable inspection mode, false to disable it.
 * @param {boolean=} inspectUAShadowDOM True to enable inspection mode for user agent shadow DOM.
 * @param {HighlightConfig=} highlightConfig A descriptor for the highlight appearance of hovered-over nodes. May be omitted if <code>enabled == false</code>.
 */
DOMAgent.prototype.setInspectModeEnabled =
function setInspectModeEnabled() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Highlights given rectangle.
 * Coordinates are absolute with respect to the main frame viewport.
 * 
 * @param {integer} x X coordinate
 * @param {integer} y Y coordinate
 * @param {integer} width Rectangle width
 * @param {integer} height Rectangle height
 * @param {RGBA=} color The highlight fill color (default: transparent).
 * @param {RGBA=} outlineColor The highlight outline color (default: transparent).
 */
DOMAgent.prototype.highlightRect =
function highlightRect() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Highlights given quad.
 * Coordinates are absolute with respect to the main frame viewport.
 * 
 * @param {Quad} quad Quad to highlight
 * @param {RGBA=} color The highlight fill color (default: transparent).
 * @param {RGBA=} outlineColor The highlight outline color (default: transparent).
 */
DOMAgent.prototype.highlightQuad =
function highlightQuad() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Highlights DOM node with given id or with the given JavaScript object wrapper.
 * Either nodeId or objectId must be specified.
 * 
 * @param {HighlightConfig} highlightConfig A descriptor for the highlight appearance.
 * @param {NodeId=} nodeId Identifier of the node to highlight.
 * @param {Runtime.RemoteObjectId=} objectId JavaScript object id of the node to be highlighted.
 */
DOMAgent.prototype.highlightNode =
function highlightNode() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Hides DOM node highlight.
 */
DOMAgent.prototype.hideHighlight =
function hideHighlight() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Highlights owner element of the frame with given id.
 * 
 * @param {Page.FrameId} frameId Identifier of the frame to highlight.
 * @param {RGBA=} contentColor The content box highlight fill color (default: transparent).
 * @param {RGBA=} contentOutlineColor The content box highlight outline color (default: transparent).
 */
DOMAgent.prototype.highlightFrame =
function highlightFrame() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that the node is sent to the caller given its path.
 * // FIXME, use XPath
 * 
 * @param {string} path Path to node in the proprietary format.
 * 
 * @returns {NodeId} nodeId Id of the node for given path.
 */
DOMAgent.prototype.pushNodeByPathToFrontend =
function pushNodeByPathToFrontend() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that the node is sent to the caller given its backend node id.
 * 
 * @param {BackendNodeId} backendNodeId The backend node id of the node.
 * 
 * @returns {NodeId} nodeId The pushed node's id.
 */
DOMAgent.prototype.pushNodeByBackendIdToFrontend = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that group of <code>BackendNodeIds</code> is released.
 * 
 * @param {string} nodeGroup The backend node ids group name.
 */
DOMAgent.prototype.releaseBackendNodeIds = function() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Resolves JavaScript node object for given node id.
 * 
 * @param {NodeId} nodeId Id of the node to resolve.
 * @param {string=} objectGroup Symbolic group name that can be used to release multiple objects.
 * 
 * @returns {Runtime.RemoteObject} object JavaScript object wrapper for given node.
 */
DOMAgent.prototype.resolveNode =
function resolveNode() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns attributes for the specified node.
 * 
 * @param {NodeId} nodeId Id of the node to retrieve attibutes for.
 * 
 * @returns {Array.<string>} attributes An interleaved array of node attribute names and values.
 */
DOMAgent.prototype.getAttributes =
function getAttributes() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Moves node into the new container, places it before the given anchor.
 * 
 * @param {NodeId} nodeId Id of the node to move.
 * @param {NodeId} targetNodeId Id of the element to drop the moved node into.
 * @param {NodeId=} insertBeforeNodeId Drop node before this one (if absent, the moved node becomes the last child of <code>targetNodeId</code>).
 * 
 * @returns {NodeId} nodeId New id of the moved node.
 */
DOMAgent.prototype.moveTo =
function moveTo() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Undoes the last performed action.
 */
DOMAgent.prototype.undo =
function undo() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Re-does the last undone action.
 */
DOMAgent.prototype.redo =
function redo() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Marks last undoable state.
 */
DOMAgent.prototype.markUndoableState =
function markUndoableState() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Focuses the given element.
 * 
 * @param {NodeId} nodeId Id of the node to focus.
 */
DOMAgent.prototype.focus =
function focus() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Sets files for the given file input element.
 * 
 * @param {NodeId} nodeId Id of the file input node to set files for.
 * @param {Array.<string>} files Array of file paths to set.
 */
DOMAgent.prototype.setFileInputFiles =
function setFileInputFiles() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns boxes for the currently selected nodes.
 * 
 * @param {NodeId} nodeId Id of the node to get box model for.
 * 
 * @returns {BoxModel} model Box model for the node.
 */
DOMAgent.prototype.getBoxModel =
function getBoxModel() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns node id at given location.
 * 
 * @param {integer} x X coordinate.
 * @param {integer} y Y coordinate.
 * 
 * @returns {NodeId} nodeId Id of the node at given coordinates.
 */
DOMAgent.prototype.getNodeForLocation =
function getNodeForLocation() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Enables DOM agent for the given page.
 */
DOMAgent.prototype.enable =
function enable() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Disables DOM agent for the given page.
 */
DOMAgent.prototype.disable =
function disable() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Requests that a batch of nodes is sent to the caller given their backend node ids.
 * 
 * @param {Array.<BackendNodeId>} backendNodeIds The array of backend node ids.
 * 
 * @returns {Array.<NodeId>} nodeIds The array of ids of pushed nodes that correspond to the backend ids specified in backendNodeIds.
 */
DOMAgent.prototype.pushNodesByBackendIdsToFrontend =
function pushNodesByBackendIdsToFrontend() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Creates a deep copy of the specified node and places it into the target container before the given anchor.
 * 
 * @param {NodeId} nodeId Id of the node to copy.
 * @param {NodeId} targetNodeId Id of the element to drop the copy into.
 * @param {NodeId=} insertBeforeNodeId Drop the copy before this node (if absent, the copy becomes the last child of <code>targetNodeId</code>).
 * 
 * @returns {NodeId} nodeId Id of the node clone.
 */
DOMAgent.prototype.copyTo =
function copyTo() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Returns the id of the nearest ancestor that is a relayout boundary.
 * 
 * @param {NodeId} nodeId Id of the node.
 * 
 * @returns {NodeId} nodeId Relayout boundary node id for the given node.
 */
DOMAgent.prototype.getRelayoutBoundary =
function getRelayoutBoundary() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
