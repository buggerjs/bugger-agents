#!/usr/bin/env node
'use strict';

var createServer = require('http').createServer;
var WebSocketServer = require('websocket').server;

var withAgents = require('./_with-agents');

withAgents.then(function(agents) {
  var httpServer = createServer(function(req, res) { res.end('ok'); });

  var webSocket = new WebSocketServer({
    httpServer: httpServer,
    maxReceivedFrameSize: 0x100000, // 1MB
    autoAcceptConnections: true
  });

  webSocket.on('connect', function(client) {
    agents.connectToWebsocketClient(client);
  });

  httpServer.listen(8058, function() {
    var port = httpServer.address().port;
    var devtoolsUrl =
      'chrome-devtools://devtools/bundled/inspector.html?ws=127.0.0.1:' + port + '/websocket';
    console.log(devtoolsUrl);
  });
});
