"use client";
import React from "react";
// import Image from "next/image";
import styles from "./PreApprovedLone.module.css";

export default function PreApprovedLoan() {
  return (
    <section className={`${styles.preApprovedLoan} section-padding`}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 col-md-6 mb-4 mb-md-0" >
            <h2 className={styles.title}>Property not finalized yet?</h2>
            <p className={styles.description}>
              Unlock the power of a Pre-approved Loan. Apply now and make your property search more focused and easy.
            </p>

            <div className={styles.benefitsBox}>
              <h5>Benefits of Pre-approved loans</h5>
              <ul>
                <li>
                  <span className={styles.checkIcon}>✔</span> Plan your budget smartly
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span> Negotiate a better deal with the seller
                </li>
                <li>
                  <span className={styles.checkIcon}>✔</span> Get the loan processed quickly
                </li>
              </ul>
            </div>

            <button className={styles.exploreBtn}>Explore Now</button>
          </div>

          {/* Right Image */}
          <div className="col-lg-6 col-md-6 text-center" >
            <img
              src="/building.png"
              alt="Buildings"
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
