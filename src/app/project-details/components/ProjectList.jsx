'use client';

import React from "react";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectList.module.css";

export default function ProjectList({ currentPage, cardsPerPage, totalProperties }) {
  const startIndex = (currentPage - 1) * cardsPerPage;
  const visibleCards = totalProperties.length > 0 ? totalProperties.slice(startIndex, startIndex + cardsPerPage):[];

  return (
    <div className={styles.propertyListContainer}>
      {visibleCards.map((property, index) => (
        <ProjectCard key={startIndex + index} property={property} />
      ))}
    </div>
  );
}

