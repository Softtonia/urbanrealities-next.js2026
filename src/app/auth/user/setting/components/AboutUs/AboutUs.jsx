"use client";
import React from "react";
import { HiShieldCheck } from "react-icons/hi";
import styles from "./AboutUs.module.css";
import { FaLocationDot } from 'react-icons/fa6';

const AboutUs = ({ profile }) => {
  return (
    <div className={styles.aboutUsSection}>
      <h3 className={styles.aboutUsheading}>About Us</h3>
      {/* {profile?.about && */}
      <div className={styles.bioText}>
        <strong>Bio:-</strong>{profile.about}

        <div className={styles.infoGrid}>
          {/* {[...Array(4)].map((_, i) => (
            <div key={i} className={styles.infoItem}>
              <p className={styles.infoIcon}>
                <HiShieldCheck />
                <span className={styles.infoLabel}>Agency</span>
              </p>
              <span className={styles.infoValue}>Indian Real Estate</span>
            </div>
          ))} */}
          <div className={styles.infoItem}>
            <p className={styles.infoIcon}>
              <FaLocationDot />
              <span className={styles.infoLabel}>
                {[
                  profile?.area_locality,
                  profile?.colony,
                  profile?.city,
                  profile?.state,
                  profile?.country
                ]
                  .filter((v) => v && v !== "N/A") // remove empty or N/A values
                  .join(", ")}
              </span>

            </p>
            {/* <span className={styles.infoValue}>Indian Real Estate</span> */}
          </div>

        </div>
      </div>
      {/* } */}
    </div>
  );
};

export default AboutUs;
