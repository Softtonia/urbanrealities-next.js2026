'use client';

import React from "react";
import PostPropertySteps from "./components/PostPropertySteps/PostPropertySteps";
import PostStats from "./components/PostStats/PostStats";
import FAQAccordion from "@/Components/FAQAccordion/FAQAccordion";
import ProjectFAQ from "@/Components/FAQAccordion/ProjectFAQ";
import styles from "./components/Post-property-page.module.css";
import PostPropertySection from "./components/PostPropertySection/PostPropertySection";
import PostClientsSay from "./components/PostClientsSay/PostClientsSay";
const page = () => {
  return (
    <>
      <div className={`container ${styles["post-container"]} `}>
        <PostPropertySection />
        <PostPropertySteps />
        <PostStats />
      </div>
      <div className={`${styles["postClient-container"]} `}>
         <div className={`container ${styles["post-container"]} `}>
        <PostClientsSay />
        </div>
      </div>
      <div className={`container ${styles["post-container"]} `}>
        <div className={styles.faqAccordion}>
          <FAQAccordion />
        </div>
        <div className={styles.projectFAQ}>
          <ProjectFAQ />
        </div>

      </div>
    </>
  );
};

export default page;
