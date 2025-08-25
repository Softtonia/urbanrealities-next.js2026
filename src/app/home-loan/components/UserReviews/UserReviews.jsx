"use client";
import React from "react";
import styles from "./UserReviews.module.css";
import  SubHero from '@/Components/SubHero/SubHero';

const reviews = [
  {
    name: "Y N CHOUDHARY",
    text: "I received good service and all information from Magicbricks home loan executive. He helped me at all stages, also bank service was really good. Thanks",
    img: "/agent-img.png",
  },
  {
    name: "Suman",
    text: "I received good service and all information from Magicbricks home loan executive. He helped me at all stages, also bank service was really good. Thanks",
    img: "/agent-img.png",
  },
  {
    name: "Madhusudan",
    text: "I received good service and all information from Magicbricks home loan executive. He helped me at all stages, also bank service was really good. Thanks",
    img: "/agent-img.png",
  },
  {
    name: "Y N CHOUDHARY",
    text: "I received good service and all information from Magicbricks home loan executive. He helped me at all stages, also bank service was really good. Thanks",
    img: "/agent-img.png",
  },
  {
    name: "Suman",
    text: "I received good service and all information from Magicbricks home loan executive. He helped me at all stages, also bank service was really good. Thanks",
    img: "/agent-img.png",
  },
  {
    name: "Madhusudan",
    text: "I received good service and all information from Magicbricks home loan executive. He helped me at all stages, also bank service was really good. Thanks",
    img: "/agent-img.png",
  },
  // Add more reviews here
];

export default function UserReviews() {
  return (
    <section className={`${styles.userReviews} container`}>
        <div className={styles.heading}>
      <SubHero subHeroHeading="What our users are saying" />
      </div>
      <div className={styles.scrollWrapper}>
        {reviews.map((review, index) => (
          <div className={styles.card} key={index}>
            <p className={styles.text}>{review.text}</p>
            <div className={styles.user}>
              <img src={review.img} alt={review.name} />
              <span>{review.name}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
