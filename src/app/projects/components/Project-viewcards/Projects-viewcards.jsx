"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import styles from "./Projects-viewcards.module.css";
import { useSearch } from "@/hooks/useSearch";
import PropertyFilters from "@/Components/PropertyFilters/filtertabs";
import SingleListingWithTab from "@/app/search/[search]/components/SingleTabs/SingleListingwithTabs";

const projectData = [
  {
    location: "Ernakulam, Kerala",
    builder: "Ganesh Property",
    reraNo: "HN-604501",
    rating: 4,
    propertyType: "Residents",
    ongoingPrice: "2 - 3 Cr",
    areaSqft: "1720sqft",
    bhk: "3BHK",
    builderFloor: "1700sqft",
    status: "Underconstruction",
    image: "/projectcarouselimage.png",
  },
  {
    location: "Mumbai, Maharashtra",
    builder: "Shriram Realty",
    reraNo: "MH-892341",
    rating: 5,
    propertyType: "Apartments",
    ongoingPrice: "1.5 - 2.2 Cr",
    areaSqft: "1500sqft",
    bhk: "2BHK",
    builderFloor: "1480sqft",
    status: "Ready to Move",
    image: "/projectcarouselimage.png",
  },
  {
    location: "Bangalore, Karnataka",
    builder: "Prestige Group",
    reraNo: "KA-123456",
    rating: 5,
    propertyType: "Villa",
    ongoingPrice: "3.2 Cr",
    areaSqft: "2000sqft",
    bhk: "4BHK",
    builderFloor: "1980sqft",
    status: "Underconstruction",
    image: "/projectcarouselimage.png",
  },
];

const ProjectsViewCards = ({ project, onViewProject }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.projectCardImageWrapper}>
        <Image
          src={project.image}
          alt="project-img"
          width={300}
          height={280}
          className={styles.projectCardImage}
        />
      </div>

      <div className={styles.projectCarouselContent}>
        <div className={styles.projectCardBody}>
          <p className={styles.projectCardLocation}>{project.location}</p>
          <h3 className={styles.projectCardBuilder}>{project.builder}</h3>
          <p className={styles.projectCardRera}>Rera No: {project.reraNo}</p>

          <div className={styles.projectCardRating}>
            {[...Array(5)].map((_, i) => (
              <div key={i} className={styles.star}>
                <FaStar
                  className={i < project.rating ? styles.filled : styles.unfilled}
                />
              </div>
            ))}
            <span className={styles.projectCardRatingValue}>
              ({project.rating}.0)
            </span>
          </div>

          <p className={styles.projectCardPropertyType}>
            Property Type: {project.propertyType}
          </p>
          <p className={styles.projectCardPrice}>
            Ongoing Price: {project.ongoingPrice}
          </p>
          <p className={styles.projectCardArea}>Area: {project.areaSqft}</p>
          <p className={styles.projectCardBhk}>{project.bhk}</p>
          <p className={styles.projectCardBuilderFloor}>
            Builder Floor: {project.builderFloor}
          </p>

          <div className="d-flex justify-content-between align-items-center w-100">
            <p className={styles.projectCardStatus}>
              Status: <strong>{project.status}</strong>
            </p>
            <button
              className={`${styles.projectCardBtnView} btn-viewproject`}
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

// agar map karna hai
const ProjectsList = ({ onViewProject }) => {
  const { payload, debouncedFilters, searchResults } = useSearch({ autoPush: false })
  // const [searchResults,setSearchResults] =useState();

  
  const filters = []

  return (
    <div>
      <PropertyFilters initialFilters={debouncedFilters} location="project"/>
      <div className={`row ${styles["tab-row"]}`}>
        <div className={`col-12 ${styles["listing-col"]}`}>
          <SingleListingWithTab filters={filters} searchResults={searchResults} comeFirst="New Project"/>
        </div>
        {/* <div className={styles.projectCarousel}>
        {projectData.map((proj, idx) => (
          <ProjectsViewCards key={idx} project={proj} onViewProject={onViewProject} />
        ))} */}
      </div>
    </div>
  );
};

export default ProjectsList;
