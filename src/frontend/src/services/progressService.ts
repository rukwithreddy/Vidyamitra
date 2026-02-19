import { loadRoadmapProgress } from './roadmapService';
import { getQuizHistory, QuizResult } from './quizService';

/**
 * Progress Service
 * Calculates and retrieves user progress statistics
 */

export interface RecentQuiz {
  topic: string;
  score: number;
  date: string;
}

export interface ProgressStats {
  roadmapCompletion: number;
  quizzesTaken: number;
  lastActivity: string;
  recentQuizzes: RecentQuiz[];
}

/**
 * Calculate roadmap completion percentage
 */
function calculateRoadmapCompletion(): number {
  const roadmap = loadRoadmapProgress();
  if (!roadmap || !roadmap.topics) return 0;

  const completedTopics = roadmap.topics.filter(topic => topic.status === 'completed').length;
  const totalTopics = roadmap.topics.length;

  return totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
}

/**
 * Format date to readable string
 */
function formatDate(dateString: string | null): string {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString();
}

/**
 * Get all progress statistics
 */
export function getProgressStats(): ProgressStats {
  const roadmapCompletion = calculateRoadmapCompletion();
  const quizHistory = getQuizHistory();
  const lastActivity = localStorage.getItem('lastActivity');

  // Get recent quizzes (last 5)
  const recentQuizzes: RecentQuiz[] = quizHistory
    .slice(-5)
    .reverse()
    .map(quiz => ({
      ...quiz,
      date: formatDate(quiz.date)
    }));

  return {
    roadmapCompletion,
    quizzesTaken: quizHistory.length,
    lastActivity: formatDate(lastActivity),
    recentQuizzes
  };
}
