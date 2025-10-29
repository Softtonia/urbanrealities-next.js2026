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
    rootMargin: "-150px 0px -50% 0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveTab(entry.target.id);
      }
    });
  }, observerOptions);

  tabs.forEach(tab => {
    const sectionId = tab.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(sectionId);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, [tabs]);
useEffect(() => {
  if (!tabs.length) return;

  const observerOptions = {
    root: null,
    rootMargin: "-150px 0px -50% 0px",
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveTab(entry.target.id);
      }
    });
  }, observerOptions);

  tabs.forEach(tab => {
    const sectionId = tab.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(sectionId);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
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
