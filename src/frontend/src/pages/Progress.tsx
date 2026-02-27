import React from 'react';
import { Link } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { TrendingUp, ClipboardList, Mic } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../lib/animations';
import '../styles/progress.css';

// Using mock data for the UI
const MOCK_QUIZ_HISTORY = [
  { id: 1, date: 'Oct 24, 2023', topic: 'React Hooks', difficulty: 'Medium', score: 80, result: 'Pass' },
  { id: 2, date: 'Oct 22, 2023', topic: 'JavaScript Basics', difficulty: 'Easy', score: 100, result: 'Pass' },
  { id: 3, date: 'Oct 15, 2023', topic: 'System Design', difficulty: 'Hard', score: 40, result: 'Fail' },
];

const MOCK_INTERVIEW_HISTORY = [
  {
    id: 1,
    date: 'Oct 25, 2023',
    role: 'Frontend Developer',
    mode: 'Voice',
    overallScore: 85,
    rounds: [
      { name: 'Technical', score: 90 },
      { name: 'HR', score: 80 }
    ]
  },
  {
    id: 2,
    date: 'Oct 18, 2023',
    role: 'React Developer',
    mode: 'Text',
    overallScore: 72,
    rounds: [
      { name: 'Technical', score: 72 }
    ]
  },
];

function Progress() {
  return (
    <DashboardLayout>
      <motion.div className="progress-page" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div className="progress-header" variants={fadeUpVariant}>
          <h1>Your Learning Progress</h1>
          <p>Track your assessment scores and interview practice sessions over time.</p>
        </motion.div>

        <motion.div className="progress-stats-grid" variants={staggerContainer}>
          <motion.div className="progress-stat-card" variants={fadeUpVariant}>
            <div className="stat-icon purple-bg flex items-center justify-center"><TrendingUp size={24} className="text-white" /></div>
            <div className="stat-info">
              <h3>Quiz Performance</h3>
              <p className="stat-val">73%</p>
              <span className="stat-subtext text-green">↑ 12% from last month</span>
            </div>
          </motion.div>
          <motion.div className="progress-stat-card" variants={fadeUpVariant}>
            <div className="stat-icon blue-bg flex items-center justify-center"><ClipboardList size={24} className="text-white" /></div>
            <div className="stat-info">
              <h3>Quizzes Taken</h3>
              <p className="stat-val">12</p>
              <span className="stat-subtext">Across 4 topics</span>
            </div>
          </motion.div>
          <motion.div className="progress-stat-card" variants={fadeUpVariant}>
            <div className="stat-icon orange-bg flex items-center justify-center"><Mic size={24} className="text-white" /></div>
            <div className="stat-info">
              <h3>Interview Score</h3>
              <p className="stat-val">78%</p>
              <span className="stat-subtext">Average performance</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div className="progress-sections" variants={staggerContainer}>
          <motion.div className="history-section" variants={fadeUpVariant}>
            <div className="section-header">
              <h2>Quiz History</h2>
              <Link to="/quiz" className="btn-sm-outline">Take New Quiz</Link>
            </div>

            <div className="table-responsive">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Topic</th>
                    <th>Difficulty</th>
                    <th>Score</th>
                    <th>Result</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_QUIZ_HISTORY.map(quiz => (
                    <tr key={quiz.id}>
                      <td>{quiz.date}</td>
                      <td className="font-medium text-dark">{quiz.topic}</td>
                      <td><span className={`diff-pill ${quiz.difficulty.toLowerCase()}`}>{quiz.difficulty}</span></td>
                      <td>{quiz.score}%</td>
                      <td>
                        <span className={`result-badge ${quiz.result.toLowerCase()}`}>{quiz.result}</span>
                      </td>
                      <td>
                        <button className="btn-table-action">Review</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div className="history-section" variants={fadeUpVariant}>
            <div className="section-header">
              <h2>Interview Practice History</h2>
              <Link to="/mock-interview" className="btn-sm-outline">Start New Interview</Link>
            </div>

            <div className="interview-list">
              {MOCK_INTERVIEW_HISTORY.map(interview => (
                <div key={interview.id} className="interview-history-card">
                  <div className="ih-main">
                    <div className="ih-info">
                      <div className="ih-title-row">
                        <h3>{interview.role}</h3>
                        <span className="ih-mode">{interview.mode} Mode</span>
                      </div>
                      <span className="ih-date">{interview.date}</span>
                    </div>
                    <div className="ih-score-circle">
                      <span className="ih-score-val">{interview.overallScore}%</span>
                      <span className="ih-score-lbl">Overall</span>
                    </div>
                  </div>

                  <div className="ih-rounds">
                    {interview.rounds.map((round, idx) => (
                      <div key={idx} className="ih-round-score">
                        <span className="ih-r-name">{round.name} Round:</span>
                        <div className="ih-r-bar-bg">
                          <div
                            className="ih-r-bar-fill"
                            style={{ width: `${round.score}%`, backgroundColor: round.score >= 80 ? '#48BB78' : round.score >= 60 ? '#ED8936' : '#E53E3E' }}
                          ></div>
                        </div>
                        <span className="ih-r-val">{round.score}%</span>
                      </div>
                    ))}
                  </div>

                  <div className="ih-actions">
                    <button className="btn-text">View Detailed Feedback →</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default Progress;
