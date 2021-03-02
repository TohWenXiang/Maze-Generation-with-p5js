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
  - row, column
  - existance of its walls
*/
class Cell {
  constructor(column = 0, row = 0, cellSize = 0) {
    this.column = column;
    this.row = row;
    this.cellSize = cellSize;
    //top, right, bottom, left
    this.walls = [true, true, true, true];
  }

  draw() {
    let x1 = this.column * this.cellSize;
    let y1 = this.row * this.cellSize;
    let x2 = x1 + this.cellSize;
    let y2 = y1 + this.cellSize;
    
    stroke(255);

    //top
    if(this.walls[0]) {
      line(x1, y1, x2, y1);
    }

    //right
    if(this.walls[1]) {
      line(x2, y1, x2, y2);
    }

    //bottom
    if(this.walls[2]) {
      line(x1, y2, x2, y2);
    }

    //left
    if(this.walls[3]) {
      line(x1, y1, x1, y2);
    }

    //noFill();
    //rect(x, y, this.cellSize, this.cellSize); 

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

    for(let r = 0; r < this.rows; r++) {
      for(let c = 0; c < this.columns; c++) {
        let cell = new Cell(c, r, this.cellSize);
        this.cells.push(cell);
      }
    }
  }

  draw() {
    this.cells.forEach((cell) => {
      cell.draw();
    });
  }
}

let grid;

function setup() {
  createCanvas(640, 360);
  grid = new Grid(width, height, 40);
}

function mousePressed() {
  
}

function draw() {
  background(51);
  grid.draw();
}