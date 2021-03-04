/// <reference path="library/references/p5.global-mode.d.ts"/>

/*
  Recursive implementation
  Randomized depth-first search on a hexagonal grid
  The depth-first search algorithm of maze generation is frequently implemented using backtracking. 
  This can be described with a following recursive routine:
    1. Given a current cell as a parameter,
    2. Mark the current cell as visited
    3. While the current cell has any unvisited neighbour cells
      1. Choose one of the unvisited neighbours
      2. Remove the wall between the current cell and the chosen cell
      3. Invoke the routine recursively for a chosen cell
  which is invoked once for any initial cell in the area.
*/

/*
  Cell
  - row, column, cellwidth
  - is this cell visited?
  - existance of its walls
*/
class Cell {
  constructor(column = 0, row = 0, cellSize = 0) {
    this.column = column;
    this.row = row;
    this.cellSize = cellSize;

    //top, right, bottom, left
    this.walls = [true, true, true, true];
    this.visited = false;

    this.x1 = this.column * this.cellSize;
    this.y1 = this.row * this.cellSize;
    this.x2 = this.x1 + this.cellSize;
    this.y2 = this.y1 + this.cellSize;

    this.color = color(0, 0, 255, 100);
  }

  draw() {
    stroke(255);

    //top
    if (this.walls[0]) {
      line(this.x1, this.y1, this.x2, this.y1);
    }

    //right
    if (this.walls[1]) {
      line(this.x2, this.y1, this.x2, this.y2);
    }

    //bottom
    if (this.walls[2]) {
      line(this.x1, this.y2, this.x2, this.y2);
    }

    //left
    if (this.walls[3]) {
      line(this.x1, this.y1, this.x1, this.y2);
    }

    if (this.visited) {
      noStroke();
      fill(this.color);
      rect(this.x1, this.y1, this.cellSize, this.cellSize);
    }
  }
}

/*
  Grid
  - size of grid
  - size of cell
  - num of column and row
*/
class Grid {
  constructor(gridWidth = 100, gridHeight = 100, cellSize = 10) {
    this.cellSize = cellSize;
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.columns = floor(this.gridWidth / this.cellSize);
    this.rows = floor(this.gridHeight / this.cellSize);

    this.cells = [];

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++) {
        let cell = new Cell(c, r, this.cellSize);
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
      let index = floor(random(0, unvisitedNeighbour.length));
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

class MazeGen {
  constructor(grid = new Grid()) {
    //starts at the 0th cell
    this.grid = grid;
    this.current = this.grid.cells[0];
    this.stack = [];
  }

  update() {
    this.current.visited = true;
    this.current.color = color(255, 0, 0, 100);

    //step 1: pick a random unvisited neighbour and mark it visited
    let next = this.grid.getRandomUnvisitedAdjacentNeighbour(this.current.column, this.current.row);
    if (next) {
      next.visited = true;
      next.color = color(0, 0, 255, 100);

      //step 2: push the current cell to the stack
      this.stack.push(this.current);

      //step 3: remove the wall between the current and choosen cell
      this.grid.removeWallsBetween(this.current, next);

      //step 4: set current cell as the next cell
      this.current = next;
    } else if(this.stack.length > 0){
      //if stack is not empty, pop the cell from the stack and make it current
      this.current = this.stack.pop();
    }
  }
}

let grid;
let mazeGen;

function setup() {
  createCanvas(640, 360);
  grid = new Grid(width, height, 10);
  mazeGen = new MazeGen(grid);
  //frameRate(3);
}

function mousePressed() {

}

function draw() {
  background(51);
  mazeGen.update();
  grid.draw();
}