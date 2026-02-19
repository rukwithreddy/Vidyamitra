import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import VoiceRecorder from '../components/VoiceRecorder';
import { getMockInterviewQuestions } from '../services/mockData';
import '../styles/mockInterview.css';

/**
 * Mock Interview Page
 * Voice-based interview practice with recording and playback
 */
function MockInterview() {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [recordings, setRecordings] = useState<Record<number, Blob>>({});
  const [interviewComplete, setInterviewComplete] = useState(false);

  /**
   * Start the mock interview
   */
  const handleStartInterview = () => {
    const interviewQuestions = getMockInterviewQuestions();
    setQuestions(interviewQuestions);
    setInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setRecordings({});
    setInterviewComplete(false);
  };

  /**
   * Save recording for current question
   */
  const handleSaveRecording = (audioBlob: Blob | null) => {
    if (audioBlob) {
      setRecordings({
        ...recordings,
        [currentQuestionIndex]: audioBlob
      });
    }
  };

  /**
   * Move to next question
   */
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setInterviewComplete(true);
      // Update last activity
      localStorage.setItem('lastActivity', new Date().toISOString());
    }
  };

  /**
   * Move to previous question
   */
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  /**
   * Restart interview
   */
  const handleRestartInterview = () => {
    setInterviewStarted(false);
    setCurrentQuestionIndex(0);
    setRecordings({});
    setInterviewComplete(false);
  };

  return (
    <DashboardLayout>
      <div className="mock-interview-page">
        <h1>Voice-Based Mock Interview</h1>
        <p className="page-subtitle">Practice your interview skills with AI-generated questions</p>

        {!interviewStarted ? (
          <div className="interview-start-section">
            <div className="interview-intro-card">
              <h2>Ready to Practice?</h2>
              <p>This mock interview will help you prepare for real job interviews.</p>
              
              <div className="interview-instructions">
                <h3>How it works:</h3>
                <ul>
                  <li>📝 You'll be asked a series of interview questions</li>
                  <li>🎤 Record your answer using your microphone</li>
                  <li>▶️ Review your recordings anytime</li>
                  <li>🔄 Practice as many times as you need</li>
                </ul>
              </div>

              <button onClick={handleStartInterview} className="btn-start-interview">
                Start Interview
              </button>
            </div>
          </div>
        ) : !interviewComplete ? (
          <div className="interview-content">
            <div className="interview-progress">
              <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              <div className="progress-bar-small">
                <div 
                  className="progress-fill-small"
                  style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="question-display">
              <h2>Question {currentQuestionIndex + 1}</h2>
              <p className="interview-question">{questions[currentQuestionIndex]}</p>
            </div>

            <VoiceRecorder 
              onSaveRecording={handleSaveRecording}
              existingRecording={recordings[currentQuestionIndex] || null}
            />

            <div className="interview-navigation">
              <button 
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="btn-nav-interview"
              >
                ← Previous
              </button>

              <button 
                onClick={handleNextQuestion}
                className="btn-nav-interview"
                disabled={!recordings[currentQuestionIndex]}
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next →' : 'Finish Interview'}
              </button>
            </div>
          </div>
        ) : (
          <div className="interview-complete">
            <div className="complete-card">
              <h2>🎉 Interview Complete!</h2>
              <p>Great job! You've completed all {questions.length} questions.</p>

              <div className="review-section">
                <h3>Review Your Answers</h3>
                <div className="recordings-list">
                  {questions.map((question, index) => (
                    <div key={index} className="recording-item">
                      <div className="recording-question">
                        <strong>Q{index + 1}:</strong> {question}
                      </div>
                      {recordings[index] && (
                        <audio 
                          controls 
                          src={URL.createObjectURL(recordings[index])}
                          className="audio-player"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={handleRestartInterview} className="btn-restart-interview">
                Practice Again
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MockInterview;
