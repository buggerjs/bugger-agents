'use strict';

var util = require('util');

var _ = require('lodash');

var BaseAgent = require('../base');

function GeolocationAgent(client) {
  if (!(this instanceof GeolocationAgent))
    return new GeolocationAgent(client);

  BaseAgent.call(this, client);
}
util.inherits(GeolocationAgent, BaseAgent);
_.extend(GeolocationAgent, require('./types'));
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
  throw new Error('Not implemented');
};

/**
 * Clears the overriden Geolocation Position and Error.
 */
GeolocationAgent.prototype.clearGeolocationOverride =
function clearGeolocationOverride() {
  throw new Error('Not implemented');
};
