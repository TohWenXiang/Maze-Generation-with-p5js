class MazeGen {
  constructor(P5, grid = new Grid(), startColumn, startRow) {
    this.P5 = P5;
    //starts at the 0th cell
    this.grid = grid;
    
    this.startColumn = startColumn;
    this.startRow = startRow;
    
    let randomIndex = Utility.ConvertToSingleDimensionalIndex(this.startColumn, this.startRow, this.grid.columns, this.grid.rows);
    
    this.current = this.grid.cells[randomIndex];
    
    this.stack = [];
    this.isFinished = false;
  }

  update() {
    this.isFinished = (this.current.column === this. startColumn && this.current.row === this.startRow);
    
    this.current.visited = true;
    this.current.color = this.P5. color(255, 0, 0, 100);

    //step 1: pick a random unvisited neighbour and mark it visited
    let next = this.P5.random(this.grid.getUnvisitedAdjacentNeighbour(this.current.column, this.current.row));
    if (next) {
      next.visited = true;
      next.color = this.P5.color(0, 0, 255, 100);

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