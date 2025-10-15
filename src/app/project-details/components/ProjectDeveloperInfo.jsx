'use client';

import React, { useState } from "react";
import styles from "./ProjectDeveloperInfo.module.css";
import { useProject } from "../context/ProjectContext";

const ProjectDeveloperInfo = () => {
  const {project} = useProject();
  const [expanded, setExpanded] = useState(false);
  const [describeExpanded, setDescribeExpanded] = useState(false);

  // Limit to first 3 if not expanded
  const developer = project.developer
  console.log("developer", developer)
  const overview = developer?.
    developer_repeater_fields
    ?.filter(
      (val) =>
        val?.template?.slug?.startsWith("overview") &&
        (val?.template?.slug?.includes("operating-cities") ||
          val?.template?.slug?.includes("experience"))) || [];


  const operatingCities = overview?.find(val =>
    val?.template?.slug.includes("operating-cities")
  )?.field_value;
  const experience = overview?.find(val =>
    val?.template?.slug.includes("experience")
  )?.field_value;
  const cities = operatingCities?.split(",")?.map((city) => city.trim()).filter(Boolean);

  const visibleCities = expanded ? cities : cities?.slice(0, 3)

  const plainText = developer?.description?.replace(/<[^>]+>/g, "");
  const shouldTruncate = plainText?.length > 200; // adjust limit as needed

  const displayedHTML = describeExpanded
    ? developer?.description
    : `${plainText?.slice(0, 200)}${shouldTruncate ? "..." : ""}`;


  console.log("opering cities", operatingCities)

  if(!developer) return null;
  return (
    <div className={styles.infocontainer}>
      <h2 className={styles.heading}>About Developer</h2>


      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.name}>{developer.name}</h3>
          {experience && 
          <p className={styles.experience}>Years of Experience - {experience}</p>
          }
        </div>
        <img
          src={developer?.featured_image ? developer.featured_image : "./Urbanrealities-logo.png"}
          alt="Urbanrealities Logo"
          className={styles.logo}
        />
      </div>

      <div className={`row g-0 ${styles.statsGrid}`}>
        <div className={`col-lg-6 col-md-12 ${styles.statBox} ${styles.borderRight} `}>
          <div className={styles.infoBorder}>
            <p className={styles.label}>Total Projects</p>
            <h6 className={styles.value}>{developer?.total_project_count}</h6>
          </div>
        </div>

        <div className={`col-lg-6 col-md-12 ${styles.statBox} `}>
          <div className={styles.infoBorder}>
            <p className={styles.label}>Projects Completed</p>
            <h6 className={styles.value}>{developer?.project_completed_count}</h6>
          </div>
        </div>
        <div className={`col-lg-6 col-md-12 ${styles.statBox} ${styles.borderRight}`}>
          <div className={`mt-2 ${styles.infoBorder}`}>
            <p className={styles.label}>Projects Ongoing</p>
            <h6 className={styles.value}>{developer?.project_ongoing_count}</h6>
          </div>
        </div>

        <div className={`col-lg-6 col-md-12 ${styles.statBox}`}>
          <div className={styles.infoBorder}>
            <p className={styles.label}>Operating in</p>
            <h6 className={styles.value}>
              {visibleCities.join(", ")}
              {cities.length > 3 && !expanded && (
                <span className={styles.plus}> +{cities.length - 3}</span>
              )}
            </h6>

            {cities.length > 3 && (
              <button
                type="button"
                className={styles.expandBtn}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        </div>


      </div>


      <div className={styles.description}>
        {/* ✅ Render HTML safely */}
        <div
          dangerouslySetInnerHTML={{
            __html: describeExpanded ? developer?.description : displayedHTML,
          }}
        />

        {shouldTruncate && (
          <span
            className={styles.readMore}
            onClick={() => setDescribeExpanded(!describeExpanded)}
          >
            {describeExpanded ? " Read Less" : " Read More"}
          </span>
        )}
      </div>

      <div className={styles.buttons}>
        <button className={styles.outlineBtn}>Explore Builder</button>
        <button className={styles.primaryBtn}>Contact Seller</button>
      </div>
    </div>
  );
};

export default ProjectDeveloperInfo;
