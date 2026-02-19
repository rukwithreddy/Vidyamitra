import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getProgressStats, ProgressStats } from '../services/progressService';
import '../styles/progress.css';

/**
 * Progress Page
 * Displays user's overall progress and activity statistics
 */
function Progress() {
  const [stats, setStats] = useState<ProgressStats>({
    roadmapCompletion: 0,
    quizzesTaken: 0,
    lastActivity: 'Never',
    recentQuizzes: []
  });

  // Load progress stats when component mounts
  useEffect(() => {
    const progressStats = getProgressStats();
    setStats(progressStats);
  }, []);

  return (
    <DashboardLayout>
      <div className="progress-page">
        <h1>Your Progress</h1>
        <p className="page-subtitle">Track your learning journey and achievements</p>

        <div className="progress-stats-grid">
          <div className="progress-stat-card">
            <div className="stat-header">
              <span className="stat-icon-large">🎯</span>
              <h3>Roadmap Completion</h3>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ width: `${stats.roadmapCompletion}%` }}
              ></div>
            </div>
            <p className="stat-percentage">{stats.roadmapCompletion}% Complete</p>
          </div>

          <div className="progress-stat-card">
            <div className="stat-header">
              <span className="stat-icon-large">✅</span>
              <h3>Quizzes Taken</h3>
            </div>
            <p className="stat-number">{stats.quizzesTaken}</p>
            <p className="stat-label">Total Quizzes Completed</p>
          </div>

          <div className="progress-stat-card">
            <div className="stat-header">
              <span className="stat-icon-large">📅</span>
              <h3>Last Activity</h3>
            </div>
            <p className="stat-date">{stats.lastActivity}</p>
            <p className="stat-label">Keep up the momentum!</p>
          </div>
        </div>

        {stats.recentQuizzes.length > 0 && (
          <div className="recent-activity">
            <h2>Recent Quiz Results</h2>
            <div className="quiz-history">
              {stats.recentQuizzes.map((quiz, index) => (
                <div key={index} className="quiz-history-item">
                  <div className="quiz-info">
                    <h4>{quiz.topic}</h4>
                    <p className="quiz-date">{quiz.date}</p>
                  </div>
                  <div className={`quiz-score ${quiz.score >= 70 ? 'good' : 'needs-improvement'}`}>
                    {quiz.score}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Progress;
