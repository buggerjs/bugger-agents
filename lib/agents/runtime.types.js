'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Unique object identifier.
 */
exports.RemoteObjectId = String;

/**
 * Mirror object referencing original JavaScript object.
 * 
 * @param {string object|function|undefined|string|number|boolean} type Object type.
 * @param {string array|null|node|regexp|date=} subtype Object subtype hint. Specified for <code>object</code> type values only.
 * @param {string=} className Object class (constructor) name. Specified for <code>object</code> type values only.
 * @param {any=} value Remote object value (in case of primitive values or JSON values if it was requested).
 * @param {string=} description String representation of the object.
 * @param {RemoteObjectId=} objectId Unique object identifier (for non-primitive values).
 * @param {ObjectPreview=} preview Preview containing abbreviated property values.
 */
exports.RemoteObject =
function RemoteObject(props) {
  this.type = props.type;
  this.subtype = props.subtype;
  this.className = props.className;
  this.value = props.value;
  this.description = props.description;
  this.objectId = props.objectId;
  this.preview = props.preview;
};

/**
 * Object containing abbreviated remote object value.
 * 
 * @param {boolean} lossless Determines whether preview is lossless (contains all information of the original object).
 * @param {boolean} overflow True iff some of the properties of the original did not fit.
 * @param {Array.<PropertyPreview>} properties List of the properties.
 */
exports.ObjectPreview =
function ObjectPreview(props) {
  this.lossless = props.lossless;
  this.overflow = props.overflow;
  this.properties = props.properties;
};

/**
 * 
 * @param {string} name Property name.
 * @param {string object|function|undefined|string|number|boolean} type Object type.
 * @param {string=} value User-friendly property value string.
 * @param {ObjectPreview=} valuePreview Nested value preview.
 * @param {string array|null|node|regexp|date=} subtype Object subtype hint. Specified for <code>object</code> type values only.
 */
exports.PropertyPreview =
function PropertyPreview(props) {
  this.name = props.name;
  this.type = props.type;
  this.value = props.value;
  this.valuePreview = props.valuePreview;
  this.subtype = props.subtype;
};

/**
 * Object property descriptor.
 * 
 * @param {string} name Property name.
 * @param {RemoteObject=} value The value associated with the property.
 * @param {boolean=} writable True if the value associated with the property may be changed (data descriptors only).
 * @param {RemoteObject=} get A function which serves as a getter for the property, or <code>undefined</code> if there is no getter (accessor descriptors only).
 * @param {RemoteObject=} set A function which serves as a setter for the property, or <code>undefined</code> if there is no setter (accessor descriptors only).
 * @param {boolean} configurable True if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object.
 * @param {boolean} enumerable True if this property shows up during enumeration of the properties on the corresponding object.
 * @param {boolean=} wasThrown True if the result was thrown during the evaluation.
 * @param {boolean=} isOwn True if the property is owned for the object.
 */
exports.PropertyDescriptor =
function PropertyDescriptor(props) {
  this.name = props.name;
  this.value = props.value;
  this.writable = props.writable;
  this.get = props.get;
  this.set = props.set;
  this.configurable = props.configurable;
  this.enumerable = props.enumerable;
  this.wasThrown = props.wasThrown;
  this.isOwn = props.isOwn;
};

/**
 * Object internal property descriptor.
 * This property isn't normally visible in JavaScript code.
 * 
 * @param {string} name Conventional property name.
 * @param {RemoteObject=} value The value associated with the property.
 */
exports.InternalPropertyDescriptor =
function InternalPropertyDescriptor(props) {
  this.name = props.name;
  this.value = props.value;
};

/**
 * Represents function call argument.
 * Either remote object id <code>objectId</code> or primitive <code>value</code> or neither of (for undefined) them should be specified.
 * 
 * @param {any=} value Primitive value.
 * @param {RemoteObjectId=} objectId Remote object handle.
 */
exports.CallArgument =
function CallArgument(props) {
  this.value = props.value;
  this.objectId = props.objectId;
};

/**
 * Id of an execution context.
 */
exports.ExecutionContextId = Number;

/**
 * Description of an isolated world.
 * 
 * @param {ExecutionContextId} id Unique id of the execution context. It can be used to specify in which execution context script evaluation should be performed.
 * @param {boolean} isPageContext True if this is a context where inpspected web page scripts run. False if it is a content script isolated context.
 * @param {string} name Human readable name describing given context.
 * @param {Page.FrameId} frameId Id of the owning frame.
 */
exports.ExecutionContextDescription =
function ExecutionContextDescription(props) {
  this.id = props.id;
  this.isPageContext = props.isPageContext;
  this.name = props.name;
  this.frameId = props.frameId;
};
