#!/usr/bin/env node
'use strict';

var vm = require('vm');
var Repl = require('repl');

var _ = require('lodash');

var bundledAgents = require('../lib/agents');

var withAgents = require('./_with-agents');

withAgents.then(function(agents) {
  function fancyPromiseEval(code, context, file, cb) {
    var err, result, script;
    // first, create the Script object to check the syntax
    try {
      script = vm.createScript(code, {
        filename: file,
        displayErrors: false
      });
    } catch (e) {
      return cb(e);
    }

    if (!err) {
      try {
        result = script.runInContext(context, { displayErrors: false });
      } catch (e) {
        return cb(e);
      }
    }

    if (result && typeof result.nodeify === 'function') {
      result.nodeify(cb);
    } else {
      cb(null, result);
    }
  }

  var repl = Repl.start({
    prompt: 'bugger> ',
    eval: fancyPromiseEval
  });

  _.each(bundledAgents, function(initFunction, name) {
    Object.defineProperty(repl.context, name, {
      enumerable: true,
      get: function() {
        return agents[name];
      }
    })
  });
});
