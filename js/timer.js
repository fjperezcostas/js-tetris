function Timer() {
  this.timer = undefined;
}

Timer.prototype = {

  start: function(handler,level) {
    var timeLapse = 1000 - (level * 100);

    this.timer = setTimeout(handler,timeLapse);
  },

  clear: function() {
    clearTimeout(this.timer);
  }

};
