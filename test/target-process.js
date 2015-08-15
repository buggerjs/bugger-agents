'use strict';

import test from 'blue-tape';

import TargetProcess from '../lib/target-process';

test('TargetProcess.fork', async t => {
  const target = TargetProcess.fork('example/ok.js', [ 'foo' ], {
    execArgv: [ '--allow_natives_syntax' ]
  });

  t.equal(target.debugPort, 5858, 'Exposes the debug port');
  t.equal(target.pid, target._child.pid, 'Has valid pid');

  var firstPid = target.pid;

  return new Promise(function(resolve) {
      target.on('exit', (code, signal) => resolve([ code, signal ]));
      target.kill();
    })
    .then(function() {
      t.ok(true, 'Can kill the process');
      target.spawn();
      t.notEqual(firstPid, target.pid, 'Changed the pid');
      target.kill();
    });
});
