'use client';
import React, { useEffect, useState, useRef, useMemo } from 'react';
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

  // ✅ tabs recalculated whenever `section` changes
  const tabs = useMemo(
    () => multiTabs.filter(tab => section?.[tab]),
    [section]
  );

  const [activeTab, setActiveTab] = useState("");

  const sectionRefs = useRef({});

  // ✅ Set first tab on change
  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].toLowerCase().replace(/\s+/g, "-"));
    }
  }, [tabs]);
  
  console.log(tabs,section)

  useEffect(() => {
    if (!tabs.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '-150px 0px -70% 0px',
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

    // ✅ Stop previous observers before adding new
    Object.values(sectionRefs.current).forEach(el => observer.unobserve(el));
    sectionRefs.current = {};

    // ✅ Re-observe based on new tabs list
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
