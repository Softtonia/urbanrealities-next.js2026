import React from "react";
import PropertyCard from "./PropertyCard";
import styles from "./PropertyList.module.css";

export default function PropertyList({ currentPage, cardsPerPage, totalProperties }) {
  const startIndex = (currentPage - 1) * cardsPerPage;
  const visibleCards = totalProperties.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div className={styles.propertyListContainer}>
      {visibleCards.map((_, index) => (
        <PropertyCard key={startIndex + index} />
      ))}
    </div>
  );
}

