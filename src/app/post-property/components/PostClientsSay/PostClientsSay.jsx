"use client";
import { useState, useEffect } from "react";
import styles from "./PostClientsSay.module.css";

const testimonials = [
  {
    id: 1,
    name: "Lilly Bennett",
    location: "Ernakulam, Kerala",
    message:
      "Urbanrealities is a full stack service provider for all real estate needs...",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    location: "Mumbai, Maharashtra",
    message: "Very helpful and professional staff. Got my dream home.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },

  {
    id: 3,
    name: "Rahul Sharma",
    location: "Delhi",
    message: "They helped me with legal documentation. Great support!",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 4,
    name: "Priya Desai",
    location: "Ahmedabad, Gujarat",
    message: "Smooth experience from start to end.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 5,
    name: "Aman Verma",
    location: "Pune, Maharashtra",
    message: "Super satisfied with the customer service.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
  {
    id: 6,
    name: "Sneha Kapoor",
    location: "Bangalore, Karnataka",
    message: "Excellent service and great options to choose from.",
    image: "/lily.png",
    cotes: "/cotes.png",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width <= 576) {
        setVisibleCards(1.2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards(); // initial check
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const totalItems = testimonials.length;
  const maxIndex = Math.max(
    0,
    Math.ceil(totalItems - Math.floor(visibleCards))
  );
  const dotCount = maxIndex + 1;
  // Auto-slide every 3s
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, [maxIndex]);

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const translateX = `translateX(-${(100 / visibleCards) * currentIndex}%)`;

  return (
    <section className={styles.testimonialSection}>
      <h2 className={styles.heading}>What our clients say</h2>
      <div className={styles.sliderContainer}>
        <div className={styles.sliderWrapper} style={{ transform: translateX }}>
          {testimonials.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.innerCard}>
                <div className="d-flex">
                  <div className="">
                  <img src={item.cotes} alt="" /></div>
                  <p className={styles.message}>{item.message}</p>
                </div>
                <div className={styles.profile}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.avatar}
                  />
                  <div>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.location}>{item.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {Array.from({ length: dotCount }).map((_, index) => (
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
