"use client";
import React from "react";
import { useDeveloper } from "../context/DeveloperContext";
import styles from "./DeveloperBanner.module.css";

const DeveloperBanner = () => {
  const project = useDeveloper();

  // ✅ Extract RERA number 

  const heroSectionFields = project?.repeater_fields?.filter(
    (val) =>
      val?.template?.slug?.startsWith("herosection") &&
      (val.template.slug.includes("experience") ||
        val.template.slug.includes("rera") ||
        val.template.slug.includes("banner") ||
        val.template.slug.includes("logo"))
  ) || [];

  // Extract individual ones if needed
  const heroExperience = heroSectionFields.find(val =>
    val.template.slug.includes("experience")
  )?.field_value;

  const heroRera = heroSectionFields.find(val =>
    val.template.slug.includes("rera")
  )?.field_value;

  const heroBanner = heroSectionFields.find(val =>
    val.template.slug.includes("banner")
  )?.field_value;

  const heroLogo = heroSectionFields.find(val =>
    val.template.slug.includes("logo")
  )?.field_value;

  console.log("Hero Section Fields:", heroLogo);

  return (
    <>
      <div
        className={styles.projectdetailsherosection}
        style={{
          backgroundImage: `url(${heroBanner ? encodeURI(heroBanner) : "/banner-placeholder.png"})`,
        }}
      >
        <div className={`${styles.herosection} container`}>
          <div className={styles.contentsection}>

            <div className={styles.infowraper}>
              <div className={styles.info}>
                {heroRera && (
                <h6 className={styles.rarea}>Rera No. - {heroRera ? heroRera : ''}</h6>
                  )}
                <h6 className={styles.name}>{project?.name}</h6>
                {heroExperience && (
                  <h6 className={styles.builder}>{heroExperience} Years</h6>
                )}
              </div>
              <div
                className={styles.logosection}
                style={{
                  backgroundImage: `url(${heroLogo
                    ? encodeURI(heroLogo)
                    : "/logo-placeholder.png"
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
