import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Add your search functionality here
    console.log("Search query submitted");
  };

  return (
    <nav className="navbar">
      <div className="logo">Team Yuga</div>
      
      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input type="text" placeholder="Search topics..." />
        <button type="submit">Search</button>
      </form>

      {/* Navbar Links */}
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/ar-models">Explore</Link></li>
        {/* Chatbot Link */}
        <li><Link to="/chatbot">Chatbot</Link></li>
        <li><Link to="/signup">SignUp</Link></li>

        
      </ul>
    </nav>
  );
};

export default Navbar;
