"use client";

import React, { useEffect, useState } from "react";
import "./Testimonials.css";
import "../../app/globals.css";
import SubHero from "../SubHero/SubHero";
import axios from "axios";
import { FaStar } from 'react-icons/fa';
const testimonialsData = [
  {
    name: "Lilly Bennett",
    location: "Ernakulam, Kerala",
    rating: 5,
    text: "“Urbanrealities is a full stack service provider for all real estate needs, with 15+ services”",
  },
  {
    name: "Lilly Bennett",
    location: "Ernakulam, Kerala",
    rating: 5,
    text: "“Urbanrealities is a full stack service provider for all real estate needs, with 15+ services”",
  },
  {
    name: "Lilly Bennett",
    location: "Ernakulam, Kerala",
    rating: 5,
    text: "“Urbanrealities is a full stack service provider for all real estate needs, with 15+ services”",
  },
];

const Testimonials = ({reviews}) => {
  console.log(reviews , "reviews")
 

  const scrollRef = React.useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <div className="testimonialsssection">
      <div className="container d-flex flex-column align-items-center">
        <h6 className="testimonials-title text-center">
          Where Every Home Tells a Story:{" "}
        </h6>
        <SubHero
          subHeroHeading={`Discover the Experiences of Our Satisfied Clients.”`}
          subHeroText={""}
        />

        <div className="testimonialsmainbody" ref={scrollRef}>
          <div className="testimonialscarddiv">
            {reviews.map((testimonial, index) => (
              <div className="testimonialcard" key={index}>
                <div className="ratingdiv">
                  <div className="starsdiv">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="star">
                        <FaStar
                          className={
                            i < (testimonial?.rating || 5) ? "filled" : "unfilled"
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <h6 className="ratingtext">{testimonial.review}</h6>
                </div>

                <div className="persondiv" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {testimonial.client_photo && (
                    <img 
                      src={testimonial.client_photo} 
                      alt={testimonial.title} 
                      style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <h6 className="name" style={{ margin: 0 }}>{testimonial.title}</h6>
                    <h6 className="location" style={{ margin: 0 }}>{testimonial.short_description}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="navigationdiv">
          <button className="navigationbtn left-btn" onClick={scrollLeft}>
            <span style={{ fontSize: "24px", color: "var(--Orange-Red)" }}>&#8592;</span>
          </button>
          <button className="navigationbtn" onClick={scrollRight}>
            <span style={{ fontSize: "24px", color: "var(--Orange-Red)" }}>&#8594;</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
