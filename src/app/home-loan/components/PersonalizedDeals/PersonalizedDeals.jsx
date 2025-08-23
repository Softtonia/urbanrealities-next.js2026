"use client";
import React from "react";
import styles from "./PersonalizedDeals.module.css";
import SubHero from "@/Components/SubHero/SubHero";
const dealsData = [
  {
    img: "/private-employees.png",
    title: "Private Employees",
    text: "Discover home loan offers for private employees with attractive rates and quick approval.",
  },
  {
    img: "/government-employees.png",
    title: "Government Employees",
    text: "Build your dream home with an easy and affordable home loan for government employees.",
  },
  {
    img: "/cash-income.png",
    title: "Cash Income With Irregular ITR",
    text: "Don't let your irregular cash income stop you from owning a home. Check out our home loan options now.",
  },
  {
    img: "/self-employed.png",
    title: "Self-Employed With ITR",
    text: "Unlock your perfect home with an attractive offer that is personalized for your needs.",
  },
];

const PersonalizedDeals = () => {
  return (
    <section className={`${styles.dealsSection} container `}>
      <div className={styles.dealsHeader}>
       <SubHero subHeroHeading={"Personalized deals for everyone"} />
         <p className={styles.dealsSubText}>{"Unlock the power of a Pre-approved Loan. Apply now and make your property search more focused and easy."}</p>
      </div>

      <div className={styles.dealsGrid}>
        {dealsData.map((deal, index) => (
          <div key={index} className={styles.dealCard}>
            <img src={deal.img} alt={deal.title} className={styles.dealImage} />
                  <div className={styles.dealsContent}>
            <h3 className={styles.dealTitle}>{deal.title}</h3>
            <p className={styles.dealText}>{deal.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PersonalizedDeals;
