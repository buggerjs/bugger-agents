'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Current values of counters.
 * 
 * @param {integer=} documents
 * @param {integer=} nodes
 * @param {integer=} jsEventListeners
 * @param {number=} jsHeapSizeUsed Currently used size of JS heap.
 * @param {number=} gpuMemoryUsedKB Current GPU memory usage in kilobytes.
 * @param {number=} gpuMemoryLimitKB Current GPU memory limit in kilobytes.
 */
exports.Counters =
function Counters(props) {
  this.documents = props.documents;
  this.nodes = props.nodes;
  this.jsEventListeners = props.jsEventListeners;
  this.jsHeapSizeUsed = props.jsHeapSizeUsed;
  this.gpuMemoryUsedKB = props.gpuMemoryUsedKB;
  this.gpuMemoryLimitKB = props.gpuMemoryLimitKB;
};

/**
 * Timeline record contains information about the recorded activity.
 * 
 * @param {string} type Event type.
 * @param {Object} data Event data.
 * @param {number} startTime Start time.
 * @param {number=} endTime End time.
 * @param {Array.<TimelineEvent>=} children Nested records.
 * @param {string=} thread If present, identifies the thread that produced the event.
 * @param {Console.StackTrace=} stackTrace Stack trace.
 * @param {string=} frameId Unique identifier of the frame within the page that the event relates to.
 */
exports.TimelineEvent =
function TimelineEvent(props) {
  this.type = props.type;
  this.data = props.data;
  this.startTime = props.startTime;
  this.endTime = props.endTime;
  this.children = props.children;
  this.thread = props.thread;
  this.stackTrace = props.stackTrace;
  this.frameId = props.frameId;
};
