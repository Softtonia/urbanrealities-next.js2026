// components/AgentCard/AgentCard.js
'use client';

import React from "react";
import styles from "./CompanyAgent.module.css";
import { FaMapMarkerAlt } from "react-icons/fa"; // Location icon ke liye

export default function CompanyAgent() {
  return (
    <div className={styles.agentCard}>
      {/* Top Section */}
      <div className={styles.header}>
          <div className={styles.profileImageContainer}>
            <div className="">
            <img src="/top-agent.png" alt="Akash Sharma" className={styles.profileImage} /></div> 
            <div className="">
            <img src="/wason-properties.png" alt="Wason Properties" className={styles.companyLogo} /></div>
          </div>
        <div className={styles.infowraper}>
        <div className={styles.infocontent}>
          <div className={styles.info}>
            <h3 className={styles.name}>Akash Sharma</h3>
            <p className={styles.location}>
              <FaMapMarkerAlt className={styles.locationIcon} /> Tumakuru, Karnataka
            </p>
          </div>
        <div className={styles.preferredAgent}>
          <img src="/prefered.png" alt="Preferred Agent" className={styles.badgeImage} /> 
          {/* <p className={styles.badgeText}>Trusted by <br /> Many Users</p> */}
        </div>
</div>

      {/* Stats Section */}
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>1</span>
          <p className={styles.statLabel}>Properties For Sale</p>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>33</span>
          <p className={styles.statLabel}>Properties For Rent</p>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>33</span>
          <p className={styles.statLabel}>Deals Closed</p>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>2</span>
          <p className={styles.statLabel}>Team Members</p>
        </div>
      </div>
</div>
      </div>

      {/* About Agent Section */}
      <div className={styles.aboutSection}>
        <div className={styles.aboutContent}>
        <h4 className={styles.aboutTitle}>About Agent</h4>
          <p className={styles.description}>
            Wason Properties in South Delhi - Greater Kailash 2 is a top Player in the category of Real Estate A... <span className={styles.readMore}>More</span>
          </p>
        </div>
          <div className={styles.buttons}>
            <button className={styles.callBackButton}>Request a Call Back</button>
            <button className={styles.visitPropertyButton}>Visit Property</button>
          </div>
      </div>
    </div>
  );
}