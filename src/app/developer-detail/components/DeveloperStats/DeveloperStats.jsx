import React from "react";
import styles from "./DeveloperStats.module.css";
import { MdOutlineArrowOutward } from "react-icons/md";

const projectsData = [
  { number: "3+", label: "Total Project" },
  { number: "1+", label: "Ready to Move Projects" },
  { number: "2+", label: "Under Construction" },
];

const DeveloperStats = () => {
  return (
    <div className={styles.statssection}>
      <div className={styles.header}>
        <div className={styles.title}>About DLF Builder/Developer</div>
        <div className={styles.description}>
          Exclusive housing welcomes the ultra modern families to come and
          experience the life changing space where it brings high rising towers
          to capture the city’s bigger and uninterrupted view from the balcony.
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
