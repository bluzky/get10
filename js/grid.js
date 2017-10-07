var Get10 = Get10 || {};

Get10.LogicalGrid = (function(Get10, E){
  var LogicalGrid = function(game) {
    this.game = game;
    this.cells = [];
    this.selectedCells = [];
    this.state = "normal";
    this.rowCount = Get10.cfg.board.height;
    this.colCount = Get10.cfg.board.width;
    this.cellWidth = Get10.cfg.board.cellWidth;
  };

  E.extend(LogicalGrid, {

    initCells: function() {
      this.clear();
      for (var row = 0; row < this.rowCount; row++) {
        var rowCells = [];

        for (var col = 0; col < this.colCount; col++) {
          var cell = new Get10.Cell(col, row, this.cellWidth);
          rowCells.push(cell);
          cell.addToScene(this.game);
        }
        this.cells.push(rowCells);
      }
    },

    clear: function() {
      this.cells = [];
      this.selectedCells = [];
    },

    onclick: function(position) {
      if (this.isInGrid(position.x, position.y)) {
        var row = Math.floor(position.y / this.cellWidth),
            col = Math.floor(position.x / this.cellWidth);
        var cell = this.cells[row][col];

        if (cell.selected == true && this.selectedCells.length > 1) {
          this.state = "cleaning";
          this.completeMoving(cell);
        } else {
          this.state = "selected";
          this.clearAllSelectedCell();
          this.selectSameCellWith(cell);
        }
        E.Audio.play("CLICK", 0.5);
      }
    },

    clearAllSelectedCell: function(){
      for(var i = 0; i < this.selectedCells.length; i++){
        this.selectedCells[i].setSelected(false);
      }
      this.selectedCells = [];
    },

    iterateCells: function(handler) {
      for (var row = 0; row < this.cells.length; row++) {
        for (var col = 0; col < this.cells[row].length; col++) {
          handler.call(this, this.cells[row][col], row, col);
        }
      }
    },

    isInGrid: function(x, y) {
      return x > 0 &&
        y > 0 &&
        x < this.colCount * this.cellWidth &&
        y < this.rowCount * this.cellWidth;
    },

    selectSameCellWith: function(cell) {
      cell.setSelected(true);
      this.selectedCells.push(cell);

      var siblings = this.getSiblingCells(cell.row, cell.col);
      for (var i = 0; i < siblings.length; i++) {
        if (siblings[i].getColor() == cell.getColor() && siblings[i].selected == false)
          this.selectSameCellWith(siblings[i]);
      }
    },

    getSiblingCells: function(row, col) {
      var siblings = [
        this.getCell(row + 1, col),
        this.getCell(row - 1, col),
        this.getCell(row, col + 1),
        this.getCell(row, col - 1)
      ];
      for (var i = siblings.length - 1; i >= 0; i--) {
        if (siblings[i] == null) {
          siblings.splice(i, 1);
        }
      }
      return siblings;
    },

    getCell: function(row, col) {
      if (this.isCellAddressValid(row, col)) {
        return this.cells[row][col];
      } else {
        return null;
      }
    },

    isCellAddressValid: function(row, col) {
      return row >= 0 &&
        col >= 0 &&
        row < this.rowCount &&
        col < this.colCount;
    },

    completeMoving: function(cell) {
      cell.incNumber(1);
      cell.setSelected(false);

      var score = 0;
      for (var i = 0; i < this.selectedCells.length; i++) {
        if (!this.selectedCells[i].is(cell)) {
          this.selectedCells[i].destroy();
        }
        score += (i * 2 + 1);
      }
      // this.selectedCells = [];
      score += this.selectedCells.length * 3;
      this.game.score.addScore(score);
    },

    cleanAndRefill: function() {
      this.state = "normal";
      var tofill = [];
      for (var i = 0; i < this.colCount; i++) {
        tofill.push(0);
      }

      // delete all selected dots
      for (var i = 0; i < this.selectedCells.length; i++) {
        tofill[this.selectedCells[i].col] += 1;
      }

      for (var col = 0; col < tofill.length; col++) {
        // only clean col with destroyed cells
        if (tofill[col] > 0) {
          var fillCount = 0;
          for (var row = this.rowCount - 1; row >= 0; row--) {
            var thisCell = this.cells[row][col];
            if (thisCell == null ||
              thisCell.selected ||
              fillCount == tofill[col]
            ) {

              if (thisCell && thisCell.selected)
                fillCount++;

              var movedCell = this.getLastValidCellInColumn(col, row);
              if (movedCell) {
                this.cells[row][col] = movedCell;
                movedCell.moveTo(col, row);
              } else {
                var color = Get10.randomChoice(Get10.cfg.colors);
                var newCell = new Get10.Cell(col, row, this.cellWidth);
                var x = newCell.getPosition()[0],
                  y = (row - tofill[col]) * this.cellWidth;
                this.cells[row][col] = newCell;
                newCell.setPosition(x, y);
                newCell.moveTo(col, row);
                newCell.addToScene(this.game);
              }
            }
          }
        }
      }
      this.selectedCells = [];
    },

    getLastValidCellInColumn: function(col, upperBound) {
      for (var i = upperBound - 1; i >= 0; i--) {
        if (this.cells[i][col] != null && !this.cells[i][col].selected) {
          var cell = this.cells[i][col];
          this.cells[i][col] = null;
          return cell;
        }
      }
      return null;
    },

    getMax: function() {
      var max = 0;
      this.iterateCells(function(cell) {
        max = Math.max(max, cell.number);
      });
      return max;
    },

    canMove: function() {
      var hasValidMove = false;
      for (var row = 0; row < this.rowCount; row++) {
        for (var col = 0; col < this.colCount; col++) {
          var siblings = this.getSiblingCells(row, col);
          for (var i = 0; i < siblings.length; i++) {
            if (siblings[i].getColor() == this.cells[row][col].getColor()) {
              hasValidMove = true;
              break;
            }
          }
        }
      }
      return hasValidMove;
    }
  });

  return LogicalGrid;
})(Get10, E);
