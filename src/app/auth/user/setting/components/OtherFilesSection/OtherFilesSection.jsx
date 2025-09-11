"use client";
import React from "react";
import { IoFolder } from "react-icons/io5";
import { FiMoreVertical } from "react-icons/fi";
import styles from "./OtherFilesSection.module.css";

const OtherFilesSection = () => {
  return (
    <div className={styles.section}>
      <h4 className={styles.sectionTitle}>Other Files</h4>
      <div className={styles.otherFilesGrid}>
        {[...Array(15)].map((_, index) => (
          <div key={index} className={styles.otherFileItem}>
            <div className={styles.otherFileIcon}><IoFolder /></div>
            <span className={styles.otherFileLabel}>Folder</span>
            <div className={styles.folderIcon}><FiMoreVertical /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherFilesSection;
