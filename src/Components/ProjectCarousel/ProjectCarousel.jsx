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

  const handleProject = (project) => {
    const name = project.name || project.title;
    const propertyName = project.property_id_name || project.title;
    router.push(
      `/propertydetails/${propertyName}?id=${project.id}`,
    );
  };

  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : projects || [];

  return (
    <div className="container">
      <div className="project-caro-title">
        <SubHero subHeroHeading={"Featured Property"} subHeroText={""} />
      </div>

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
    </div>
  );
};

export default ProjectCarousel;
