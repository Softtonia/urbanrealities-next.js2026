import React from "react";
import styles from "./AgentPropertyList.module.css";
import { FaRegBookmark } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { formatprice } from "@/utils/formatprice";

const AgentPropertyCard = ({ property }) => {
  const router = useRouter();
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

  return (
    <div className={styles.card}>
      {/* Left Section (Image + Tag) */}
      <div className={styles.imageWrapper}>
        {property?.propertyStatus &&
          <span className={styles.tag}>{property?.propertyStatus[0]?.property_status_name}</span>
        }
        <img
          src={property.featured_image}
          alt={property.name}
          className={styles.propertyimage}
        />
        {/* <FaRegBookmark className={styles.bookmark} /> */}
        <div className={styles.propertycontent}>

          <div className={styles.detailsContent}>
            {price &&
              <p className={styles.price}>₹{formatprice(price)} Onwards</p>
            }{
              property?.name &&
              <p className={styles.title}>{property.name}</p>
            }
            <p className={styles.location}>
              {property.state_name + ', ' + property.city_name}
              <span className={styles.agency}>{property.agency}</span>
            </p>
            <p>
              Available for <span className={styles.area} >{property.purpose_name}</span>
            </p>
            {area &&
              <p>
                Area <span className={styles.area}>{area}Sqft.</span>
              </p>
            }
          </div>

          {/* Right Section (Buttons) */}
          <div className={styles.actions}>
            <button className={styles.request}>Request Call-back</button>
            <button
              className={styles.visit}
              onClick={() =>
                router.push(
                  `/propertydetails/${bhk ? `${bhk}bhk-` : ""}${property.propertyType[0].property_type_name}?id=${property.id}`
                )
              }
            >
              Visit Property
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AgentPropertyCard;
