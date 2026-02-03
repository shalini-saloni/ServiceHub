import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Services.css';
import Reviews from "./Reviews";
import Contact from "../components/Contact";
import Footer from '../components/Footer';
import homeRepairsImg from '../images/homeRepair.jpg';
import decoratingImg from '../images/painting.jpg';
import plumbingImg from '../images/plumber.jpg';
import electricalImg from '../images/Electrician.jpeg';
import carpentryImg from '../images/Carpenter.jpeg';
import furnitureImg from '../images/furniture.jpeg';

const serviceData = [
  {
    id: 1,
    title: 'Home Repairs',
    description: 'From fixing leaky faucets and squeaky doors to patching walls and repairing broken fixtures, our home repair services cover a wide range of common problems.',
    imageUrl: homeRepairsImg
  },
  {
    id: 2,
    title: 'Decorating Service',
    description: 'Whether it’s refreshing a single room or revamping your entire home, our decorating services bring your vision to life.',
    imageUrl: decoratingImg
  },
  {
    id: 3,
    title: 'Plumbing Services',
    description: 'From dripping taps and blocked drains to full pipe installations, our professional plumbers handle it all with precision and care.',
    imageUrl: plumbingImg
  },
  {
    id: 4,
    title: 'Electrical Work',
    description: 'From installing new lighting and ceiling fans to fixing faulty wiring, our licensed electricians handle every task with safety.',
    imageUrl: electricalImg
  },
  {
    id: 5,
    title: 'Carpentry Services',
    description: "From installing doors and windows to custom cabinets and repairs, our carpentry services combine skill and quality.",
    imageUrl: carpentryImg
  },
  {
    id: 6,
    title: 'Furniture Assembly',
    description: 'Skip the confusion of manuals — our experts assemble beds, tables, shelves, and more quickly and securely.',
    imageUrl: furnitureImg
  }
];

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (!isPaused) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % serviceData.length);
      }, 3000); 
      return () => clearInterval(slideInterval);
    }
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % serviceData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + serviceData.length) % serviceData.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="services-container">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-content">
          <p className="services-tag">HANDYHUB</p>
          <h1>Expert handyman<br />services for every need</h1>
          <p className="services-subtext">Fast, reliable, and affordable home maintenance solutions</p>
            <button
                className="services-btn"
                onClick={() => document.getElementById('service-contact')?.scrollIntoView({ behavior: 'smooth' })}
            >Contact Us</button>
        </div>
      </section>

      {/* Services Carousel Section */}
      <section className="services-carousel-section">
        <h2 className="carousel-title">Our Services</h2>
        
        <div 
          className="carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="carousel-slides">
            {serviceData.map((service, index) => (
              <div 
                key={service.id} 
                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                style={{ transform: `translateX(${100 * (index - currentSlide)}%)` }}
              >
                <div className="slide-image-container">
                  <img src={service.imageUrl} alt={service.title} className="slide-image" />
                </div>
                <div className="slide-content">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <button 
                    className="service-details-btn"
                    onClick={() => navigate('/hire')}
                  >
                    Hire
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-btn prev" onClick={prevSlide}>❮</button>
          <button className="carousel-btn next" onClick={nextSlide}>❯</button>
          
          <div className="carousel-dots">
            {serviceData.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              ></span>
            ))}
          </div>
        </div>
      </section>

      <Reviews />
      
      <div id="service-contact">
        <Contact /> 
      </div>
      
      <Footer />
    </div>
  );
};

export default Services;