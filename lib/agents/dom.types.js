'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Unique DOM node identifier.
 */
exports.NodeId = Number;

/**
 * Unique DOM node identifier used to reference a node that may not have been pushed to the front-end.
 */
exports.BackendNodeId = Number;

/**
 * DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
 * DOMNode is a base node mirror type.
 * 
 * @param {NodeId} nodeId Node identifier that is passed into the rest of the DOM messages as the <code>nodeId</code>. Backend will only push node with given <code>id</code> once. It is aware of all requested nodes and will only fire DOM events for nodes known to the client.
 * @param {integer} nodeType <code>Node</code>'s nodeType.
 * @param {string} nodeName <code>Node</code>'s nodeName.
 * @param {string} localName <code>Node</code>'s localName.
 * @param {string} nodeValue <code>Node</code>'s nodeValue.
 * @param {integer=} childNodeCount Child count for <code>Container</code> nodes.
 * @param {Array.<Node>=} children Child nodes of this node when requested with children.
 * @param {Array.<string>=} attributes Attributes of the <code>Element</code> node in the form of flat array <code>[name1, value1, name2, value2]</code>.
 * @param {string=} documentURL Document URL that <code>Document</code> or <code>FrameOwner</code> node points to.
 * @param {string=} baseURL Base URL that <code>Document</code> or <code>FrameOwner</code> node uses for URL completion.
 * @param {string=} publicId <code>DocumentType</code>'s publicId.
 * @param {string=} systemId <code>DocumentType</code>'s systemId.
 * @param {string=} internalSubset <code>DocumentType</code>'s internalSubset.
 * @param {string=} xmlVersion <code>Document</code>'s XML version in case of XML documents.
 * @param {string=} name <code>Attr</code>'s name.
 * @param {string=} value <code>Attr</code>'s value.
 * @param {Page.FrameId=} frameId Frame ID for frame owner elements.
 * @param {Node=} contentDocument Content document for frame owner elements.
 * @param {Array.<Node>=} shadowRoots Shadow root list for given element host.
 * @param {Node=} templateContent Content document fragment for template elements
 */
exports.Node =
function Node(props) {
  this.nodeId = props.nodeId;
  this.nodeType = props.nodeType;
  this.nodeName = props.nodeName;
  this.localName = props.localName;
  this.nodeValue = props.nodeValue;
  this.childNodeCount = props.childNodeCount;
  this.children = props.children;
  this.attributes = props.attributes;
  this.documentURL = props.documentURL;
  this.baseURL = props.baseURL;
  this.publicId = props.publicId;
  this.systemId = props.systemId;
  this.internalSubset = props.internalSubset;
  this.xmlVersion = props.xmlVersion;
  this.name = props.name;
  this.value = props.value;
  this.frameId = props.frameId;
  this.contentDocument = props.contentDocument;
  this.shadowRoots = props.shadowRoots;
  this.templateContent = props.templateContent;
};

/**
 * DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
 * DOMNode is a base node mirror type.
 * 
 * @param {string} type <code>EventListener</code>'s type.
 * @param {boolean} useCapture <code>EventListener</code>'s useCapture.
 * @param {boolean} isAttribute <code>EventListener</code>'s isAttribute.
 * @param {NodeId} nodeId Target <code>DOMNode</code> id.
 * @param {string} handlerBody Event handler function body.
 * @param {Debugger.Location=} location Handler code location.
 * @param {string=} sourceName Source script URL.
 * @param {Runtime.RemoteObject=} handler Event handler function value.
 */
exports.EventListener =
function EventListener(props) {
  this.type = props.type;
  this.useCapture = props.useCapture;
  this.isAttribute = props.isAttribute;
  this.nodeId = props.nodeId;
  this.handlerBody = props.handlerBody;
  this.location = props.location;
  this.sourceName = props.sourceName;
  this.handler = props.handler;
};

/**
 * A structure holding an RGBA color.
 * 
 * @param {integer} r The red component, in the [0-255] range.
 * @param {integer} g The green component, in the [0-255] range.
 * @param {integer} b The blue component, in the [0-255] range.
 * @param {number=} a The alpha component, in the [0-1] range (default: 1).
 */
exports.RGBA =
function RGBA(props) {
  this.r = props.r;
  this.g = props.g;
  this.b = props.b;
  this.a = props.a;
};

/**
 * An array of quad vertices, x immediately followed by y for each point, points clock-wise.
 */
exports.Quad = function(arr) { return arr; };

/**
 * Box model.
 * 
 * @param {Quad} content Content box
 * @param {Quad} padding Padding box
 * @param {Quad} border Border box
 * @param {Quad} margin Margin box
 * @param {integer} width Node width
 * @param {integer} height Node height
 * @param {string} shapeOutside CSS Shape Outside
 */
exports.BoxModel =
function BoxModel(props) {
  this.content = props.content;
  this.padding = props.padding;
  this.border = props.border;
  this.margin = props.margin;
  this.width = props.width;
  this.height = props.height;
  this.shapeOutside = props.shapeOutside;
};

/**
 * Rectangle.
 * 
 * @param {number} x X coordinate
 * @param {number} y Y coordinate
 * @param {number} width Rectangle width
 * @param {number} height Rectangle height
 */
exports.Rect =
function Rect(props) {
  this.x = props.x;
  this.y = props.y;
  this.width = props.width;
  this.height = props.height;
};

/**
 * Configuration data for the highlighting of page elements.
 * 
 * @param {boolean=} showInfo Whether the node info tooltip should be shown (default: false).
 * @param {RGBA=} contentColor The content box highlight fill color (default: transparent).
 * @param {RGBA=} paddingColor The padding highlight fill color (default: transparent).
 * @param {RGBA=} borderColor The border highlight fill color (default: transparent).
 * @param {RGBA=} marginColor The margin highlight fill color (default: transparent).
 * @param {RGBA=} eventTargetColor The event target element highlight fill color (default: transparent).
 */
exports.HighlightConfig =
function HighlightConfig(props) {
  this.showInfo = props.showInfo;
  this.contentColor = props.contentColor;
  this.paddingColor = props.paddingColor;
  this.borderColor = props.borderColor;
  this.marginColor = props.marginColor;
  this.eventTargetColor = props.eventTargetColor;
};
