import React, { useState, useEffect } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState([]);
  
  const reviews = [
    {
      id: 1,
      name: "Krushn Dayshmookh",
      heading: "FANTASTIC WORK!",
      text: "\"I needed a few small repairs done around the house, and Handyhub was fantastic!\"",
      image: "/Images/pic1.jpeg" 
    },
    {
      id: 2,
      name: "Abhinav",
      heading: "EXCELLENT WORK!",
      text: "\"The team was knowledgeable, courteous, and completed the job on time and within budget. Our new kitchen looks amazing!\"",
      image: "/Images/pic2.jpeg" 
    },
    {
      id: 3,
      name: "Rishabh Bafna",
      heading: "HIGHLY RECOMMEND!",
      text: "\"Professional, efficient, and friendly. They made the entire process so smooth and stress-free.\"",
      image: "/Images/pic3.jpeg" 
    },
    {
      id: 4,
      name: "Sahil Manjhi",
      heading: "GREAT EXPERIENCE!",
      text: "\"From start to finish, the communication and quality of work were excellent. I'll definitely use their services again.\"",
      image: "/Images/pic4.jpeg" 
    },
    {
        id: 5,
        name: "Arohi",
        heading: "IMPRESSIVE SERVICE!",
        text: "\"Handyhub transformed our bathroom beautifully. The attention to detail was remarkable and the team was so professional.\"",
        image: "/Images/pic5.jpeg" 
      },
      {
        id: 6,
        name: "Sarika Jadhav",
        heading: "TOP-NOTCH QUALITY!",
        text: "\"The electrician they sent was incredibly skilled. Fixed issues others couldn't. Pricing was fair and transparent.\"",
        image: "/Images/pic6.jpeg" 
      },
      {
        id: 7,
        name: "Khyati Kapil",
        heading: "BEYOND EXPECTATIONS!",
        text: "\"Our home renovation was completed ahead of schedule. The craftsmanship is exceptional - worth every penny!\"",
        image: "/Images/pic7.jpeg" 
      },
      {
        id: 8,
        name: "Shubhi",
        heading: "RELIABLE & TRUSTWORTHY!",
        text: "\"Used Handyhub for multiple projects. Consistent quality every time. My go-to for all home improvement needs.\"",
        image: "/Images/pic8.jpeg" 
      },
      {
        id: 9,
        name: "Priyanshu",
        heading: "WONDERFUL EXPERIENCE!",
        text: "\"The painters did an amazing job on our entire house. Clean, efficient, and the colors are perfect!\"",
        image: "/Images/pic9.jpeg" 
      }
  ];

  useEffect(() => {
    const loadImages = reviews.map(review => {
      const img = new Image();
      img.src = review.image;
      return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
      });
    });

    Promise.all(loadImages).then(results => {
      setLoadedImages(results);
    });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  return (
    <div className='review-page'>
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="handyhub-label">HANDYHUB</h2>
          <h1 className="reviews-title">What our customers are saying</h1>
        </div>

        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className={`review-card ${index === currentSlide ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - currentSlide) * 120}%)`,
              }}
            >
              <div className="review-image">
                <img 
                  src={review.image} 
                  alt={`${review.name}'s project`} 
                  className={index === currentSlide ? 'active-image' : ''}
                  loading={loadedImages[index] ? 'eager' : 'lazy'}
                />
              </div>
              <div className="review-content">
                <h3 className="review-heading">{review.heading}</h3>
                <p className="review-text">{review.text}</p>
                <p className="review-author">{review.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-navigation">
          <button className="nav-button prev" onClick={prevSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="nav-button next" onClick={nextSlide}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;