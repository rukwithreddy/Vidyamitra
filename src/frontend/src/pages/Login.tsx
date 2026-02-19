import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

/**
 * Login Page Component
 * Handles user login with email and OTP verification
 */
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Form state
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  /**
   * Send OTP to user's email
   * In a real app, this would call a backend API
   */
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate email
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate sending OTP
    setOtpSent(true);
    setMessage('OTP sent to your email! Use "123456" to login.');
  };

  /**
   * Verify OTP and login user
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple OTP validation (in real app, verify with backend)
    if (otp === '123456') {
      login(email);
      navigate({ to: '/dashboard' });
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>VidyaMitra</h1>
          <p>AI Career Guidance Platform</p>
        </div>

        <h2>Login</h2>

        {!otpSent ? (
          // Step 1: Enter email to receive OTP
          <form onSubmit={handleSendOtp} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-primary">
              Send OTP
            </button>
          </form>
        ) : (
          // Step 2: Enter OTP to login
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                required
              />
            </div>

            {message && <div className="success-message">{message}</div>}
            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setOtpSent(false)}
            >
              Change Email
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
