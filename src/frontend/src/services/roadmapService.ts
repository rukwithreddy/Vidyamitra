/**
 * Roadmap Service
 * Handles roadmap generation and progress tracking
 */

export interface Topic {
  name: string;
  status: string;
  subtopics: string[];
}

export interface RoadmapData {
  jobRole: string;
  topics: Topic[];
  createdAt: string;
}

interface RoadmapTemplates {
  [key: string]: Topic[];
}

/**
 * Generate a learning roadmap for a specific job role
 */
export function generateRoadmap(jobRole: string): RoadmapData {
  // Mock roadmap data based on job role
  const roadmaps: RoadmapTemplates = {
    'Full Stack Developer': [
      {
        name: 'Frontend Development',
        status: 'not started',
        subtopics: ['HTML & CSS', 'JavaScript ES6+', 'React.js', 'State Management', 'Responsive Design']
      },
      {
        name: 'Backend Development',
        status: 'not started',
        subtopics: ['Node.js', 'Express.js', 'RESTful APIs', 'Authentication', 'Database Design']
      },
      {
        name: 'Database Management',
        status: 'not started',
        subtopics: ['SQL Basics', 'MongoDB', 'Database Optimization', 'Data Modeling']
      },
      {
        name: 'DevOps & Deployment',
        status: 'not started',
        subtopics: ['Git & GitHub', 'Docker', 'CI/CD', 'Cloud Platforms', 'Server Management']
      }
    ],
    'Data Scientist': [
      {
        name: 'Programming Fundamentals',
        status: 'not started',
        subtopics: ['Python Basics', 'NumPy', 'Pandas', 'Data Structures', 'Algorithms']
      },
      {
        name: 'Statistics & Mathematics',
        status: 'not started',
        subtopics: ['Probability', 'Statistical Analysis', 'Linear Algebra', 'Calculus']
      },
      {
        name: 'Machine Learning',
        status: 'not started',
        subtopics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering']
      },
      {
        name: 'Data Visualization',
        status: 'not started',
        subtopics: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard Creation']
      }
    ],
    'default': [
      {
        name: 'Core Skills',
        status: 'not started',
        subtopics: ['Industry Knowledge', 'Technical Skills', 'Soft Skills', 'Problem Solving']
      },
      {
        name: 'Tools & Technologies',
        status: 'not started',
        subtopics: ['Essential Tools', 'Software Proficiency', 'Best Practices']
      },
      {
        name: 'Professional Development',
        status: 'not started',
        subtopics: ['Communication', 'Teamwork', 'Leadership', 'Time Management']
      }
    ]
  };

  // Find matching roadmap or use default
  const topics = roadmaps[jobRole] || roadmaps['default'];

  return {
    jobRole,
    topics,
    createdAt: new Date().toISOString()
  };
}

/**
 * Save roadmap progress to localStorage
 */
export function saveRoadmapProgress(roadmap: RoadmapData): void {
  localStorage.setItem('roadmap', JSON.stringify(roadmap));
}

/**
 * Load roadmap progress from localStorage
 */
export function loadRoadmapProgress(): RoadmapData | null {
  const saved = localStorage.getItem('roadmap');
  return saved ? JSON.parse(saved) : null;
}
