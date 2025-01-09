import React from 'react';
import GameGrid from '../components/GameGrid';
import '../styles/GamePage.css'; // Add new CSS styles

const GamePage = () => {
  return (
    <div className="game-page-container">
      <div className="instructions-container">
        <h1>Welcome to the Dijkstra Game</h1>
        <p>
          <strong>Instructions:</strong> <br />
          - Click on a cell to set the <strong>Start (S)</strong> point. <br />
          - Click on another cell to set the <strong>End (E)</strong> point. <br />
          - Click on other cells to set <strong>Walls</strong> (obstacles). <br />
          - Press <strong>Find Shortest Path</strong> to calculate the shortest path using Dijkstra’s Algorithm. <br />
          - The shortest path will be displayed with the path length on each node.
        </p>
      </div>
      <div className="game-container">
        <GameGrid />
      </div>
    </div>
  );
};

export default GamePage;
