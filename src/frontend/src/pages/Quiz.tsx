import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { generateQuiz, saveQuizResult, QuizData } from '../services/quizService';
import { motion } from 'framer-motion';
import { BrainCircuit, CheckCircle2, XCircle } from 'lucide-react';
import { fadeUpVariant, staggerContainer } from '../lib/animations';
import '../styles/quiz.css';

function Quiz() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [numQuestions, setNumQuestions] = useState(5);

  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = () => {
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    const newQuiz = generateQuiz(topic);
    setQuiz(newQuiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  const handleNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    if (!quiz) return;

    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);

    saveQuizResult({
      topic: quiz.topic,
      score: finalScore,
      date: new Date().toISOString()
    });
    localStorage.setItem('lastActivity', new Date().toISOString());
  };

  const getProgressWidth = () => {
    if (!quiz) return '0%';
    return `${((currentQuestion + 1) / quiz.questions.length) * 100}%`;
  };

  return (
    <DashboardLayout>
      <div className="quiz-page">
        {!quiz && !showResults && (
          <motion.div className="quiz-setup-view" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div className="quiz-setup-header" variants={fadeUpVariant}>
              <span className="setup-icon"><BrainCircuit className="text-purple-500" size={48} /></span>
              <h1>Skill Assessment Quizzes</h1>
              <p>Test your knowledge and identify areas for improvement.</p>
            </motion.div>

            <motion.div className="quiz-config-card" variants={fadeUpVariant}>
              <div className="config-group">
                <label>Select Topic or Domain</label>
                <input
                  type="text"
                  className="config-input"
                  placeholder="e.g. JavaScript, React, Data Structures..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="config-group">
                <label>Difficulty Level</label>
                <div className="difficulty-pills">
                  {['Easy', 'Medium', 'Hard'].map(level => (
                    <button
                      key={level}
                      className={`diff-pill ${difficulty === level ? 'active' : ''}`}
                      onClick={() => setDifficulty(level)}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="config-group">
                <label>Number of Questions</label>
                <select
                  className="config-select"
                  value={numQuestions}
                  onChange={(e) => setNumQuestions(Number(e.target.value))}
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                </select>
              </div>

              <button className="btn-start-quiz" onClick={handleStartQuiz}>
                Start Quiz →
              </button>
            </motion.div>
          </motion.div>
        )}

        {quiz && !showResults && (
          <motion.div className="quiz-active-view" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div className="active-quiz-header" variants={fadeUpVariant}>
              <div className="active-quiz-info">
                <h2>{quiz.topic} Assessment</h2>
                <span className="diff-badge">{difficulty}</span>
              </div>
              <div className="quiz-progress-info">
                <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              </div>
            </motion.div>

            <motion.div className="quiz-progress-bar" variants={fadeUpVariant}>
              <div className="quiz-progress-fill" style={{ width: getProgressWidth() }}></div>
            </motion.div>

            <motion.div className="question-container" variants={fadeUpVariant} key={currentQuestion}>
              <h3>{quiz.questions[currentQuestion].question}</h3>

              <div className="options-grid">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`quiz-option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                    onClick={() => handleSelectAnswer(index)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div className="quiz-navigation-actions" variants={fadeUpVariant}>
              <button
                className="btn-quiz-nav"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>

              {currentQuestion < quiz.questions.length - 1 ? (
                <button
                  className="btn-quiz-next"
                  onClick={handleNextQuestion}
                >
                  Next Question →
                </button>
              ) : (
                <button
                  className="btn-quiz-submit"
                  onClick={handleSubmitQuiz}
                  disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
                >
                  Submit Quiz
                </button>
              )}
            </motion.div>
          </motion.div>
        )}

        {showResults && quiz && (
          <motion.div className="quiz-results-view" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div className="results-banner" variants={fadeUpVariant}>
              <div className="results-score-info">
                <h1>Quiz Complete!</h1>
                <p>You completed the {quiz.topic} assessment.</p>
              </div>
              <div className="results-score-circle">
                <span className="score-val">{score}%</span>
              </div>
            </motion.div>

            <motion.div className="review-section" variants={fadeUpVariant}>
              <h2>Review Your Answers</h2>
              <div className="review-list">
                {quiz.questions.map((q, idx) => {
                  const userAnswerIdx = selectedAnswers[idx];
                  const isCorrect = userAnswerIdx === q.correctAnswer;

                  return (
                    <div key={idx} className={`review-card ${isCorrect ? 'correct-card' : 'incorrect-card'}`}>
                      <div className="review-q-header">
                        <span className="q-num">Q{idx + 1}</span>
                        <h4>{q.question}</h4>
                      </div>
                      <div className="review-answers">
                        <div className="answer-row">
                          <span className="answer-label">Your Answer:</span>
                          <span className={`answer-val flex items-center gap-1 ${isCorrect ? 'text-green' : 'text-red'}`}>
                            {userAnswerIdx !== undefined ? q.options[userAnswerIdx] : 'Not answered'}
                            {isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="answer-row">
                            <span className="answer-label">Correct Answer:</span>
                            <span className="answer-val text-green flex items-center gap-1">
                              {q.options[q.correctAnswer]} <CheckCircle2 size={16} />
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="review-explanation">
                        <strong>Explanation:</strong> This is a mock explanation for why the answer is correct. In a real application, the backend would provide this specific explanation for the question.
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div className="results-footer" variants={fadeUpVariant}>
              <button
                className="btn-quiz-secondary"
                onClick={() => {
                  setQuiz(null);
                  setShowResults(false);
                  setTopic('');
                }}
              >
                Take Another Quiz
              </button>
              <button
                className="btn-quiz-primary"
                onClick={() => window.location.href = '/progress'}
              >
                View Learning Progress →
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Quiz;
