'use strict';
// This file is auto-generated using scripts/doc-sync.js

/**
 * Current values of DOM counters.
 * 
 * @param {integer} documents
 * @param {integer} nodes
 * @param {integer} jsEventListeners
 */
exports.DOMCounters =
function DOMCounters(props) {
  this.documents = props.documents;
  this.nodes = props.nodes;
  this.jsEventListeners = props.jsEventListeners;
};

/**
 * Timeline record contains information about the recorded activity.
 * 
 * @param {string} type Event type.
 * @param {string=} thread If present, identifies the thread that produced the event.
 * @param {Object} data Event data.
 * @param {Array.<TimelineEvent>=} children Nested records.
 * @param {DOMCounters=} counters Current values of DOM counters.
 * @param {integer=} usedHeapSize Current size of JS heap.
 * @param {Object=} nativeHeapStatistics Native heap statistics.
 */
exports.TimelineEvent =
function TimelineEvent(props) {
  this.type = props.type;
  this.thread = props.thread;
  this.data = props.data;
  this.children = props.children;
  this.counters = props.counters;
  this.usedHeapSize = props.usedHeapSize;
  this.nativeHeapStatistics = props.nativeHeapStatistics;
};
