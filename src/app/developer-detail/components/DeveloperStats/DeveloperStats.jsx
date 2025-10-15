'use client'
import React from "react";
import styles from "./DeveloperStats.module.css";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useDeveloper } from "../../context/DeveloperContext";
import { FaMapMarkerAlt } from "react-icons/fa";
const projectsData = [
  { number: "3+", label: "Total Project" },
  { number: "1+", label: "Ready to Move Projects" },
  { number: "2+", label: "Under Construction" },
];

const DeveloperStats = () => {
  const {developer} = useDeveloper();
  console.log("Developer in Stats:", developer);

  const overview = developer?.repeater_fields?.filter(
    (val) =>
      val?.template?.slug?.startsWith("overview") &&
      (val?.template?.slug.includes("experience") ||
        val?.template?.slug.includes("operating")) || []);

  const overviewExperience = overview.find(val =>
    val?.template?.slug.includes("experience")
  )?.field_value;
  const overviewoperatingin = overview.find(val =>
    val?.template?.slug.includes("operating")
  )?.field_value;
  // Extract individual ones if needed


  return (
    <div className={styles.statssection}>
      <div className={styles.header}>
        <div className={styles.title}>About {developer?.name}</div>
        <div className={styles.description}
          dangerouslySetInnerHTML={{ __html: developer?.description }}
        >
        </div>

        <hr className={styles.divider} />

        <div className={styles.section}>
          <strong>Office Address :-</strong>
          <p className={styles.address}>
            <FaMapMarkerAlt className={styles.icon} />
            {`${developer.street_address},${developer.city_name},${developer.state_name}-${developer.pin_code}`}
          </p>
        </div>
        {overviewExperience &&
          <div className={styles.section}>
            <span>Experiences :-</span> <span>{overviewExperience} yrs</span>
          </div>
        }
        {overviewoperatingin &&
          <div className={styles.section}>
            <strong>Operating Cities</strong>
            <p className={styles.cities}>
              {overviewoperatingin}
            </p>
          </div>
        }
      </div>


    </div>
  );
};

export default DeveloperStats;
