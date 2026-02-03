import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, login } = useAuth();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const handleSignupClick = (e) => {
    e.preventDefault();
    setShowSignup(true);
    setError('');
  };
  
  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowSignup(false);
    setError('');
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(loginEmail, loginPassword);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await signup(signupData);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-page">
      {/* Bubbles */}
      {[...Array(5)].map((_, idx) => (
        <div className="bubbles" key={idx}>
          {[...Array(20)].map((_, i) => (
            <div className="bubble" key={i}></div>
          ))}
        </div>
      ))}
      
      {/* Login or Signup Box */}
      <div className="login-box">
        {error && <div className="error-message">{error}</div>}
        
        {!showSignup ? (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <label>Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required 
              />
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required 
              />
              <br />
              <button 
                type="submit" 
                className="btn-all" 
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            <p className="signup-link" style={{ color: '#cccccc' }}>
              Don't have an account? <a href="#" onClick={handleSignupClick}>Sign up</a>
            </p>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
              <label>Name</label>
              <input 
                type="text" 
                name="name"
                placeholder="Enter your full name" 
                value={signupData.name}
                onChange={handleSignupChange}
                required 
              />
              <label>Email</label>
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                value={signupData.email}
                onChange={handleSignupChange}
                required 
              />
              <label>Phone</label>
              <input 
                type="tel" 
                name="phone"
                placeholder="Enter your phone number" 
                value={signupData.phone}
                onChange={handleSignupChange}
                required 
              />
              <label>Address</label>
              <input 
                type="text" 
                name="address"
                placeholder="Enter your address" 
                value={signupData.address}
                onChange={handleSignupChange}
                required 
              />
              <label>Password</label>
              <input 
                type="password" 
                name="password"
                placeholder="Create a password" 
                value={signupData.password}
                onChange={handleSignupChange}
                required 
              />
              <br />
              <button 
                type="submit" 
                className="btn-all"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>
            <p className="signup-link" style={{ color: '#cccccc' }}>
              Already have an account? <a href="#" onClick={handleLoginClick}>Login</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;