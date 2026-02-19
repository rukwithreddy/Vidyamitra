import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { generateRoadmap, saveRoadmapProgress, loadRoadmapProgress, RoadmapData } from '../services/roadmapService';
import '../styles/roadmap.css';

/**
 * Job Role Roadmap Page
 * Generates learning roadmap for a specific job role
 * Tracks progress for each topic
 */
function Roadmap() {
  const [jobRole, setJobRole] = useState('');
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<number, boolean>>({});

  // Load saved roadmap on component mount
  useEffect(() => {
    const savedRoadmap = loadRoadmapProgress();
    if (savedRoadmap) {
      setRoadmap(savedRoadmap);
      setJobRole(savedRoadmap.jobRole);
    }
  }, []);

  /**
   * Generate roadmap for entered job role
   */
  const handleGenerateRoadmap = () => {
    if (!jobRole.trim()) {
      alert('Please enter a job role');
      return;
    }

    const newRoadmap = generateRoadmap(jobRole);
    setRoadmap(newRoadmap);
    saveRoadmapProgress(newRoadmap);
    
    // Update last activity
    localStorage.setItem('lastActivity', new Date().toISOString());
  };

  /**
   * Toggle topic expansion to show/hide subtopics
   */
  const toggleTopic = (topicIndex: number) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicIndex]: !prev[topicIndex]
    }));
  };

  /**
   * Update status of a topic
   */
  const updateTopicStatus = (topicIndex: number, newStatus: string) => {
    if (!roadmap) return;
    
    const updatedRoadmap: RoadmapData = {
      ...roadmap,
      topics: roadmap.topics.map((topic, index) => 
        index === topicIndex ? { ...topic, status: newStatus } : topic
      )
    };
    setRoadmap(updatedRoadmap);
    saveRoadmapProgress(updatedRoadmap);
    localStorage.setItem('lastActivity', new Date().toISOString());
  };

  return (
    <DashboardLayout>
      <div className="roadmap-page">
        <h1>Career Roadmap</h1>
        <p className="page-subtitle">Generate a personalized learning path for your target job role</p>

        <div className="roadmap-input-section">
          <div className="input-group">
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="Enter job role (e.g., Full Stack Developer)"
              className="job-role-input"
            />
            <button onClick={handleGenerateRoadmap} className="btn-generate">
              Generate Roadmap
            </button>
          </div>
        </div>

        {roadmap && (
          <div className="roadmap-content">
            <h2>Roadmap for: {roadmap.jobRole}</h2>
            
            <div className="topics-list">
              {roadmap.topics.map((topic, topicIndex) => (
                <div key={topicIndex} className="topic-card">
                  <div className="topic-header">
                    <button 
                      className="topic-toggle"
                      onClick={() => toggleTopic(topicIndex)}
                    >
                      {expandedTopics[topicIndex] ? '▼' : '▶'}
                    </button>
                    <h3>{topic.name}</h3>
                    <select
                      value={topic.status}
                      onChange={(e) => updateTopicStatus(topicIndex, e.target.value)}
                      className={`status-select status-${topic.status.replace(' ', '-')}`}
                    >
                      <option value="not started">Not Started</option>
                      <option value="in progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  {expandedTopics[topicIndex] && (
                    <div className="subtopics-list">
                      <ul>
                        {topic.subtopics.map((subtopic, subIndex) => (
                          <li key={subIndex}>{subtopic}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Roadmap;
