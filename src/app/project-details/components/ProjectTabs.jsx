'use client';
import React, { useEffect, useState } from 'react';
import styles from './ProjectTabs.module.css';
import { useProject } from '../context/ProjectContext';

const multiTabs = [
  "Overview",
  "Properties",
  "Top Advertiser",
  "Floor Plan & Unit",
  "Project Details",
  // "Property Rate",
  "About Developer",
  "FAQ",
  "Near By Project",
  "Others Project"
];

const ProjectTabs = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { section } = useProject();
  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map((tab) =>
        document.getElementById(tab.toLowerCase().replace(/\s+/g, "-"))
      );

      let currentSection = activeTab;

      sections.forEach((section) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = section.id;
          }
        }
      });

      if (currentSection !== activeTab) {
        setActiveTab(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab]);

  const tabs= multiTabs.filter(tab => section[tab]);

  return (
    <div className={styles.tabContainer}>
      <div className={`${styles["tab-crum"]} container`}>
        {tabs.map((tab, index) => {
          const sectionId = tab.toLowerCase().replace(/\s+/g, "-");
          return (
            <a
              key={index}
              href={`#${sectionId}`}
              className={`${styles.tabItem} body-text-rg16 ${activeTab === sectionId ? styles.active : ""
                }`}
            >
              {tab}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectTabs;
