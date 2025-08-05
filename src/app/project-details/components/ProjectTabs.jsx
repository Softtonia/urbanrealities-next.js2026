'use client';
import React from 'react';
import styles from './ProjectTabs.module.css';

const tabs = [
  "About Project",
  "Properties",
  "Top Advertiser",
  "Floor Plan & Unit",
  "Project Details",
  "Property Rate",
  "About Developer",
  "Near By Project",
  "Others Project",
  "Others Project"
];

const ProjectTabs = () => {
  return (
        <div className={styles.tabContainer}>
<div className={`${styles["tab-crum"]} container`}>
      {tabs.map((tab, index) => (
        <a
          key={index}
          href={`#${tab.toLowerCase().replace(/\s+/g, '-')}`}
          className={`${styles.tabItem} body-text-rg16 ${index === 0 ? styles.active : ''}`}
        >
          {tab}
        </a>
      ))}
    </div>
    </div>
  );
};

export default ProjectTabs;
