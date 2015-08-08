import test from 'blue-tape';

import buggerTest from '../helpers/bugger-test';

/* global describe, it */
test('integration/setup', t => {
  buggerTest(t, 'ok.js', async (t, {Debugger}, child) => {
    await Debugger.enable();
    await Debugger.resume();

    t.equal(await child.capturedOutput, 'ok\n',
      'The script ran to completion, printing "ok"');
  });
});
