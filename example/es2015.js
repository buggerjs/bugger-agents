'use strict';

const http = require('http');

let x = 10;

class Thing {
  constructor(n) {
    if (n < 10) {
      let y = 20;
      this.attr = y * x;
    } else {
      this.attr = n * x;
    }
  }
}

let thing = new Thing(7);
console.log(thing);

function makeRequest() {
  const req = http.get('http://api.reddit.com', function(res) {
    console.log('statusCode:', res.statusCode);
  });
}

setInterval(function() {
  makeRequest();
}, 5000);
