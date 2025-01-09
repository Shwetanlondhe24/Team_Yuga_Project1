// src/utils/dijkstra.js
export const dijkstra = (grid, startNode, endNode) => {
    // Core logic for Dijkstra's algorithm (similar to the pseudocode earlier)
    const rows = grid.length;
    const cols = grid[0].length;
  
    const distances = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));
    distances[startNode.row][startNode.col] = 0;
  
    const visited = new Set();
    const pq = [[startNode, 0]]; // Priority queue using simple array for demonstration
    
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
  
    while (pq.length > 0) {
      const [currentNode, currentDist] = pq.shift();
      visited.add(`${currentNode.row}-${currentNode.col}`);
  
      if (currentNode.row === endNode.row && currentNode.col === endNode.col) {
        return distances[endNode.row][endNode.col];
      }
  
      for (let [dx, dy] of directions) {
        const newRow = currentNode.row + dx;
        const newCol = currentNode.col + dy;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
          if (!visited.has(`${newRow}-${newCol}`)) {
            const newDist = currentDist + 1; // Assuming all edges have equal weight
            if (newDist < distances[newRow][newCol]) {
              distances[newRow][newCol] = newDist;
              pq.push([{ row: newRow, col: newCol }, newDist]);
            }
          }
        }
      }
    }
    return distances[endNode.row][endNode.col];
  }
  