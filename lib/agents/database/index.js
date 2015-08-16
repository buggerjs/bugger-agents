'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function DatabaseAgent(client) {
  if (!(this instanceof DatabaseAgent))
    return new DatabaseAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(DatabaseAgent, BaseAgent);
_.extend(DatabaseAgent, require('./types'));
module.exports = DatabaseAgent;

/**
 * Enables database tracking, database events will now be delivered to the client.
 */
DatabaseAgent.prototype.enable =
function enable() {
  return this._ignore('enable');
};

/**
 * Disables database tracking, prevents database events from being sent to the client.
 */
DatabaseAgent.prototype.disable =
function disable() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {DatabaseId} databaseId
 * 
 * @returns {Array.<string>} tableNames
 */
DatabaseAgent.prototype.getDatabaseTableNames =
function getDatabaseTableNames() {
  throw new Error('Not implemented');
};

/**
 * 
 * @param {DatabaseId} databaseId
 * @param {string} query
 * 
 * @returns {Array.<string>=} columnNames
 * @returns {Array.<any>=} values
 * @returns {Error=} sqlError
 */
DatabaseAgent.prototype.executeSQL =
function executeSQL() {
  throw new Error('Not implemented');
};
