"use client";
import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./AgentCarousel.css";
import TopAgentCard from "./TopAgentCard";

const AgentCarousel = ({ agents }) => {
  const carouselRef = useRef(null);
  const scrollAmount = 340; // Card width + gap

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

  if (!agents || agents.length === 0) {
    return null; // Should be handled by the parent, but fallback just in case
  }

  return (
    <div className="agent-carousel-wrapper">
      <div className="agent-carousel" ref={carouselRef}>
        {agents.map((agent, index) => (
          <TopAgentCard key={index} agent={agent} />
        ))}
      </div>

      {agents.length > 3 && (
        <div className="agent-carousel__buttons">
          <button
            onClick={handlePrev}
            className="agent-carousel__nav-btn"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNext}
            className="agent-carousel__nav-btn"
          >
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentCarousel;
