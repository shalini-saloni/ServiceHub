import React, { useEffect, useState } from 'react';
import './Services.css';
import Reviews from "./Reviews"
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
    description: 'From fixing leaky faucets and squeaky doors to patching walls and repairing broken fixtures, our home repair services cover a wide range of common problems. Our skilled handymen ensure quick turnarounds and quality work so your home stays safe, functional, and comfortable.',
    imageUrl: homeRepairsImg
  },
  {
    id: 2,
    title: 'Decorating Service',
    description: 'Whether it’s refreshing a single room or revamping your entire home, our decorating services bring your vision to life. From wall treatments and color coordination to lighting, art, and accent styling — we blend creativity with functionality to create interiors that reflect your taste and elevate your everyday living.',
    imageUrl: decoratingImg
  },
  {
    id: 3,
    title: 'Plumbing Services',
    description: 'From dripping taps and blocked drains to full pipe installations, our professional plumbers handle it all with precision and care. We provide quick, clean, and reliable plumbing services to keep your water systems running smoothly and your home stress-free.',
    imageUrl: plumbingImg
  },
  {
    id: 4,
    title: 'Electrical Work',
    description: 'From installing new lighting and ceiling fans to fixing faulty wiring and switchboards, our licensed electricians handle every task with safety and precision. We ensure your home stays powered, protected, and up to code — with minimal disruption and maximum peace of mind.',
    imageUrl:electricalImg
  },
  {
    id: 5,
    title: 'Carpentry Services',
    description: "From installing doors and windows to custom cabinets, shelves, and repairs, our carpentry services combine skill and quality materials to enhance your home’s functionality and style. Whether it's a small fix or a full build, we deliver durable, elegant results.",
    imageUrl: carpentryImg
  },
  {
    id: 6,
    title: 'Furniture Assembly',
    description: 'Skip the confusion of manuals and missing screws — our experts assemble beds, tables, shelves, and more quickly and securely. We handle all types of flat-pack and ready-to-assemble furniture, so you can enjoy your new pieces without the stress or the mess.',
    imageUrl: furnitureImg
  }
];

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  
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
          <button className="services-btn">Contact Us</button>
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
                  <button className="service-details-btn">Hire</button>
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
      <Reviews/>
    </div>
  );
};

export default Services;