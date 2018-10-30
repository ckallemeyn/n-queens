
// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // ridx 0         1          2         3
    // [[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,1,0,0]]
    //
    hasRowConflictAt: function(rowIndex) {
      // console.log(rowIndex);
      //debugger;
      var currentRow = this.get(rowIndex);
      var rowSum = 0;

      for (var i = 0; i < currentRow.length; i++) {
        if (this.attributes[rowIndex][i] === 1) {
          rowSum++;
        }
      }
      if (rowSum > 1) {
        return true;
      } else {
        return false; // fixme
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // first step we need to iterate through the rows of the board
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // recursively call 'hasrowconflicts' function with the index that we pass in
      // if there are any conflicts, return true - otherwise return false
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    //            ridx
    // [[0,0,0,0], 0
    //  [1,0,0,0], 1
    //  [0,0,0,0], 2
    //  [1,1,0,0]] 3
    hasColConflictAt: function(colIndex) {
      // get number of rows to iterate over from size of board
      var currentRow = this.get(colIndex);
      var columnSum = 0;
      for (var i = 0; i < currentRow.length; i++) {
        columnSum += this.attributes[i][colIndex];
      }
      if (columnSum > 1) {
        return true;
      } else {
        return false;
      }
      // define a accumulator that will recieve all column values at a given index
      // set accumulator to 0
      // iterate over each row
      // MAYBE USE A CHECK HERE??
      // push value at a particular index to accumulator for each row
      // if accumulator is > 0 return true
      // else return false
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.get('n'); i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    //            ridx
    // [[0,0,0,0], 0
    //  [0,0,0,0], 1
    //  [0,0,0,0], 2
    //  [0,0,0,0]] 3
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
        var board = this.attributes;
        var queens = 0;
        var size = board.n;

        for (var i = 0; i < size; i++) {

          if (board[i][majorDiagonalColumnIndexAtFirstRow]) {
            queens++;
          }
          majorDiagonalColumnIndexAtFirstRow++;
        }
        if (queens > 1) {
          return true;
        }
        return false;

      // get size of board
      // assign a variable to the size of the board
      // assign a counter variable whose initial value is zero
      // assign starting column index variable to equal majorDiagonalColumnIndexAtFirstRow
      // iterate through size of the board using while loop
      // rowIndex = 0
      // for (var i = majorDiagonalColumnIndexAtFirstRow; i < n; i++) {
        //counter += this.attributes[rowIndex][i];
        //rowIndex++
      //}
      // if (counter > 1) {
        //return true;
      //}
      // console.log(this.__proto__._getFirstRowColumnIndexForMajorDiagonalOn(1,1));
      // return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.attributes;
      var size = board.n;
      debugger;
      console.log(size);

      for(var i = 0 - (size - 2); i < size; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;

      // get size of board
      // assign size to a variable
      // assign acc variable to 0
      // iterate across the first row and feeds each colIndex to hasMajorDiagonalConflictAt function
      // check if hasMajorDiagonalConflictAt(i) is true
      // return true otherwise
      // assign counter variable
      // assign var colIndex to 0
      // using a for loop iterate from row 1 through row n - 1
      // add the value of each cell to the accumulator
      // increment colIndex
      // check if counter is > 1
      // return true
      // otherwise
      // return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // get size of board
      // assign a variable to the size of the board
      // assign a accumulator variable to zero
      // assign starting column index variable to equal minorDiagonalColumnIndexAtFirstRow
      // iterate through size of the board
      // assign a variable to rowIndex = 0
      // for (var i = minorDiagonalColumnIndexAtFirstRow; i > 0; i--) {
        // accumulator += this.attributes[rowIndex][i];
        // rowIndex++
      //}
      // if (accumulator > 1) {
        //return true;
      //}
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
