import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { getMockInterviewQuestions } from '../services/mockData';
import { motion } from 'framer-motion';
import { MessageSquare, Mic, CheckCircle2, Square, Trophy } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../lib/animations';
import '../styles/mockInterview.css';

type InterviewMode = 'Text' | 'Voice';
type RoundType = 'Technical' | 'Managerial' | 'HR';

function MockInterview() {
  const [position, setPosition] = useState('');
  const [mode, setMode] = useState<InterviewMode>('Voice');
  const [selectedRounds, setSelectedRounds] = useState<RoundType[]>(['Technical']);

  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentTextAnswer, setCurrentTextAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);

  const toggleRound = (round: RoundType) => {
    if (selectedRounds.includes(round)) {
      if (selectedRounds.length > 1) {
        setSelectedRounds(selectedRounds.filter(r => r !== round));
      }
    } else {
      setSelectedRounds([...selectedRounds, round]);
    }
  };

  const handleStartInterview = () => {
    if (!position.trim()) {
      alert('Please enter a target position');
      return;
    }
    const interviewQuestions = getMockInterviewQuestions(); // Just mock questions for now
    setQuestions(interviewQuestions);
    setInterviewStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setInterviewComplete(false);
    setCurrentTextAnswer('');
  };

  const handleSendTextAnswer = () => {
    if (!currentTextAnswer.trim()) return;
    setAnswers({
      ...answers,
      [currentQuestionIndex]: currentTextAnswer
    });
    handleNextQuestion();
  };

  const handleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      // Simulate saving voice response
      setAnswers({
        ...answers,
        [currentQuestionIndex]: "[Audio Response Recorded]"
      });
      setTimeout(() => handleNextQuestion(), 1000);
    } else {
      setIsRecording(true);
    }
  };

  const handleNextQuestion = () => {
    setCurrentTextAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setInterviewComplete(true);
      localStorage.setItem('lastActivity', new Date().toISOString());
    }
  };

  return (
    <DashboardLayout>
      <div className="interview-page">
        {!interviewStarted ? (
          <motion.div className="interview-setup-view" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div className="interview-header" variants={fadeUpVariant}>
              <h1>Mock Interview Practice</h1>
              <p>Practice with our AI across behavioral, technical, and system design rounds.</p>
            </motion.div>

            <motion.div className="interview-config-card" variants={fadeUpVariant}>
              <div className="config-group">
                <label>What position are you interviewing for?</label>
                <input
                  type="text"
                  className="config-input"
                  placeholder="e.g. Frontend Developer, Product Manager"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </div>

              <div className="config-group">
                <label>Interview Mode</label>
                <div className="mode-toggle">
                  <button
                    className={`mode-btn flex items-center justify-center gap-2 ${mode === 'Text' ? 'active' : ''}`}
                    onClick={() => setMode('Text')}
                  >
                    <MessageSquare size={18} /> Text Mode
                  </button>
                  <button
                    className={`mode-btn flex items-center justify-center gap-2 ${mode === 'Voice' ? 'active' : ''}`}
                    onClick={() => setMode('Voice')}
                  >
                    <Mic size={18} /> Voice Mode
                  </button>
                </div>
              </div>

              <div className="config-group">
                <label>Select Interview Rounds</label>
                <div className="rounds-grid">
                  {(['Technical', 'Managerial', 'HR'] as RoundType[]).map(round => (
                    <div
                      key={round}
                      className={`round-card ${selectedRounds.includes(round) ? 'selected' : ''}`}
                      onClick={() => toggleRound(round)}
                    >
                      <div className="round-check">
                        {selectedRounds.includes(round) && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                      <span className="round-name">{round} Round</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn-start-interview" onClick={handleStartInterview}>
                Start Interview →
              </button>
            </motion.div>
          </motion.div>
        ) : !interviewComplete ? (
          <motion.div className="interview-active-view" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div className="active-interview-header" variants={fadeUpVariant}>
              <div className="interview-context">
                <span className="context-round">{selectedRounds[0]} Round</span>
                <span className="context-mode">{mode} Mode</span>
              </div>
              <div className="interview-progress">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
              </div>
            </motion.div>

            <motion.div className="interview-chat-area" variants={fadeUpVariant}>
              <div className="chat-message interviewer-message">
                <div className="avatar ai-avatar">AI</div>
                <div className="message-bubble">
                  <p>{questions[currentQuestionIndex]}</p>
                </div>
              </div>

              {/* Optional: Show user's transcribed answer as they speak, or after they submit */}
              {answers[currentQuestionIndex] && (
                <div className="chat-message user-message">
                  <div className="message-bubble user-bubble">
                    <p>{answers[currentQuestionIndex]}</p>
                  </div>
                  <div className="avatar user-avatar">You</div>
                </div>
              )}
            </motion.div>

            <motion.div className="interview-input-area" variants={fadeUpVariant}>
              {mode === 'Text' ? (
                <div className="text-input-wrapper">
                  <textarea
                    className="interview-textarea"
                    placeholder="Type your answer here..."
                    value={currentTextAnswer}
                    onChange={(e) => setCurrentTextAnswer(e.target.value)}
                    rows={3}
                  />
                  <button
                    className="btn-send-answer"
                    onClick={handleSendTextAnswer}
                    disabled={!currentTextAnswer.trim()}
                  >
                    Send
                  </button>
                </div>
              ) : (
                <div className="voice-input-wrapper">
                  <div className={`voice-visualizer ${isRecording ? 'recording' : ''}`}>
                    {isRecording ? "Listening... Speak now." : "Click microphone to start answering"}
                  </div>
                  <button
                    className={`btn-mic-toggle flex items-center justify-center gap-2 ${isRecording ? 'recording' : ''}`}
                    onClick={handleVoiceRecording}
                  >
                    {isRecording ? <><Square size={16} /> Stop</> : <><Mic size={16} /> Speak</>}
                  </button>
                </div>
              )}
            </motion.div>

            <motion.div className="interview-skip-row" variants={fadeUpVariant}>
              <button className="btn-skip" onClick={handleNextQuestion}>
                Skip Question →
              </button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div className="interview-complete-view" variants={fadeUpVariant} initial="hidden" animate="visible">
            <div className="complete-card">
              <h2 className="flex items-center justify-center gap-2">Interview Complete! <Trophy className="text-yellow-400" size={28} /></h2>
              <p>You have finished the mock interview. The AI is analyzing your responses.</p>

              <div className="interview-actions">
                <button
                  className="btn-review-results"
                  onClick={() => window.location.href = '/progress'}
                >
                  View Detailed Feedback →
                </button>
                <button
                  className="btn-secondary-interview"
                  onClick={() => setInterviewStarted(false)}
                >
                  Start New Interview
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MockInterview;
