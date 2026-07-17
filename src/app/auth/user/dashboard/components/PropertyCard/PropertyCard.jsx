"use client";
import React from "react";
import CircularProgressRing from "../ProfileDashboard/CircularProgressRing";
import styles from "./PropertyCard.module.css";

const PropertyCard = ({ count, label, percentage, color }) => {
  return (
    <div className={styles.propertyCard}>
      <div className={styles.Barcontent}>
        <span className={styles.propertyCount}>{count}</span>
        <span className={styles.propertyLabel}>{label}</span>
      </div>
      <div className={styles.progressBar}>
        <CircularProgressRing percentage={percentage} color={color} stroke="6" />
      </div>
    </div>
  );
};

export default PropertyCard;
