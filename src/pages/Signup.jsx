import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Signup.css';

const Signup = () => {
  // State to toggle between signup and login
  const [isLogin, setIsLogin] = useState(false);

  // Toggle between signup and login forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // Handler for form submission with validation
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    alert(`${isLogin ? 'Login' : 'Signup'} successful!`);
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" />
        </div>

        {/* Confirm password for signup form */}
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
            />
          </div>
        )}

        <button type="submit" className="auth-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="toggle-container">
        <p>
          {isLogin
            ? "Don't have an account?"
            : 'Already have an account?'}
          <button onClick={toggleForm} className="toggle-btn">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>

      {/* Redirect to homepage */}
      <div className="back-home-container">
        <Link to="/" className="back-home-link">
          Go back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default Signup;
