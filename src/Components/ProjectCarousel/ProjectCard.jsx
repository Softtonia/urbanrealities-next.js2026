"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import "./ProjectCarousel.css";
import { formatprice } from "@/utils/formatprice";


const ProjectCard = ({ project, onViewProject }) => {

  // const customFields = project.custom_field_values.reduce((acc, field) => {
  //   acc[field.template.slug] = field.field_value;
  //   return acc;
  // }, {});
  console.log('==>', project?.["property_type "]?.map(val => val?.property_type_name)?.join(', '))
  const overview = project?.custom_field_values?.filter(
    (val) =>
      val?.template?.slug?.startsWith("overview") &&
      (val.template.slug.includes("tower")
        || val.template.slug.includes("units")
        || val.template.slug.includes("rera")
        || val.template.slug.includes("bhk")
        || val.template.slug.includes("launch")
        || val.template.slug.includes("brochure")
        || val.template.slug.includes("price")
        || val.template.slug.includes("rent")
      )) || [];
  console.log("overview", project)
  const tower = overview.find(val =>
    val.template.slug.includes("tower")
  )?.field_value;

  const units = overview.find(val =>
    val.template.slug.includes("units")
  )?.field_value;

  const rera = overview.find(val =>
    val.template.slug.includes("rera")
  )?.field_value;

  const bhk = overview.find(val =>
    val.template.slug.includes("bhk")
  )?.field_value;

  const ongoingPrice = overview.find(val =>
    val.template.slug.includes("price")
  )?.field_value;

  const heroSectionFields = project?.custom_field_values?.filter(
    (val) =>
      val?.template?.slug?.startsWith("herosection") &&
      (val.template.slug.includes("banner"))
  ) || [];


  const heroBanner = heroSectionFields.find(val =>
    val.template.slug.includes("banner")
  )?.field_value[0];
  // // Now you can fetch values like this:
  // // const ongoingPrice = customFields["total Price"] || "";  // example
  // const areaSqft = customFields["super Area"] || "";
  // const builderFloor = customFields["built Up Area"] || "";


  return (
    <div className="project-card">
      <div className="project-card__image-wrapper">
        <Image
          src={heroBanner || '/building.png'}
          alt="project-img"
          width={300}
          height={280}
          className="project-card__image"
        />
      </div>

      <div className="project-carousel__content">
        <div className="project-card__body">
          {project.name &&
            <h3 className="project-card__builder m-0">
              {project.name}
            </h3>}
          {project.developer &&
            <p className="project-card__rera m-0">
              {project.developer.name}
            </p>}
          <p className="project-card__location m-0">{project.area_locality + ',' + project.city.name}</p>
          {project.reraNo &&
            <p className="project-card__rera m-0">
              Rera No: {project.reraNo}
            </p>}

          {/* <div className="project-card__rating m-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="star">
                <FaStar className={i < project.rating ? "filled" : "unfilled"} />
              </div>
            ))}
            <span className="project-card__rating-value">
              ({project.rating}.0)
            </span>
          </div> */}
          {project?.["property_type "] &&
            <p className="project-card__property-type m-0">
              {project?.["property_type "]?.map(val => val?.property_type_name)?.join(', ')}
            </p>}
          {ongoingPrice &&
            <p className="project-card__price m-0">
              ₹{formatprice(ongoingPrice)} Onwards
            </p>
          }
          {/* {areaSqft &&
           <p className="project-card__area m-0">Area: {areaSqft}</p>} */}
          {Number(bhk) > 0 && (
            <p className="project-card__bhk m-0">
              {bhk} BHK
            </p>
          )}

          {/* {builderFloor &&
            <p className="project-card__builder-floor m-0">
              Builder Floor: {builderFloor}
            </p>} */}
          <div className="d-flex justify-content-between align-items-center m-0 w-100">
            {project.property_status_id_name &&
              <p className="project-card__status m-0">
                Status: <strong>{project.property_status_id_name}</strong>
              </p>}
            <button
              className="project-card__btn-view btn-viewproject m-0"
              onClick={() => onViewProject(project)}
            >
              View Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
