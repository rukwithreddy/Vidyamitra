import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { generateQuiz, saveQuizResult, QuizData } from '../services/quizService';
import '../styles/quiz.css';

/**
 * Quiz Page
 * Generates topic-based quizzes and tracks scores
 */
function Quiz() {
  const [topic, setTopic] = useState('');
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  /**
   * Start quiz for entered topic
   */
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

  /**
   * Select answer for current question
   */
  const handleSelectAnswer = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex
    });
  };

  /**
   * Move to next question
   */
  const handleNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  /**
   * Move to previous question
   */
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  /**
   * Submit quiz and calculate score
   */
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

    // Save quiz result
    saveQuizResult({
      topic: quiz.topic,
      score: finalScore,
      date: new Date().toISOString()
    });

    // Update last activity
    localStorage.setItem('lastActivity', new Date().toISOString());
  };

  return (
    <DashboardLayout>
      <div className="quiz-page">
        <h1>Topic Quiz</h1>
        <p className="page-subtitle">Test your knowledge on any topic</p>

        {!quiz ? (
          <div className="quiz-start-section">
            <div className="quiz-input-card">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter topic (e.g., JavaScript, React, Python)"
                className="topic-input"
              />
              <button onClick={handleStartQuiz} className="btn-start-quiz">
                Start Quiz
              </button>
            </div>
          </div>
        ) : !showResults ? (
          <div className="quiz-content">
            <div className="quiz-header">
              <h2>Quiz: {quiz.topic}</h2>
              <span className="question-counter">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
            </div>

            <div className="question-card">
              <h3>{quiz.questions[currentQuestion].question}</h3>
              
              <div className="answers-list">
                {quiz.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className={`answer-option ${selectedAnswers[currentQuestion] === index ? 'selected' : ''}`}
                    onClick={() => handleSelectAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="quiz-navigation">
              <button 
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="btn-nav"
              >
                Previous
              </button>

              {currentQuestion < quiz.questions.length - 1 ? (
                <button 
                  onClick={handleNextQuestion}
                  className="btn-nav"
                >
                  Next
                </button>
              ) : (
                <button 
                  onClick={handleSubmitQuiz}
                  className="btn-submit"
                  disabled={Object.keys(selectedAnswers).length !== quiz.questions.length}
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="quiz-results">
            <div className="results-card">
              <h2>Quiz Completed!</h2>
              <div className="score-display">
                <div className="score-circle-large">
                  <span className="score-value">{score}%</span>
                </div>
                <p className="score-text">
                  You got {Math.round((score / 100) * quiz.questions.length)} out of {quiz.questions.length} questions correct!
                </p>
              </div>

              <div className="results-actions">
                <button 
                  onClick={() => {
                    setQuiz(null);
                    setTopic('');
                  }}
                  className="btn-new-quiz"
                >
                  Take Another Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Quiz;
