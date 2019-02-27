function Score() {
  this.lines = null;
  this.level = null;
};

Score.prototype = {

  reset: function() {
    this.lines = 0;
    this.level = 1;
  },

  update: function(numFilledRows) {
    this.lines += numFilledRows;
    if (this.level < 9) {
      this.level = parseInt(this.lines / 20) + 1;
    }
  }

};
