import React, { useState, useEffect } from 'react';
import './GameGrid.css'; // Import the CSS file

const GRID_SIZE = 10;

const GameGrid = () => {
  const [grid, setGrid] = useState([]);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [isPathCalculated, setIsPathCalculated] = useState(false);

  useEffect(() => {
    const initializeGrid = () => {
      const newGrid = [];
      for (let row = 0; row < GRID_SIZE; row++) {
        const currentRow = [];
        for (let col = 0; col < GRID_SIZE; col++) {
          currentRow.push({
            row,
            col,
            isStart: false,
            isEnd: false,
            isWall: false,
            isPath: false,
            step: null, // Change distance to step
          });
        }
        newGrid.push(currentRow);
      }
      setGrid(newGrid);
    };

    initializeGrid();
  }, []);

  const updateGrid = (row, col, type) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    if (type === 'start') {
      node.isStart = true;
      node.isEnd = false;
      node.isWall = false;
    } else if (type === 'end') {
      node.isEnd = true;
      node.isStart = false;
      node.isWall = false;
    } else if (type === 'wall') {
      node.isWall = !node.isWall;
    }
    newGrid[row][col] = node;
    setGrid(newGrid);
  };

  const handleClick = (row, col) => {
    if (!start) {
      setStart({ row, col });
      updateGrid(row, col, 'start');
    } else if (!end) {
      setEnd({ row, col });
      updateGrid(row, col, 'end');
    } else {
      updateGrid(row, col, 'wall');
    }
  };

  const findShortestPath = () => {
    if (!start || !end) return alert('Please select start and end points.');

    const queue = [[start.row, start.col]];
    const distances = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(Infinity));
    const previousNodes = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null));
    distances[start.row][start.col] = 0;

    while (queue.length) {
      const [currentRow, currentCol] = queue.shift();

      const neighbors = getNeighbors(currentRow, currentCol);
      for (const neighbor of neighbors) {
        const { row, col } = neighbor;
        if (grid[row][col].isWall) continue;

        const newDist = distances[currentRow][currentCol] + 1; // Each step counts as 1
        if (newDist < distances[row][col]) {
          distances[row][col] = newDist;
          previousNodes[row][col] = { row: currentRow, col: currentCol };
          queue.push([row, col]);
        }
      }
    }

    const path = [];
    let currentNode = { row: end.row, col: end.col };
    while (currentNode) {
      path.push(currentNode);
      currentNode = previousNodes[currentNode.row][currentNode.col];
    }

    if (distances[end.row][end.col] === Infinity) {
      alert('No path found!');
      return;
    }

    setGrid(visualizePath(path.reverse()));
    setIsPathCalculated(true);
  };

  // Update the getNeighbors function to support diagonal movement
  const getNeighbors = (row, col) => {
    const neighbors = [];
    const directions = [
      { dRow: -1, dCol: 0 }, // Up
      { dRow: 1, dCol: 0 },  // Down
      { dRow: 0, dCol: -1 }, // Left
      { dRow: 0, dCol: 1 },  // Right
      { dRow: -1, dCol: -1 }, // Top-Left (Diagonal)
      { dRow: -1, dCol: 1 },  // Top-Right (Diagonal)
      { dRow: 1, dCol: -1 },  // Bottom-Left (Diagonal)
      { dRow: 1, dCol: 1 },   // Bottom-Right (Diagonal)
    ];

    directions.forEach(({ dRow, dCol }) => {
      const newRow = row + dRow;
      const newCol = col + dCol;

      if (isValid(newRow, newCol)) {
        neighbors.push({ row: newRow, col: newCol });
      }
    });

    return neighbors;
  };

  const isValid = (row, col) => {
    return (
      row >= 0 &&
      col >= 0 &&
      row < GRID_SIZE &&
      col < GRID_SIZE &&
      !grid[row][col].isWall
    );
  };

  const visualizePath = (path) => {
    const newGrid = grid.slice();
    let stepCounter = 1; // Start step counting from 1
    path.forEach((node) => {
      const { row, col } = node;
      newGrid[row][col].isPath = true;
      newGrid[row][col].step = stepCounter++; // Increment step counter
    });
    return newGrid;
  };

  return (
    <div>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((node, nodeIndex) => {
              const { isStart, isEnd, isWall, isPath, step } = node;
              const extraClass = isStart
                ? 'node-start'
                : isEnd
                ? 'node-end'
                : isWall
                ? 'node-wall'
                : isPath
                ? 'node-path'
                : '';
              return (
                <div
                  key={nodeIndex}
                  className={`node ${extraClass}`}
                  onClick={() => handleClick(rowIndex, nodeIndex)}
                >
                  {isPath ? step : ''} {/* Show step number instead of distance */}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <button className="btn" onClick={findShortestPath}>
        Find Shortest Path
      </button>
    </div>
  );
};

export default GameGrid;
