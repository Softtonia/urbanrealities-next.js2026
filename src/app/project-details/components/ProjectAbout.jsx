'use client';

import styles from "./ProjectAbout.module.css";
import {
  FaRulerCombined,
  FaCalendarAlt,
  FaKey,
  FaBuilding,
  FaBed,
  FaDownload,
} from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";   // Status
import { MdWeekend } from "react-icons/md";        // Furnished (sofa)
import { FaCar } from "react-icons/fa";           // Parking (car)
import { FaBath } from "react-icons/fa";          // Bathrooms
import { MdBalcony } from "react-icons/md";       // Balconies (balcony icon)

import {
  MdOutlineChair,
  MdOutlineCorporateFare,
} from "react-icons/md";
import { useProject } from "../context/ProjectContext";
import { useState } from "react";

export default function AboutProject() {
  const project = useProject();
  const [expanded, setExpanded] = useState(false);
  const [expandedwhyus, setExpandedwhyus] = useState(false);


  const features = project?.repeater_fields
    ?.filter((val) => val.template?.name?.startsWith("project.furnishing"))

  const certificates = project?.repeater_fields
    ?.filter((val) => val.template?.name?.startsWith("project.certificates"))

  const brochure = project?.repeater_fields?.find(
    (val) => val.template?.name === "project.brochure"
  )?.field_value;

  const WhyUs = project?.repeater_fields?.find(
    (val) => val.template?.name === "project.why-us"
  )?.field_value;


  console.log(features); // 👉 array of field_value

  const handleDownloadBrochure = () => {
    if (!brochure) {
      alert("Brochure not available!");
      return;
    }

    // Create a temporary <a> element to trigger download
    const link = document.createElement("a");
    link.href = brochure;
    link.setAttribute("download", "brochure.pdf"); // 👈 force download (name optional)
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = (link) => {
    if (!link) return;
    const a = document.createElement("a");
    a.href = link;
    a.download = link.split("/").pop(); // take filename from URL
    a.click();
  };

  // ✅ Limit shown certificates if not expanded
  const visibleCertificates = expanded
    ? certificates
    : certificates?.slice(0, 3);


  const items = WhyUs
    ? WhyUs.split(/<\/p>/)
      .map((item) =>
        item
          .replace(/<p[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .trim()
      )
      .filter(Boolean)
    : [];

  // ✅ Show only first 3 if not expanded
  const visibleItems = expandedwhyus ? items : items.slice(0, 3);

  const iconMap = {
    "status": <MdCheckCircle className={styles["aboutProject-icon"]} />,
    "furnished": <MdWeekend className={styles["aboutProject-icon"]} />,
    "parking": <FaCar className={styles["aboutProject-icon"]} />,
    "bedrooms": <FaBed className={styles["aboutProject-icon"]} />,
    "bathrooms": <FaBath className={styles["aboutProject-icon"]} />,
    "balconies": <MdBalcony className={styles["aboutProject-icon"]} />,
  };






  // const highlight = project.repeater_field_value.filter((temp)=>temp.)
  return (
    <div className={styles["aboutProject-container"]}>
      <h2 className={styles["aboutProject-title"]}>
        About {project.name}
      </h2>
      <p
        className={`${styles["aboutProject-desc"]} body-text-16`}
        dangerouslySetInnerHTML={{ __html: project.description }}
      ></p>


      <div className={styles["aboutProject-highlights"]}>
        {features && features.map((val) => (
          <div  key={val.field_label} className={styles["aboutProject-box"]}>
            <p className="" style={{ textTransform: 'capitalize' }}>{val.field_label}</p>
            <span>{val.field_value}</span>
            {iconMap[val.field_label] || null}
            {/* <FaRulerCombined className={styles["aboutProject-icon"]} /> */}
          </div>
        ))}

        {/* <div className={styles["aboutProject-box"]}>
          <p>Launch Date</p>
          <span>May 22</span>
          <FaCalendarAlt className={styles["aboutProject-icon"]} />
        </div>
        <div className={styles["aboutProject-box"]}>
          <p>Total Units</p>
          <span>46</span>
          <FaKey className={styles["aboutProject-icon"]} />
        </div>
        <div className={styles["aboutProject-box"]}>
          <p>Total Towers</p>
          <span>1</span>
          <FaBuilding className={styles["aboutProject-icon"]} />
        </div>
        <div className={styles["aboutProject-box"]}>
          <p>BHK</p>
          <span>3,4</span>
          <MdOutlineChair className={styles["aboutProject-icon"]} />
        </div> */}
      </div>

      <div className={styles["aboutProject-certificates"]}>
        <div className={styles["aboutProject-cert-list"]}>
          {visibleCertificates && visibleCertificates.map((val) => (
            <div  key={val.field_label} className={styles["aboutProject-cert-box"]}>
              {/* {val.field_label} */}
              <p className={styles["aboutProject-para-box"]}> {val.field_label}</p>
              <div
                onClick={() => handleDownload(val.field_value)} // 👈 pass file link
                style={{ cursor: "pointer" }}
              >
                <FaDownload className={styles["cert-icon"]} />
              </div>
            </div>))}

        </div>
        {certificates?.length > 3 && (
          <button
            className={styles["aboutProject-view-all"]}
            style={{ border: 'none', backgroundColor: 'transparent' }}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? "Hide"
              : `View All`}
          </button>
        )}
      </div>

      <div className={styles["aboutProject-whybuy"]}>
        <h3 className={styles["aboutProject-whybuy-title"]}>
          Why Buy in {project.name}?
        </h3>
        <ul className={styles["aboutProject-whybuy-list"]}>
          {visibleItems.map((clean, index) => (
            <li
              key={index}
              className={styles["whybuy-li"]}
              dangerouslySetInnerHTML={{ __html: clean }}
            />
          ))}
        </ul>
        {items.length > 3 && (
          <button
            className={`${styles["aboutProject-more-link"]} body-text-rg16`}
            style={{ border: 'none', backgroundColor: 'transparent' }}

            onClick={() => setExpandedwhyus(!expandedwhyus)}
          >
            {expandedwhyus ? "less" : `+${items.length - 3} More`}
          </button>
        )}
        {brochure &&
          <button className={styles["aboutProject-brochure-btn"]} onClick={handleDownloadBrochure}>
            <FaDownload /> Download Brochure
          </button>}
      </div>
    </div>
  );
}
