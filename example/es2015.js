'use strict';

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

setInterval(function() {
  console.log(thing.attr);
}, 5000);
