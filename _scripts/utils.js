class Utils {
  static random(lo, hi) {
    return Math.floor(Math.random() * (1 + hi - lo)) + lo;
  }
}
