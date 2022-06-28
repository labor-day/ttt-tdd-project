
class ComputerPlayer {

  static getValidMoves(grid) {
    // Your code here
    let validMoves = [];
    grid.forEach(
      (row, rowIndex) => {
        row.forEach(
          (col, colIndex) => {
              if (grid[rowIndex][colIndex] === " ") {
                validMoves.push({row: rowIndex, col: colIndex});
              }
            }
        );
      }
    );

    return validMoves;
  }

  static randomMove(grid) {

    // Your code here
    let moves = ComputerPlayer.getValidMoves(grid);
    return moves[generateRandom(grid.length-1, 0)];


  }

  static getWinningMoves(grid, symbol) {

    // Your code here
    let winners = [];
    let winningColumns = checkColumns(grid, symbol);
    let winningRows = checkRows(grid, symbol);
    let winningDiag = checkDiag(grid, symbol);
    winners = [...winners, ...winningColumns, ...winningRows, ...winningDiag];
    return winners;
  }

  static getSmartMove(grid, symbol) {

    // Your code here
    let winners = this.getWinningMoves(grid, symbol);
    if (winners.length > 0) {return winners[0];}

    let opponentWinners = this.getWinningMoves(grid, "O");
    if (opponentWinners.length > 0) {return opponentWinners[0];}

    return this.randomMove(grid);

  }

}

let generateRandom = function(max, min) {
  return Math.floor(Math.random(max - min + 1));
}

let checkColumns = (grid, symbol) => {
  let winners = [];
  let topRow = grid[0];

  for (let i = 0; i < topRow.length; i++) {

    let count = {
      "X": 0,
      "O": 0,
      " ": 0,
      "positionOfSpace": {row:0, col:0}
    }

    for (let j = 0; j < grid.length; j++) {

      count[grid[j][i]]++;
      if (grid[j][i] === " ") {
        count.positionOfSpace.row = j;
        count.positionOfSpace.col = i;
      }

    }

    if(count[symbol] === 2 && count[" "] === 1) {
      winners.push(count.positionOfSpace);
    }
  }

  return winners;
}

let checkRows = (grid, symbol) => {

  let winners = [];

  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    let count = {
      "X": 0,
      "O": 0,
      " ": 0,
      "positionOfSpace": {row:0, col:0}
    }

    for (let j = 0; j < row.length; j++) {

      count[grid[i][j]]++;
      if (grid[i][j] === " ") {
        count.positionOfSpace.row = i;
        count.positionOfSpace.col = j;
      }
    }

    if(count[symbol] === 2 && count[" "] === 1) {
      winners.push(count.positionOfSpace);
    }
  }

  return winners;
}

let checkDiag = (grid, symbol) => {
  let winners = [];

  winners = [...winners, ...(checkDown(grid, symbol)), ...(checkUp(grid, symbol))];

  return winners;
}

let checkDown = (grid, symbol) => {
  let winners = [];

  let count = {
    "X": 0,
    "O": 0,
    " ": 0,
    "positionOfSpace": {row:0, col:0}
  }

  for (let i = 0; i < grid.length; i++) {
    count[grid[i][i]]++;
    if (grid[i][i] === " ") {
      count.positionOfSpace.row = i;
      count.positionOfSpace.col = i;
    }
  }

  if(count[symbol] === 2 && count[" "] === 1) {
    winners.push(count.positionOfSpace);
  }

  return winners;
}

let checkUp = (grid, symbol) => {
  let winners = [];

  let count = {
    "X": 0,
    "O": 0,
    " ": 0,
    "positionOfSpace": {row:0, col:0}
  }

  for (let i = grid.length-1; i >= 0; i--) {

    count[grid[i][2-i]]++;
    if (grid[i][2-i] === " ") {
      count.positionOfSpace.row = i;
      count.positionOfSpace.col = 2-i;
    }
  }

  if(count[symbol] === 2 && count[" "] === 1) {
    winners.push(count.positionOfSpace);
  }

  return winners;
}

grid1 = [
['O',' ',' '],
[' ','O',' '],
['O',' ',' ']];


console.log(ComputerPlayer.getWinningMoves(grid1, "O"));



module.exports = ComputerPlayer;
