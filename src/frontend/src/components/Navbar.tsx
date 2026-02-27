import React from 'react';
import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, BarChart2, FileText, Map, ClipboardList, Mic, TrendingUp, LogOut, User, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUpVariant } from '../lib/animations';
import '../styles/navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const isActive = (path: string) => currentPath === path;

  const handleLogout = () => {
    logout();
    navigate({ to: '/login' });
  };

  return (
    <motion.nav className="top-navbar" variants={staggerContainer} initial="hidden" animate="visible">
      <motion.div className="navbar-left flex items-center gap-4" variants={fadeUpVariant}>
        <Link to="/home" className="navbar-brand flex items-center gap-2 text-inherit no-underline">
          <GraduationCap className="navbar-logo" size={28} />
          <h1>VidyaMitra</h1>
        </Link>
      </motion.div>

      <div className="navbar-links">
        <motion.div variants={fadeUpVariant}>
          <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>
            <BarChart2 className="nav-icon" size={18} /> Dashboard
          </Link>
        </motion.div>
        <motion.div variants={fadeUpVariant}>
          <Link to="/resume" className={`nav-link ${isActive('/resume') ? 'active' : ''}`}>
            <FileText className="nav-icon" size={18} /> Resume
          </Link>
        </motion.div>
        <motion.div variants={fadeUpVariant}>
          <Link to="/roadmap" className={`nav-link ${isActive('/roadmap') ? 'active' : ''}`}>
            <Map className="nav-icon" size={18} /> Plan
          </Link>
        </motion.div>
        <motion.div variants={fadeUpVariant}>
          <Link to="/quiz" className={`nav-link ${isActive('/quiz') ? 'active' : ''}`}>
            <ClipboardList className="nav-icon" size={18} /> Quiz
          </Link>
        </motion.div>
        <motion.div variants={fadeUpVariant}>
          <Link to="/mock-interview" className={`nav-link ${isActive('/mock-interview') ? 'active' : ''}`}>
            <Mic className="nav-icon" size={18} /> Interview
          </Link>
        </motion.div>
        <motion.div variants={fadeUpVariant}>
          <Link to="/progress" className={`nav-link ${isActive('/progress') ? 'active' : ''}`}>
            <TrendingUp className="nav-icon" size={18} /> Progress
          </Link>
        </motion.div>
        <motion.div variants={fadeUpVariant}>
          <Link to="/jobs" className={`nav-link ${isActive('/jobs') ? 'active' : ''}`}>
            <Briefcase className="nav-icon" size={18} /> Jobs
          </Link>
        </motion.div>
      </div>

      <motion.div className="navbar-user flex items-center gap-4" variants={fadeUpVariant}>
        <Link to="/my-profile" className="flex items-center justify-center p-2 rounded-full bg-purple-600/20 text-purple-400 hover:bg-purple-600/30 transition-colors cursor-pointer">
          <User size={20} />
        </Link>
        <button onClick={handleLogout} className="btn-logout">
          <LogOut className="nav-icon" size={18} /> Logout
        </button>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
