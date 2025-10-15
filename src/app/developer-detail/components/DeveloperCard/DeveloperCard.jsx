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
import DeveloperDescription from "@/Components/Truncate/Truncate";
import { useRouter } from "next/navigation";

export default function DeveloperCard({ project }) {
  const router  = useRouter();
  const heroSectionFields = project?.custom_field_values?.filter(
    (val) =>
      val?.template?.slug?.startsWith("herosection") &&
      (val.template.slug.includes("banner"))
  ) || [];
  const overview = project?.custom_field_values?.filter(
    (val) =>
      val?.template?.slug?.startsWith("overview") &&
      (val.template.slug.includes("tower")
        || val.template.slug.includes("bhk")
        || val.template.slug.includes("launch")
        || val.template.slug.includes("price")
      )) || [];
  console.log("overview", project)

  const tower = overview.find(val =>
    val.template.slug.includes("tower")
  )?.field_value;



  const bhk = overview.find(val =>
    val.template.slug.includes("bhk")
  )?.field_value;

  const launchDate = overview.find(val =>
    val.template.slug.includes("launch")
  )?.field_value;

  const price = overview.find(val =>
    val.template.slug.includes("price")
  )?.field_value;


  const heroBanner = heroSectionFields?.find(val =>
    val.template.slug.includes("banner")
  )?.field_value;


  const tags = [
    {
      icon: <MdOutlineChair className={styles["card-icon"]} />,
      label: bhk,
    },
    {
      icon: <MdOutlineCorporateFare className={styles["card-icon"]} />,
      label: tower,
    },
    {
      icon: <FaRulerCombined className={styles["card-icon"]} />,
      label: price,
    },
    // {
    //   icon: <FaBuilding className={styles["card-icon"]} />,
    //   label: "Extra Tag",
    // },
  ]
    .filter((val) => {
      const label = val?.label;
      if (Array.isArray(label)) return label.length > 0;
      if (typeof label === "string") return label.trim().length > 0;
      if (typeof label === "number") return true;
      return false;
    })
    .slice(0, 3);


  const handleNavigate = () => {
    router.push(`/project-details?name=${project.name}&property-name=${project.property_id_name}&id=${project.id}`);
  }


  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <span className={styles.badge}>Featured</span>
        <FaRegBookmark className={styles.tagIconOnImage} />
        <img
          src={heroBanner ? heroBanner : '/image-card.png'}
          alt="Property"
          className={`${styles["image-card"]}`}
        />
      </div>
      {/* Right Side - Content */}
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{project.name}</h3>
        {/* Top Section */}
        <div className={styles.cardHeader}>
          <div className={styles.headerLeft}>
            <p className={styles.location}>
              <FaMapMarkerAlt className={styles.locationIcon} /> {project?.city?.name} {project?.state?.name}
            </p>
            <p className={styles.price}>{price} onwards</p>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.developerInfo}>By: {project?.developer?.name}</p>
            <p className={styles.possessionInfo}>Possession in: {launchDate}</p>
          </div>
        </div>
        {/* Pricing & Description */}
        <div className={styles.pricingAndDescription}>
          <p className={styles.description}>
            <DeveloperDescription description={project?.description} />
          </p>
        </div>

        {/* Tags and Button Section */}
        <div className={styles.tagsAndButton}>
          <div className={styles.tagContainer}>
            <div className={styles.cardtags}>
              {tags?.map((tag, index) => (
                <span key={index} className={styles.cardtag}>
                  {tag.icon}
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
          <button className={styles.viewProjectButton} onClick={handleNavigate}>View Project</button>
        </div>
      </div>
    </div>
  );
}
