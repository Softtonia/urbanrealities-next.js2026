"use client"

import React, { useState, useEffect, useRef } from "react";
import "./FeaturesCopy.css";
import "../../app/globals.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const FeaturesCopy = () => {
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1666846795617-5a79453e6f6c?q=80&w=3402&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1642878542442-46f76aaae355?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1662236337008-e546a2359f45?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () => {
    if (isMobile && carouselRef.current) {
      // On mobile, scroll the container
      const cardWidth = 260 + 15; // card width + gap
      carouselRef.current.scrollLeft -= cardWidth;
    } else {
      // On desktop, update the active slide index
      setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    if (isMobile && carouselRef.current) {
      // On mobile, scroll the container
      const cardWidth = 260 + 15; // card width + gap
      carouselRef.current.scrollLeft += cardWidth;
    } else {
      // On desktop, update the active slide index
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }
  };

  // Calculate indices for visible slides
  const left2 = (current - 2 + slides.length) % slides.length;
  const left1 = (current - 1 + slides.length) % slides.length;
  const right1 = (current + 1) % slides.length;
  const right2 = (current + 2) % slides.length;

    return (
    <div className="features-copy-section">
      <div className="features-copy-container">
        <div className="features-copy-heading">
          <h2>"Featured Projects"</h2>
          <div className="heading-underline"></div>
        </div>

        <div className="carousel-wrapper">
          <div className="carousel-row" ref={carouselRef}>
            {!isMobile ? (
              <>
                {/* Left 2 */}
                <div className="slide-card slide-left2">
                  <img 
                    src={slides[left2].image} 
                    alt="Property" 
                    className="slide-image"
                  />
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
                
                {/* Left 1 */}
                <div className="slide-card slide-left1">
                  <img 
                    src={slides[left1].image} 
                    alt="Property" 
                    className="slide-image"
                  />
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
                
                {/* Right 1 */}
                <div className="slide-card slide-right1">
                  <img 
                    src={slides[right1].image} 
                    alt="Property" 
                    className="slide-image"
                  />
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
                
                {/* Right 2 */}
                <div className="slide-card slide-right2">
                  <img 
                    src={slides[right2].image} 
                    alt="Property" 
                    className="slide-image"
                  />
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
                
                {/* Main (center) card rendered last for overlap) */}
                <div className="slide-card slide-main">
                  <img 
                    src={slides[current].image} 
                    alt="Property" 
                    className="slide-image"
                  />
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
              </>
            ) : (
              // For mobile: horizontal slider with all slides
              <>
                {slides.map((slide, index) => (
                  <div className="slide-card" key={index}>
                    <img 
                      src={slide.image} 
                      alt={`Property ${index + 1}`} 
                      className="slide-image"
                    />
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
              </>
            )}
          </div>
          
          <div className="carousel-controls">
            <button
              onClick={handlePrev}
              className="control-btn prev-btn"
              aria-label="Previous slide"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={handleNext}
              className="control-btn next-btn"
              aria-label="Next slide"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesCopy;