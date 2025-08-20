"use client";
import React from "react";
import styles from "./About-Us.module.css";


export default function AboutUs() {
  return (
    <div className={`{styles.container} container `}>
        <div className={styles.aboutSection}>
      <h4 className={styles.heading}>About Us</h4>
      <p className={styles.text}>
        Urban Realities is India’s leading property platform, connecting buyers,
        sellers, landlords, and agents. We offer a comprehensive suite of
        services including:
      </p>

      <ul className={styles.list}>
        <li>Verified property listings</li>
        <li>Home loans</li>
        <li>Interior design solutions</li>
        <li>Expert real estate advice</li>
      </ul>

      <h5 className={styles.subHeading}>What We Offer</h5>
      <ul className={styles.list}>
        <li>
          <strong>Broker-Free Listings:</strong> Verified properties from direct
          owners and shared accommodations.
        </li>
        <li>
          <strong>Smart Search Experience:</strong> Heuristic-driven tools to
          help users shortlist properties from home.
        </li>
        <li>
          <strong>Microsite Builder:</strong> Create personalized property
          pages.
        </li>
        <li>
          <strong>Market Insights:</strong> Price trends, forecasts, and
          locality reviews.
        </li>
        <li>
          <strong>End-to-End Services:</strong> From discovery to
          post-transaction support.
        </li>
      </ul>

      <h5 className={styles.subHeading}>For Buyers & Renters</h5>
      <ul className={styles.list}>
        <li>Browse, shortlist, and finalize properties quickly.</li>
        <li>Access detailed property information and virtual tours.</li>
        <li>Get financing and interior solutions in one place.</li>
      </ul>

      <h5 className={styles.subHeading}>For Sellers & Landlords</h5>
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

      <h5 className={styles.subHeading}>Our Vision & Mission</h5>
      <ul className={styles.list}>
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
  );
}
