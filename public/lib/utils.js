// shims
window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;


// utils
var Utils = {
  config : {},
  random : function(lo, hi) {
    return Math.floor(Math.random() * (1 + hi - lo)) + lo;
  }
};
