import React from "react";
import styles from "./AgentPropertyList.module.css";
import { FaRegBookmark } from "react-icons/fa";
import { useRouter } from "next/navigation";

const AgentPropertyCard = ({ property }) => {
  const router = useRouter();
  return (
    <div className={styles.card}>
      {/* Left Section (Image + Tag) */}
      <div className={styles.imageWrapper}>
        <span className={styles.tag}>{property.property_status_name}</span>
        <img
          src={property.featured_image}
          alt={property.name}
          className={styles.propertyimage}
        />
        <FaRegBookmark className={styles.bookmark} />
        <div className={styles.propertycontent}>

        <div className={styles.detailsContent}>
          <p className={styles.price}>{property.price ||20000}</p>
          <p className={styles.title}>{property.name||"title"}</p>
          <p className={styles.location}>
            {property.state_name+', '+property.city_name}
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
        <button className={styles.visit}onClick={()=>router.push(`/propertydetails/${property.id}`)} >Visit Property</button>
      </div>
      </div>

      </div>

    </div>
  );
};

export default AgentPropertyCard;
