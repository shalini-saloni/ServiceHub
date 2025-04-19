import React, { useState } from 'react';
import './Reviews.css';

const Reviews = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const reviews = [
    {
      id: 1,
      name: "JOHN SMITH",
      heading: "FANTASTIC WORK!",
      text: "\"I needed a few small repairs done around the house, and Handyhub was fantastic!\"",
      image: "/Images/Pic1.jpg" 
    },
    {
      id: 2,
      name: "LAWKEY NOVA",
      heading: "EXCELLENT WORK!",
      text: "\"The team was knowledgeable, courteous, and completed the job on time and within budget. Our new kitchen looks amazing!\"",
      image: "/Images/Pic2.jpg" 
    },
    {
      id: 3,
      name: "MICHAEL BROWN",
      heading: "HIGHLY RECOMMEND!",
      text: "\"Professional, efficient, and friendly. They made the entire process so smooth and stress-free.\"",
      image: "/Images/Pic3.jpg" 
    },
    {
      id: 4,
      name: "JAMES MILLER",
      heading: "GREAT EXPERIENCE!",
      text: "\"From start to finish, the communication and quality of work were excellent. I'll definitely use their services again.\"",
      image: "/Images/Pic4.jpg" 
    }
  ];

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
            className={`review-card ${Math.abs(index - currentSlide) <= 1 ? 'visible' : ''}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
              opacity: index === currentSlide ? 1 : 0.7
            }}
          >
            <div className="review-image">
              <img src={review.image} alt={`${review.name}'s project`} />
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