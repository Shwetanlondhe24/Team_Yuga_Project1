import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar component
import Home from "./pages/Home"; // Home page component
import ARModels from "./pages/ARModels"; // AR Models page component
import TopicPage from "./pages/TopicPage"; // Topic page component
import Signup from "./pages/Signup"; // Signup page component
import LearningSessions from "./pages/LearningSessions"; // AI Chatbot page component
import ModelViewerWithSuspense from "./pages/GLBModelViewer"; // 3D Model Viewer page component
import Chatbot from "./components/Chatbot"; // Import the Chatbot component
import GamePage from "./pages/GamePage"; // Import the Game page
import '@fortawesome/fontawesome-free/css/all.min.css';
import "./styles/TopicPage.css"; // Import the styles for TopicPage

function App() {
  return (
    <Router>
      {/* Navbar will be visible on all pages */}
      <Navbar />

      {/* Define all routes for the application */}
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />

        {/* AR Models page */}
        <Route path="/ar-models" element={<ARModels />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Topic page, dynamic based on the topic name */}
        <Route path="/topic/:topicName" element={<TopicPage />} />

        {/* 3D Model Viewer page */}
        <Route path="/explore-3d" element={<ModelViewerWithSuspense modelUrl="/models/model.glb" />} />

        {/* AI-powered Chatbot page */}
        <Route path="/learning-sessions" element={<LearningSessions />} />

        {/* AI Chatbot component route */}
        <Route path="/chatbot" element={<Chatbot />} />

        {/* Game Page Route */}
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
