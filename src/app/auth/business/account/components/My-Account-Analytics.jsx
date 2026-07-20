'use client';
import React from "react";
import styles from "./My-Account-Analytics.module.css";
import format from "date-fns/format";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MyAccountAnalytics = ({ data }) => {
  const {
    id,
    companyName,
    location,
    price,
    image,
    stats,
    createdAt,
    expiresAt,
  } = data;

  return (

    <div className={styles['property-card']}>
      <div className={`row align-items-center m-0 ${styles['property-content']}`}>
        <div className={` ${styles['top-content']} col-lg-2 col-4  p-0 m-0`}>
          <img
            src={image}
            alt="property"
            className={styles['property-img']}
          />
        </div>

        <div className={` ${styles.leftContent} col-lg-4 col-8  `}>
          <p className={styles['property-id']}>#{id}</p>
          <h5 className={styles['property-title']}>{companyName}</h5>
          <p className={styles['property-location']}>{location}</p>
          <p className={styles['property-price']}>{price}</p>
        </div>



        <div className={` ${styles.Progressbar} col-lg-3 col-6 `}>

          <div className={styles['circle-progress']}>
            <CircularProgressbar
              value={stats.percentage}
              text={`${stats.percentage}%`}
              styles={buildStyles({
                textColor: "#000000",
                pathColor: "#3D8B0D",
                trailColor: "#F8F8F8",
                textSize: "24px",
                rotation: 0.35,
              })}
            />
          </div>
          <div className={styles.stats}>
            <p>{stats.impression} <span>Impression</span></p>
            <p>{stats.views} <span>Views</span></p>
            <p>{stats.email} <span>Email</span></p>
          </div>

        </div>


        <div className={` ${styles['insight-views']} col-lg-3 col-6  text-center`}>
          <button className={styles['insight-btn']}>Insight Views</button>
        </div>

      </div>

      <div className={`${styles['date-Section']} d-flex m-0 `} >
        <div className="">
          <p className={`${styles['created-text']} m-0 `}>
            Created: {format(new Date(createdAt), "ddMMM,yyyy hh:mma")}
          </p>
        </div>
        <div className="">
          <p className={`${styles['exp-text']} m-0 `}>
            Exp: {format(new Date(expiresAt), "ddMMM,yyyy hh:mma")}
          </p>
        </div>
      </div>
    </div>

  );
};

export default MyAccountAnalytics;
