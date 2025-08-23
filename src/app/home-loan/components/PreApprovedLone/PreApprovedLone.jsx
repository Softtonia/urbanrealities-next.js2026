"use client";
import React from "react";
// import Image from "next/image";
import styles from "./PreApprovedLone.module.css";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

export default function PreApprovedLoan() {
  return (
    <section className={`${styles.preApprovedLoan} section-padding`}>
      <div className="container p-0">
        <div className={`${styles.row} row align-items-center`}>
          {/* Left Content */}
          <div className={`${styles.col} col-lg-6 col-md-6 `}>
            <h2 className={styles.title}>Property not finalized yet?</h2>
            <p className={styles.description}>
              Unlock the power of a Pre-approved Loan. Apply now and make your property search more focused and easy.
            </p>

            <div className={styles.benefitsBox}>
              <h5>Benefits of Pre-approved loans</h5>
              <div className={styles.benefitsList}>
                <p>
                  <span className={styles.checkIcon}><IoIosCheckmarkCircleOutline/></span> Plan your budget smartly
                </p>
                <p>
                  <span className={styles.checkIcon}><IoIosCheckmarkCircleOutline/></span> Negotiate a better deal with the seller
                </p>
                <p className="m-0">
                  <span className={styles.checkIcon}><IoIosCheckmarkCircleOutline/></span> Get the loan processed quickly
                </p>
              </div>
            </div>

            <button className={styles.exploreBtn}>Explore Now</button>
          </div>

          {/* Right Image */}
          <div className={`${styles.col} col-lg-6 col-md-6 text-center`}>
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
