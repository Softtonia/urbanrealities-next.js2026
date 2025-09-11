"use client";
import React from "react";
import { HiShieldCheck } from "react-icons/hi";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <div className={styles.aboutUsSection}>
      <h3 className={styles.aboutUsheading}>About Us</h3>
      <div className={styles.bioText}>
        <strong>Bio:-</strong> Cumsan at ultricies a, laoreet eu tellus.
        Etiam porttitor, sem non feugiat pharetra, libero risus dictum lacus,
        eget sollicitudin est enim id libero. Nullam eget dolor accumsan, semper
        odio quis, iaculis leo. Vivamus vitae congue est. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        Nam diam mi, congue vel suscipit a, convallis vitae metus. Duis
        condimentum lacus vel libero dignissi
        <div className={styles.infoGrid}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.infoItem}>
              <p className={styles.infoIcon}>
                <HiShieldCheck />
                <span className={styles.infoLabel}>Agency</span>
              </p>
              <span className={styles.infoValue}>Indian Real Estate</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
