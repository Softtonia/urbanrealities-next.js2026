"use client";
import React from "react";
import styles from "./HowItWork.module.css";

// Icons
import { FaWpforms } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import { MdHomeWork } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import SubHero from "@/Components/SubHero/SubHero";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FaWpforms className={styles.icon} />,
      text: "Fill an online form to view the best offers from our partner banks.",
    },
    {
      icon: <FaUserTie className={styles.icon} />,
      text: "Our executive helps you choose the best offer for your requirement.",
    },
    {
      icon: <MdHomeWork className={styles.icon} />,
      text: "We pick up documents at your doorstep and submit to the bank*.",
    },
    {
      icon: <FaUniversity className={styles.icon} />,
      text: "Bank reviews your application and confirms approval.",
    },
  ];

  return (
    <div className={` ${styles.howItWorks} container`}>
      <SubHero subHeroHeading={"How it works?"} />

      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li key={index} className={styles.stepCard}>
            {step.icon}
            <p> <span className={styles.stepNumber}>{index + 1}.</span>{" "}
              {step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
