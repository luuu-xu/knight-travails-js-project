// Using BFS with a queue to find the minimum steps from the knight to the target position.

// Possible moves of the knight are treated as chidlren of a tree.
// Knight can move two spaces in four directions and then one space left or right, 
// thus its new position from start of [x, y] can be expressed as adding this array of:
// [x + 2, y - 1], [x + 2, y + 1], [x - 2, y + 1], [x - 2, y - 1],
// [x + 1, y + 2], [x - 1, y - 2], [x + 1, y - 2], [x - 1, y - 2].

// But the new position needs to be checked if its inside the border, from 0 to 7 (8 spaces lengthwise).

// Needs to create a game board (array of arrays) consisting all indices with a boolean parameter of either visited.

function Board(N = 8) {
  const board = new Array(N);
  for (let i = 0; i < N; i ++) {
    board[i] = new Array(N);
    for (let j = 0; j < N; j ++) {
      // creating unvisited square.
      board[i][j] = false;
    }
  }
  return board;
}

function ifInsideBoard(square, N = 8) {
  return (square[0] >= 0 && square[0] <= N - 1) && (square[1] >= 0 && square[1] <= N - 1);
}

function possibleMoves(startSquare, N = 8) {
  const dx = [2, 2, -2, -2, 1, 1, -1, -1];
  const dy = [1, -1, 1, -1, 2, -2, 2, -2];
  const possibleSquares = [];
  for (let i = 0; i < N; i ++) {
    const square = [startSquare[0] + dx[i], startSquare[1] + dy[i]];
    ifInsideBoard(square) 
    ? 
    possibleSquares.push(square) 
    : 
    null;
  }
  return possibleSquares;
}

function outputPath(inputItem) {
  let item = inputItem;
  let path = [inputItem.index];
  while (item.prev) {
    path.unshift(item.prev.index);
    item = item.prev;
  }
  return path;
}

function knightMoves(startSquare, endSquare) {
  // Create a gameboard with all squares unvisited.
  let board = Board();

  // A queue for BFS. Each item(object) has index, step, prev.
  let queue = [{index: startSquare, step: 0, prev: null}];

  while(queue.length > 0) {
    let item = queue.shift();

    // mark the square visited.
    const itemIndex = item.index;
    board[itemIndex[0]][itemIndex[1]] = true;

    // if the square is the endSquare, console log the step and path.
    if (itemIndex[0] === endSquare[0] && itemIndex[1] === endSquare[1]) {
      const path = outputPath(item);
      const step = item.step;

      // console.log("You made it in ", step, " steps!");
      // console.log("Here's your path: ", path);
      const result = "You made it in " + step + " steps! " + "Here's your path: " + JSON.stringify(path);

      // *** Show all possible solutions/paths by NOT return! Instead console.log ***
      return result;
    }

    // else, calculate valid possible moves (inside board and unvisited) and then enqueue them.
    const allPossibleSquares = possibleMoves(item.index);
    const unvisitedPossibleSquares = allPossibleSquares.filter((e) => board[e[0]][e[1]] === false);
    const unvisitedPossibleSquaresWithStep = unvisitedPossibleSquares.map(e => {
      return {
        index: [e[0], e[1]],
        step: item.step + 1,
        prev: item
      }
    });
    queue.push(...unvisitedPossibleSquaresWithStep);
  }
}

console.log(knightMoves([3, 3], [3, 3]));
console.log(knightMoves([3, 3], [5, 2]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([3, 3], [0, 1]));
console.log(knightMoves([3, 3], [7, 7]));