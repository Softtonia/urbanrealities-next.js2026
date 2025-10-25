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
import { formatprice } from "@/utils/formatprice";

export default function DeveloperCard({ project }) {
  const router = useRouter();
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
      name:"BHK"
    },
    {
      icon: <MdOutlineCorporateFare className={styles["card-icon"]} />,
      label: tower,
      name:" Tower"
    },
    // {
    //   icon: <FaRulerCombined className={styles["card-icon"]} />,
    //   label: price,
    //   name:"price"
    // },
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
            <p className={styles.location}>{project?.developer?.name || project?.developer_name}</p>
            <p className={styles.location}>
              <FaMapMarkerAlt className={styles.locationIcon} /> {project?.city?.name || project?.area_locality} {project?.state?.name ||project?.city_name}
            </p>
            <p className={styles.location}>{project?.property_type[0]?.property_type_name}</p>

            {price &&
              <p className={styles.price}>₹{formatprice(price)} onwards</p>
            }
          </div>
          <div className={styles.headerRight}>

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
                  {tag.name}
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
