import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import '../styles/sidebar.css';

/**
 * Sidebar Component
 * Navigation menu for all main pages in the application
 */
function Sidebar() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link 
          to="/dashboard" 
          className={isActive('/dashboard') ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📊</span>
          Dashboard
        </Link>
        
        <Link 
          to="/resume" 
          className={isActive('/resume') ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📄</span>
          Resume
        </Link>
        
        <Link 
          to="/roadmap" 
          className={isActive('/roadmap') ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">🗺️</span>
          Roadmap
        </Link>
        
        <Link 
          to="/quiz" 
          className={isActive('/quiz') ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📝</span>
          Quiz
        </Link>
        
        <Link 
          to="/progress" 
          className={isActive('/progress') ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">📈</span>
          Progress
        </Link>
        
        <Link 
          to="/mock-interview" 
          className={isActive('/mock-interview') ? 'nav-link active' : 'nav-link'}
        >
          <span className="nav-icon">🎤</span>
          Mock Interview
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
