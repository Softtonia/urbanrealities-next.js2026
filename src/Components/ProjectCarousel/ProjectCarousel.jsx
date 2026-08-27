"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./ProjectCarousel.css";
import { useRouter } from "next/navigation";
import SubHero from "../SubHero/SubHero";
import ProjectCard from "./ProjectCard";
import { get } from "@/lib/api";
import { useCity } from "@/utils/CityContext";

const ProjectCarousel = ({ projects }) => {
  const router = useRouter();
  const carouselRef = useRef(null);
  const scrollAmount = 850;
  const [hasMounted, setHasMounted] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const { city, isLoadingCity } = useCity();

  useEffect(() => {
    if (isLoadingCity) return; // Wait for city to be loaded

    setHasMounted(true);
    const fetchFeatured = async () => {
      try {
        const cityId = city?.id || 16;
        const response = await get(
          `/api/frontend/city-explore/featured-properties?city_id=${cityId}&page=1&per_page=15`,
        );
        if (response?.data?.data && Array.isArray(response.data.data)) {
          setFeaturedProjects(response.data.data);
        } else if (response?.data?.items) {
          setFeaturedProjects(response.data.items);
        } else if (Array.isArray(response?.data)) {
          setFeaturedProjects(response.data);
        }
      } catch (err) {
        console.error("Error fetching featured properties", err);
      }
    };
    fetchFeatured();
  }, [city, isLoadingCity]);

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

  const handleProject = async (project) => {
    const { slugify } = await import("@/utils/slugify");
    const propertyName = project?.property_id_name || project?.title || project?.name || "property";
    const slug = slugify(propertyName);
    router.push(
      `/propertydetails/${slug}?id=${project.id}`,
    );
  };

  const displayProjects = (featuredProjects.length > 0 ? featuredProjects : projects || []).filter(p => p && (p.id || p.title || p.name));

  return (
    <div className="container">
      <div className="project-caro-title">
        <SubHero subHeroHeading={"Featured Property"} subHeroText={""} />
      </div>

      {displayProjects.length > 0 ? (
        <>
          <div className="project-carousel" ref={carouselRef}>
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                onViewProject={handleProject}
              />
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
        </>
      ) : (
        <div className="empty-state-wrapper">
          <div className="empty-state-content">
            <div className="empty-state-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                <circle cx="10" cy="10" r="4" fill="#fff" stroke="#ff6b35" strokeWidth="2"></circle>
                <line x1="12.5" y1="12.5" x2="16" y2="16" stroke="#ff6b35" strokeWidth="2"></line>
              </svg>
            </div>
            <h3>No Featured Properties</h3>
            <p>We couldn't find any featured properties in {city?.name || "this location"} at the moment.</p>
            <a href="/property-listing" className="empty-state-btn">Explore All Properties</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCarousel;
