"use client";
import React from "react";
import { IoFolder, IoDocumentsSharp } from "react-icons/io5";
import { BsImages } from "react-icons/bs";
import styles from "./FilesSection.module.css";

const files = [
  { label: "My Folders", date: "24 Apr,2024", icon: IoFolder, bg: "folderdiv" },
  { label: "Gallery", date: "24 Apr,2024", icon: BsImages, bg: "gallerydiv" },
  { label: "Documents", date: "24 Apr,2024", icon: IoDocumentsSharp, bg: "documentdiv" },
];

const FilesSection = () => {
  return (
    <div className={styles.section}>
      <h4 className={styles.sectionTitle}>My Files</h4>
      <div className={styles.filesGrid}>
        {files.map((file, i) => {
          const Icon = file.icon;
          return (
            <div key={i} className={styles.fileItem}>
              <div className={styles[file.bg]}>
                <Icon className={styles.fileIcon} />
              </div>
              <div>
                <p className={styles.fileLabel}>{file.label}</p>
                <span className={styles.fileDate}>Create on {file.date}</span>
              </div>
            </div>
          );
        })}
        <div className={`${styles.fileItem} ${styles.createButtonContainer}`}>
          <button className={styles.createButton}>Create New Files</button>
        </div>
      </div>
    </div>
  );
};

export default FilesSection;
