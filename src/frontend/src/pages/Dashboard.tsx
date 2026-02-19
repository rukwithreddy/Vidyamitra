import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { getProgressStats, ProgressStats } from '../services/progressService';
import '../styles/dashboard.css';

/**
 * Dashboard Home Page
 * Shows welcome message and quick stats overview
 */
function Dashboard() {
  const { userEmail } = useAuth();
  const [stats, setStats] = useState<ProgressStats>({
    roadmapCompletion: 0,
    quizzesTaken: 0,
    lastActivity: 'Never',
    recentQuizzes: []
  });

  // Load stats when component mounts
  useEffect(() => {
    const progressStats = getProgressStats();
    setStats(progressStats);
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        <h1>Welcome to VidyaMitra!</h1>
        <p className="dashboard-subtitle">Your AI-powered career guidance companion</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Roadmap Progress</h3>
              <p className="stat-value">{stats.roadmapCompletion}%</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Quizzes Completed</h3>
              <p className="stat-value">{stats.quizzesTaken}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>Last Activity</h3>
              <p className="stat-value">{stats.lastActivity}</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/resume" className="action-btn">
              <span className="action-icon">📄</span>
              <span>Upload Resume</span>
            </a>
            <a href="/roadmap" className="action-btn">
              <span className="action-icon">🗺️</span>
              <span>Generate Roadmap</span>
            </a>
            <a href="/quiz" className="action-btn">
              <span className="action-icon">📝</span>
              <span>Take Quiz</span>
            </a>
            <a href="/mock-interview" className="action-btn">
              <span className="action-icon">🎤</span>
              <span>Practice Interview</span>
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
