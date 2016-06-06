(function(window, document) {
  'use strict';

  // prev / next Post on Keypress

  var prev = document.getElementById('prev');
  var next = document.getElementById('next');

  if (prev) {
    var prevTarget = prev.href;
  }

  if (next) {
    var nextTarget = next.href;
  }

  window.addEventListener('keydown', function(e) {

    switch (e.keyCode) {

      case  37: // left
        if (prevTarget) {
          window.location = prevTarget;
        }
        break;

      case  39: // right
        if (nextTarget) {
          window.location = nextTarget;
        }
        break;

      default: return;

    }

  });

})(window, document);
