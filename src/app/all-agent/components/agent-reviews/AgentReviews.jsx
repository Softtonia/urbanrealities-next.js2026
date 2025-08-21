import React from "react";
import styles from "./AgentReviews.module.css";
import AgentReviewCard from "./AgentReviewCard";
import { LuSlidersHorizontal } from "react-icons/lu";

const reviews = [
  {
    id: 1,
    name: "Lilly Bennett",
    location: "Ernakulam, Kerala",
    rating: 9.5,
    text: "Urbanrealities is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance.",
    avatar: "/lily.png",
  },
  {
    id: 2,
    name: "John Doe",
    location: "Delhi, India",
    rating: 8.7,
    text: "The agent was very helpful and guided us throughout the process.",
    avatar: "/lily.png",
  },
];

const AgentReviews = () => {
  return (
    <div className={styles.reviewsWrapper}>
      {/* Header */}
      <div className={styles.header}>
        <h3>Reviews</h3>
        <button className={styles.sortBtn}><LuSlidersHorizontal/> Sort by</button>
      </div>

      {/* Review Cards */}
      {reviews.map((review) => (
        <AgentReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default AgentReviews;
