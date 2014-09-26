'use strict';

var Bluebird = require('bluebird');
var assert = require('assertive');

var withBugger = require('../helpers/with-bugger');

/* global describe, it */
describe('integration/setup', function() {
  describe('ok.js', function() {
    withBugger('ok');

    it('connects & can read "ok"', function() {
      var child = this.child;
      var agents = this.agents;

      return Bluebird.all([
        child.captureOutput(),
        agents.Debugger.enable().resume()
      ]).spread(function(text) {
        assert.equal('ok\n', text);
      });
    });
  });
});
