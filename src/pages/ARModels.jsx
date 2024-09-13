import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const ARModels = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="ar-models">
      <h2>Explore Topics</h2>
      <input
        type="text"
        placeholder="Search for a topic..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <div className="topics-grid">
        {/* Data Structures and Algorithms Section */}
        <div className="topic-section">
          <h3><i className="fas fa-code"></i> Data Structures and Algorithms</h3>
          <div className="models-grid">
            <Link to="/topic/dijkstra-algorithm">
              <div className="model-card"><i className="fas fa-project-diagram"></i><p>Dijkstra's Algorithm</p></div>
            </Link>
            <div className="model-card"><i className="fas fa-sitemap"></i><p>Tree Traversals</p></div>
            <div className="model-card"><i className="fas fa-network-wired"></i><p>BFS Tree</p></div>
          </div>
        </div>

        {/* Object-Oriented Programming Section */}
        <div className="topic-section">
          <h3><i className="fas fa-object-ungroup"></i> Object-Oriented Programming</h3>
          <div className="models-grid">
            <div className="model-card"><i className="fas fa-code-branch"></i><p>Inheritance</p></div>
            <div className="model-card"><i className="fas fa-infinity"></i><p>Polymorphism</p></div>
            <div className="model-card"><i className="fas fa-lock"></i><p>Encapsulation</p></div>
          </div>
        </div>

        {/* Database Management System Section */}
        <div className="topic-section">
          <h3><i className="fas fa-database"></i> Database Management System</h3>
          <div className="models-grid">
            <div className="model-card"><i className="fas fa-table"></i><p>Normalization</p></div>
            <div className="model-card"><i className="fas fa-search"></i><p>SQL Query Optimization</p></div>
            <div className="model-card"><i className="fas fa-drafting-compass"></i><p>Entity Relationship Diagram</p></div>
          </div>
        </div>

        {/* Computer Networks and Security Section */}
        <div className="topic-section">
          <h3><i className="fas fa-network-wired"></i> Computer Networks and Security</h3>
          <div className="models-grid">
            <div className="model-card"><i className="fas fa-sitemap"></i><p>OSI Model</p></div>
            <div className="model-card"><i className="fas fa-shield-alt"></i><p>Data Encryption</p></div>
            <div className="model-card"><i className="fas fa-server"></i><p>Network Layer Protocol</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARModels;
