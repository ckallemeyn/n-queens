/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting

// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
window.findNRooksSolution = function(n) {
  var solution;
  var newBoard = new Board({'n': n});

  var innerRecurse = function(row) {
    row = row || 0;
    if (n === row) {
      return newBoard.rows();
    }
    for (var col = 0; col < n; col++) {
      newBoard.togglePiece(row, col);

      if (!newBoard.hasAnyRooksConflicts()) {
        return innerRecurse(row+1);
      }
      newBoard.togglePiece(row,col);
    }
  };
  solution = innerRecurse();
  // ^ outputs an array [[0]];
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  // find parameters for recursive call
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// create a new board object of size n
// create a var equal to the maximum number of rooks
// create an inner recursive function that accepts the new board as a parameter
// use toggle method to toggle piece on square
// use toggle method to add piece to next square
// run conflict check on row and column
// if there is a conflict, use toggle method to remove piece from new square, advance to next square and repeat
// if there is not a conflict, row++, advance to next square and repeat

window.countNRooksSolutions = function(n) {
  // var board = new Board({n: n});
  var solutionCount = 0;
  var validCols = [];

  for (var i = 0; i < n; i++) {
    validCols.push(i);
  }
  var recursiveSolutionSearch = function(rowIndex) {
    for(var i = 0; i < validCols.length; i++) {
      //target specific cell
      var target = validCols.splice(i,1);

      //not in last row; keep recursing
      if(rowIndex !== n-1) {
        recursiveSolutionSearch(rowIndex+1);
      } else {
      //we're in the last row
        solutionCount++;
      }
      validCols.splice(i, 0, target[0]);
      //board.togglePiece(rowIndex, validCols[i]);
    }
  };
  recursiveSolutionSearch(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
