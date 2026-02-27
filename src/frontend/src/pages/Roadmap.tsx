import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Rocket, PlayCircle, ClipboardList } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../lib/animations';
import '../styles/roadmap.css';

function Roadmap() {
  const [activeWeek, setActiveWeek] = useState<number>(1);
  // Assuming roleMap is defined elsewhere or passed as props/context
  // For the purpose of making the provided snippet syntactically correct,
  // we'll define a placeholder if it's not already present.
  // In a real application, this would come from user data or context.
  const roleMap = {
    current: 'Junior Developer', // Placeholder
    target: 'Software Engineer'  // Placeholder
  };

  return (
    <DashboardLayout>
      <motion.div className="roadmap-page" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div className="roadmap-header" variants={fadeUpVariant}>
          <h1>Your Learning Roadmap</h1>
          <p>Personalized path to transition from {roleMap.current} to {roleMap.target}</p>
        </motion.div>

        {/* Skills Match Section */}
        <motion.section className="skills-match-section" variants={fadeUpVariant}>
          <div className="match-score-card">
            <h2>Skills Match Score</h2>
            <div className="match-progress-container">
              <div className="match-progress-bar">
                <div className="match-progress-fill" style={{ width: '54%' }}></div>
              </div>
              <span className="match-percentage">54% Match</span>
            </div>
          </div>

          <div className="skills-comparison-grid">
            <div className="skills-col strengths-col">
              <h3><span className="icon"><CheckCircle2 className="text-green-400" size={20} /></span> Your Strengths</h3>
              <ul className="skills-list">
                <li>JavaScript (Advanced)</li>
                <li>HTML & CSS</li>
                <li>Problem Solving</li>
                <li>Git Version Control</li>
              </ul>
            </div>

            <div className="skills-col gap-col">
              <h3><span className="icon"><Target className="text-orange-400" size={20} /></span> Skills to Develop</h3>
              <ul className="skills-list">
                <li>React Hooks & Context API</li>
                <li>Node.js / Express</li>
                <li>System Design Patterns</li>
                <li>AWS Cloud Basics</li>
              </ul>
            </div>
          </div>

          <div className="recommendations-accordion">
            <details>
              <summary>View Personalized Recommendations</summary>
              <div className="accordion-content">
                <p>To increase your match score to 80%+, focus primarily on mastering React state management and building full-stack applications with Node.js. Your strong JavaScript foundation puts you in an excellent position to learn these quickly.</p>
              </div>
            </details>
          </div>
        </motion.section>

        {/* Learning Journey Schedule */}
        <motion.section className="learning-journey-section" variants={fadeUpVariant}>
          <div className="journey-banner flex items-center gap-2">
            <Rocket className="text-purple-400" size={28} />
            <h2>4-Week Learning Journey</h2>
            <p>A structured timeline to acquire your missing skills</p>
          </div>

          <div className="journey-layout">
            <div className="week-navigation">
              {[1, 2, 3, 4].map(week => (
                <button
                  key={week}
                  className={`week-tab ${activeWeek === week ? 'active' : ''}`}
                  onClick={() => setActiveWeek(week)}
                >
                  Week {week}
                </button>
              ))}
            </div>

            <div className="week-content">
              {activeWeek === 1 && (
                <div className="week-card">
                  <div className="week-header">
                    <span className="week-badge">Week 1</span>
                    <h3>Advanced React Patterns</h3>
                  </div>

                  <div className="week-grid">
                    <div className="week-main-tasks">
                      <h4>Weekly Tasks</h4>
                      <ul className="task-list">
                        <li><input type="checkbox" /> Master React Hooks (useState, useEffect, useContext)</li>
                        <li><input type="checkbox" /> Understand Custom Hooks</li>
                        <li><input type="checkbox" /> State management with Redux Toolkit</li>
                        <li><input type="checkbox" /> Build a Todo App with state persistence</li>
                      </ul>

                      <h4 className="mt-4">What You'll Learn</h4>
                      <ul className="outcome-list">
                        <li>How to manage complex component state</li>
                        <li>Best practices for side effects</li>
                        <li>Global state management patterns</li>
                      </ul>
                    </div>

                    <div className="week-sidebar">
                      <div className="resource-card">
                        <h4>Primary Learning Resource</h4>
                        <div className="video-player-mockup hover:cursor-pointer">
                          <div className="video-thumb flex items-center justify-center">
                            <span className="play-icon"><PlayCircle size={40} className="text-white" /></span>
                          </div>
                          <div className="video-info">
                            <span className="video-title">React Hooks Course - All React Hooks Explained</span>
                            <span className="video-meta">Video • 2h 15m</span>
                          </div>
                        </div>
                        <a href="#" className="btn-secondary-full mt-2">Open Resource</a>
                      </div>

                      <div className="resource-card mt-3">
                        <h4>Practice</h4>
                        <Link to="/quiz" className="btn-primary-full mt-2 flex items-center justify-center gap-2">
                          Take Week 1 Quiz <ClipboardList size={18} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeWeek === 2 && (
                <div className="week-card">
                  <div className="week-header">
                    <span className="week-badge">Week 2</span>
                    <h3>Node.js & API Development</h3>
                  </div>
                  <div className="p-4"><p>Content for Week 2...</p></div>
                </div>
              )}

              {activeWeek === 3 && (
                <div className="week-card">
                  <div className="week-header">
                    <span className="week-badge">Week 3</span>
                    <h3>Database Design & SQL</h3>
                  </div>
                  <div className="p-4"><p>Content for Week 3...</p></div>
                </div>
              )}

              {activeWeek === 4 && (
                <div className="week-card">
                  <div className="week-header">
                    <span className="week-badge">Week 4</span>
                    <h3>Full Stack Project & Deployment</h3>
                  </div>
                  <div className="p-4"><p>Content for Week 4...</p></div>
                </div>
              )}
            </div>
          </div>
        </motion.section>
      </motion.div>
    </DashboardLayout>
  );
}

export default Roadmap;
