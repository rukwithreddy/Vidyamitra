import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import '../styles/auth.css';

/**
 * Registration Page Component
 * Handles new user registration with email and OTP verification
 */
function Register() {
  const navigate = useNavigate();
  
  // Form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  /**
   * Send OTP for registration verification
   */
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!name || !email || !email.includes('@')) {
      setError('Please fill all fields correctly');
      return;
    }

    // Simulate sending OTP
    setOtpSent(true);
    setMessage('OTP sent to your email! Use "123456" to verify.');
  };

  /**
   * Verify OTP and complete registration
   */
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Verify OTP (in real app, verify with backend)
    if (otp === '123456') {
      // Save user data to localStorage (simulating backend)
      localStorage.setItem('registeredUser', JSON.stringify({ name, email }));
      setMessage('Registration successful! Redirecting to login...');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 2000);
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

        <h2>Register</h2>

        {!otpSent ? (
          // Step 1: Enter details to receive OTP
          <form onSubmit={handleSendOtp} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

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
          // Step 2: Verify OTP to complete registration
          <form onSubmit={handleRegister} className="auth-form">
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
              Verify & Register
            </button>

            <button 
              type="button" 
              className="btn-secondary"
              onClick={() => setOtpSent(false)}
            >
              Change Details
            </button>
          </form>
        )}

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
