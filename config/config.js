var config = {
  game: {
    board: {
      rows: 23,
      cols: 10
    },
    keys: {
      moveLeft:   37,
      moveRight:  39,
      moveDown:   40,
      rotate:     38,
      drop:       32,
      pause:      27,
      continue:   32
    }
  },
  canvas: {
    id: 'js-tetris-canvas',
    width: 500,
    height: 578,
    board: {
      left: 1,
      top: 1,
      border: {
        width: 1,
        color: 'black'
      }
    },
    cell: {
      width: 25,
      height: 25,
      border: {
        width: 1,
        color: 'black'
      },
      colors: [
        'gray',       // empty
        '#cceeff',    // O
        '#ff6666',    // I
        '#99ff99',    // S
        '#ffcc66',    // Z
        '#ff99ff',    // L
        '#ccff99',    // J
        '#cc99ff',    // T
        '#aaa',       // shadow
      ]
    },
    nextPiece: {
      left: 280,
      top:  50,
      border: {
        width: 1,
        color: 'black'
      }
    },
    score: {
      left: 280,
      top: 250,
      font: {
        family: '28px SuperMario',
        color: 'darkgreen'
      }
    },
    alert: {
      left: 280,
      top: 350,
      font: {
        family: '28px SuperMario',
        color: 'darkred'
      }
    }
  }
};
