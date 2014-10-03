'use strict';

var assert = require('assertive');

var withBugger = require('../helpers/with-bugger');

/* global describe, it */
describe('integration/setup', function() {
  describe('ok.js', function() {
    withBugger('ok');

    it('connects & can read "ok"', function*() {
      var child = this.child;
      var Debugger = this.agents.Debugger;

      var text = child.captureOutput();

      yield Debugger.enable();
      yield Debugger.resume();

      assert.equal('ok\n', yield text);
    });
  });
});
