"use client";
import React, { useEffect, useState } from "react";
import styles from "./About-Us.module.css";
import WhyChooseus from "@/Components/WhyChoose/WhyChooseus";

export default function AboutUs() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const res = await fetch(`api/pages/about-us`);
        const result = await res.json();
        if (result) {
          setData(result.data);
        }
      } catch (err) {
        console.error("Error fetching page:", err);
      }
    };
    fetchAboutUs();
  }, []);

  return (
    <>
      <div className={`${styles.container} container`}>
        <div className={styles.aboutSection}>
          <h1 className={styles.heroHeading}>About Us</h1>
          <p className={styles.text}>
            Urban Realities is India’s leading property platform, connecting buyers,
            sellers, landlords, and agents. We offer a comprehensive suite of
            services including verified property listings, home loans, interior 
            design solutions, and expert real estate advice.
          </p>

          <h2 className={styles.subHeading}>What We Offer</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Broker-Free Listings</h3>
              <ul className={styles.list}>
                <li>Verified properties from direct owners.</li>
                <li>Shared accommodations available.</li>
              </ul>
            </div>
            
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Smart Search Experience</h3>
              <ul className={styles.list}>
                <li>Heuristic-driven tools to help users shortlist properties from home.</li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Microsite Builder</h3>
              <ul className={styles.list}>
                <li>Create personalized property pages.</li>
              </ul>
            </div>
            
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>Market Insights</h3>
              <ul className={styles.list}>
                <li>Price trends, forecasts, and locality reviews.</li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>End-to-End Services</h3>
              <ul className={styles.list}>
                <li>From discovery to post-transaction support.</li>
              </ul>
            </div>
          </div>

          <h2 className={styles.subHeading}>Who We Serve</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <h3 className={styles.cardTitle}>For Buyers & Renters</h3>
              <ul className={styles.list}>
                <li>Browse, shortlist, and finalize properties quickly.</li>
                <li>Access detailed property information and virtual tours.</li>
                <li>Get financing and interior solutions in one place.</li>
              </ul>
            </div>

            <div className={styles.card}>
              <h3 className={styles.cardTitle}>For Sellers & Landlords</h3>
              <ul className={styles.list}>
                <li>Advertise properties easily.</li>
                <li>Reach a large audience of verified buyers and tenants.</li>
                <li>
                  Email us at{" "}
                  <a href="mailto:assist@urbanrealities.com" className={styles.link}>
                    assist@urbanrealities.com
                  </a>{" "}
                  to get started.
                </li>
              </ul>
            </div>
          </div>

          <h2 className={styles.subHeading}>Our Vision & Mission</h2>
          <div className={styles.missionVisionSection}>
            <ul className={`${styles.list} ${styles.missionVisionList}`}>
              <li>
                <strong>Vision:</strong> Changing the way India experiences property.
              </li>
              <li>
                <strong>Mission:</strong> To be the first choice for discovering,
                renting, buying, selling, and financing homes—powered by data, design,
                and technology.
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <WhyChooseus />
    </>
  );
}
