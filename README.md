# bugger-agents

The Chrome Remote Debugging Protocol implemented for node.
This allows you to do things like this:

```js
// After starting a node process with --debug-brk
var Agents =
  require('bugger-agents').attachToPort(5858);

// Chaining has the special meaning of "in series"
Agents.Debugger.enable().resume();

// Equivalent, explicit:
Agents.Debugger.enable().then(function() {
  // Promise is bound to the agent by default, so this.resume() would work
  Agents.Debugger.resume();
});
```
