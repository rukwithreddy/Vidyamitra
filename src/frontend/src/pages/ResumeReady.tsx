import React, { useEffect, useState, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeUpVariant, staggerContainer } from '../lib/animations';
import '../styles/resumeReady.css';

function ResumeReady() {
    const [resumeData, setResumeData] = useState<any>(null);
    const [templateId, setTemplateId] = useState<string>('modern');
    const [isGenerating, setIsGenerating] = useState(false);
    const resumeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load data from localStorage
        const storedData = localStorage.getItem('resumeData');
        if (storedData) {
            try {
                setResumeData(JSON.parse(storedData));
            } catch (e) {
                console.error("Failed to parse resume data");
            }
        } else {
            // Fallback mock data if accessed directly
            setResumeData({
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@email.com',
                phone: '+1 (555) 123-4567',
                location: 'San Francisco, CA',
                summary: 'A passionate Software Engineer with 3+ years of experience in building scalable web applications. Proficient in React, Node.js, and cloud infrastructure.',
                degree: 'B.S. in Computer Science',
                institution: 'University of Technology',
                year: '2018 - 2022',
                gpa: '3.8',
                jobTitle: 'Software Developer',
                company: 'Tech Company Inc.',
                duration: '2022 - Present',
                jobDescription: 'Developed and maintained core frontend architecture using React. Improved application performance by 40% through code splitting.',
                projectTitle: 'E-Commerce Platform',
                projectDesc: 'Built a full-stack e-commerce solution serving 10k+ MAU.',
                projectTech: 'React, Node.js, MongoDB',
                skills: 'JavaScript, TypeScript, React, Node.js, Python, SQL, AWS'
            });
        }

        const storedTemplate = localStorage.getItem('selectedTemplate');
        if (storedTemplate) setTemplateId(storedTemplate);
    }, []);

    const handleDownloadPDF = async () => {
        if (!resumeRef.current) return;
        setIsGenerating(true);

        try {
            const canvas = await html2canvas(resumeRef.current, {
                scale: 2, // High resolution
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${resumeData?.firstName || 'Resume'}_${resumeData?.lastName || 'Doc'}.pdf`);
        } catch (error) {
            console.error('Error generating PDF', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handlePrint = () => {
        window.print();
    };

    if (!resumeData) return null;

    // Apply basic template coloring for the mock
    const themeColors: Record<string, string> = {
        modern: '#6B46C1',
        classic: '#2B6CB0',
        creative: '#DD6B20'
    };
    const activeColor = themeColors[templateId] || themeColors.modern;

    return (
        <DashboardLayout>
            <motion.div className="resume-ready-page" variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div className="ready-header" variants={fadeUpVariant}>
                    <div className="ready-title-row">
                        <h1>Your Resume is Ready! 🎉</h1>
                        <div className="ready-header-actions">
                            <Link to="/template-selection" className="btn-icon">← Change Template</Link>
                            <button className="btn-icon" onClick={handlePrint}><Printer size={16} className="inline mr-1" /> Print</button>
                            <button
                                className="btn-primary-small"
                                onClick={handleDownloadPDF}
                                disabled={isGenerating}
                            >
                                {isGenerating ? 'Generating...' : <><Download size={16} className="inline mr-1" /> Download PDF</>}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* The visual container with a dark background for contrast */}
                <motion.div className="resume-preview-container" variants={fadeUpVariant}>

                    {/* The actual A4 document paper style container we will target for PDF */}
                    <div
                        className="resume-document"
                        ref={resumeRef}
                        style={{
                            backgroundColor: '#fff',
                            color: '#333',
                            padding: '40px',
                            minHeight: '297mm', // A4 height approx
                            width: '210mm',     // A4 width
                            margin: '0 auto',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)', // Outside shadow not rendered in PDF
                            boxSizing: 'border-box',
                            fontFamily: "Inter, sans-serif"
                        }}
                    >
                        {/* Header */}
                        <div className="doc-header" style={{ borderBottom: `2px solid ${activeColor}`, paddingBottom: '20px', marginBottom: '20px', textAlign: templateId === 'classic' ? 'center' : 'left' }}>
                            <h2 style={{ color: activeColor, fontSize: '32px', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
                                {resumeData.firstName} {resumeData.lastName}
                            </h2>
                            <p style={{ margin: 0, fontSize: '14px', color: '#555' }}>
                                {resumeData.email} {resumeData.phone ? `| ${resumeData.phone}` : ''} {resumeData.location ? `| ${resumeData.location}` : ''}
                            </p>
                        </div>

                        {/* Summary */}
                        {resumeData.summary && (
                            <div className="doc-section" style={{ marginBottom: '25px' }}>
                                <h3 style={{ color: activeColor, fontSize: '18px', marginBottom: '10px', textTransform: 'uppercase' }}>Professional Summary</h3>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{resumeData.summary}</p>
                            </div>
                        )}

                        {/* Experience */}
                        {(resumeData.jobTitle || resumeData.company) && (
                            <div className="doc-section" style={{ marginBottom: '25px' }}>
                                <h3 style={{ color: activeColor, fontSize: '18px', marginBottom: '10px', textTransform: 'uppercase' }}>Professional Experience</h3>
                                <div className="doc-item">
                                    <div className="doc-item-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <strong style={{ fontSize: '16px' }}>{resumeData.jobTitle}</strong>
                                        <span style={{ fontSize: '14px', fontStyle: 'italic' }}>{resumeData.duration}</span>
                                    </div>
                                    <div style={{ fontSize: '15px', color: '#444', marginBottom: '5px' }}>{resumeData.company}</div>
                                    <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                        {resumeData.jobDescription}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Education */}
                        {(resumeData.degree || resumeData.institution) && (
                            <div className="doc-section" style={{ marginBottom: '25px' }}>
                                <h3 style={{ color: activeColor, fontSize: '18px', marginBottom: '10px', textTransform: 'uppercase' }}>Education</h3>
                                <div className="doc-item">
                                    <div className="doc-item-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                        <strong style={{ fontSize: '16px' }}>{resumeData.degree}</strong>
                                        <span style={{ fontSize: '14px', fontStyle: 'italic' }}>{resumeData.year}</span>
                                    </div>
                                    <div style={{ fontSize: '15px', color: '#444' }}>
                                        {resumeData.institution} {resumeData.gpa ? `- GPA: ${resumeData.gpa}` : ''}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Projects */}
                        {resumeData.projectTitle && (
                            <div className="doc-section" style={{ marginBottom: '25px' }}>
                                <h3 style={{ color: activeColor, fontSize: '18px', marginBottom: '10px', textTransform: 'uppercase' }}>Projects</h3>
                                <div className="doc-item">
                                    <div className="doc-item-header" style={{ marginBottom: '5px' }}>
                                        <strong style={{ fontSize: '16px' }}>{resumeData.projectTitle}</strong>
                                        {resumeData.projectTech && <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>| {resumeData.projectTech}</span>}
                                    </div>
                                    <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{resumeData.projectDesc}</p>
                                </div>
                            </div>
                        )}

                        {/* Skills */}
                        {resumeData.skills && (
                            <div className="doc-section" style={{ marginBottom: '25px' }}>
                                <h3 style={{ color: activeColor, fontSize: '18px', marginBottom: '10px', textTransform: 'uppercase' }}>Skills</h3>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>{resumeData.skills}</p>
                            </div>
                        )}

                    </div>
                </motion.div>

                <motion.div className="ready-benefits-banner" variants={fadeUpVariant}>
                    <div className="benefit-item">
                        <span className="b-icon">🤖</span>
                        <span>ATS-Optimized Format</span>
                    </div>
                    <div className="benefit-item">
                        <span className="b-icon">✨</span>
                        <span>Professional Design</span>
                    </div>
                    <div className="benefit-item">
                        <span className="b-icon">⚡</span>
                        <span>Instant Download</span>
                    </div>
                </motion.div>

                <motion.div className="ready-footer-actions" variants={fadeUpVariant}>
                    <Link to="/resume-analysis" className="btn-outline">Analyze Resume 🔍</Link>
                    <Link to="/domain-selection" className="btn-primary-large">Continue Career Journey →</Link>
                </motion.div>
            </motion.div>
        </DashboardLayout>
    );
}

export default ResumeReady;
