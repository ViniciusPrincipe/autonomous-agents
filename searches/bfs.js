function getKey(row, col) {
  return `${row},${col}`;
}

function getNeighbors(row, col, grid) {
  let neighbors = [];
  let iterations = 0;
  let delay = 50;

  for (let [r, c] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    let neighborRow = row + r;
    let neighborCol = col + c;

    if (
      neighborRow >= 0 &&
      neighborRow < GRID_WIDTH &&
      neighborCol >= 0 &&
      neighborCol < GRID_HEIGHT &&
      Math.abs(r) + Math.abs(c) === 1
    ) {
      if (grid[neighborRow][neighborCol].weight !== Infinity) {
        let neighbor = [neighborRow, neighborCol];
        neighbors.push(neighbor);
        //fill(0,250,0)
        //rect(neighbor[1] * GRID_SIZE, neighbor[0] * GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
    }
    //iteration++;
    //setTimeout(searchStep, delay);
  }

  return neighbors;
}

function bfs(grid, start, goal) {
  let queue = [[start]];
  let visited = new Set([getKey(start[0], start[1])]);

  while (queue.length > 0) {
    let path = queue.shift();
    let [row, col] = path[path.length - 1];
    row = Math.floor(row);
    col = Math.floor(col);

    if (row === goal[0] && col === goal[1]) {
      return {
        path: transformBfsToVector(path),
        visited: setTo2DArray(visited),
      };
    }

    for (let neighbor of getNeighbors(row, col, grid.gridMatrix)) {
      let neighborKey = getKey(neighbor[0], neighbor[1]);

      if (!visited.has(neighborKey)) {
        visited.add(neighborKey);
        queue.push([...path, neighbor]);
      }
    }
  }
  return null; // If goal is not found
}

function setTo2DArray(set) {
  // Convert the Set to an array and sort it by the first value
  const sortedArray = Array.from(set).sort();

  // Split each string in the array into its two values
  const splitArray = sortedArray.map((str) => str.split(","));

  // Map each sub-array to an array of numbers
  const numArray = splitArray.map((arr) => arr.map(Number));

  return numArray;
}

function transformBfsToVector(path) {
  let vectorPath = [];
  //console.log(path)
  for (let i = 0; i < path.length; i++) {
    vectorPath.push(createVector(path[i][0], path[i][1]));
  }
  //console.log(vectorPath)
  return vectorPath;
}