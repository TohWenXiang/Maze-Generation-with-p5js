class Grid {
  constructor(P5, gridWidth = 100, gridHeight = 100, cellSize = 10) {
    this.P5 = P5;
    this.cellSize = cellSize;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.columns = this.P5.floor(this.gridWidth / this.cellSize);
    this.rows = this.P5.floor(this.gridHeight / this.cellSize);

    this.cells = [];

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let cell = new Cell(this.P5, c, r, this.cellSize);
        this.cells.push(cell);
      }
    }
  }

  /*
    default: get all cells one block/radius out from (c, r) including the cell at (c, r)
    eg. radius of 1 at (c, r) returns the 9 cells at (c, r)
  */
  getCellsWithinWindow(c = 0, r = 0, radius = 1) {
    let neighbour = [];
    
    for(let row = r - radius; row <= r + radius; row++) {
      for(let column = c - radius; column <= c + radius; column++) {
        neighbour.push(this.cells[Utility.ConvertToSingleDimensionalIndex(column, row, this.columns, this.rows)]);
      }
    }

    return neighbour;
  }

  getAdjacentNeighbour(c = 0, r = 0) {
    return this.getCellsWithinWindow(c, r).filter((neighbour, index) => index % 2 === 1)
  }

  getRandomUnvisitedAdjacentNeighbour(c, r) {
    let unvisitedNeighbour = this.getAdjacentNeighbour(c, r).filter(cell => !cell?.visited);

    if (unvisitedNeighbour.length > 0) {
      let index = this.P5.floor(this.P5.random(0, unvisitedNeighbour.length));
      return unvisitedNeighbour[index];
    } else {
      return undefined;
    }
  }

  removeWallsBetween(current, neighbour) {
    let x = current.column - neighbour.column;
    if(x === 1) {
      current.walls[3] = false;
      neighbour.walls[1] = false;
    } else if(x === -1) {
      current.walls[1] = false;
      neighbour.walls[3] = false;
    }

    let y = current.row - neighbour.row;
    if(y === 1) {
      current.walls[0] = false;
      neighbour.walls[2] = false;
    } else if(y === -1) {
      current.walls[2] = false;
      neighbour.walls[0] = false;
    }
  }

  draw() {
    this.cells.forEach((cell) => {
      cell.draw();
    });
  }
}