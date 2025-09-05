"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./ProjectCarousel.css";
import { useRouter } from "next/navigation";
import SubHero from "../SubHero/SubHero";
import ProjectCard from "./ProjectCard";

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

const ProjectCarousel = ({projects}) => {
  const router = useRouter();
  const carouselRef = useRef(null);
  const scrollAmount = 850;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft -= scrollAmount;
    }
  };

  const handleProject = (project) => {

    // const query = new URLSearchParams(project).toString();
    router.push(`/project-details?name=${project.name}&property-name=${project.property_id_name}&id=${project.id}`);
  };

  return (
    <div className="container">
      <div className="project-caro-title">
        <SubHero subHeroHeading={"Features Project"} subHeroText={""} />
      </div>

      <div className="project-carousel" ref={carouselRef}>
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} onViewProject={handleProject} />
        ))}
      </div>

      <div className="project-carousel__buttons">
        <button
          onClick={handlePrev}
          className="project-carousel__nav-btn project-carousel__nav-btn--prev"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={handleNext}
          className="project-carousel__nav-btn project-carousel__nav-btn--next"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ProjectCarousel;
