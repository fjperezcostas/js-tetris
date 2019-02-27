(function(config) {
  var board = new Board(config.game.board.rows,config.game.board.cols),
      piece = new Piece(board),
      nextPiece = new Piece(board),
      score = new Score(),
      timer = new Timer(),
      gameState = new GameState(),
      canvas = new Canvas({
        config: config.canvas,
        bindings: {
          board: board,
          piece: piece,
          nextPiece: nextPiece,
          score: score,
          gameState: gameState
        }
      });

  init();

  function init() {
    window.addEventListener('load', function() {
      loadAssets().then(startGame);
    });
    window.addEventListener('keydown', function(event) {
      onKeydown(event);
    });
  }

  function loadAssets() {
    return document.fonts.load('0pt SuperMario');
  }

  function pauseGame() {
    timer.clear();
    gameState.value = 'paused';
    canvas.render();
  }

  function reanudeGame() {
    timer.start(updateGame,score.level);
    gameState.value = 'playing';
    canvas.render();
  }

  function startGame() {
    board.clear();
    piece.new();
    nextPiece.new();
    score.reset();
    gameState.value = 'playing';
    canvas.render();
    timer.start(updateGame,score.level);
  }

  function finishGame() {
    timer.clear();
    gameState.value = 'game-over';
    canvas.render();
  }

  function updateGame() {
    if (piece.endFall()) {
      board.insertPiece(piece);
      if (board.countFilledRows() > 0) {
        score.update(board.countFilledRows());
        board.clearFilledRows();
      }
      piece.new(nextPiece.shape);
      nextPiece.new();
      if (piece.collides()) {
        finishGame();
      }
    } else {
      piece.moveDown();
    }
    canvas.render();
    if (gameState.value == 'playing') {
      timer.start(updateGame,score.level);
    }
  }

  function onKeydown(event) {
    var key = event.keyCode;

    switch (gameState.value) {
      case 'playing':
        switch (key) {
          case config.game.keys.moveLeft:
            piece.moveLeft();
            break;
          case config.game.keys.moveRight:
            piece.moveRight();
            break;
          case config.game.keys.moveDown:
            piece.moveDown();
            break;
          case config.game.keys.rotate:
            piece.rotate();
            break;
          case config.game.keys.drop:
            piece.drop();
            break;
          case config.game.keys.pause:
            pauseGame();
            break;
        }
        break;
      case 'paused':
        if (key == config.game.keys.continue) {
          reanudeGame();
        }
        break;
      case 'game-over':
        if (key == config.game.keys.continue) {
          startGame();
        }
        break;
    }
    canvas.render();
  }
})(config);
