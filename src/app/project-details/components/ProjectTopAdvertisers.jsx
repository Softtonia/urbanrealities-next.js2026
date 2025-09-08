'use client';

import React from 'react';
import styles from './ProjectTopAdvertisers.module.css';

const ProjectTopAdvertisers = () => {
  return (
    <div className={styles.Advertisers}>
      <h2 className={styles.heading}>Top Advertisers</h2>

      <div className={styles.borderCard}>

      <div className={styles.advertiserCard}>
        <span className={styles.agentBadge}>AGENT</span>
        <div className={styles.advertiserInfo}>
                    <div>
            <p className={styles.advertiserName}>STAR ESTATE</p>
          </div>
          <div className={styles.rating}>
            <span className={styles.star}>S</span>
            <span className={styles.star}>T</span>
            <span className={styles.star}>A</span>
            <span className={styles.star}>R</span>
            {/* <span className={styles.star}>&#9733;</span> */}
          </div>
        </div>
          <p className={styles.advertiserTagline}>Star Estate</p>
      </div>
      <div>
        <button className={styles.contactButton}>Contact Agent</button>
    </div>
    </div>
    
    </div>
  );
};

export default ProjectTopAdvertisers;