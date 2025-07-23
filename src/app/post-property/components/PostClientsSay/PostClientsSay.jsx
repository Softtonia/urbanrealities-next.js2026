"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./PostClientsSay.module.css";

const testimonials = [
  {
    id: 1,
    name: "Lilly Bennett",
    location: "Ernakulam, Kerala",
    message:
      "Urbanrealities is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    location: "Mumbai, Maharashtra",
    message:
      "Urbanrealities is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 3,
    name: "Rahul Sharma",
    location: "Delhi",
    message:
      "Urbanrealities is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 4,
    name: "Priya Desai",
    location: "Ahmedabad, Gujarat",
    message:
      "Urbanrealities is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 5,
    name: "Aman Verma",
    location: "Pune, Maharashtra",
    message:
      "Urbanrealities is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 6,
    name: "Sneha Kapoor",
    location: "Bangalore, Karnataka",
    message:
      "Urbanrealities is a full stack service provider for all real estate needs, with 15+ services including home loans, pay rent, packers and movers, legal assistance.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const sliderRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setVisibleCards(1);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCards);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    if (isDragging) {
      if (startX - endX > 50) {
        // Swipe left
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
      } else if (endX - startX > 50) {
        // Swipe right
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
      setIsDragging(false);
    }
  };
  const translateX = `translateX(-${(100 / visibleCards) * currentIndex}%)`;
  return (
    <section className={styles.testimonialSection}>
      <h2 className={`${styles.heading} body-text-20 `}>What our clients say</h2>
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderWrapper}
          ref={sliderRef}
          style={{ transform: translateX }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {testimonials.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.innerCard}>
                <div className={styles.quoteRow}>
                  <img src={item.cotes} alt="" />
                  <p className={`${styles.message} text-center `}>{item.message}</p>
                </div>
                <div className={styles.profile}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.avatar}
                  />
                  <div>
                    <p className={`${styles.name} body-text-md18 `}>{item.name}</p>
                    <p className={`${styles.location}`}>{item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              currentIndex === index ? styles.active : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </section>
  );
}
