import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import './Home.css';
import workerImg from '../images/cooking.jpeg';
import { Hammer, Paintbrush, Wrench, Zap, Ruler, Package } from 'lucide-react';
import ContactSection from '../components/Contact';
import Footer from '../components/Footer';

const services = [
  {
    icon: <Hammer size={24} />,
    title: 'Home Repairs',
    desc: 'From fixing leaky faucets to repairing drywall, our home repair services cover all those pesky issues that can arise in your home.',
  },
  {
    icon: <Paintbrush size={24} />,
    title: 'Decorating Service',
    desc: 'Transform your space with a fresh coat of paint or a new color scheme. Our painting services revitalize your interior and exterior.',
  },
  {
    icon: <Wrench size={24} />,
    title: 'Plumbing Services',
    desc: 'Need a new installation or a quick repair? Our plumbing services keep your home’s water systems running smoothly.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Electrical Work',
    desc: 'Ensure your home’s electrical systems are safe and efficient with our expert services from repairs to installations.',
  },
  {
    icon: <Ruler size={24} />,
    title: 'Carpentry Services',
    desc: 'Our skilled carpenters bring craftsmanship and detail to every project — from custom work to repairs.',
  },
  {
    icon: <Package size={24} />,
    title: 'Furniture Assembly',
    desc: 'Bought new furniture? Let us handle the assembly quickly and correctly so you can enjoy it hassle-free.',
  }
];

const Home = () => {
  const contactRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#contact' && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  const scrollToContact = () => {
    if (contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* --- HERO SECTION --- */}
      <section className="hero">
        <div className="hero-content">
          <h4 style={{ margin: "1rem 7rem" }}>HANDYHUB</h4>
          <h1>Your trusted partner for home maintenance</h1>
          <p>
            From fixing leaks to full maintenance, our trusted professionals
            ensure your home is always in top shape.
          </p>
          {/* Update Button to Trigger Scroll */}
          <button onClick={scrollToContact} className="view-all-btn" style={{ margin: "1rem 7rem" }}>
            Contact Us
          </button>

          <div className="stats" style={{ margin: "1rem 7rem" }}>
            <div>
              <strong>10y</strong>
              <span>Experience</span>
            </div>
            <div>
              <strong>100+</strong>
              <span>Team Members</span>
            </div>
            <div>
              <strong>1k</strong>
              <span>Projects</span>
            </div>
          </div>
        </div>

        <div className="hero-img">
          <img src={workerImg} alt="A professional worker cooking" />
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="home-wrapper">
        <div className="home-container">
          <h4 className="section-subtitle">HANDYHUB</h4>
          <h2 className="section-title">Quality handyman solutions</h2>
          <p className="section-desc">
            At Handyhub, we offer a comprehensive range of handyman services to keep your home in top condition. Whether it’s a minor repair or a major project, our skilled team is here to help.
          </p>

          <div className="services-grid">
            {services.map((service, idx) => (
              <div className="service-card" key={idx}>
                <div className="icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <RouterLink to="/services" className="learn-more">Learn More →</RouterLink>
              </div>
            ))}
          </div>

          <div className="view-all-wrapper">
            <RouterLink to="/services" className="btn">View All Services</RouterLink>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <div id="contact" ref={contactRef}>
        <ContactSection />
      </div>

      <Footer />
    </>
  );
};

export default Home;
