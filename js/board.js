function Board(rows, cols) {
  var i;

  this.cells = [];
  while (this.getHeight() < rows) {
    this.cells.push([]);
    i = this.cells.length - 1;
    while (this.getWidth(i) < cols) {
      this.cells[i].push(null);
    }
  }
}

Board.prototype = {

  getHeight: function() {
    return this.cells.length;
  },

  getWidth: function(row) {
    return this.cells[row].length;
  },

  clear: function() {
    var self = this;

    self.cells.forEach(function(row, i) {
      row.forEach(function(cell, j) {
        self.cells[i][j] = EMPTY;
      });
    });
  },

  insertPiece: function(piece) {
    var self = this;

    piece.blocks.forEach(function(block) {
      self.cells[block.y][block.x] = piece.shape;
    });
  },

  outOfTheBox: function(row, col) {
    return (row < 0 || row >= this.getHeight() || col < 0 || col >= this.getWidth(row));
  },

  isRowFilled: function(row) {
    var i = 0;

    while (i < this.getWidth(row)) {
      if (this.cells[row][i] == EMPTY) {
        return false;
      }
      i++;
    }
    return true;
  },

  countFilledRows: function() {
    var self = this,
        numFilledRows = 0;

    self.cells.forEach(function(row, i) {
      if (self.isRowFilled(i)) {
        numFilledRows++;
      }
    });
    return numFilledRows;
  },

  clearFilledRows: function() {
    var i, j, k, self = this;

    self.cells.forEach(function(row, i) {
      if (self.isRowFilled(i)) {
        for (j = i; j >= 0; j--) {
          for (k = 0; k < self.getWidth(i); k++) {
            if (j > 0) {
              self.cells[j][k] = self.cells[j-1][k];
            } else {
              self.cells[j][k] = EMPTY;
            }
          }
        }
      }
    });
  }

};
