import React from 'react';
import { Link } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/domainSelection.css';

const DOMAINS = [
    {
        id: 'it',
        icon: '💻',
        title: 'Information Technology',
        description: 'Software development, data analysis, cloud computing, and IT infrastructure.',
        roles: ['Software Engineer', 'Data Scientist', 'DevOps']
    },
    {
        id: 'finance',
        icon: '📈',
        title: 'Finance & Accounting',
        description: 'Investment banking, corporate finance, accounting, and financial planning.',
        roles: ['Financial Analyst', 'Accountant', 'Investment Banker']
    },
    {
        id: 'marketing',
        icon: '🎯',
        title: 'Marketing & Sales',
        description: 'Digital marketing, brand management, B2B sales, and market research.',
        roles: ['Digital Marketer', 'Sales Manager', 'SEO Specialist']
    },
    {
        id: 'healthcare',
        icon: '🏥',
        title: 'Healthcare & Medical',
        description: 'Clinical roles, healthcare administration, nursing, and medical research.',
        roles: ['Nurse Practitioner', 'Healthcare Admin', 'Pharmacist']
    },
    {
        id: 'engineering',
        icon: '⚙️',
        title: 'Engineering & Manufacturing',
        description: 'Mechanical, civil, electrical engineering and manufacturing operations.',
        roles: ['Mechanical Engineer', 'Civil Engineer', 'Plant Manager']
    },
    {
        id: 'education',
        icon: '📚',
        title: 'Education & Training',
        description: 'Teaching, instructional design, administration, and corporate training.',
        roles: ['Teacher', 'Instructional Designer', 'Principal']
    }
];

function DomainSelection() {
    return (
        <DashboardLayout>
            <div className="domain-selection-page">
                <div className="selection-header">
                    <h1>Select Your Domain of Interest</h1>
                    <p>Choose the broad industry or field you want to build your career in. This helps us tailor your roadmap and recommendations.</p>
                </div>

                <div className="domain-grid">
                    {DOMAINS.map(domain => (
                        <Link key={domain.id} to="/role-selection" className="domain-card">
                            <div className="domain-icon-wrapper">
                                {domain.icon}
                            </div>
                            <div className="domain-content">
                                <h2>{domain.title}</h2>
                                <p>{domain.description}</p>
                                <div className="popular-roles">
                                    <span>Popular Roles:</span>
                                    <div className="role-tags">
                                        {domain.roles.map((role, idx) => (
                                            <span key={idx} className="role-chip">{role}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}

export default DomainSelection;
