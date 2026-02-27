import React, { useState } from 'react';
import { useNavigate, Link } from '@tanstack/react-router';
import DashboardLayout from '../components/DashboardLayout';
import { uploadResume } from '../services/apiService';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2, XCircle, Lightbulb, Upload, UploadCloud, Eye, Lock } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../lib/animations';
import '../styles/resume.css';

function Resume() {
  const navigate = useNavigate();
  const [hasResume, setHasResume] = useState<boolean | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setIsUploading(true);
    try {
      const result = await uploadResume(selectedFile);
      if (result.success && result.data) {
        // Pass the analysis data via router state
        navigate({
          to: '/resume-analysis',
          state: { analysisData: result.data }
        });
      } else {
        alert(result.message || 'Error uploading resume.');
      }
    } catch (err) {
      alert('Network error while uploading resume.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <motion.div className="career-journey-page" variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div className="journey-header" variants={fadeUpVariant}>
          <div className="header-icon flex items-center justify-center"><FileText size={48} className="text-blue-500" /></div>
          <h1>Let's Start Your Career Journey!</h1>
          <p>To provide you with the best career guidance, we need to understand your current profile.</p>
        </motion.div>

        <motion.div className="journey-question" variants={fadeUpVariant}>
          <h2>Do you have an existing resume?</h2>

          <div className="choice-cards">
            <div
              className={`choice-card ${hasResume === true ? 'selected' : ''}`}
              onClick={() => setHasResume(true)}
            >
              <div className="choice-icon green-icon flex items-center justify-center"><CheckCircle2 size={32} /></div>
              <h3>Yes, I have one</h3>
              <p>Upload your existing resume for analysis</p>
            </div>

            <Link
              to="/profile-builder"
              className="choice-card link-card"
              onClick={() => setHasResume(false)}
            >
              <div className="choice-icon red-icon flex items-center justify-center"><XCircle size={32} /></div>
              <h3>No, I need help</h3>
              <p>Let our AI help you build a professional resume</p>
            </Link>
          </div>
        </motion.div>

        <motion.div className="info-banner" variants={fadeUpVariant}>
          <span className="info-icon flex items-center justify-center text-yellow-500"><Lightbulb size={24} /></span>
          <div className="info-text">
            <strong>What happens next?</strong>
            <span>Choose an option above to see what happens next in your career journey.</span>
          </div>
        </motion.div>

        {hasResume && (
          <motion.div className="upload-container" variants={fadeUpVariant}>
            <div className="upload-header">
              <div className="upload-icon flex items-center justify-center text-blue-500 mb-2"><Upload size={32} /></div>
              <h2>Upload Your Resume</h2>
              <p>Upload your existing resume and let our AI analyze your skills, experience, and qualifications</p>
            </div>

            <div
              className={`drop-zone ${isDragging ? 'dragging' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="upload-cloud-icon flex items-center justify-center text-gray-400 mb-2"><UploadCloud size={48} /></div>
              <h3>Drag & drop your resume here</h3>
              <p>or click to browse files</p>
              <span className="supported-formats">Supported formats: PDF, DOC, DOCX (Max 5MB)</span>

              <input
                type="file"
                id="resume-upload"
                className="hidden-file-input"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <label htmlFor="resume-upload" className="browse-overlay"></label>
            </div>

            {selectedFile && (
              <div className="selected-file-info flex items-center gap-2">
                <FileText size={18} className="text-gray-500" /> {selectedFile.name}
              </div>
            )}

            <div className="upload-actions">
              <button className="btn-secondary" onClick={() => setHasResume(null)}>Back</button>
              <button
                className="btn-primary"
                disabled={!selectedFile || isUploading}
                onClick={handleUpload}
              >
                {isUploading ? 'Analyzing...' : <span className="flex items-center gap-2">Analyze Resume <Eye size={18} /></span>}
              </button>
            </div>
          </motion.div>
        )}

        <motion.div className="privacy-banner" variants={fadeUpVariant}>
          <div className="privacy-icon flex items-center justify-center"><Lock size={20} className="text-gray-500" /></div>
          <div className="privacy-content">
            <h4>Your Privacy Matters</h4>
            <p>Your resume is processed securely and used only for analysis. We extract skills, experience, and qualifications to provide personalized career guidance. Your data is never shared with third parties.</p>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}

export default Resume;
