import React from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
    Rocket, Sparkles, BrainCircuit, Target, Laptop, Briefcase, ChevronRight
} from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { staggerContainer, fadeUpVariant, cardHoverVariant } from '../lib/animations';
import '../styles/landing.css';

function Landing() {
    return (
        <DashboardLayout>
            <div className="landing-page">

                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-background">
                        <div className="glow-sphere sphere-1"></div>
                        <div className="glow-sphere sphere-2"></div>
                        <div className="glow-sphere sphere-3"></div>
                    </div>

                    <motion.div
                        className="hero-content"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div className="hero-badge" variants={fadeUpVariant}>
                            <Sparkles size={16} className="text-yellow-400" />
                            <span>The New Era of Career Growth</span>
                        </motion.div>

                        <motion.h1 variants={fadeUpVariant} className="hero-title">
                            Supercharge Your <span className="gradient-text">Future</span>
                        </motion.h1>

                        <motion.p variants={fadeUpVariant} className="hero-subtitle">
                            AI-powered career coaching, smart resume generation, and personalized learning paths to help you land your dream job faster.
                        </motion.p>

                        <motion.div variants={fadeUpVariant} className="hero-actions">
                            <Link to="/resume" className="btn-glow-primary">
                                Build Your Resume <ChevronRight size={18} />
                            </Link>
                            <Link to="/roadmap" className="btn-glow-secondary">
                                View Your Roadmap
                            </Link>
                        </motion.div>
                    </motion.div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Unlock Your Potential</h2>
                        <p>Everything you need to accelerate your career journey</p>
                    </motion.div>

                    <motion.div
                        className="features-grid"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <motion.div className="feature-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
                            <div className="feature-icon icon-purple"><BrainCircuit size={28} /></div>
                            <h3>AI Skill Evaluation</h3>
                            <p>Detailed assessment of your current technical skills compared against top industry demands.</p>
                        </motion.div>

                        <motion.div className="feature-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
                            <div className="feature-icon icon-blue"><Rocket size={28} /></div>
                            <h3>Smart Resume Builder</h3>
                            <p>Generate highly optimized, ATS-friendly resumes tailored specifically to the roles you want.</p>
                        </motion.div>

                        <motion.div className="feature-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
                            <div className="feature-icon icon-orange"><Target size={28} /></div>
                            <h3>Targeted Roadmaps</h3>
                            <p>Personalized step-by-step learning paths that bridge the gap between where you are and your dream job.</p>
                        </motion.div>

                        <motion.div className="feature-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
                            <div className="feature-icon icon-green"><Laptop size={28} /></div>
                            <h3>Interactive Quizzes</h3>
                            <p>Test your knowledge with challenging modules that adapt to your skill level dynamically.</p>
                        </motion.div>

                        <motion.div className="feature-card" variants={fadeUpVariant} whileHover="hover" initial="rest" custom={cardHoverVariant}>
                            <div className="feature-icon icon-pink"><Briefcase size={28} /></div>
                            <h3>Job Matching</h3>
                            <p>Get paired with top tech companies that are looking for exactly the skills you bring to the table.</p>
                        </motion.div>
                    </motion.div>
                </section>

            </div>
        </DashboardLayout>
    );
}

export default Landing;
