const Screen = require("./screen");
const Cursor = require("./cursor");
const { gridLines } = require("./screen");
const ComputerPlayer = require("./computer-player");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand("c", "play against computer", TTT.comp.bind(this));
    Screen.addCommand("r", "reset", TTT.reset.bind(this));
    Screen.addCommand("return", "place move", TTT.place.bind(this));
    Screen.addCommand("up", "move up", TTT.moveUp.bind(this));
    Screen.addCommand("down", "move down", TTT.moveDown.bind(this));
    Screen.addCommand("left", "move left", TTT.moveLeft.bind(this));
    Screen.addCommand("right", "move right", TTT.moveRight.bind(this));

    TTT.updateMsg.call(this);
    this.cursor.setBackgroundColor();

  }

  static updateMsg() {
    Screen.message = ` It is ${this.playerTurn}'s turn`;
  }

  static reset() {
    this.playerTurn = "O";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        Screen.grid[i][j] = " ";
      }
    }

    Screen.message = ` It is ${this.playerTurn}'s turn`;
    if (this.computer) {
      Screen.message = "Playing against computer. It is your turn (O).";
    }
    Screen.render();
    Screen.printCommands();
  }

  static comp() {
    delete Screen.commands['c'];
    this.computer = new ComputerPlayer();
    TTT.reset();
    this.playerTurn = "O";
    Screen.message = "Playing against computer. It is your turn (O).";
    Screen.render();
    Screen.printCommands();
  }

  static moveUp()  {
    this.cursor.up();
  }
  static moveDown()  {
    this.cursor.down();
  }
  static moveLeft()  {
    this.cursor.left();
  }
  static moveRight()  {
    this.cursor.right();
  }

  static computerMove() {
    let move = ComputerPlayer.getSmartMove(Screen.grid, "X");
    console.log(move);
    Screen.setGrid(move.row, move.col, "X");
    if(TTT.checkWin(Screen.grid)) {
      TTT.endGame(TTT.checkWin(Screen.grid));
    }
    this.playerTurn = "O";
    Screen.message = "Playing against computer. It is your turn (O).";
    Screen.render();
    Screen.printCommands()
  }

  static place() {
    if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);

      if(!this.computer) {
        if (this.playerTurn === "O") {
          this.playerTurn = "X";
        } else {this.playerTurn = "O"}
      }


      TTT.updateMsg.call(this);
      Screen.render();
      Screen.printCommands();

      if(TTT.checkWin(Screen.grid)) {
        TTT.endGame(TTT.checkWin(Screen.grid));
      }


      if (this.computer) {TTT.computerMove()};



    } else {
      TTT.updateMsg.call(this);
      Screen.message += "; invalid move";
      Screen.setBackgroundColor(this.cursor.row, this.cursor.col, "red");
      Screen.render();
      Screen.printCommands();

    }

  }

  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    //empty grid
    let empty = true;
    grid.forEach(
      row => {
        row.forEach(
          cell => {
            if (cell !== " ") {empty = false}
          }
        );
      }
    );
    if (empty) {
     return false;
    }

    //horizontal
    let horizontalWinner;
    grid.forEach(
      row => {
        if (row[0] !== " " && row[0] === row[1] && row[0] === row[2]) {
          horizontalWinner = row[0];
        }
      }
    );
    if (horizontalWinner) {
      return horizontalWinner;
    }

    //vertical
    let verticalWinner;
    for (let i = 0; i < 3; i++) {
      if (grid[0][i] !== " " && grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i]) {
        verticalWinner = grid[0][i];
      }
    }
    if (verticalWinner) {
      return verticalWinner;
    }

    //diagonal
    let diagonalWinner;

    if (grid[0][0] !== " " && grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
      diagonalWinner = grid[0][0];
    }

    if (grid[2][0] !== " " && grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2]) {
      diagonalWinner = grid[2][0];
    }

    if (diagonalWinner) {return diagonalWinner}

    //tie
    let tie = "T";
    grid.forEach(
      row => {
        row.forEach(
          cell => {
            if (cell === " ") {tie = false}
          }
        );
      }
    );
    return tie;

    }


  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();

    Screen.quit();
  }

}

module.exports = TTT;
