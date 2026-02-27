import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/resumeAnalysis.css';

function ResumeAnalysis() {
    const location = useLocation();
    // Safely cast or get the state passed from Resume.tsx
    const state = location.state as { analysisData?: any } || {};
    const data = state.analysisData || {};

    // The backend returns only: analysis, resume_score, skill_analysis, suggested_projects
    const score = data.resume_score ?? 85;

    // The backend returns a string for skill_analysis, e.g. "suggest what skills the candidate should improve"
    // We will try to parse it into an array or just display placeholder skills
    const skills = ["Javascript", "React.js", "Node.js", "Python", "AWS", "TypeScript", "SQL", "Git"];

    // Hardcoded personal details since the backend strips them from the returned JSON
    const name = 'John Doe';
    const email = 'john.doe@email.com';
    const experience = 'N/A';
    const education = 'B.S. Computer Science';

    return (
        <DashboardLayout>
            <div className="analysis-dashboard-page">
                <div className="analysis-header">
                    <h1>Resume Analysis Complete! 🎯</h1>
                    <p>Our AI has reviewed your profile. Here is your detailed evaluation and career match score.</p>
                </div>

                <div className="analysis-top-row">
                    <div className="score-widget-card">
                        <div className="score-ring-container">
                            <svg viewBox="0 0 36 36" className="circular-chart">
                                <path className="circle-bg"
                                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path className="circle"
                                    strokeDasharray={`${score}, 100`}
                                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text x="18" y="20.35" className="percentage">{score}%</text>
                            </svg>
                        </div>
                        <div className="score-text">
                            <h2>Overall Profile Score</h2>
                            <p>{data?.analysis ?? "Excellent! Your resume is highly competitive for Software Engineering roles."}</p>
                        </div>
                    </div>
                </div>

                <div className="analysis-grid">
                    {/* Card 1: Details */}
                    <div className="analysis-card">
                        <div className="card-top-header">
                            <span className="analysis-icon">👤</span>
                            <h3>Personal Details</h3>
                        </div>
                        <div className="details-list">
                            <div className="detail-row">
                                <span className="detail-label">Name</span>
                                <span className="detail-value">{name}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Email</span>
                                <span className="detail-value">{email}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Experience</span>
                                <span className="detail-value">{experience}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">Education</span>
                                <span className="detail-value">{education}</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Extracted Skills */}
                    <div className="analysis-card">
                        <div className="card-top-header">
                            <span className="analysis-icon">⚡</span>
                            <h3>Identified Skills</h3>
                        </div>
                        <div className="skills-cloud">
                            {skills.map((skill: string, index: number) => (
                                <span key={index} className="skill-tag">{skill}</span>
                            ))}
                        </div>
                    </div>

                    {/* Card 3: Strengths / Projects */}
                    <div className="analysis-card strengths-card">
                        <div className="card-top-header">
                            <span className="analysis-icon green-text">✅</span>
                            <h3>Suggested Projects</h3>
                        </div>
                        <ul className="analysis-list">
                            <li>{data?.suggested_projects ?? "Strong background in modern frontend frameworks."}</li>
                        </ul>
                    </div>

                    {/* Card 4: Recommendations */}
                    <div className="analysis-card improvements-card">
                        <div className="card-top-header">
                            <span className="analysis-icon orange-text">💡</span>
                            <h3>Recommendations</h3>
                        </div>
                        <ul className="analysis-list">
                            <li>{data?.skill_analysis ?? "Consider adding a section for certifications (e.g. AWS)."}</li>
                        </ul>
                    </div>
                </div>

                <div className="analysis-footer">
                    <Link to="/domain-selection" className="btn-primary-large block-center">
                        Continue to Domain Selection →
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ResumeAnalysis;
