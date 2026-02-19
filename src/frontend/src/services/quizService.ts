/**
 * Quiz Service
 * Generates quizzes and manages quiz results
 */

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizData {
  topic: string;
  questions: Question[];
}

export interface QuizResult {
  topic: string;
  score: number;
  date: string;
}

interface QuizTemplates {
  [key: string]: Question[];
}

/**
 * Generate a quiz for a specific topic
 */
export function generateQuiz(topic: string): QuizData {
  // Mock quiz questions based on topic
  const quizTemplates: QuizTemplates = {
    'JavaScript': [
      {
        question: 'What is the output of: typeof null?',
        options: ['null', 'undefined', 'object', 'number'],
        correctAnswer: 2
      },
      {
        question: 'Which method is used to add elements to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0
      },
      {
        question: 'What does "===" check in JavaScript?',
        options: ['Value only', 'Type only', 'Both value and type', 'Neither'],
        correctAnswer: 2
      },
      {
        question: 'Which keyword is used to declare a constant in JavaScript?',
        options: ['var', 'let', 'const', 'constant'],
        correctAnswer: 2
      },
      {
        question: 'What is a closure in JavaScript?',
        options: [
          'A function that returns another function',
          'A function with access to its outer scope',
          'A way to close the browser',
          'A type of loop'
        ],
        correctAnswer: 1
      }
    ],
    'React': [
      {
        question: 'What is JSX?',
        options: [
          'A JavaScript library',
          'A syntax extension for JavaScript',
          'A CSS framework',
          'A database'
        ],
        correctAnswer: 1
      },
      {
        question: 'Which hook is used for side effects in React?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1
      },
      {
        question: 'What is the virtual DOM?',
        options: [
          'A copy of the real DOM kept in memory',
          'A new browser API',
          'A CSS technique',
          'A database structure'
        ],
        correctAnswer: 0
      },
      {
        question: 'How do you pass data from parent to child component?',
        options: ['State', 'Props', 'Context', 'Redux'],
        correctAnswer: 1
      },
      {
        question: 'What does useState return?',
        options: [
          'A single value',
          'An array with state and setter',
          'An object',
          'A function'
        ],
        correctAnswer: 1
      }
    ],
    'default': [
      {
        question: `What is the most important skill for a ${topic} professional?`,
        options: [
          'Technical knowledge',
          'Communication skills',
          'Problem-solving ability',
          'All of the above'
        ],
        correctAnswer: 3
      },
      {
        question: `Which of these is essential for learning ${topic}?`,
        options: [
          'Practice and hands-on experience',
          'Reading documentation',
          'Working on projects',
          'All of the above'
        ],
        correctAnswer: 3
      },
      {
        question: `What is the best way to stay updated in ${topic}?`,
        options: [
          'Follow industry blogs',
          'Attend conferences',
          'Join online communities',
          'All of the above'
        ],
        correctAnswer: 3
      },
      {
        question: `How important is continuous learning in ${topic}?`,
        options: [
          'Not important',
          'Somewhat important',
          'Very important',
          'Critical for success'
        ],
        correctAnswer: 3
      },
      {
        question: `What mindset is most helpful when learning ${topic}?`,
        options: [
          'Fixed mindset',
          'Growth mindset',
          'Competitive mindset',
          'Passive mindset'
        ],
        correctAnswer: 1
      }
    ]
  };

  // Get questions for topic or use default
  const questions = quizTemplates[topic] || quizTemplates['default'];

  return {
    topic,
    questions
  };
}

/**
 * Save quiz result to localStorage
 */
export function saveQuizResult(result: QuizResult): void {
  const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
  quizHistory.push(result);
  localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
}

/**
 * Get quiz history from localStorage
 */
export function getQuizHistory(): QuizResult[] {
  return JSON.parse(localStorage.getItem('quizHistory') || '[]');
}
