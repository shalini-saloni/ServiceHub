import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
      </div>
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
      </div>
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
      </div>
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
      </div>
      <div className="bubbles">
        {[...Array(20)].map((_, i) => (
          <div className="bubble" key={i}></div>
        ))}
      </div>

      <div className="login-box">

        <h2>Login</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Password</label>
          <input type="password" placeholder="Enter your password" required />
            <br></br>
          <button type="submit" className="btn-all">Login</button>
        </form>
        <p className="signup-link" style={{color:'#cccccc'}}>Don't have an account? <a href="#">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
