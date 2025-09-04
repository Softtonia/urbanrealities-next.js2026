'use client';

import React from "react";
import SingleCard from "./SingleCard";
import styles from "./SingleCard.module.css";

export default function ProjectList({ currentPage, cardsPerPage, totalProperties }) {
  const startIndex = (currentPage - 1) * cardsPerPage;
  const visibleCards = totalProperties.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div className={styles.propertyListContainer}>
      {visibleCards.map((_, index) => (
        <SingleCard key={startIndex + index} />
      ))}
    </div>
  );
}

