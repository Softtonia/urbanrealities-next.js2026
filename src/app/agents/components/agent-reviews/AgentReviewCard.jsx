import React from "react";
import styles from "./AgentReviews.module.css";
import { FaStar } from "react-icons/fa";

const AgentReviewCard = ({ review }) => {
  return (
    <div className={styles.reviewCard}>
    <div className={styles.reviewimage}>
      {/* Avatar */}
      <img
        src={review.avatar || "/default-avatar.png"}
        alt={review.name}
        className={styles.avatar}
      />

      {/* Right Side Content */}
      <div className={styles.reviewContent}>
        {/* Name + Location */}
        <h4 className={styles.reviewerName}>{review.name}</h4>
        <span className={styles.location}>{review.location}</span>

        {/* Rating */}
        <div className={styles.ratingRow}>
          <span className={styles.ratingValue}>{review.rating}</span>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`${styles.starIcon} ${
                i < Math.round(review.rating / 2) ? styles.filledStar : ""
              }`}
            />
          ))}
        </div>
</div>
        {/* Review Text */}
      </div>
        <p className={styles.reviewText}>"{review.text}"</p>
    </div>
  );
};

export default AgentReviewCard;
