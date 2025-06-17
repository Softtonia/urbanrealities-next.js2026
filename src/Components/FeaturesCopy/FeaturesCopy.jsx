
"use client";

import React, { useState, useEffect, useRef } from "react";
import "./FeaturesCopy.css";
import "../../app/globals.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import SubHero from "../SubHero/SubHero";

const FeaturesCopy = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1666846795617-5a79453e6f6c?q=80&w=3402&auto=format&fit=crop",
    },
    {
      image: "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop",
    },
    {
      image: "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop",
    },
    {
      image: "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop",
    },
    {
      image: "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop",
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.offsetWidth;

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
      case 0: return "slide-main";
      case 1: return "slide-right1";
      case 2: return "slide-right2";
      case slides.length - 1: return "slide-left1";
      case slides.length - 2: return "slide-left2";
      default: return "slide-hidden";
    }
  };

  return (
    <div className="features-copy-section">
      <div className="features-copy container">
        <div className="features-copy-heading">
          <h2>Our diverse range of properties ensures</h2>
                <SubHero subHeroHeading={"there's something for everyone."} subHeroText={""} />

        </div>

        <div className="carousel-wrapper">
          <div
            className={`carousel-row ${isMobile ? "mobile-scroll" : ""}`}
            ref={scrollRef}
          >
            {slides.map((slide, i) => (
              <div
                className={`slide-card ${
                  isMobile ? "mobile-slide-card" : getSlideClass(i)
                }`}
                key={i}
              >
                <img src={slide.image} alt={`Property ${i + 1}`} className="slide-image" />
                <div className="property-overlay">
                  <div className="property-info">
                    <span className="property-count">999+</span>
                    <span className="property-status">Ready To Move in</span>
                  </div>
                  <div className="property-action">
                    <a href="#" className="explore-btn">Explore All</a>
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
