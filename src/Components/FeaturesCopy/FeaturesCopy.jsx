"use client";

import React, { useState, useEffect, useRef } from "react";
import "./FeaturesCopy.css";
import "../../app/globals.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SubHero from "../SubHero/SubHero";
import slides from "../../../public/slides";
import { formatprice } from "@/utils/formatprice";
import { get } from "@/lib/api";
import { useCity } from "@/utils/CityContext";

const FeaturesCopy = ({ projects }) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [slides, setSlides] = useState([]);
  const scrollRef = useRef(null);
  const { city, isLoadingCity } = useCity();
  // const slides = projects?.map((val) => {
  //   const banner = val?.custom_field_values?.find((f) =>
  //     f?.template?.slug?.includes("banner")
  //   );
  //   const onWardPrice = val?.custom_field_values?.find((f) =>
  //     f?.template?.slug?.includes("price")
  //   );
  //   // console.log("price",onWardPrice)
  //   return {
  //     id: val?.id,
  //     banner: banner?.field_value[0] || null, // assuming banner data is stored in field_value
  //     name: val?.name || "Untitled",
  //     views: val?.total_view || '0',
  //     property_id_name: val?.property_id_name || '',
  //     property_status: val?.["property_status"]?.map(s => s?.property_status_name)?.join(", ") || "",
  //     price: formatprice(onWardPrice?.field_value) || "",
  //     project_type: val?.["property_type "]?.map(val => val?.property_type_name)?.join(', ')
  //   };
  // });

  console.log("project", projects);




  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isLoadingCity) return; // Wait for city to be loaded

    const fetchFeatured = async () => {
      try {
        const cityQuery = city?.id ? `&city_id=${city.id}` : "";
        const response = await get(`/api/guest/posts/project-listing?featured=1${cityQuery}`);
        if (response?.data?.data && Array.isArray(response.data.data)) {
          setSlides(response.data.data);
        } else if (response?.data?.items) {
          setSlides(response.data.items);
        } else if (Array.isArray(response?.data)) {
          setSlides(response.data);
        }
      } catch (err) {
        console.error("Error fetching featured projects", err);
      }
    };
    fetchFeatured();

    setHasMounted(true); // Set mounted state to true after initial render

    return () => window.removeEventListener("resize", checkMobile);
  }, [city, isLoadingCity]);


  if (!hasMounted) return null;


  const handlePrev = () => {
    // if (isMobile) {
    //   scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: "smooth" });
    // } else {
    //   setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    // }
    if (isMobile) {
      const scrollContainer = scrollRef.current;
      if (scrollContainer.scrollLeft <= 0) {
        // Scroll to end (loop back)
        scrollContainer.scrollTo({
          left: scrollContainer.scrollWidth,
          behavior: "smooth",
        });
      } else {
        scrollContainer.scrollBy({
          left: -scrollContainer.offsetWidth,
          behavior: "smooth",
        });
      }
    } else {
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    // if (isMobile) {
    //   scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: "smooth" });
    // } else {
    //   setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    // }
    if (isMobile) {
      const scrollContainer = scrollRef.current;
      const maxScrollLeft =
        scrollContainer.scrollWidth - scrollContainer.offsetWidth;

      if (scrollContainer.scrollLeft >= maxScrollLeft - 5) {
        // Scroll to beginning (loop back)
        scrollContainer.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        scrollContainer.scrollBy({
          left: scrollContainer.offsetWidth,
          behavior: "smooth",
        });
      }
    } else {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  const getSlideClass = (index) => {
    const diff = (index - current + slides.length) % slides.length;
    switch (diff) {
      case 0:
        return "slide-main";
      case 1:
        return "slide-right1";
      case 2:
        return "slide-right2";
      case slides.length - 1:
        return "slide-left1";
      case slides.length - 2:
        return "slide-left2";
      default:
        return "slide-hidden";
    }
  };
  console.log("slides", slides);

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };


  return (
    <div className="features-copy-section">
      <div className="features-copy container">
        <div className="features-copy-heading">
          <SubHero
            subHeroHeading={city?.name ? `Popular Projects in ${city.name}` : "Popular Projects"}
            subHeroText={"EXPLORE"}
          />
        </div>

        {slides && slides.length > 0 ? (
          <div className="carousel-wrapper">
            <div
              className={`carousel-row ${isMobile ? "mobile-scroll" : ""}`}
              ref={scrollRef}
            >
              {slides.map((slide, i) => (
                <div
                  className={`slide-card ${isMobile ? "mobile-slide-card" : getSlideClass(i)}`}
                  key={i}
                >
                  <img
                    src={slide?.featured_image}
                    onError={(e) => (e.target.src = "/project-placeholder.png")}
                    alt={slide?.title || `Project ${i + 1}`}
                    className="slide-image"
                  />
                  <div className="property-overlay">
                    <div className="property-info">
                      {/* Add fallback for views and status if they exist in future, otherwise hide */}
                    </div>
                    <div className="property-action">
                      <a
                        href={`/project-details?name=${encodeURIComponent(slide.title)}&id=${slide.id}`}
                        className="explore-btn"
                      >
                        {slide.title || "Explore Project"}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              <button onClick={handlePrev} className="control-btn prev-btn">
                <FaArrowLeft />
              </button>
              <button onClick={handleNext} className="control-btn next-btn">
                <FaArrowRight />
              </button>
            </div>
          </div>
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
              <h3>No Projects Found</h3>
              <p>We couldn't find any popular projects in {city?.name || "this location"} at the moment.</p>
              <a href="/property-listing" className="empty-state-btn">Explore All Properties</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturesCopy;
