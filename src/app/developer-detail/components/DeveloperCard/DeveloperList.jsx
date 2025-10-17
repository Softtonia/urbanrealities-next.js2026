'use client';

import React from "react";
import DeveloperCard from "./DeveloperCard";
import styles from "./DeveloperCard.module.css";

export default function DeveloperList({ currentPage, cardsPerPage, totalProperties }) {
  const startIndex = (currentPage - 1) * cardsPerPage;
  const visibleCards = totalProperties?.slice(startIndex, startIndex + cardsPerPage);

  return (
    <div className={styles.propertyListContainer}>
      {visibleCards?.length>0 && visibleCards.map((project, index) => (
        <DeveloperCard key={startIndex + index} project={project} />
      ))}
    </div>
  );
}

