'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('./base');

function GeolocationAgent(client) {
  if (!(this instanceof GeolocationAgent))
    return new GeolocationAgent(client);

  BaseAgent.call(this, GeolocationAgent, client);
}
util.inherits(GeolocationAgent, BaseAgent);
_.extend(GeolocationAgent, require('./geolocation.types'));
module.exports = GeolocationAgent;

/**
 * Overrides the Geolocation Position or Error.
 * 
 * @param {number=} latitude Mock latitude
 * @param {number=} longitude Mock longitude
 * @param {number=} accuracy Mock accuracy
 */
GeolocationAgent.prototype.setGeolocationOverride =
function setGeolocationOverride() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};

/**
 * Clears the overriden Geolocation Position and Error.
 */
GeolocationAgent.prototype.clearGeolocationOverride =
function clearGeolocationOverride() {
  return this._withClient(function() {
    throw new Error('Not implemented');
  });
};
