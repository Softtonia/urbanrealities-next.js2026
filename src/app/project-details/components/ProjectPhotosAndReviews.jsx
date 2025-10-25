"use client";
import React, { useState, useEffect } from "react";

import styles from "./ProjectPhotosAndReviews.module.css";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { useProject } from "../context/ProjectContext";
import Image from "next/image";
const images = [
  "/image-card.png",
  "/image-card.png",
  "/image-card.png",
  "/image-card.png",
  "/image-card.png",
  "/image-card.png",

];
const visibleCount = 3;
const ProjectPhotosAndReviews = () => {
  const { project, setSection } = useProject();
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = images.length;

  // Infinite loop
  const maxIndex = images.length - visibleCount;
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev < totalSlides - visibleCount ? prev + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev > 0 ? prev - 1 : totalSlides - visibleCount
    );
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextSlide();
  //   }, 3000); // Auto slide every 3 sec
  //   return () => clearInterval(interval);
  // }, []);


  const hero = project?.repeater_fields?.filter(
    (val) =>
      val?.template?.slug?.startsWith("herosection") &&
      (val.template.slug.includes("gallery"))
  ) || [];

  const gallery = hero.find((val) =>
    val.template.slug.includes("gallery")
  )?.field_value;


  const reviews = [
    {
      name: "Bipin",
      role: "Agent (Local Guide)",
      date: "18/06/2022",
      rating: 3,
      title: "Nice Location",
      content:
        "One of the luxury project at commaught place with high and luxury amenities.",
    },
    {
      name: "Bipin",
      role: "Agent (Local Guide)",
      date: "18/06/2022",
      rating: 3,
      title: "Nice Location",
      content:
        "One of the luxury project at commaught place with high and luxury amenities.",
    },
  ];
  // useEffect(() => {
  //   if (!gallery || gallery.length === 0) {
  //     setSection(prev => ({
  //       ...prev,
  //       "Project Details": false
  //     }));
  //   }
  // }, [gallery]);
  useEffect(() => {
    const noFAQs = !gallery || gallery.length === 0;

    setSection(prev => {
      if (prev["Project Details"] === !noFAQs) return prev; // skip if already correct
      return { ...prev, "Project Details": !noFAQs };
    });
  }, [gallery, setSection]);

  if (!gallery || gallery.length === 0) return null
  console.log(gallery)
  return (
    <div className={styles.projectSection}>
      <h2 className={styles.projectHeading}>{project.name} Details</h2>
      <p className={styles.projectSubheading}>
        Photos of {project.name}
      </p>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselTrackWrapper}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
            }}
          >
            {gallery.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                width={324}
                height={247}
                alt={`slide-${idx}`}
                className={styles.carouselImg}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.photoControls}>
        {/* <a href="#" className={styles.seeAll}>
          See all photos →
        </a> */}
        <div className={styles.arrows}>
          <button className={styles.arrowBtn} onClick={prevSlide}>
            <FaArrowLeft />
          </button>
          <button className={styles.arrowBtn} onClick={nextSlide}>
            <FaArrowRight />
          </button>
        </div>
      </div>
      {/* <h3 className={styles.reviewHeading}>
        Mundeshwari Connaught One Reviews & Ratings
      </h3>
      <div className={styles.reviewsRow}>
        {reviews.map((review, index) => (
          <div className={styles.reviewCard} key={index}>
            <div className={styles.reviewHeader}>
              <div className={styles.avatar}>B</div>
              <div>
                <p className={styles.reviewName}>{review.name}</p>
                <p className={styles.reviewRole}>{review.role}</p>
              </div>
              <div className={styles.reviewMeta}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${styles.star} ${
                        i < review.rating ? styles.filled : ""
                      }`}
                    />
                  ))}
                </div>
                <p className={styles.reviewDate}>{review.date}</p>
              </div>
            </div>
            <h4 className={styles.reviewTitle}>{review.title}</h4>
            <p className={styles.reviewContent}>{review.content}</p>
          </div>
        ))}
      </div> */}

      {/* <button className={styles.writeReviewBtn}>Write a review</button> */}
    </div>
  );
};

export default ProjectPhotosAndReviews;
