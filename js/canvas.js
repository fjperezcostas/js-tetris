function Canvas(params) {
  this.config = params.config;
  this.canvas = document.getElementById(this.config.id);
  this.canvas.width = this.config.width;
  this.canvas.height = this.config.height;
  this.ctx = this.canvas.getContext('2d');
  this.bindings = params.bindings;
  this.ctx.translate(0.5, 0.5);
}

Canvas.prototype = {

  drawCell: function(left, top, color) {
    var width = this.config.cell.width,
        height = this.config.cell.height;

    this.ctx.fillStyle = this.config.cell.colors[color];
    this.ctx.fillRect(left,top,width,height);
    if (color != SHADOW) {
      if (color == EMPTY) {
        this.ctx.strokeStyle = this.config.cell.colors[EMPTY];
      } else {
        this.ctx.strokeStyle = this.config.cell.border.color;
      }
      this.ctx.lineWidth = this.config.cell.border.width;
      this.ctx.strokeRect(left,top,width,height);
    }
  },

  drawBoard: function() {
    var self = this,
        left = self.config.board.left,
        top = self.config.board.top,
        width = self.config.cell.width * self.bindings.board.getWidth(0),
        height = self.config.cell.height * self.bindings.board.getHeight();

    self.ctx.lineWidth = self.config.cell.border.width;
    self.ctx.strokeStyle = self.config.cell.border.color;
    self.ctx.fillStyle = self.config.cell.colors[EMPTY];
    self.ctx.fillRect(left,top,width,height);
    self.ctx.strokeRect(left,top,width,height);
    self.bindings.board.cells.forEach(function(row, i) {
      row.forEach(function(cell, j) {
        if (cell != EMPTY) {
          left = self.config.board.left + self.config.cell.width * j,
          top = self.config.board.top + self.config.cell.height * i;
          self.drawCell(left,top,cell);
        }
      });
    });
  },

  drawShadow: function() {
    var self = this,
        left,
        top,
        shadow = self.bindings.piece.clone();

    shadow.drop();
    shadow.blocks.forEach(function(block) {
      left = self.config.board.left + self.config.cell.width * block.x;
      top = self.config.board.top + self.config.cell.height * block.y;
      self.drawCell(left,top,SHADOW);
    });
  },

  drawPiece: function() {
    var  self = this,
         left,
         top;

    self.drawShadow();
    self.bindings.piece.blocks.forEach(function(block) {
      left = self.config.board.left + self.config.cell.width * block.x;
      top = self.config.board.top + self.config.cell.height * block.y;
      self.drawCell(left,top,self.bindings.piece.shape);
    });
  },

  drawNextPiece: function() {
    var self = this,
        left = self.config.nextPiece.left,
        top = self.config.nextPiece.top,
        width = self.config.cell.width * 4,
        height = self.config.cell.height * 4,
        pivot = { x: 2, y: 1 };

    self.ctx.lineWidth = self.config.cell.border.width;
    self.ctx.strokeStyle = self.config.cell.border.color;
    self.ctx.fillStyle = self.config.cell.colors[EMPTY];
    self.ctx.fillRect(left,top,width,height);
    self.ctx.strokeRect(left,top,width,height);
    shapes[self.bindings.nextPiece.shape].forEach(function(relative) {
      left = self.config.nextPiece.left + self.config.cell.width * (pivot.x + relative.x);
      top = self.config.nextPiece.top + self.config.cell.height * (pivot.y + relative.y);
      self.drawCell(left,top,self.bindings.nextPiece.shape);
    });
  },

  drawScore: function() {
    var left = this.config.score.left,
        top = this.config.score.top;

    this.ctx.fillStyle = this.config.score.font.color;
    this.ctx.font = this.config.score.font.family;
    this.ctx.fillText("Lines: " + this.bindings.score.lines,left,top);
    this.ctx.fillText("Level: " + this.bindings.score.level,left,top + 25);
  },

  drawAlert: function(message) {
    var left = this.config.alert.left,
        top = this.config.alert.top;

    this.ctx.fillStyle = this.config.alert.font.color;
    this.ctx.font = this.config.alert.font.family;
    this.ctx.fillText(message,left,top);
  },

  clear: function() {
    var left = 0,
        top = 0,
        width = this.canvas.width,
        height = this.canvas.height;

    this.ctx.clearRect(left,top,width,height);
  },

  render: function() {
    this.clear();
    this.drawBoard(this.bindings.board);
    this.drawPiece(this.bindings.piece);
    this.drawNextPiece(this.bindings.piece);
    this.drawScore(this.bindings.score);
    switch (this.bindings.gameState.value) {
      case 'playing':
        // Do nothing...
        break;
      case 'paused':
        this.drawAlert('Game Paused');
        break;
      case 'game-over':
        this.drawAlert('Game Over');
        break;
    }
  }

};
