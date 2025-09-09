"use client";
import React from "react";
import {
  FaMapMarkerAlt,
  FaShareAlt,
  FaCheckCircle,
  FaRegBookmark,
  FaBuilding,
  FaBed,
  FaRulerCombined,
} from "react-icons/fa";
import { MdOutlineChair, MdOutlineCorporateFare } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import styles from "./DeveloperCard.module.css";

export default function ProjectCard() {
  return (
    <div className={styles.card}>
      <div className={styles.cardleft}>
        <div className={styles.imageContainer}>
          <span className={styles.badge}>Featured</span>
          <FaRegBookmark className={styles.tagIconOnImage} />
          <img
            src="/image-card.png"
            alt="Property"
            className={`${styles["image-card"]}`}
          />
        </div>
      </div>
      {/* Right Side - Content */}
      <div className={styles.cardContent}>
            <h3 className={styles.title}>NEW Ganesh Property Pvt Ltd</h3>
        {/* Top Section */}
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <p className={styles.location}>
              <FaMapMarkerAlt className={styles.locationIcon} /> Ernakulam,
              Kerla
            </p>
            <p className={styles.price}>3 cr onwards</p>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.developerInfo}>By: DLF Developer Pvt. ltd</p>
            <p className={styles.possessionInfo}>Possession in: 2025</p>
          </div>
        </div>
        {/* Pricing & Description */}
        <div className={styles.pricingAndDescription}>
          <p className={styles.description}>
            Exclusive housing welcomes the ultra modern and experience space
            rising towers to capture the city's bigger and uninterrupted view
            from the balcony.
          </p>
        </div>

        {/* Tags and Button Section */}
        <div className={styles.tagsAndButton}>
          <div className={styles.tagContainer}>
            <div className={styles.cardtags}>
              {[
                {
                  icon: <MdOutlineChair className={styles["card-icon"]} />,
                  label: "3BHK",
                },
                {
                  icon: (
                    <MdOutlineCorporateFare className={styles["card-icon"]} />
                  ),
                  label: "4–5 Floor",
                },
                {
                  icon: <FaRulerCombined className={styles["card-icon"]} />,
                  label: "2.82Cr - 3.65Cr",
                },
                {
                  icon: <FaBuilding className={styles["card-icon"]} />,
                  label: "Extra Tag",
                },
              ]
                .slice(0, 3)
                .map((tag, index) => (
                  <span key={index} className={styles.cardtag}>
                    {tag.icon}
                    {tag.label}
                  </span>
                ))}
            </div>
          </div>
          <button className={styles.viewProjectButton}>View Project</button>
        </div>
      </div>
    </div>
  );
}
