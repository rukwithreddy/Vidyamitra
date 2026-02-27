import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import { motion } from 'framer-motion';
import { User, GraduationCap, Briefcase, Code, FileText, Download, ArrowRight, ArrowLeft } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../lib/animations';
import '../styles/profileBuilder.css';

const STEPS = [
    'Personal Info',
    'Education',
    'Experience',
    'Projects',
    'Skills',
    'Generate'
];

function ProfileBuilder() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        summary: '',
        degree: '',
        institution: '',
        year: '',
        gpa: '',
        jobTitle: '',
        company: '',
        duration: '',
        jobDescription: '',
        projectTitle: '',
        projectDesc: '',
        projectTech: '',
        projectLink: '',
        skills: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Save data and navigate
            localStorage.setItem('resumeData', JSON.stringify(formData));
            navigate({ to: '/template-selection' });
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (
        <DashboardLayout>
            <motion.div className="profile-builder-page" variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div className="pb-header" variants={fadeUpVariant}>
                    <h1>Build Your Profile</h1>
                    <p>Complete your profile to get personalized career guidance and job matches.</p>
                </motion.div>

                {/* Dynamic Progress Indicator */}
                <motion.div className="steps-indicator-container" variants={fadeUpVariant}>
                    <div className="steps-indicator">
                        {STEPS.map((step, index) => (
                            <React.Fragment key={index}>
                                <div className={`step-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
                                    <div className="step-circle">
                                        {index < currentStep ? '✓' : index + 1}
                                    </div>
                                    <span className="step-label">{step}</span>
                                </div>
                                {index < STEPS.length - 1 && (
                                    <div className={`step-line ${index < currentStep ? 'completed' : ''}`}></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </motion.div>

                {/* Card Content area */}
                <motion.div className="builder-content" variants={fadeUpVariant}>
                    <div className="builder-card">
                        {currentStep === 0 && (
                            <div className="form-section">
                                <div className="form-header flex items-center gap-2">
                                    <span className="form-icon"><User className="text-blue-500" size={24} /></span>
                                    <h2>Personal Information</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@email.com" />
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Location</label>
                                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="City, State, Country" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Professional Summary</label>
                                        <textarea name="summary" value={formData.summary} onChange={handleChange} placeholder="Brief description of your professional background and career objectives..." rows={4}></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="form-section">
                                <div className="form-header flex items-center gap-2">
                                    <span className="form-icon"><GraduationCap className="text-green-500" size={24} /></span>
                                    <h2>Education</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Degree</label>
                                        <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Bachelor of Science in Computer Science" />
                                    </div>
                                    <div className="form-group">
                                        <label>Institution</label>
                                        <input type="text" name="institution" value={formData.institution} onChange={handleChange} placeholder="University Name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Year</label>
                                        <input type="text" name="year" value={formData.year} onChange={handleChange} placeholder="2020-2024" />
                                    </div>
                                    <div className="form-group">
                                        <label>GPA (Optional)</label>
                                        <input type="text" name="gpa" value={formData.gpa} onChange={handleChange} placeholder="3.8/4.0" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="form-section">
                                <div className="form-header flex items-center gap-2">
                                    <span className="form-icon"><Briefcase className="text-purple-500" size={24} /></span>
                                    <h2>Work Experience</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Software Developer" />
                                    </div>
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Tech Company Inc." />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Duration</label>
                                        <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Jan 2022 - Present" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Description</label>
                                        <textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} placeholder="Describe your responsibilities and achievements..." rows={4}></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="form-section">
                                <div className="form-header flex items-center gap-2">
                                    <span className="form-icon"><Code className="text-orange-500" size={24} /></span>
                                    <h2>Projects</h2>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group full-width">
                                        <label>Project Title</label>
                                        <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleChange} placeholder="E-commerce Website" />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Description</label>
                                        <textarea name="projectDesc" value={formData.projectDesc} onChange={handleChange} placeholder="Describe what the project does and your role in it..." rows={4}></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label>Technologies Used</label>
                                        <input type="text" name="projectTech" value={formData.projectTech} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
                                    </div>
                                    <div className="form-group">
                                        <label>Project Link (Optional)</label>
                                        <input type="text" name="projectLink" value={formData.projectLink} onChange={handleChange} placeholder="https://github.com/username/project" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 4 && (
                            <div className="form-section">
                                <div className="form-header flex items-center gap-2">
                                    <span className="form-icon"><FileText className="text-pink-500" size={24} /></span>
                                    <h2>Skills</h2>
                                </div>
                                <p className="form-subtitle">Add your technical and soft skills. These will help employers understand your capabilities.</p>

                                <div className="form-grid mt-4">
                                    <div className="form-group full-width">
                                        <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g., JavaScript, Communication, Leadership" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="form-section text-center">
                                <div className="form-header justify-center">
                                    <h2>Ready to Generate!</h2>
                                </div>
                                <p className="form-subtitle">You have completed all sections. Click generate to choose your template and build your resume.</p>
                            </div>
                        )}

                        <div className="form-actions mt-8">
                            <button
                                className={`btn-form-secondary flex items-center gap-2 ${currentStep === 0 ? 'hidden' : ''}`}
                                onClick={handlePrevious}
                            >
                                <ArrowLeft size={18} /> Previous
                            </button>
                            <div className="flex-spacer"></div>
                            <button
                                className="btn-form-primary flex items-center gap-2"
                                onClick={handleNext}
                            >
                                {currentStep === STEPS.length - 1 ? (
                                    <>Generate Resume <Download size={18} /></>
                                ) : (
                                    <>Next <ArrowRight size={18} /></>
                                )}
                            </button>
                        </div>
                    </div >
                </motion.div >
            </motion.div >
        </DashboardLayout >
    );
}

export default ProfileBuilder;
