// src/pages/Services.jsx
import React, { useState } from 'react';
import './Services.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const videoList = [
  '/videos/cleaning.mp4',
  '/videos/cooking.mp4',
  '/videos/repair.mp4',
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < videoList.length - 1 ? prev + 1 : prev));
  };

  return (
    <div className="services-page">
      <h1>Home services at your doorstep</h1>

      <div className="single-video-wrapper">
        <button className="arrow-button" onClick={handlePrev} disabled={currentIndex === 0}>
          <ChevronLeft size={28} />
        </button>

        <video
          key={videoList[currentIndex]} // 🔑 Important for refreshing
          className="single-video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoList[currentIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <button
          className="arrow-button"
          onClick={handleNext}
          disabled={currentIndex === videoList.length - 1}
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

export default Services;
