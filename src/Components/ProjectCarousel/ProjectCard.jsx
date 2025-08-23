"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import "./ProjectCarousel.css";

const ProjectCard = ({ project, onViewProject }) => {
  return (
    <div className="project-card">
      <div className="project-card__image-wrapper">
        <Image
          src={project.image}
          alt="project-img"
          width={300}
          height={280}
          className="project-card__image"
        />
      </div>

      <div className="project-carousel__content">
        <div className="project-card__body">
          <p className="project-card__location m-0">{project.location}</p>
          <h3 className="project-card__builder m-0">{project.builder}</h3>
          <p className="project-card__rera m-0">
            Rera No: {project.reraNo}
          </p>

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

          <p className="project-card__property-type m-0">
            Property Type: {project.propertyType}
          </p>
          <p className="project-card__price m-0">
            Ongoing Price: {project.ongoingPrice}
          </p>
          <p className="project-card__area m-0">Area: {project.areaSqft}</p>
          <p className="project-card__bhk m-0">{project.bhk}</p>
          <p className="project-card__builder-floor m-0">
            Builder Floor: {project.builderFloor}
          </p>

          <div className="d-flex justify-content-between align-items-center m-0 w-100">
            <p className="project-card__status m-0">
              Status: <strong>{project.status}</strong>
            </p>
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
