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
  }

  draw() {    
    stroke(255);

    //top
    if(this.walls[0]) {
      line(this.x1, this.y1, this.x2, this.y1);
    }

    //right
    if(this.walls[1]) {
      line(this.x2, this.y1, this.x2, this.y2);
    }

    //bottom
    if(this.walls[2]) {
      line(this.x1, this.y2, this.x2, this.y2);
    }

    //left
    if(this.walls[3]) {
      line(this.x1, this.y1, this.x1, this.y2);
    }

    if(this.visited){
      fill(255, 0, 255, 100);
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

    for(let r = 0; r < this.rows; r++) {
      for(let c = 0; c < this.columns; c++) {
        let cell = new Cell(c, r, this.cellSize);
        this.cells.push(cell);
      }
    }
  }

  getRandomUnvisitedNeighbour(c, r) {
    let neighbour = [];

    let topNeighbour = this.cells[Utility.ConvertToSingleDimensionalIndex(c, r - 1, this.columns, this.rows)];
    let rightNeighbour = this.cells[Utility.ConvertToSingleDimensionalIndex(c + 1, r, this.columns, this.rows)];
    let bottomNeighbour = this.cells[Utility.ConvertToSingleDimensionalIndex(c, r + 1, this.columns, this.rows)];
    let leftNeighbour = this.cells[Utility.ConvertToSingleDimensionalIndex(c - 1, r, this.columns, this.rows)];

    //check if neighbour have been visited
    if(!topNeighbour?.visited) {
      neighbour.push(topNeighbour);
    }
    if(!rightNeighbour?.visited) {
      neighbour.push(rightNeighbour);
    }
    if(!bottomNeighbour?.visited) {
      neighbour.push(bottomNeighbour);
    }
    if(!leftNeighbour?.visited) {
      neighbour.push(leftNeighbour);
    }

    if(neighbour.length > 0) {
      let index = floor(random(0, neighbour.length));
      return neighbour[index];
    } else {
      return undefined;
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
  }

  update() {
    this.current.visited = true;
    let next = this.grid.getRandomUnvisitedNeighbour(this.current.column, this.current.row);
    if(next) {
      next.visited = true;
      this.current = next;
    }
  }
}

let grid;
let mazeGen;

function setup() {
  createCanvas(640, 360);
  grid = new Grid(width, height, 40);
  mazeGen = new MazeGen(grid);
}

function mousePressed() {
  
}

function draw() {
  background(51);
  mazeGen.update();
  grid.draw();
}