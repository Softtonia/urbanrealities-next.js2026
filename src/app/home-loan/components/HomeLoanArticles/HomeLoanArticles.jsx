"use client";
import React from "react";
import styles from "./HomeLoanArticles.module.css";
import  SubHero from '@/Components/SubHero/SubHero';
const articles = [
  {
    id: 1,
    img: "/ownerproperties4.png",
    title: "What happens if you fail to repay your home loan?",
  },
  {
    id: 2,
    img: "/ownerproperties4.png",
    title: "Should you repay your home loan?",
  },
  {
    id: 3,
    img: "/ownerproperties4.png",
    title: "6 things to know about home loan transfer",
  },
  {
    id: 4,
    img: "/ownerproperties4.png",
    title: "6 things to know about home loan transfer",
  },
];

export default function HomeLoanArticles() {
  return (
    <section className={`${styles.dealsSection} container `}>
      <div className={styles.dealsHeader}>
       <SubHero subHeroHeading={"Home Loan News & Articles "} />
      </div>

      <div className={styles.dealsGrid}>
        {articles.map((article, index) => (
          <div key={index} className={styles.dealCard}>
            <img src={article.img} alt={article.title} className={styles.dealImage} />
                  <div className={styles.dealsContent}>
            <h3 className={styles.dealTitle}>{article.title}</h3>
            {/* <p className={styles.dealText}>{article.text}</p> */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
