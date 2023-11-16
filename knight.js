function verifyMove(coords) {
  const [x, y] = coords;
  if (x < 0 || y < 0 || x > 7 || y > 7) return null;
  return coords;
}

function possibleMoves(coords, numMoves = -1, movesMade = []) {
  const [x, y] = coords;
  const count = numMoves + 1;
  const moveHistory = [];
  for (let i = 0; i < movesMade.length; i += 1) {
    moveHistory.push(movesMade[i]);
  }
  moveHistory.push(coords);
  const firstP = verifyMove([x + 1, y + 2]);
  const secondP = verifyMove([x + 1, y - 2]);
  const thirdP = verifyMove([x - 1, y + 2]);
  const fourthP = verifyMove([x - 1, y - 2]);
  const fifthP = verifyMove([x + 2, y + 1]);
  const sixthP = verifyMove([x + 2, y - 1]);
  const seventhP = verifyMove([x - 2, y + 1]);
  const eighthP = verifyMove([x - 2, y - 1]);
  return {
    coords, count, moveHistory, firstP, secondP, thirdP, fourthP, fifthP, sixthP, seventhP, eighthP,
  };
}

const Search = (() => {
  const queue = [];
  const oldMoves = [];
  const levelOrder = (node, target) => {
    if (`${node.coords}` === `${target}`) {
      const currentCount = node.count;
      const currentHistory = node.moveHistory;
      queue.splice(0, queue.length);
      oldMoves.splice(0, oldMoves.length);
      return { currentCount, currentHistory };
    }
    oldMoves.push(`${node.coords}`);
    if (node.firstP !== null && !oldMoves.includes(`${node.firstP}`)) {
      queue.push(possibleMoves(node.firstP, node.count, node.moveHistory));
    }
    if (node.secondP !== null && !oldMoves.includes(`${node.secondP}`)) {
      queue.push(possibleMoves(node.secondP, node.count, node.moveHistory));
    }
    if (node.thirdP !== null && !oldMoves.includes(`${node.thirdP}`)) {
      queue.push(possibleMoves(node.thirdP, node.count, node.moveHistory));
    }
    if (node.fourthP !== null && !oldMoves.includes(`${node.fourthP}`)) {
      queue.push(possibleMoves(node.fourthP, node.count, node.moveHistory));
    }
    if (node.fifthP !== null && !oldMoves.includes(`${node.fifthP}`)) {
      queue.push(possibleMoves(node.fifthP, node.count, node.moveHistory));
    }
    if (node.sixthP !== null && !oldMoves.includes(`${node.sixthP}`)) {
      queue.push(possibleMoves(node.sixthP, node.count, node.moveHistory));
    }
    if (node.seventhP !== null && !oldMoves.includes(`${node.seventhP}`)) {
      queue.push(possibleMoves(node.seventhP, node.count, node.moveHistory));
    }
    if (node.eighthP !== null && !oldMoves.includes(`${node.eighthP}`)) {
      queue.push(possibleMoves(node.eighthP, node.count, node.moveHistory));
    }

    return levelOrder(queue.shift(), target);
  };

  return { levelOrder };
})();

function knightMoves(startCoord, endCoord) {
  const moveTree = possibleMoves(startCoord);
  const result = Search.levelOrder(moveTree, endCoord);
  console.log(`You made it in ${result.currentCount} moves! Here's your path from ${startCoord} to ${endCoord}:`);
  const history = result.currentHistory;
  for (let i = 0; i < history.length; i += 1) {
    console.log(history[i]);
  }
}
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [0, 0]);
knightMoves([0, 0], [7, 7]);
