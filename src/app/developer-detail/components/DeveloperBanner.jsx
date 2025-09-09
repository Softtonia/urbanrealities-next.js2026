"use client";
import React from "react";
import { useDeveloper } from "../context/DeveloperContext";
import styles from "./DeveloperBanner.module.css";

const DeveloperBanner = () => {
  const project = useDeveloper();

  // ✅ Extract RERA number safely
  const reraNumber = project?.repeater_fields?.find(
    (val) => val.template?.name === "developer.rera-number"
  )?.field_value;
  const experience = project?.repeater_fields?.find(
    (val) => val.template?.name === "developer.experience"
  )?.field_value;

  return (
    <>
      <div
        className={styles.projectdetailsherosection}
        style={{
          backgroundImage: `url(${project.featured_image})`,
        }}
      >
        <div className={`${styles.herosection} container`}>
          <div className={styles.contentsection}>

            <div className={styles.infowraper}>
              <div className={styles.info}>
                <h6 className={styles.rarea}>Rera No. - {reraNumber}</h6>
                <h6 className={styles.name}>{project?.name}</h6>
                {experience && (
                  <h6 className={styles.builder}>{experience} Years</h6>
                )}
              </div>
              <div
                className={styles.logosection}
                style={{
                  backgroundImage: `url(${
                    project?.featured_image
                      ? project.featured_image
                      : "/salford_logo.png"
                  })`,
                }}
              ></div>
            </div>
            {/* <div className={styles.info1}>
                            <h6 className={styles.price}>Price ₹ {totalPrice}</h6>
                            <h6 className={styles.bhk}>
                                {propertyConfigurations && propertyConfigurations.join(", ")}
                            </h6>

                            <h6 className={styles.bhk}>Area - {superArea} sqft</h6>
                            <h6 className={styles.posession}>Possession on:- {possessionData}</h6>
                        </div>
                        {
                            brochure &&
                            <button onClick={handleDownload} className={`${styles.contentbtn} ${styles['btn-subscribe']}`}>
                                Download Brochure
                            </button>
                        } */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperBanner;
