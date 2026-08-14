"use client";

import React, { useState, useEffect } from "react";
import styles from "./ProjectBanner.module.css";
import { useProject } from "../context/ProjectContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const ProjectBanner = () => {
  const { project } = useProject();


  const heroBanner = project?.featured_image || project?.repeater_fields?.find(
    (val) => val?.template?.slug?.includes("banner")
  )?.field_value;

  // const overview = project?.repeater_fields?.filter(
  //   (val) =>
  //     val?.template?.slug?.startsWith("overview") &&
  //     (val.template.slug.includes("experience"))
  // ) || [];

  // const overviewExperience = overview.find(val =>
  //   val.template.slug.includes("experience")
  // )?.field_value;
  // // Extract individual ones if needed

  // const heroRera = heroSectionFields.find(val =>
  //   val.template.slug.includes("rera")
  // )?.field_value;

  console.log(project)

  // ✅ Extract RERA number safely
  // const reraNumber = project?.repeater_fields?.find(
  //   (val) => val.template?.name === "project.rera-number"
  // )?.field_value;
  // const totalPrice = project?.repeater_fields?.find(
  //   (val) => val.template?.name === "project.price.total_price"
  // )?.field_value;

  // const superArea = project?.repeater_fields?.find(
  //   (val) => val.template?.name === "project.area.super_area"
  // )?.field_value;
  // const possessionData = project?.repeater_fields?.find(
  //   (val) => val.template?.name === "project.possession-date"
  // )?.field_value;
  // const brochure = project?.repeater_fields?.find(
  //   (val) => val.template?.name === "project.brochure"
  // )?.field_value;
  // const propertyConfigurations = project?.repeater_fields?.find(
  //   (val) => val.template?.name === "project.property-configuration"
  // )?.field_value;

  const handleDownload = () => {
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
  const [bgImage, setBgImage] = useState("/banner-placeholder.jpg");

  useEffect(() => {
    if (heroBanner) {
      const img = new Image();
      img.src = heroBanner;

      img.onload = () => setBgImage(heroBanner);
      img.onerror = () => setBgImage("/banner-placeholder.jpg");
    }
  }, [heroBanner]);

  return (
    <>
      <div
        className={styles.projectdetailsherosection}
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={`${styles.herosection} container`}>

          <div className={styles.contentsection}>
            <div className={styles.infowraper}>
              <div className={styles.info}>
                {/* <h6 className={styles.rarea}>Rera No. - {reraNumber}</h6> */}
                <h6 className={styles.name}>{project?.name}</h6>
                <h6 className={styles.builder}>
                  <FaMapMarkerAlt className={styles.icon} />
                  {project?.full_address || 
                    [project?.area_locality, project?.city_name, project?.state_name]
                      .filter(Boolean)
                      .join(", ")}
                </h6>
              </div>
              {/* <div
                className={styles.logosection}
                style={{
                  backgroundImage: `url(${project?.featured_image
                      ? project.featured_image
                      : "/salford_logo.png"
                    })`,
                }}
              >
              </div> */}
            </div>

            {/* <div className={styles.info1}>
              <h6 className={styles.price}>Price ₹ {totalPrice}</h6>
              <h6 className={styles.bhk}>
                {propertyConfigurations && propertyConfigurations.join(", ")}
              </h6>

              <h6 className={styles.bhk}>Area - {superArea} sqft</h6>
              <h6 className={styles.posession}>
                Possession on:- {possessionData}
              </h6>
            </div> */}
            {/* {brochure && (
              <button
                onClick={handleDownload}
                className={`${styles.contentbtn} ${styles["btn-subscribe"]}`}
              >
                Download Brochure
              </button>
            )} */}
          </div>

        </div>
      </div>
    </>
  );
};

export default ProjectBanner;
