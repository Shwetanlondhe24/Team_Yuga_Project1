import React from 'react';
import { FaArrowsAlt, FaCube, FaGamepad } from 'react-icons/fa'; // Added FaGamepad icon for game
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/TopicPage.css';

function TopicPage() {
  const navigate = useNavigate(); // Initialize navigate for routing

  return (
    <motion.div
      className="topic-page"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Topic Name */}
      <motion.h1
        className="topic-name"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Dijkstra's Algorithm
      </motion.h1>

      {/* Content Section */}
      <motion.div
        className="content-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {/* Left Part: Information and Snippets */}
        <motion.div
          className="left-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="info-snippet-container">
            <h2>What is Dijkstra's Algorithm?</h2>
            <p>
              Dijkstra's algorithm is a greedy algorithm used to find the shortest path between nodes in a graph. It works by iteratively selecting the unvisited node with the shortest distance from the starting node and updating the distances of its neighbors.
            </p>

            <h3>Code Snippet:</h3>
            <pre>
              <code>{`dijkstra(graph, source):\n    distance[source] = 0\n    for node in graph.nodes:\n        if node != source:\n            distance[node] = infinity\n    unvisited = set(graph.nodes)\n    while unvisited:\n        current = min(unvisited, key=lambda node: distance[node])\n        unvisited.remove(current)\n        for neighbor in graph[current]:\n            alt = distance[current] + graph[current][neighbor]\n            if alt < distance[neighbor]:\n                distance[neighbor] = alt`}</code>
            </pre>
          </div>
        </motion.div>

        {/* Right Part: Image and Explore Options */}
        <motion.div
          className="right-content"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="image-container">
            <img src="/network_image.jpeg" alt="Computer Network" className="topic-image" />
          </div>

          <div className="explore-options">
            <motion.button
              className="explore-button"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
              onClick={() => alert('AR functionality not implemented yet')}
            >
              <FaArrowsAlt /> Explore in AR
            </motion.button>

            {/* Navigate to 3D Model Page */}
            <motion.button
              className="explore-button"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
              onClick={() => navigate('/explore-3d')}  // Navigate to new page
            >
              <FaCube /> Explore in 3D
            </motion.button>

            {/* Navigate to Game Page */}
            <motion.button
              className="explore-button"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeInOut" }}
              onClick={() => navigate('/game')}  // Navigate to game page
            >
              <FaGamepad /> Play Game
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default TopicPage;
