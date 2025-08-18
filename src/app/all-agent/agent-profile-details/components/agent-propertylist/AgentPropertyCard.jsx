import React from "react";
import styles from "./AgentPropertyList.module.css";
import { FaRegBookmark } from "react-icons/fa";

const AgentPropertyCard = ({ property }) => {
  return (
    <div className={styles.card}>
      {/* Left Section (Image + Tag) */}
      <div className={styles.imageWrapper}>
        <span className={styles.tag}>{property.status}</span>
        <img
          src={property.image}
          alt={property.title}
          className={styles.propertyimage}
        />
        <FaRegBookmark className={styles.bookmark} />
        <div className={styles.propertycontent}>

        <div className={styles.detailsContent}>
          <p className={styles.price}>{property.price}</p>
          <p className={styles.title}>{property.title}</p>
          <p className={styles.location}>
            {property.location}
            <span className={styles.agency}>{property.agency}</span>
          </p>
          <p>
            Available for <span className={styles.area} >{property.availableFor}</span>
          </p>
          <p>
            Carpet Area <span className={styles.area}>{property.carpetArea}</span>
          </p>       
        </div>

      {/* Right Section (Buttons) */}
      <div className={styles.actions}>
        <button className={styles.request}>Request Call-back</button>
        <button className={styles.visit}>Visit Property</button>
      </div>
      </div>

      </div>



    </div>
  );
};

export default AgentPropertyCard;
