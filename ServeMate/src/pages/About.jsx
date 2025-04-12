import React, { useState } from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import { FiPlus, FiMinus } from 'react-icons/fi';
import OurStoryImage from '../images/Story.jpeg';
import Contact from "../components/Contact"
import Footer from '../components/Footer';


const features = [
  {
    title: <span><span style={{fontSize: '2rem'}}>🔍  </span> TRANSPARENT PRICING</span>,
    description: 'No hidden fees, no surprises—just clear, honest pricing. We provide upfront estimates for all of our services.',
  },
  {
    title:(<span>
        <span style={{
          fontSize: '2em',      
          display: 'inline-block',
          verticalAlign: 'middle',
          marginRight: '8px'      
        }}>🛠️</span>
        EXPERIENCED AND SKILLED TEAM
      </span>),
    description: 'Our team of highly trained professionals brings years of experience in a wide range of handyman services.',
  },
  {
    title: (
        <span>
          <span style={{
            fontSize: '2em',
            display: 'inline-block',
            verticalAlign: 'middle',
            marginRight: '8px',
            filter: 'grayscale(100%) contrast(80%)' // Ensures B/W
          }}>🤝</span>
          RELIABLE AND TRUSTWORTHY
        </span>
      ),
    description: 'We know how important it is to trust the people working in your home.',
  },
  {
    title: (
        <span>
          <span style={{
            fontSize: '2em',
            display: 'inline-block',
            verticalAlign: 'middle',
            marginRight: '10px',
            filter: 'grayscale(100%) contrast(50%)'
          }}>💡</span>
          CUSTOMER-FOCUSED APPROACH
        </span>
      ),
    description: 'Your needs and satisfaction are at the center of everything we do.',
  },
];

const About = () => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleIndex = (index) => {
    setOpenIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <div>
      {/* === Hero Video Section === */}
      <div className="about-page">
        <video className="background-video" autoPlay loop muted>
          <source src="/videos/Video_about.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="overlay-content">
          <h4>HANDYHUB</h4>
          <h1>Build relationships, <br />one home at a time</h1>
          <p>
            At HandyHub, we believe every home deserves the best care. <br />
            With quality workmanship and exceptional service, we've been <br />
            proudly serving communities for over 10 years.
          </p>
          <a href="#about-contact" className="btn">Contact Us</a>

          <div className="about-stats">
            <div><strong>10y</strong><span>EXPERIENCE</span></div>
            <div><strong>100+</strong><span>TEAM MEMBERS</span></div>
            <div><strong>1k</strong><span>PROJECTS</span></div>
          </div>
        </div>
      </div>

      {/* === Why Choose Us Section === */}
      <section className="why-choose-us">
        <h4>HANDYHUB</h4>
        <h2>Why Choose Us?</h2>
        <p>
          Ready to tackle your home improvement projects? Whether you need a quick fix,a renovation, or regular maintenance, HandyHub is here to help.
        </p>

        <div className="cards-grid">
          {features.map((item, index) => (
            <div key={index} className={`card ${openIndices.includes(index) ? 'active' : ''}`}>
              <div
                className="card-header"
                onClick={() => toggleIndex(index)}
                aria-expanded={openIndices.includes(index)}
                aria-controls={`desc-${index}`}
              >
                <div className="title-wrapper">
                  <span className="decorative-line"></span>
                  <strong>{item.title}</strong>
                </div>
                <button 
                  className="toggle-button"
                  aria-label={`Toggle ${item.title} description`}
                >
                  {openIndices.includes(index) ? <FiMinus /> : <FiPlus />}
                </button>
              </div>
              {openIndices.includes(index) && (
                <div className="card-description" id={`desc-${index}`}>
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
        <div className="our-story-section">
            <div className="story-content">
            <div className="story-image">
            <img src={OurStoryImage} alt="Handyman at work" />
        </div>
        <div className="story-text">
            <h5>HANDYHUB</h5>
            <h2>Our story</h2>
            <p>
                Started with a passion for helping homeowners tackle their to-do lists.
                Over the years, we’ve grown into a trusted local business that
                countless clients rely on for their home repair and improvement needs.
            </p>

        <div className="story-feature">
            <span className="story-icon"></span>
        <div>
          <strong>✨ OUR MISSION</strong>
          <p>
            Our mission is simple: to provide top-quality handyman services that make
            your life easier and your home more beautiful.
          </p>
        </div>
      </div>

      <div className="story-feature">
        <span className="story-icon"></span>
        <div>
          <strong>✨ OUR VALUES</strong>
          <p>
            Honesty and transparency guide everything we do, from how we
            communicate with our clients to the way we carry out our work.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
        <div id="about-contact">
            <Contact /> 
        </div>
          <Footer/>

    </div>


    
  );
};

export default About;