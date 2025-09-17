'use client';
import React from "react";
import {
  FaMapMarkerAlt,
  FaShareAlt,
  FaRegBookmark,
  FaRulerCombined,
} from "react-icons/fa";
import { MdOutlineChair, MdOutlineCorporateFare } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import styles from "./SingleCard.module.css";

export default function SingleCard() {
  return (
    <div className={styles.card}>
      {/* Left Side - Image */}
      <div className={styles.cardleft}>
        <div className={styles.imageContainer}>
          <span className={styles.badge}>Featured</span>
          <FaRegBookmark className={styles.tagIconOnImage} />
          <img
            src="/image-card.png"
            alt="Property"
            className={styles.imageCard}
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className={styles.cardCenter}>
        <div className={styles.titleRow}>
          <h3>3BHK Flat for Sale in New Delhi</h3>
          <p className={styles.priceMobile}>₹ 3 Crore</p>
          <FaShareAlt className={styles.shareIcon} />
        </div>
        <p className={styles.location}>
          <FaMapMarkerAlt className={styles.locationIcon} /> New Ashok Nagar,
          Near Metro Station
        </p>

        {/* Tags */}
        <div className={styles.cardtags}>
          {[
            {
              icon: <MdOutlineChair className={styles.cardIcon} />,
              label: "3BHK",
            },
            {
              icon: <MdOutlineCorporateFare className={styles.cardIcon} />,
              label: "4–5 Floor",
            },
            {
              icon: <FaRulerCombined className={styles.cardIcon} />,
              label: "1700sqft.",
            },
          ].map((tag, index) => (
            <span key={index} className={styles.cardtag}>
              {tag.icon}
              {tag.label}
            </span>
          ))}
        </div>

        {/* Owner + Details */}
        <p className={styles.owner}>Ganesh Property</p>
        <div className={styles.details}>
          <p>
            <FaRegCircleCheck className={styles.cardCheck} /> For : Sell
          </p>
          <p>
            <FaRegCircleCheck className={styles.cardCheck} /> Property :
            Residentials
          </p>
          <p>
            <FaRegCircleCheck className={styles.cardCheck} /> Property Type :
            Flats
          </p>
          <p>
            <FaRegCircleCheck className={styles.cardCheck} /> Newly Constructed
            Property
          </p>
        </div>

        <p className={styles.description}>
          3 bhk newly constructed semi furnished flat with modular kitchen
        </p>

        {/* Buttons for Mobile */}
        <div className={styles.priceSectionButtonsMobile}>
          <button className={`${styles.button} ${styles.outlineButton}`}>
            Request Call-back
          </button>
          <button className={styles.button}>Visit Property</button>
        </div>
        
      </div>

      {/* Right Side (Desktop only) */}
      <div className={styles.cardRight}>
        <div className={styles.priceSection}>
          <p className={styles.price}>₹ 3 Crore</p>
          <div className={styles.priceSectionButtons}>
            <button className={`${styles.button} ${styles.outlineButton}`}>
              Request Call-back
            </button>
            <button className={styles.button}>Visit Property</button>
          </div>
        </div>
      </div>
    </div>
  );
}
