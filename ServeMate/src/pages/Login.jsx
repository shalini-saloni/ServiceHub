import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [showSignup, setShowSignup] = useState(false); 

  const handleSignupClick = (e) => {
    e.preventDefault();
    setShowSignup(true);
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    setShowSignup(false);
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
        {!showSignup ? (
          <>
            <h2>Login</h2>
            <form>
              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />

              <label>Password</label>
              <input type="password" placeholder="Enter your password" required />
              <br />
              <button type="submit" className="btn-all">Login</button>
            </form>
            <p className="signup-link" style={{ color: '#cccccc' }}>
              Don't have an account? <a href="#" onClick={handleSignupClick}>Sign up</a>
            </p>
          </>
        ) : (
          <>
            <h2>Sign Up</h2>
            <form>
              <label>Name</label>
              <input type="text" placeholder="Enter your full name" required />

              <label>Email</label>
              <input type="email" placeholder="Enter your email" required />

              <label>Phone</label>
              <input type="tel" placeholder="Enter your phone number" required />

              <label>Address</label>
              <input type="text" placeholder="Enter your address" required />

              <label>Password</label>
              <input type="password" placeholder="Create a password" required />
              <br />
              <button type="submit" className="btn-all">Sign Up</button>
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
