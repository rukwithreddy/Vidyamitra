import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { getProgressStats, ProgressStats } from '../services/progressService';
import { motion } from 'framer-motion';
import {
  User, Target, Trophy, TrendingUp, Zap,
  FileText, BarChart2, BookOpen, BrainCircuit,
  Star, MessageSquare, Briefcase, CheckCircle2, Clock
} from 'lucide-react';
import { fadeUpVariant, staggerContainer, cardHoverVariant } from '../lib/animations';
import '../styles/dashboard.css';

function Dashboard() {
  const { userEmail } = useAuth();
  const [stats, setStats] = useState<ProgressStats>({
    roadmapCompletion: 0,
    quizzesTaken: 0,
    lastActivity: 'Never',
    recentQuizzes: []
  });

  useEffect(() => {
    const progressStats = getProgressStats();
    setStats(progressStats);
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        {/* Banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <h1>Welcome back, John! 👋</h1>
            <p>Ready to advance your career today?</p>
          </div>
          <div className="user-profile-snippet">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <span className="user-name">John Doe</span>
              <span className="user-email">{userEmail || 'john.doe@gmail.com'}</span>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <motion.div
          className="stats-row"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="stat-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
            <div className="stat-icon-wrapper blue"><Target size={24} /></div>
            <div className="stat-info">
              <span className="stat-value">12</span>
              <span className="stat-label">Skills Assessed</span>
              <span className="stat-subtext positive">+3 this week</span>
            </div>
          </motion.div>
          <motion.div className="stat-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
            <div className="stat-icon-wrapper green"><Trophy size={24} /></div>
            <div className="stat-info">
              <span className="stat-value">8</span>
              <span className="stat-label">Achievements</span>
              <span className="stat-subtext positive">New badge earned!</span>
            </div>
          </motion.div>
          <motion.div className="stat-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
            <div className="stat-icon-wrapper orange"><TrendingUp size={24} /></div>
            <div className="stat-info">
              <span className="stat-value">85%</span>
              <span className="stat-label">Profile Score</span>
              <span className="stat-subtext positive">+5% this month</span>
            </div>
          </motion.div>
          <motion.div className="stat-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
            <div className="stat-icon-wrapper purple"><Zap size={24} /></div>
            <div className="stat-info">
              <span className="stat-value">15</span>
              <span className="stat-label">Streak Days</span>
              <span className="stat-subtext">Keep it up!</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div
          className="dashboard-columns"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="dashboard-left">
            <motion.div className="dashboard-card action-card" variants={fadeUpVariant}>
              <div className="card-header">
                <h2>Quick Actions</h2>
              </div>
              <div className="quick-actions-grid">
                <Link to="/resume" className="quick-action-btn">
                  <span className="action-icon blue"><FileText size={20} /></span>
                  <div className="action-text">
                    <span className="action-title">Start Career Journey</span>
                    <span className="action-desc">Begin with resume analysis and career planning</span>
                  </div>
                  <span className="action-arrow">→</span>
                </Link>
                <Link to="/quiz" className="quick-action-btn">
                  <span className="action-icon green"><BarChart2 size={20} /></span>
                  <div className="action-text">
                    <span className="action-title">Skill Evaluation</span>
                    <span className="action-desc">Assess your skills vs job requirements</span>
                  </div>
                  <span className="action-arrow">→</span>
                </Link>
                <Link to="/roadmap" className="quick-action-btn">
                  <span className="action-icon orange"><BookOpen size={20} /></span>
                  <div className="action-text">
                    <span className="action-title">Learning Plan</span>
                    <span className="action-desc">Get personalized training roadmap</span>
                  </div>
                  <span className="action-arrow">→</span>
                </Link>
                <Link to="/quiz" className="quick-action-btn">
                  <span className="action-icon purple"><BrainCircuit size={20} /></span>
                  <div className="action-text">
                    <span className="action-title">Practice Quiz</span>
                    <span className="action-desc">Test your knowledge with AI quizzes</span>
                  </div>
                  <span className="action-arrow">→</span>
                </Link>
              </div>
            </motion.div>

            <motion.div className="dashboard-card recommended-card" variants={fadeUpVariant}>
              <div className="card-header flex items-center gap-2">
                <Star className="text-yellow-400" size={24} />
                <h2>Recommended for You</h2>
              </div>
              <div className="recommended-list">
                <div className="recommended-item">
                  <div className="rec-info">
                    <h3>Complete Your Profile</h3>
                    <p>Add your work experience to get better job matches</p>
                    <div className="progress-bar-container">
                      <div className="progress-fill blue" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <button className="btn-primary">Complete Now</button>
                </div>
                <div className="recommended-item">
                  <div className="rec-info">
                    <h3>Take Skill Assessment</h3>
                    <p>Evaluate your JavaScript skills to unlock new opportunities</p>
                    <div className="progress-bar-container">
                      <div className="progress-fill green" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <button className="btn-success">Start Assessment</button>
                </div>
                <div className="recommended-item">
                  <div className="rec-info">
                    <h3>Practice Interview</h3>
                    <p>Prepare for your next interview with AI-powered practice</p>
                    <div className="progress-bar-container">
                      <div className="progress-fill purple" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <button className="btn-purple">Continue</button>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="dashboard-right">
            <motion.div className="dashboard-card activity-card" variants={fadeUpVariant}>
              <div className="card-header flex items-center gap-2">
                <Clock className="text-gray-400" size={24} />
                <h2>Recent Activity</h2>
              </div>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon green"><CheckCircle2 size={16} /></div>
                  <div className="activity-text">
                    <span className="activity-title">Completed Resume Analysis</span>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon blue"><BookOpen size={16} /></div>
                  <div className="activity-text">
                    <span className="activity-title">Started JavaScript Course</span>
                    <span className="activity-time">1 day ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon orange"><Trophy size={16} /></div>
                  <div className="activity-text">
                    <span className="activity-title">Earned "Profile Builder" Badge</span>
                    <span className="activity-time">3 days ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon purple"><Target size={16} /></div>
                  <div className="activity-text">
                    <span className="activity-title">Scored 92% in React Quiz</span>
                    <span className="activity-time">1 week ago</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div className="dashboard-card more-actions-card !mt-6" variants={fadeUpVariant}>
              <div className="card-header">
                <h2>More Actions</h2>
              </div>
              <div className="more-actions-list">
                <Link to="/mock-interview" className="more-action-link">
                  <span className="action-icon"><MessageSquare size={18} /></span>
                  <span className="action-text">Mock Interview</span>
                  <span className="action-arrow">→</span>
                </Link>
                <Link to="/jobs" className="more-action-link">
                  <span className="action-icon"><Briefcase size={18} /></span>
                  <span className="action-text">Job Matching</span>
                  <span className="action-arrow">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
