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


/*
  Grid
  - size of grid
  - size of cell
  - num of column and row
*/




let sketch = function(P5) {
  let grid;
  let mazeGen;
  
  P5.setup = function() {
    P5.createCanvas(300, 300);
    grid = new Grid(P5, P5.width, P5.height, 15);
    mazeGen = new MazeGen(P5, grid);
    //P5.frameRate(3);
  };
  
  P5.draw = function() {
    P5.background(51);
    mazeGen.update();
    grid.draw();
  };
};

new p5(sketch, 'recursive-backtracker');