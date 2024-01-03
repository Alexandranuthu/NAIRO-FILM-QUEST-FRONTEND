import React from 'react';
import './Rating.css';

const Rating = ({ rating }) => {
    const { rating: ratingValue } = rating;

    // Calculate the percentage for conic gradient
  const percentage = (ratingValue / 10) * 100;

  // Use conic gradient to fill the circle
  const circleStyle = {
    background: `conic-gradient(#FFD700 ${percentage}%, transparent ${percentage}% 100%)`,
  };
  return (
    <div className="circular-rating" style={circleStyle}>
      <span className="rating-value">{ratingValue}</span>
    </div>
  );
};

export default Rating;
