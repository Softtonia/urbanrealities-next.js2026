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
import { useRouter } from "next/navigation";

export default function SingleCard({ property }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/propertydetails/${property.id}`); // navigate to dynamic route
  };
  return (
    <div className={styles.card}>
      {/* Left Side - Image */}
      <div className={styles.cardleft}>
        <div className={styles.imageContainer}>
          <span className={styles.badge}>Featured</span>
          <FaRegBookmark className={styles.tagIconOnImage} />
          <img
            src={property.featured_image ? property.featured_image : ''}
            alt="Property"
            className={styles.imageCard}
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className={styles.cardCenter}>
        <div className={styles.titleRow}>
          <h3>{property?.title || "Untitled Property"}</h3>
          <p className={styles.priceMobile}>{property?.display_price}</p>
          <FaShareAlt className={styles.shareIcon} />
        </div>
        <p className={styles.location}>
          <FaMapMarkerAlt className={styles.locationIcon} /> {property?.full_address}
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
          {property?.selected_taxonomies?.map((tax, index) => {
            const terms = tax.selected_terms?.map((t) => t.name).join(", ");
            if (!terms) return null;
            return (
              <p key={index}>
                <FaRegCircleCheck className={styles.cardCheck} /> {tax.taxonomy_name} : {terms}
              </p>
            );
          })}
        </div>

        {property?.content && (
          <p className={styles.description}>
            {property.content.length > 80
              ? property.content.substring(0, 80) + "..."
              : property.content}
          </p>
        )}

        {/* Buttons for Mobile */}
        <div className={styles.priceSectionButtonsMobile}>
          <button className={`${styles.button} ${styles.outlineButton}`}>
            Request Call-back
          </button>
          <button className={styles.button} onClick={handleClick}>Visit Property</button>
        </div>

      </div>

      {/* Right Side (Desktop only) */}
      <div className={styles.cardRight}>
        <div className={styles.priceSection}>
          <p className={styles.price}>{property?.display_price}</p>
          <div className={styles.priceSectionButtons}>
            <button className={`${styles.button} ${styles.outlineButton}`}>
              Request Call-back
            </button>
            <button className={styles.button} onClick={handleClick}>Visit Property</button>
          </div>
        </div>
      </div>
    </div>
  );
}
