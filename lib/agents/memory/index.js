'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function MemoryAgent(client) {
  if (!(this instanceof MemoryAgent))
    return new MemoryAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(MemoryAgent, BaseAgent);
_.extend(MemoryAgent, require('./types'));
module.exports = MemoryAgent;

/**
 * 
 * @returns {integer} documents
 * @returns {integer} nodes
 * @returns {integer} jsEventListeners
 */
MemoryAgent.prototype.getDOMCounters =
function getDOMCounters() {
  throw new Error('Not implemented');
};
