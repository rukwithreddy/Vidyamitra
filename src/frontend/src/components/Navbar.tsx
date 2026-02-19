import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.css';

/**
 * Navbar Component
 * Displays app logo, user info, and logout button
 */
function Navbar() {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();

  /**
   * Handle user logout
   */
  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>VidyaMitra</h1>
        <span className="navbar-tagline">AI Career Guidance</span>
      </div>
      
      <div className="navbar-user">
        <span className="user-email">{userEmail}</span>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
