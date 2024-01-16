// Review.js
import React from "react";
import "./Review.css";
import { CiHeart } from "react-icons/ci";

const Review = ({ review, handleLike, handleEditReview }) => {
  const userId = sessionStorage.getItem('userId');
  const isLikedByUser = review.likes.includes(userId);
  const isReviewOwner = userId === review.user._id;  // Check if the user is the owner of the review

  const handleLikeClick = () => {
    handleLike(review._id);
  };

  return (
    <div className="review-container">
      <span className="review-details username">{review.user.username}</span>
      <p className="review-content">{review.content}</p>
      <div className="review-details">
        <span
          className={isLikedByUser ? "heart-icon liked" : "heart-icon"}
          onClick={handleLikeClick}
        >
          <CiHeart size={30} />
        </span>
        <span>{review.likes.length}</span>
      </div>
      {isReviewOwner && (  // Render the "Edit" button only if the user is the owner of the review
        <button className="btn" onClick={() => handleEditReview(review)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default Review;
