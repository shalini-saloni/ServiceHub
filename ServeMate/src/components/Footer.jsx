import React from "react";
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
              <li>About us</li>
              <li>Services</li>
              <li>Contact</li>
              <li>Hire</li>
            </ul>
          </div>

          <div>
            <h4>Social media</h4>
            <ul>
              <li>Instagram</li>
              <li>YouTube</li>
              <li>Facebook</li>
              <li>X</li>
            </ul>
          </div>

          <div>
            <h4>HandyHub</h4>
            <ul>
              <li>Licensing</li>
              <li>Style Guide</li>
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
