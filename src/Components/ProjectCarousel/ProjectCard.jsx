"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import "./ProjectCarousel.css";

const ProjectCard = ({ project, onViewProject }) => {

  const customFields = project.custom_field_values.reduce((acc, field) => {
    acc[field.field_name] = field.field_value;
    return acc;
  }, {});
  
  // Now you can fetch values like this:
  const ongoingPrice = customFields["total Price"] || "";  // example
  const areaSqft = customFields["super Area"] || "";
  const bhk = customFields["bedrooms"] ? `${customFields["bedrooms"]} BHK` : "";
  const builderFloor = customFields["built Up Area"] || "";
  
  console.log('==>',project)
  return (
    <div className="project-card">
      <div className="project-card__image-wrapper">
        <Image
          src={project.featured_image ||'/building.png'}
          alt="project-img"
          width={300}
          height={280}
          className="project-card__image"
        />
      </div>

      <div className="project-carousel__content">
        <div className="project-card__body">
          <p className="project-card__location m-0">{project.city.name+','+project.state.name}</p>
         {project.developer && <h3 className="project-card__builder m-0">{project.developer.name}</h3>}
         {project.reraNo &&
          <p className="project-card__rera m-0">
            Rera No: {project.reraNo}
          </p>}

          <div className="project-card__rating m-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="star">
                <FaStar className={i < project.rating ? "filled" : "unfilled"} />
              </div>
            ))}
            <span className="project-card__rating-value">
              ({project.rating}.0)
            </span>
          </div>
{project.property_type_id_name&&
          <p className="project-card__property-type m-0">
            Property Type: {project.property_type_id_name}
          </p>}
          {ongoingPrice &&
          <p className="project-card__price m-0">
            Ongoing Price: {ongoingPrice}
          </p>}{areaSqft&& 
          <p className="project-card__area m-0">Area: {areaSqft}</p>}
          {bhk && 
          <p className="project-card__bhk m-0">{bhk}</p>}
          {builderFloor &&
          <p className="project-card__builder-floor m-0">
            Builder Floor: {builderFloor}
          </p>}
          <div className="d-flex justify-content-between align-items-center m-0 w-100">
          {project.property_status_id_name&&
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
