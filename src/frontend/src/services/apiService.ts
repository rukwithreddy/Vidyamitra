/**
 * API Service
 * Centralized service for backend API integration
 */

const API_BASE_URL = 'http://127.0.0.1:8000';

interface LoginResponse {
  success: boolean;
  message?: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
}

interface UploadResponse {
  success: boolean;
  message?: string;
  data?: any;
}

interface ApiResponse {
  success: boolean;
}

/**
 * Login user
 */
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.detail || 'Login failed' };
    }
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

/**
 * Register new user
 */
export async function registerUser(name: string, email: string, password: string): Promise<RegisterResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      return { success: false, message: data.detail || 'Registration failed' };
    }
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

/**
 * Upload resume file
 */
export async function uploadResume(file: File): Promise<UploadResponse> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/resume/`, {
      method: 'POST',
      // The browser will automatically set the Content-Type to multipart/form-data
      // along with the correct boundary when passing FormData.
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      return { success: true, message: data.message, data: data.data };
    } else {
      return { success: false, message: data.detail || 'Upload failed' };
    }
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

/**
 * Fetch candidate profile (Requires auth cookie)
 */
export async function getProfile(): Promise<UploadResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, data: data.data };
    } else {
      return { success: false, message: data.detail || 'Failed to fetch profile' };
    }
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

/**
 * Generate roadmap for job role (Mocked for now)
 */
export async function generateRoadmapAPI(jobRole: string): Promise<ApiResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}

/**
 * Generate quiz for topic (Mocked for now)
 */
export async function generateQuizAPI(topic: string): Promise<ApiResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 500);
  });
}

