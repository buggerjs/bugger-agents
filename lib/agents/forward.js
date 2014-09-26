'use strict';

module.exports = function forwardMethods(proto, obj) {
  return function(promise) {
    var props = Object.keys(proto);
    props.forEach(function(prop) {
      if (typeof obj[prop] !== 'function') return;
      if (typeof promise[prop] !== 'undefined') return;

      Object.defineProperty(promise, prop, {
        value: function() {
          var args = arguments;
          return promise.then(function() {
            return obj[prop].apply(obj, args);
          });
        }
      });
    });
    return promise;
  };
};
