// setup a container
var Scream = {};

// shims
window.AudioContext = window.AudioContext || window.webkitAudioContext;
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

// utils
class Utils {
  static get config(){
    return {
      maxVolume : 10,
      loThreshold : 60,
      hiThreshold : 80,
      emissionRate : 50
    };
  }

  static random(lo, hi) {
    return Math.floor(Math.random() * (1 + hi - lo)) + lo;
  }
}
