"use client";

import React from "react";
import styles from "./TextHeading.module.css";

const TextHeading = ({ subHeroHeading, subHeroText }) => {
  return (
    <div className="">
      <div className={` ${styles.sectionHeader}`}>
        <h2 className={styles.sectionTitle}>{subHeroHeading}</h2>
        <div className={styles.lineGroup}>
          <div className={`${styles.lineBar} ${styles.lineLongRight}`}></div>
          <div className={`${styles.lineBar} ${styles.lineMediumRight}`}></div>
          <div className={`${styles.lineBar} ${styles.lineShortRight}`}></div>
        </div>
      </div>

      <p className={styles.sectionSubtitle}>{subHeroText}</p>
    </div>
  );
};

export default TextHeading;
