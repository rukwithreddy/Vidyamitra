/**
 * API Service
 * Centralized service for future backend API integration
 * Currently returns mock data, but can be easily updated to call real APIs
 */

interface LoginResponse {
  success: boolean;
  user: { email: string };
}

interface RegisterResponse {
  success: boolean;
  user: { name: string; email: string };
}

interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
}

interface UploadResponse {
  success: boolean;
  analysis: ResumeAnalysis;
}

interface ApiResponse {
  success: boolean;
}

/**
 * Login user with email and OTP
 * TODO: Replace with actual backend API call
 */
export async function loginUser(email: string, otp: string): Promise<LoginResponse> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === '123456') {
        resolve({ success: true, user: { email } });
      } else {
        reject(new Error('Invalid OTP'));
      }
    }, 500);
  });
}

/**
 * Register new user
 * TODO: Replace with actual backend API call
 */
export async function registerUser(name: string, email: string, otp: string): Promise<RegisterResponse> {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (otp === '123456') {
        resolve({ success: true, user: { name, email } });
      } else {
        reject(new Error('Invalid OTP'));
      }
    }, 500);
  });
}

/**
 * Upload resume file
 * TODO: Replace with actual backend API call
 */
export async function uploadResume(file: File): Promise<UploadResponse> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        analysis: {
          score: 85,
          strengths: ['Clear structure', 'Good keywords'],
          improvements: ['Add more metrics', 'Improve formatting']
        }
      });
    }, 1000);
  });
}

/**
 * Generate roadmap for job role
 * TODO: Replace with actual backend API call
 */
export async function generateRoadmapAPI(jobRole: string): Promise<ApiResponse> {
  // Currently using local service
  // In future, this will call backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}

/**
 * Generate quiz for topic
 * TODO: Replace with actual backend API call
 */
export async function generateQuizAPI(topic: string): Promise<ApiResponse> {
  // Currently using local service
  // In future, this will call backend API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}
