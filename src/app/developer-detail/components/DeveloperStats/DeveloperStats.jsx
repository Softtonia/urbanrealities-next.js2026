'use client'
import React from "react";
import styles from "./DeveloperStats.module.css";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useDeveloper } from "../../context/DeveloperContext";

const projectsData = [
  { number: "3+", label: "Total Project" },
  { number: "1+", label: "Ready to Move Projects" },
  { number: "2+", label: "Under Construction" },
];

const DeveloperStats = () => {
  const developer = useDeveloper();
  console.log("Developer in Stats:", developer);

  return (
    <div className={styles.statssection}>
      <div className={styles.header}>
        <div className={styles.title}>About {developer?.name}</div>
        <div className={styles.description}
          dangerouslySetInnerHTML={{ __html: developer?.description }}
        >
        </div>
      </div>

      <div className={styles.subtitle}>All Project </div>
      <div className={styles.stats}>
        {projectsData.map((project, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statNumber}>{project.number}</div>
            <div className={styles.statLabel}>
              {project.label} <MdOutlineArrowOutward className={styles.arrow} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperStats;
