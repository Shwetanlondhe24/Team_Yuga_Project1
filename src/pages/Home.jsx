import React from 'react';
import { FaBookOpen, FaGraduationCap, FaChalkboardTeacher, FaRobot } from 'react-icons/fa';
//import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="video-container">
        <video className="bg-video" autoPlay loop muted>
          <source src="/videos/3209828-uhd_3840_2160_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="tagline">
          <h1>Welcome to Smart Education</h1>
          <p>Enhancing IT education through innovative AR and AI technologies.</p>
        </div>
      </div>

      <section className="features">
        <h2 className="features-heading">Explore Our Features</h2>
        <div className="features-grid">
          <div className="feature">
            <FaBookOpen className="feature-icon" />
            <h3>Comprehensive Content</h3>
            <p>Access a wide range of topics covering essential IT concepts.</p>
          </div>
          <div className="feature">
            <FaGraduationCap className="feature-icon" />
            <h3>Narrative Learning</h3>
            <p>Engage with interactive sessions to reinforce your knowledge.</p>
          </div>
          <div className="feature">
            <FaChalkboardTeacher className="feature-icon" />
            <h3>Explore AR and 3D models</h3>
            <p>Learn from AR and 3D models to visualize the complex concepts</p>
          </div>
          <div className="feature">
            <FaRobot className="feature-icon" />
            <h3>AI-Powered ChatBot</h3>
            <p>Leverage AI tools for personalized learning experiences.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
