"use client";

import React, { useState, useEffect, useRef } from "react";
import "./FeaturesCopy.css";
import "../../app/globals.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SubHero from "../SubHero/SubHero";
import slides from "../../../public/slides";
import { formatprice } from "@/utils/formatprice";

const FeaturesCopy = ({ projects }) => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const scrollRef = useRef(null);
  const slides = projects?.map((val) => {
    const banner = val?.custom_field_values?.find((f) =>
      f?.template?.slug?.includes("banner")
    );
    const onWardPrice = val?.custom_field_values?.find((f) =>
      f?.template?.slug?.includes("price")
    );
    // console.log("price",onWardPrice)
    return {
      id: val?.id,
      banner: banner?.field_value[0] || null, // assuming banner data is stored in field_value
      name: val?.name || "Untitled",
      views: val?.total_view || '0',
      property_id_name: val?.property_id_name || '',
      property_status: val?.["property_status"]?.map(s => s?.property_status_name)?.join(", ") || "",
      price: formatprice(onWardPrice?.field_value) || ""
    };
  });

  console.log("project", projects);


  // const slides = [
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1666846795617-5a79453e6f6c?q=80&w=3402&auto=format&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop",
  //   },
  //   {
  //     image:
  //       "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop",
  //   },
  // ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    setHasMounted(true); // Set mounted state to true after initial render


    return () => window.removeEventListener("resize", checkMobile);
  }, []);


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
          <h2>Our diverse range of properties ensures</h2>
          <SubHero
            subHeroHeading={"there's something for everyone."}
            subHeroText={""}
          />
        </div>

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
                  src={slide?.banner}
                  onError={(e) => (e.target.src = "/project-placeholder.png")}
                  alt={`Project ${i + 1}`}
                  className="slide-image"
                />
                <div className="property-overlay">
                  <div className="property-info">
                    <span className="property-count">{slide.views}+</span>
                    <span className="property-status">{slide.property_status}</span>
                  </div>
                  <div className="property-action">
                    <a
                      href={`/project-details?name=${slide.name}&property-name=${slide.property_id_name}&id=${slide.id}`}
                      className="explore-btn"
                    >
                      {slide.name}
                    </a>
                    {/* {
                      slide?.property_id_name && (
                        <p className="explore-btn-feature">
                          {slide?.property_id_name}
                        </p>)
                    }
                    {slide?.price &&
                      <p className="explore-btn-feature">
                        ₹<span>{slide?.price}</span> onwards</p>
                    } */}
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
      </div>
    </div>
  );
};

export default FeaturesCopy;
