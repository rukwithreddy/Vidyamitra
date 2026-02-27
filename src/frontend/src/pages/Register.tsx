import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { registerUser } from '../services/apiService';
import { motion } from 'framer-motion';
import { fadeUpVariant } from '../lib/animations';
import '../styles/auth.css';

/**
 * Registration Page Component
 * Handles new user registration with name, email and password
 */
function Register() {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Complete registration
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate inputs
    if (!name || !email || !email.includes('@') || !password) {
      setError('Please fill all fields correctly');
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser(name, email, password);
      if (response.success) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate({ to: '/login' });
        }, 2000);
      } else {
        setError(response.message || 'Registration failed.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div className="auth-card" variants={fadeUpVariant} initial="hidden" animate="visible">
        <div className="auth-header">
          <h1>VidyaMitra</h1>
          <p>AI Career Guidance Platform</p>
        </div>

        <h2>Register</h2>

        <form onSubmit={handleRegister} className="auth-form">
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

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;
