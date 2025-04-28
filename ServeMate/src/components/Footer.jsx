import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-logo">🛠️  HandyHub</div>
          <p className="footer-desc">
            We offer a wide range of handyman services to meet all your needs,
            from minor fixes to major renovations.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <h4>Extra links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/#contact">Contact</Link></li>
              <li><Link to="/hire">Hire</Link></li>
            </ul>
          </div>

          <div>
            <h4>Social media</h4>
            <ul>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer">YouTube</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">X</a></li>
            </ul>
          </div>

          <div>
            <h4>HandyHub</h4>
            <ul>
              <li><Link to="/licensing">Licensing</Link></li>
              <li><Link to="/style-guide">Style Guide</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Powered by HandyHub</p>
        <p>©2024 All rights reserved.</p>
      </div>

      <div className="footer-shape"></div>
    </footer>
  );
};

export default Footer;
