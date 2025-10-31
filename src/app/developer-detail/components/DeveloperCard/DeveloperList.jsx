'use client';

import React from "react";
import DeveloperCard from "./DeveloperCard";
import styles from "./DeveloperCard.module.css";

export default function DeveloperList({  totalProperties }) {
  

  return (
    <div className={styles.propertyListContainer}>
      {totalProperties?.length>0 && totalProperties.map((project, index) => (
        <DeveloperCard key={index} project={project} />
      ))}
    </div>
  );
}

