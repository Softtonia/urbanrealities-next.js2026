'use client';
import React, { useEffect, useState, useRef } from 'react';
import styles from './ProjectTabs.module.css';
import { useProject } from '../context/ProjectContext';

const multiTabs = [
  "Overview",
  "Properties",
  "Top Advertiser",
  "Floor Plan & Unit",
  "Project Details",
  "About Developer",
  "FAQ",
  "Near By Project",
  "Other Project"
];

const ProjectTabs = () => {
  const { section } = useProject();
  const tabs = multiTabs.filter(tab => section[tab]);

  const [activeTab, setActiveTab] = useState(tabs[0] ? tabs[0].toLowerCase().replace(/\s+/g, "-") : "");

  const sectionRefs = useRef({});

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px', // adjust offset for sticky header
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    tabs.forEach(tab => {
      const sectionId = tab.toLowerCase().replace(/\s+/g, "-");
      const el = document.getElementById(sectionId);
      if (el) {
        sectionRefs.current[sectionId] = el;
        observer.observe(el);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach(el => observer.unobserve(el));
    };
  }, [tabs]);

  return (
    <div className={styles.tabContainer}>
      <div className={`${styles["tab-crum"]} container`}>
        {tabs.map((tab, index) => {
          const sectionId = tab.toLowerCase().replace(/\s+/g, "-");
          return (
            <a
              key={index}
              href={`#${sectionId}`}
              className={`${styles.tabItem} body-text-rg16 ${activeTab === sectionId ? styles.active : ""}`}
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
