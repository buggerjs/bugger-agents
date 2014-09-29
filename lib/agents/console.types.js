'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Number of seconds since epoch.
 */
exports.Timestamp = Number;

/**
 * Console message.
 * 
 * @param {string xml|javascript|network|console-api|storage|appcache|rendering|css|security|other|deprecation} source Message source.
 * @param {string log|warning|error|debug} level Message severity.
 * @param {string} text Message text.
 * @param {string log|dir|dirxml|table|trace|clear|startGroup|startGroupCollapsed|endGroup|assert|timing|profile|profileEnd=} type Console message type.
 * @param {string=} url URL of the message origin.
 * @param {integer=} line Line number in the resource that generated this message.
 * @param {integer=} column Column number in the resource that generated this message.
 * @param {integer=} repeatCount Repeat count for repeated messages.
 * @param {Array.<Runtime.RemoteObject>=} parameters Message parameters in case of the formatted message.
 * @param {StackTrace=} stackTrace JavaScript stack trace for assertions and error messages.
 * @param {Network.RequestId=} networkRequestId Identifier of the network request associated with this message.
 * @param {Timestamp} timestamp Timestamp, when this message was fired.
 */
exports.ConsoleMessage =
function ConsoleMessage(props) {
  this.source = props.source;
  this.level = props.level;
  this.text = props.text;
  this.type = props.type;
  this.url = props.url;
  this.line = props.line;
  this.column = props.column;
  this.repeatCount = props.repeatCount;
  this.parameters = props.parameters;
  this.stackTrace = props.stackTrace;
  this.networkRequestId = props.networkRequestId;
  this.timestamp = props.timestamp;
};

/**
 * Stack entry for console errors and assertions.
 * 
 * @param {string} functionName JavaScript function name.
 * @param {string} scriptId JavaScript script id.
 * @param {string} url JavaScript script name or url.
 * @param {integer} lineNumber JavaScript script line number.
 * @param {integer} columnNumber JavaScript script column number.
 */
exports.CallFrame =
function CallFrame(props) {
  this.functionName = props.functionName;
  this.scriptId = props.scriptId;
  this.url = props.url;
  this.lineNumber = props.lineNumber;
  this.columnNumber = props.columnNumber;
};

/**
 * Call frames for assertions or error messages.
 */
exports.StackTrace = function(arr) { return arr; };
