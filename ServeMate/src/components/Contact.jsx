import React, { useEffect, useRef, useState } from 'react';
import './Contact.css';

const ContactSection = () => {
  const contactRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', msg: 'Sending...' });

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Thank you! We will contact you shortly.' });
        setFormData({ name: '', phone: '', service: '', message: '' });
      } else {
        setStatus({ type: 'error', msg: data.message || 'Something went wrong.' });
      }
    } catch (error) {
      setStatus({ type: 'error', msg: error });
    }
  };

  return (
    <section id="contact" className="contact-section" ref={contactRef}>
      <div className={`contact-left ${isVisible ? 'show' : ''}`}>
        <h5 className="contact-subtitle">HANDYHUB</h5>
        <h2 className="contact-title">Get in touch with us today</h2>
        <img
          src="https://cdn.prod.website-files.com/673f745ee564f1845c30aac7/674107172918b88019049efd_contact%20image.webp"
          alt="Handyman working"
        />
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input 
          type="text" 
          name="name" 
          placeholder="Your name" 
          value={formData.name}
          onChange={handleChange}
          required 
        />

        <label>Phone Number</label>
        <input 
          type="tel" 
          name="phone" 
          placeholder="Your Phone" 
          value={formData.phone}
          onChange={handleChange}
          required 
        />

        <label>Select Services</label>
        <select 
          name="service" 
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="">Select Services</option>
          <option value="Home Repairs">Home Repairs</option>
          <option value="Decorating Service">Decorating Service</option>
          <option value="Plumbing Services">Plumbing Services</option>
          <option value="Electrical Work">Electrical Work</option>
          <option value="Carpentry Services">Carpentry Services</option>
          <option value="Furniture Assembly">Furniture Assembly</option>
        </select>

        <label>Your Message</label>
        <textarea 
          name="message" 
          placeholder="Your message" 
          value={formData.message}
          onChange={handleChange}
          rows="4" 
          required
        ></textarea>

        <button type="submit" disabled={status.type === 'loading'}>
          {status.type === 'loading' ? 'Sending...' : 'Submit'}
        </button>

        {status.msg && (
          <p className={`status-message ${status.type}`}>
            {status.msg}
          </p>
        )}
      </form>
    </section>
  );
};

export default ContactSection;