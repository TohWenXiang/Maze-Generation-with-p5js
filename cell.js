class Cell {
  constructor(P5, column = 0, row = 0, cellSize = 0) {
    this.P5 = P5;
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

    this.color = this.P5.color(0, 0, 255, 100);
  }

  draw() {
    this.P5.stroke(255);

    //top
    if (this.walls[0]) {
      this.P5.line(this.x1, this.y1, this.x2, this.y1);
    }

    //right
    if (this.walls[1]) {
      this.P5.line(this.x2, this.y1, this.x2, this.y2);
    }

    //bottom
    if (this.walls[2]) {
      this.P5.line(this.x1, this.y2, this.x2, this.y2);
    }

    //left
    if (this.walls[3]) {
      this.P5.line(this.x1, this.y1, this.x1, this.y2);
    }

    if (this.visited) {
      this.P5.noStroke();
      this.P5.fill(this.color);
      this.P5.rect(this.x1, this.y1, this.cellSize, this.cellSize);
    }
  }
}