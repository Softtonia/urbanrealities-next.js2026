'use client';

import React from "react";
import styles from "./ProjectDeveloperInfo.module.css";

const ProjectDeveloperInfo = () => {
  return (
    <div className={styles.infocontainer}>
      <h2 className={styles.heading}>About Developer</h2>


        <div className={styles.headerRow}>
          <div>
            <h3 className={styles.name}>Mundeshwari Properties</h3>
            <p className={styles.experience}>Years of Experience - 45</p>
          </div>
          <img
            src="./Urbanrealities-logo.png"
            alt="Urbanrealities Logo"
            className={styles.logo}
          />
        </div>

<div className={`row g-0 ${styles.statsGrid}`}>
  <div className={`col-lg-6 col-md-12 ${styles.statBox} ${styles.borderRight} `}>
    <div className={styles.infoBorder}>
      <p className={styles.label}>Total Projects</p>
      <h6 className={styles.value}>191</h6>
    </div>
  </div>

  <div className={`col-lg-6 col-md-12 ${styles.statBox} `}>
    <div className={styles.infoBorder}>
      <p className={styles.label}>Projects Completed</p>
      <h6 className={styles.value}>65</h6>
    </div>
  </div>

  <div className={`col-lg-6 col-md-12 ${styles.statBox} ${styles.borderRight}`}>
    <div className={`mt-2 ${styles.infoBorder}`}>
      <p className={styles.label}>Projects Ongoing</p>
      <h6 className={styles.value}>2</h6>
    </div>
  </div>

  <div className={`col-lg-6 col-md-12 ${styles.statBox}`}>
    <div className={styles.infoBorder}>
      <p className={styles.label}>Operating in</p>
      <h6 className={styles.value}>
        Chandigarh, New Delhi,<br />Ahmedabad
        <span className={styles.plus}>+20</span>
      </h6>
    </div>
  </div>
</div>


      <div className={styles.description}>
        Mundeshwari Properties brings the Mundeshwari Group philosophy of
        innovation, sustainability, and excellence to the real estate industry.
        Each Godrej Prope... <span className={styles.readMore}>Read More</span>
      </div>

      <div className={styles.buttons}>
        <button className={styles.outlineBtn}>Explore Builder</button>
        <button className={styles.primaryBtn}>Contact Seller</button>
      </div>
    </div>
  );
};

export default ProjectDeveloperInfo;
