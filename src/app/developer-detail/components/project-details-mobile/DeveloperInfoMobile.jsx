'use client';

import { useState } from "react";
import styles from "./DeveloperInfoMobile.module.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDeveloper } from "../../context/DeveloperContext";

const DeveloperInfoMobile = () => {
  const project = useDeveloper()
  const [expanded, setExpanded] = useState(false);

  // Strip HTML tags for word count
  const plainText = project.description.replace(/<[^>]+>/g, "");
  const words = plainText.split(/\s+/);
  const experience = project?.repeater_fields?.find(
    (val) => val.template?.name === "developer.experience"
)?.field_value;

  // Take first 20 words only
  const shortText = words.slice(0, 20).join(" ") + "...";

  return (
    <div className={styles.devContainer}>
      <div className={`text-dark ${styles.devInfoBox}`}>
        <h5 className={styles.title}>About {project.name}</h5>
        <div className={styles.devContent}>
        <div className={styles.description}>
      <p
        className={`${styles["aboutProject-desc"]} body-text-16`}
        dangerouslySetInnerHTML={{
          __html: expanded
            ? project.description
            : words.length > 20
            ? shortText
            : project.description,
        }}
      ></p>

      {words.length > 20 && !expanded && (
        <span
          className={styles.readMore}
          onClick={() => setExpanded(true)}
        >
          Read More
        </span>
      )}
    </div>


          <hr className={styles.divider} />

          <div className={styles.section}>
            <strong>Office Address :-</strong>
            <p className={styles.address}>
              <FaMapMarkerAlt className={styles.icon} />
              {`${project.street_address},${project.city_name},${project.state_name}-${project.pin_code}`}
            </p>
          </div>

          <div className={styles.section}>
            <span>Experiences :-</span> <span>{experience}+ yrs</span>
          </div>

          <div className={styles.section}>
            <strong>Operating Cities</strong>
            <p className={styles.cities}>
              Gurgaon, New Delhi, Hyderabad, Bangalore, Kochi, Panchkula,
              Kolkata,
              <br />
              Indore, New Chandigarh, Chennai, Lucknow, Shimla, Jaipur,
              Bhubaneswar, Noida
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperInfoMobile;
