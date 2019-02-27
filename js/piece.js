function Piece(board) {
  this.board = board;
  this.shape = null;
  this.blocks = [];
}

Piece.prototype = {

  clone: function() {
    var clone = new Piece(this.board);

    clone.shape = this.shape;
    clone.blocks = this.blocks.map(function(block) {
      return { x: block.x, y: block.y }
    });
    return clone;
  },

  new: function(shape = undefined) {
    var self = this,
        pivot = {
          x: parseInt(this.board.getWidth(0) / 2),
          y: 2
        };

    if (shape == undefined) {
      this.shape = Math.floor(Math.random() * 7) + 1;
    } else {
      this.shape = shape;
    }
    this.blocks = [];
    shapes[this.shape].forEach(function(relative) {
      self.blocks.push({
        x: pivot.x + relative.x,
        y: pivot.y + relative.y
      });
    });
  },

  collides: function() {
    var x, y, i = 0;

    while (i < this.blocks.length) {
      x = this.blocks[i].x;
      y = this.blocks[i].y;
      if (this.board.outOfTheBox(y,x) || this.board.cells[y][x] != EMPTY) {
        return true;
      }
      i++;
    }
    return false;
  },

  endFall: function() {
    var x, y, i = 0;

    while (i < this.blocks.length) {
      x = this.blocks[i].x;
      y = this.blocks[i].y + 1;
      if (this.board.outOfTheBox(y,x) || this.board.cells[y][x] != EMPTY) {
        return true;
      }
      i++;
    }
    return false;
  },

  moveLeft: function() {
    this.blocks.forEach(function(block) {
      block.x--;
    });
    if (this.collides()) {
      this.blocks.forEach(function(block) {
        block.x++;
      })
    }
  },

  moveRight: function() {
    this.blocks.forEach(function(block) {
      block.x++;
    });
    if (this.collides()) {
      this.blocks.forEach(function(block) {
        block.x--;
      })
    }
  },

  moveDown: function() {
    this.blocks.forEach(function(block) {
      block.y++;
    });
    if (this.collides()) {
      this.blocks.forEach(function(block) {
        block.y--;
      })
    }
  },

  drop: function() {
    while (!this.endFall()) {
      this.moveDown();
    }
  },

  rotate: function() {
    var aux = this.clone();

    if (this.shape == O) {
      return;
    }
    this.blocks.forEach(function(block, i) {
      block.x = aux.blocks[PIVOT].x + aux.blocks[PIVOT].y - aux.blocks[i].y;
      block.y = aux.blocks[i].x - aux.blocks[PIVOT].x + aux.blocks[PIVOT].y;
    });
    if (this.collides()) {
      this.blocks = aux.blocks;
    }
  }

};
