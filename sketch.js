/// <reference path="library/references/p5.global-mode.d.ts"/>

let vertices = [];

function setup() {
  createCanvas(640, 360);
}

function mousePressed() {
  var vector = createVector(mouseX, mouseY);
  vertices.push(vector);
}

function draw() {
  background(51);

  //every points must be connected with a path.
  //combined path distances must have the smallest value.

  let unreached = [];
  let reached = [];

  //all vertices is unreached
  //vertices.forEach(vertex => unreached.push(vertex));
  unreached = [...vertices];

  //starting from the first vertex
  reached.push(unreached.shift());
  
  //until all vertex is reached
  while(unreached.length > 0) {
    let shortestPath = Infinity;
    let reachedIndex = 0;
    let unreachedIndex = 0;

    for(let i = 0; i < reached.length; i++) {
      for(let j = 0; j < unreached.length; j++) {
        let vertex1 = reached[i];
        let vertex2 = unreached[j];
        //find the distance between all reached and unreached vertex
        let distance = dist(vertex1.x, vertex1.y, vertex2.x, vertex2.y);

        //find the smallest path using the calculated distance
        if(distance < shortestPath) {
          shortestPath = distance;
          //record the vertices of the shortest path
          reachedIndex = i;
          unreachedIndex = j;
        }
      }
    }

    line(reached[reachedIndex].x, reached[reachedIndex].y, unreached[unreachedIndex].x, unreached[unreachedIndex].y); 

    //starting from the first vertex
    reached.push(unreached[unreachedIndex]);
    unreached.splice(unreachedIndex, 1);
  }

  for (let i = 0; i < vertices.length; i++) {
    fill(255);
    stroke(255);
    ellipse(vertices[i].x, vertices[i].y, 16, 16)
  }
}