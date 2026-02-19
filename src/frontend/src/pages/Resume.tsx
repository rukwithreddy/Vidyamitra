import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import '../styles/resume.css';

interface AnalysisResult {
  score: number;
  strengths: string[];
  improvements: string[];
}

/**
 * Resume Upload Page
 * Allows users to upload their resume and view analysis results
 */
function Resume() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  /**
   * Handle file selection
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setUploadSuccess(false);
    }
  };

  /**
   * Handle resume upload
   * In a real app, this would send the file to backend
   */
  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    // Simulate file upload
    setTimeout(() => {
      setUploadSuccess(true);
      
      // Mock analysis result
      setAnalysisResult({
        score: 85,
        strengths: [
          'Clear work experience section',
          'Good use of action verbs',
          'Relevant technical skills listed'
        ],
        improvements: [
          'Add more quantifiable achievements',
          'Include a professional summary',
          'Optimize keywords for ATS'
        ]
      });

      // Save to localStorage
      localStorage.setItem('resumeUploaded', 'true');
      localStorage.setItem('lastActivity', new Date().toISOString());
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="resume-page">
        <h1>Resume Analysis</h1>
        <p className="page-subtitle">Upload your resume for AI-powered analysis and feedback</p>

        <div className="upload-section">
          <div className="upload-card">
            <h2>Upload Resume</h2>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="resume-file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="resume-file" className="file-label">
                {selectedFile ? selectedFile.name : 'Choose File (PDF, DOC, DOCX)'}
              </label>
            </div>

            <button 
              onClick={handleUpload} 
              className="btn-upload"
              disabled={!selectedFile}
            >
              Upload & Analyze
            </button>

            {uploadSuccess && (
              <div className="success-message">
                ✅ Resume uploaded successfully!
              </div>
            )}
          </div>
        </div>

        {analysisResult && (
          <div className="analysis-section">
            <h2>Analysis Results</h2>
            
            <div className="score-card">
              <div className="score-circle">
                <span className="score-value">{analysisResult.score}</span>
                <span className="score-label">/ 100</span>
              </div>
              <p>Overall Resume Score</p>
            </div>

            <div className="analysis-grid">
              <div className="analysis-card strengths">
                <h3>✅ Strengths</h3>
                <ul>
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div className="analysis-card improvements">
                <h3>💡 Areas for Improvement</h3>
                <ul>
                  {analysisResult.improvements.map((improvement, index) => (
                    <li key={index}>{improvement}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Resume;
