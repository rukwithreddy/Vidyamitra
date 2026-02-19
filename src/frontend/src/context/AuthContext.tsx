import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Authentication Context Type
 */
interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string;
  login: (email: string) => void;
  logout: () => void;
}

/**
 * Authentication Context
 * Manages user authentication state across the application
 * Uses localStorage to persist login state
 */
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Check if user is already logged in from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [userEmail, setUserEmail] = useState<string>(() => {
    return localStorage.getItem('userEmail') || '';
  });

  /**
   * Login function - saves authentication state to localStorage
   */
  const login = (email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', email);
    
    // Update last activity timestamp
    localStorage.setItem('lastActivity', new Date().toISOString());
  };

  /**
   * Logout function - clears authentication state
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  };

  // Provide authentication state and functions to all child components
  const value: AuthContextType = {
    isAuthenticated,
    userEmail,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to access authentication context
 * Use this in any component that needs auth state
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
