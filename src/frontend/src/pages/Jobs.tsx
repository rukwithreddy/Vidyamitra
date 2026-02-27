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
        location: 'Bangalore, KA',
        type: 'Full-time',
        match: 85,
        salary: '₹18L - ₹25L',
        platform: 'LinkedIn',
        description: 'Looking for an experienced React developer to lead our core product team. Must have deep expertise in performance optimization.',
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
        description: 'Join our fast-growing startup to build scalable web applications. Strong problem-solving skills and backend knowledge preferred.',
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
        description: 'Bridge the gap between design and technical implementation. Working closely with product managers to deliver engaging experiences.',
        skills: ['Figma', 'CSS/SCSS', 'React', 'Animation'],
        posted: '1 week ago'
    },
    {
        id: 4,
        title: 'Full Stack Web Developer',
        company: 'GlobalTech Innovations',
        location: 'Remote',
        type: 'Contract',
        match: 91,
        salary: '₹10L - ₹14L',
        platform: 'Wellfound',
        description: 'Exciting 6-month contract role building MVP products for early stage startups. Fast-paced and fully remote.',
        skills: ['React', 'Next.js', 'PostgreSQL', 'TailwindCSS'],
        posted: '1 day ago'
    },
    {
        id: 5,
        title: 'Frontend Intern',
        company: 'Startup Hub',
        location: 'Bangalore, KA',
        type: 'Internship',
        match: 68,
        salary: '₹30k/month',
        platform: 'Internshala',
        description: 'Looking for a passionate learner to join our frontend team. You will be paired with senior engineers and learn production React.',
        skills: ['HTML', 'CSS', 'JavaScript', 'React (Basic)'],
        posted: '3 days ago'
    },
    {
        id: 6,
        title: 'Lead Software Engineer',
        company: 'Fintech Solutions UK',
        location: 'Remote',
        type: 'Full-time',
        match: 88,
        salary: '₹30L - ₹45L',
        platform: 'LinkedIn',
        description: 'Leading a team of 5 engineers to revamp our core payment gateway. Requires excellent communication and system architecture skills.',
        skills: ['React', 'TypeScript', 'Go', 'Kubernetes', 'Leadership'],
        posted: 'Just now'
    },
    {
        id: 7,
        title: 'React Native Developer',
        company: 'MobileFirst',
        location: 'Mumbai, MH',
        type: 'Full-time',
        match: 79,
        salary: '₹14L - ₹20L',
        platform: 'Naukri',
        description: 'Take our existing web application and build the mobile counterpart using React Native. Experience with native modules is a plus.',
        skills: ['React Native', 'JavaScript', 'Redux', 'iOS/Android'],
        posted: '4 days ago'
    }
];

function Jobs() {
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('All Locations');
    const [jobType, setJobType] = useState('All Types');
    const [sortBy, setSortBy] = useState('Match Score (High to Low)');

    const filteredJobs = MOCK_JOBS.filter(job => {
        const matchesTerm = searchTerm === '' ||
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesLocation = location === 'All Locations' || job.location.includes(location);
        const matchesType = jobType === 'All Types' || job.type === jobType;

        return matchesTerm && matchesLocation && matchesType;
    }).sort((a, b) => {
        if (sortBy === 'Match Score (High to Low)') {
            return b.match - a.match;
        }
        // Basic fallback for other generic sorts
        return 0;
    });

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
                        <h2>Found {filteredJobs.length} Jobs</h2>
                        <div className="results-sort">
                            <label>Sort by:</label>
                            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option>Match Score (High to Low)</option>
                                <option>Date Posted (Newest)</option>
                                <option>Salary (High to Low)</option>
                            </select>
                        </div>
                    </div>

                    <motion.div className="jobs-grid" variants={staggerContainer}>
                        {filteredJobs.map((job) => (
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
