'use client';

import React from 'react'
import styles from './ProjectBanner.module.css'
import { useProject } from '../context/ProjectContext';

const ProjectBanner = () => {
  const project = useProject();

  // ✅ Extract RERA number safely
  const reraNumber = project?.repeater_fields?.find(
    (val) => val.template?.name === "project.rera-number"
  )?.field_value;
  const totalPrice = project?.repeater_fields?.find(
    (val) => val.template?.name === "project.price.total_price"
  )?.field_value;

  const superArea = project?.repeater_fields?.find(
    (val) => val.template?.name === "project.area.super_area"
  )?.field_value;
  const possessionData = project?.repeater_fields?.find(
    (val) => val.template?.name === "project.possession-date"
  )?.field_value;
  
  console.log(project)


  return (
    <>
      <div
        className={styles.projectdetailsherosection}
        style={{
          backgroundImage: `url(${project.featured_image
            })`,
        }}
      >
        <div className={`${styles.herosection} container`}>
          <div className={styles.contentsection}>
            <div className={styles.info}>
              <h6 className={styles.rarea}>Rera No. - {reraNumber}</h6>
              <h6 className={styles.name}>{project?.name}</h6>
              <h6 className={styles.builder}>
                {project.area_locality}, {project?.city_name}, {project?.state_name}
              </h6>
            </div>

            <div className={styles.info1}>
              <h6 className={styles.price}>Price ₹ {totalPrice}</h6>
              <h6 className={styles.bhk}>
                1Bhk, 2bhk ,3BHK Flats, Luxury Apartment
              </h6>
              <h6 className={styles.bhk}>Area - {superArea} sqft</h6>
              <h6 className={styles.posession}>Possession on:- {possessionData}</h6>
            </div>

            <button className={`${styles.contentbtn} ${styles['btn-subscribe']}`}>
              Download Brochure
            </button>
          </div>

          <div
            className={styles.logosection}
            style={{
              backgroundImage: `url(${project?.featured_image ? project.featured_image : "/salford_logo.png"
                })`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default ProjectBanner;
