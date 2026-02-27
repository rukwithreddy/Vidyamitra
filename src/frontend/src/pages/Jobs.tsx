import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { Search, Building2, MapPin, Briefcase, CircleDollarSign, Clock } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../lib/animations';
import '../styles/jobs.css';

const MOCK_JOBS = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'TechCorp India',
        location: 'Bangalore, KA (Hybrid)',
        type: 'Full-time',
        match: 85,
        salary: '₹18L - ₹25L',
        platform: 'LinkedIn',
        description: 'Looking for an experienced React developer to lead our core product team.',
        skills: ['React', 'TypeScript', 'Redux', 'System Design'],
        posted: '2 days ago'
    },
    {
        id: 2,
        title: 'Software Developer (SDE II)',
        company: 'Innovate Solutions',
        location: 'Remote',
        type: 'Full-time',
        match: 72,
        salary: '₹15L - ₹22L',
        platform: 'Naukri',
        description: 'Join our fast-growing startup to build scalable web applications.',
        skills: ['JavaScript', 'React', 'Node.js', 'AWS'],
        posted: '5 hours ago'
    },
    {
        id: 3,
        title: 'UI/UX Engineer',
        company: 'DesignStudio',
        location: 'Mumbai, MH',
        type: 'Full-time',
        match: 54,
        salary: '₹12L - ₹18L',
        platform: 'Indeed',
        description: 'Bridge the gap between design and technical implementation.',
        skills: ['Figma', 'CSS/SCSS', 'React', 'Animation'],
        posted: '1 week ago'
    }
];

function Jobs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('Remote');
    const [jobType, setJobType] = useState('Full-time');

    return (
        <DashboardLayout>
            <motion.div className="jobs-page" variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div className="jobs-header" variants={fadeUpVariant}>
                    <h1>Find Your Next Role</h1>
                    <p>Discover jobs that match your skills based on your profile and assessments.</p>
                </motion.div>

                <motion.div className="jobs-search-section" variants={fadeUpVariant}>
                    <div className="search-controls">
                        <div className="search-group fill-width">
                            <label>Role or Skills</label>
                            <div className="search-input-wrapper flex items-center gap-2">
                                <span className="search-icon"><Search size={18} className="text-gray-400" /></span>
                                <input
                                    type="text"
                                    placeholder="e.g. React Developer, Python..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="job-search-input"
                                />
                            </div>
                        </div>

                        <div className="search-group">
                            <label>Location</label>
                            <select
                                className="job-select-input"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="All Locations">All Locations</option>
                                <option value="Remote">Remote</option>
                                <option value="Bangalore, KA">Bangalore, KA</option>
                                <option value="Mumbai, MH">Mumbai, MH</option>
                            </select>
                        </div>

                        <div className="search-group">
                            <label>Job Type</label>
                            <select
                                className="job-select-input"
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                            >
                                <option value="All Types">All Types</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        <button className="btn-search-jobs">Search Jobs</button>
                    </div>
                </motion.div>

                <motion.div className="jobs-results-section" variants={fadeUpVariant}>
                    <div className="results-header">
                        <h2>Found {MOCK_JOBS.length} Jobs</h2>
                        <div className="results-sort">
                            <label>Sort by:</label>
                            <select className="sort-select">
                                <option>Match Score (High to Low)</option>
                                <option>Date Posted (Newest)</option>
                                <option>Salary (High to Low)</option>
                            </select>
                        </div>
                    </div>

                    <motion.div className="jobs-grid" variants={staggerContainer}>
                        {MOCK_JOBS.map((job, idx) => (
                            <motion.div key={job.id} className="job-card" variants={fadeUpVariant}>
                                <div className="job-card-header">
                                    <div className="job-title-row">
                                        <h3>{job.title}</h3>
                                        <span className={`match-badge ${job.match >= 80 ? 'match-high' : job.match >= 65 ? 'match-med' : 'match-low'}`}>
                                            {job.match}% Match
                                        </span>
                                    </div>
                                    <div className="job-company-row flex items-center gap-1">
                                        <Building2 size={16} className="text-gray-400" />
                                        <span className="company-text">{job.company}</span>
                                        <span className="platform-text text-sm ml-auto">via {job.platform}</span>
                                    </div>
                                </div>

                                <div className="job-details-grid">
                                    <div className="j-detail flex items-center gap-1"><MapPin size={16} className="text-gray-400" /> {job.location}</div>
                                    <div className="j-detail flex items-center gap-1"><Briefcase size={16} className="text-gray-400" /> {job.type}</div>
                                    <div className="j-detail flex items-center gap-1"><CircleDollarSign size={16} className="text-gray-400" /> {job.salary}</div>
                                    <div className="j-detail flex items-center gap-1"><Clock size={16} className="text-gray-400" /> {job.posted}</div>
                                </div>

                                <p className="job-description">{job.description}</p>

                                <div className="job-skills-tags">
                                    {job.skills.map((skill, idx) => (
                                        <span key={idx} className="j-skill">{skill}</span>
                                    ))}
                                </div>

                                <div className="job-card-footer">
                                    <button className="btn-apply text-purple">Save Job</button>
                                    <button className="btn-apply-primary">Apply Now →</button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}

export default Jobs;
