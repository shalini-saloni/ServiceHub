import React from 'react';
import './Contact.css';

const ContactSection = () => {
  return (
    <section className="contact-section">
      <div className="contact-left">
        <h5 className="contact-subtitle">HANDYHUB</h5>
        <h2 className="contact-title">Get in touch with us today</h2>
        <img src="https://cdn.prod.website-files.com/673f745ee564f1845c30aac7/674107172918b88019049efd_contact%20image.webp" alt="Handyman working" />
      </div>

      <form className="contact-form">
        <label>Full Name</label>
        <input type="text" placeholder="Your name" required />
        <label>Phone Number</label>
        <input type="tel" placeholder="Your Phone" required />
        
        <label>Select Services</label>
        <select required>
          <option value="">Select Services</option>
          <option>Home Repairs</option>
          <option>Decorating Service</option>
          <option>Plumbing Services</option>
          <option>Electrical Work</option>
          <option>Carpentry Services</option>
          <option>Furniture Assembly</option>
        </select>
        
        <label>Your Message</label>
        <textarea placeholder="Your message" rows="4" required></textarea>
        
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default ContactSection;
