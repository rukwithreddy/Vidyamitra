import React from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { BarChart2, FileText, Map, ClipboardList, TrendingUp, Mic } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant } from '../lib/animations';
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
    <motion.aside className="sidebar" variants={staggerContainer} initial="hidden" animate="visible">
      <nav className="sidebar-nav">
        <motion.div variants={fadeUpVariant}>
          <Link
            to="/dashboard"
            className={isActive('/dashboard') ? 'nav-link active' : 'nav-link'}
          >
            <BarChart2 className="nav-icon" size={20} />
            Dashboard
          </Link>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <Link
            to="/resume"
            className={isActive('/resume') ? 'nav-link active' : 'nav-link'}
          >
            <FileText className="nav-icon" size={20} />
            Resume
          </Link>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <Link
            to="/roadmap"
            className={isActive('/roadmap') ? 'nav-link active' : 'nav-link'}
          >
            <Map className="nav-icon" size={20} />
            Roadmap
          </Link>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <Link
            to="/quiz"
            className={isActive('/quiz') ? 'nav-link active' : 'nav-link'}
          >
            <ClipboardList className="nav-icon" size={20} />
            Quiz
          </Link>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <Link
            to="/progress"
            className={isActive('/progress') ? 'nav-link active' : 'nav-link'}
          >
            <TrendingUp className="nav-icon" size={20} />
            Progress
          </Link>
        </motion.div>

        <motion.div variants={fadeUpVariant}>
          <Link
            to="/mock-interview"
            className={isActive('/mock-interview') ? 'nav-link active' : 'nav-link'}
          >
            <Mic className="nav-icon" size={20} />
            Mock Interview
          </Link>
        </motion.div>
      </nav>
    </motion.aside>
  );
}

export default Sidebar;
