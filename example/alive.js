setInterval(function() {}, 1000 * 60 * 60 * 24);

function doStuff() {
  var x = 20;
  if (x < process.fauxProperty) {
    console.log('Weird stuff going on.', __dirname);
  }
}

setInterval(doStuff, 2 * 1000);
