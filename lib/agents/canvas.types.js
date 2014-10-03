'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Unique resource identifier.
 */
exports.ResourceId = String;

/**
 * Resource state descriptor.
 * 
 * @param {string} name State name.
 * @param {string=} enumValueForName String representation of the enum value, if <code>name</code> stands for an enum.
 * @param {CallArgument=} value The value associated with the particular state.
 * @param {Array.<ResourceStateDescriptor>=} values Array of values associated with the particular state. Either <code>value</code> or <code>values</code> will be specified.
 * @param {boolean=} isArray True iff the given <code>values</code> items stand for an array rather than a list of grouped states.
 */
exports.ResourceStateDescriptor =
function ResourceStateDescriptor(props) {
  this.name = props.name;
  this.enumValueForName = props.enumValueForName;
  this.value = props.value;
  this.values = props.values;
  this.isArray = props.isArray;
};

/**
 * Resource state.
 * 
 * @param {ResourceId} id
 * @param {TraceLogId} traceLogId
 * @param {Array.<ResourceStateDescriptor>=} descriptors Describes current <code>Resource</code> state.
 * @param {string=} imageURL Screenshot image data URL.
 */
exports.ResourceState =
function ResourceState(props) {
  this.id = props.id;
  this.traceLogId = props.traceLogId;
  this.descriptors = props.descriptors;
  this.imageURL = props.imageURL;
};

/**
 * 
 * @param {string} description String representation of the object.
 * @param {string=} enumName Enum name, if any, that stands for the value (for example, a WebGL enum name).
 * @param {ResourceId=} resourceId Resource identifier. Specified for <code>Resource</code> objects only.
 * @param {string object|function|undefined|string|number|boolean=} type Object type. Specified for non <code>Resource</code> objects only.
 * @param {string array|null|node|regexp|date|map|set=} subtype Object subtype hint. Specified for <code>object</code> type values only.
 * @param {Runtime.RemoteObject=} remoteObject The <code>RemoteObject</code>, if requested.
 */
exports.CallArgument =
function CallArgument(props) {
  this.description = props.description;
  this.enumName = props.enumName;
  this.resourceId = props.resourceId;
  this.type = props.type;
  this.subtype = props.subtype;
  this.remoteObject = props.remoteObject;
};

/**
 * 
 * @param {ResourceId} contextId
 * @param {string=} functionName
 * @param {Array.<CallArgument>=} arguments
 * @param {CallArgument=} result
 * @param {boolean=} isDrawingCall
 * @param {boolean=} isFrameEndCall
 * @param {string=} property
 * @param {CallArgument=} value
 * @param {string=} sourceURL
 * @param {integer=} lineNumber
 * @param {integer=} columnNumber
 */
exports.Call =
function Call(props) {
  this.contextId = props.contextId;
  this.functionName = props.functionName;
  this.arguments = props.arguments;
  this.result = props.result;
  this.isDrawingCall = props.isDrawingCall;
  this.isFrameEndCall = props.isFrameEndCall;
  this.property = props.property;
  this.value = props.value;
  this.sourceURL = props.sourceURL;
  this.lineNumber = props.lineNumber;
  this.columnNumber = props.columnNumber;
};

/**
 * Unique trace log identifier.
 */
exports.TraceLogId = String;

/**
 * 
 * @param {TraceLogId} id
 * @param {Array.<Call>} calls
 * @param {Array.<CallArgument>} contexts
 * @param {integer} startOffset
 * @param {boolean} alive
 * @param {number} totalAvailableCalls
 */
exports.TraceLog =
function TraceLog(props) {
  this.id = props.id;
  this.calls = props.calls;
  this.contexts = props.contexts;
  this.startOffset = props.startOffset;
  this.alive = props.alive;
  this.totalAvailableCalls = props.totalAvailableCalls;
};
