'use client';
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
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ property }) {
  const decodeHTMLEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  const heroSectionFields = property?.custom_field_values?.filter(
    (val) =>
      val?.template?.slug?.startsWith("herosection") &&
      (val.template.slug.includes("banner")
        || val.template.slug.includes("price"))
  ) || [];
  const overview = property?.custom_field_values?.filter(
    (val) =>
      val?.template?.slug?.startsWith("overview") &&
      (val.template.slug.includes("tower")
        || val.template.slug.includes("bhk")
        || val.template.slug.includes("built-up-area")
      )) || [];

  const area = overview.find(val =>
    val.template.slug.includes("built-up-area")
  )?.field_value;



  const bhk = overview.find(val =>
    val.template.slug.includes("bhk")
  )?.field_value;

  const launchDate = overview.find(val =>
    val.template.slug.includes("launch")
  )?.field_value;

  const price = heroSectionFields.find(val =>
    val.template.slug.includes("price")
  )?.field_value;



  // const tags = [
  //   {
  //     icon: <MdOutlineChair className={styles["card-icon"]} />,
  //     label: bhk,
  //   },
  //   {
  //     icon: <FaRulerCombined className={styles["card-icon"]} />,
  //     label: price,
  //   },
  //   // {
  //   //   icon: <FaBuilding className={styles["card-icon"]} />,
  //   //   label: "Extra Tag",
  //   // },
  // ]
  //   // ✅ Properly wrapped parentheses before chaining
  //   .filter((val) => {
  //     const label = val?.label;
  //     if (Array.isArray(label)) return label.length > 0;
  //     if (typeof label === "string") return label.trim().length > 0;
  //     if (typeof label === "number") return true;
  //     return false;
  //   })
  //   .slice(0, 3);


  return (
    <div className={styles.card}>
      <div className={styles.cardleft}>
        <div className={styles.imageContainer}>
          {/* <span className={styles.badge}>Featured</span> */}
          <FaRegBookmark className={styles.tagIconOnImage} />
          <img
            src={property?.featured_image ? property.featured_image : "/image-card.png"}
            alt="Property"
            className={`${styles["image-card"]}`}
          />
        </div>
      </div>
      <div className={styles.cardCenter}>
        <div className={styles.titleRow}>
          <h3>{property?.property_name} in {property?.city?.name}</h3>
          <FaShareAlt className={styles.shareIcon} />
        </div>
        <p className={styles.location}>
          <FaMapMarkerAlt className={styles.locationIcon} /> {property?.area_locality},
          {property?.city?.name}
        </p>
        <div className={styles.cardtags}>
          {[
            {
              icon: <MdOutlineChair className={styles["card-icon"]} />,
              label: bhk,
            },
            // {
            //   icon: <MdOutlineCorporateFare className={styles["card-icon"]} />,
            //   label: "4–5 Floor",
            // },
            {
              icon: <FaRulerCombined className={styles["card-icon"]} />,
              label: area && `${area} sqft.`,
            },
            // {
            //   icon: <FaBuilding className={styles["card-icon"]} />,
            //   label: "Extra Tag",
            // },
          ]
            .filter((tag) => {
              const label = tag?.label;
              if (Array.isArray(label)) return label.length > 0;
              if (typeof label === "string") return label.trim().length > 0;
              if (typeof label === "number") return true;
              return false;
            })
            .slice(0, 3)
            .map((tag, index) => (
              <span key={index} className={styles.cardtag}>
                {tag.icon}
                {tag.label}
              </span>
            ))}

          {/* {tags?.map((tag, index) => (
                <span key={index} className={styles.cardtag}>
                  {tag.icon}
                  {tag.label}
                </span>
              ))} */}
        </div>

        <p className={styles.owner}>{property?.project_id_name}</p>
        <div className={styles.details}>
          {property?.purpose_id_name &&
            <p>
              <FaRegCircleCheck className={styles["card-check"]} />  {property?.purpose_id_name}
            </p>
          }
          {property?.property_id_name &&
            <p>
              <FaRegCircleCheck className={styles["card-check"]} /> {property?.property_id_name}
            </p>}
          {/* <p>
            <FaRegCircleCheck className={styles["card-check"]} />  Flats
          </p>
          <p>
            <FaRegCircleCheck className={styles["card-check"]} /> Newly Constructed Property
          </p> */}
        </div>
        <p className={styles.description}>
          {property?.description
            ? decodeHTMLEntities(
              property.description.replace(/<[^>]+>/g, "").slice(0, 100)
            ) + "..."
            : ""}

        </p>

      </div>
      <div className={styles.cardright}>
        <div className={styles.pricesection}>
          <p className={styles.price}>{price}</p>
          <button className={styles.button}>Contact Agent</button>
        </div>
      </div>
    </div>
  );
}
