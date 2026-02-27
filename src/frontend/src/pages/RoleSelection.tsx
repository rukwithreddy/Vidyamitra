import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/roleSelection.css';

const ROLES = [
    {
        id: 'swe',
        title: 'Software Engineer',
        category: 'Engineering',
        demand: 'High',
        salary: '₹8L - ₹25L',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'System Design']
    },
    {
        id: 'ds',
        title: 'Data Scientist',
        category: 'Data',
        demand: 'Very High',
        salary: '₹10L - ₹30L',
        skills: ['Python', 'Machine Learning', 'SQL', 'Stats', 'Data Viz']
    },
    {
        id: 'devops',
        title: 'DevOps Engineer',
        category: 'Infrastructure',
        demand: 'High',
        salary: '₹12L - ₹28L',
        skills: ['AWS/GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Linux']
    },
    {
        id: 'pm',
        title: 'Product Manager',
        category: 'Management',
        demand: 'Medium',
        salary: '₹12L - ₹35L',
        skills: ['Agile', 'Strategy', 'Analytics', 'UX/UI', 'Communication']
    }
];

function RoleSelection() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRoles = ROLES.filter(role =>
        role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <DashboardLayout>
            <div className="role-selection-page">
                <div className="role-header">
                    <Link to="/domain-selection" className="back-link">← Back to Domains</Link>
                    <div className="role-header-content">
                        <h1>Select Your Desired Job Role</h1>
                        <p>We found these popular roles based on your domain selection. Choose one to generate your tailored learning roadmap.</p>
                    </div>
                    <div className="search-bar-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search roles or skills (e.g. React, Manager)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="role-search-input"
                        />
                    </div>
                </div>

                <div className="role-grid">
                    {filteredRoles.length > 0 ? (
                        filteredRoles.map(role => (
                            <div key={role.id} className="job-role-card">
                                <div className="job-role-header">
                                    <div className="role-title-section">
                                        <h2>{role.title}</h2>
                                        <span className="role-category">{role.category}</span>
                                    </div>
                                    <Link to="/roadmap" className="btn-select-role">Select Role →</Link>
                                </div>

                                <div className="role-stats-row">
                                    <div className="role-stat">
                                        <span className="stat-icon">📈</span>
                                        <div className="stat-details">
                                            <span className="stat-label">Market Demand</span>
                                            <span className="stat-val">{role.demand}</span>
                                        </div>
                                    </div>
                                    <div className="role-stat">
                                        <span className="stat-icon">💰</span>
                                        <div className="stat-details">
                                            <span className="stat-label">Avg Salary</span>
                                            <span className="stat-val">{role.salary}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="role-skills-section">
                                    <span className="skills-heading">Key Skills Required:</span>
                                    <div className="job-skills-list">
                                        {role.skills.map((skill, idx) => (
                                            <span key={idx} className="job-skill-tag">{skill}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-roles-found">
                            <p>No roles match your search. Try a different keyword.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default RoleSelection;
