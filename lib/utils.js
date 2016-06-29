var Starman = {};

// shims
window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;


// utils
Starman.utils = {
  config : {
    sensitivity : 2,
    loThreshold : 0,
    hiThreshold : 100,
    frequencyNodeCount : 32,
    bpm : 20
  },
  random : function(lo, hi) {
    return Math.floor(Math.random() * (1 + hi - lo)) + lo;
  }
};
