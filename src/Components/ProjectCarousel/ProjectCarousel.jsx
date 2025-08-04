"use client";
import React, { useRef,useState,useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./ProjectCarousel.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SubHero from "../SubHero/SubHero";
import { FaStar } from "react-icons/fa";

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

const ProjectCarousel = () => {
  const router = useRouter();
  const carouselRef = useRef(null);
  const scrollAmount = 850;
const [hasMounted, setHasMounted] = useState(false);

 useEffect(() => {
    setHasMounted(true); // ✅ Mark when mounted
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
    const query = new URLSearchParams(project).toString();
    router.push(`/project-details?${query}`);
  };

  return (
    <div className="container">
      <div className="project-caro-title">
        <SubHero subHeroHeading={"Features Project"} subHeroText={""} />
      </div>

      <div className="project-carousel" ref={carouselRef}>
        {projectData.map((project, index) => (
          <div key={index} className="project-card">
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
                      <FaStar
                        className={i < project.rating ? "filled" : "unfilled"}
                      />
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
                <p className="project-card__area m-0">
                  Area: {project.areaSqft}
                </p>
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
                    onClick={() => handleProject(project)}
                  >
                    View Project
                  </button>
                </div>
              </div>
            </div>
          </div>
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
