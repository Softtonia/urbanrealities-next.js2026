"'use client';";
import React from "react";
import styles from "./WhyChooseus.module.css";
import SubHero from "../SubHero/SubHero";

const WhyChooseus = () => {
  return (
    <div className={styles.whychoosesection}>
      <div className="container">
        <div className={styles.titlediv}>
          <SubHero
            subHeroHeading={"Why choose Urbanrealities"}
            subHeroText={"BENEFITS OF Urbanrealities"}
          />
        </div>
      </div>
      <div className={`${styles.whychoosemainbody} container`}>
        <div className={styles.reason1}>
          <div className={styles.icondiv}>
            <img
              src="/real_estate_agent.png"
              alt="real_estate_agent.png"
              className={styles['benifit-icon']}
            />
          </div>
          {/* <div className="reason1textdiv"> */}
          <h4 className={styles.highlight}>1. Over 12Lac properties</h4>
          <div className={`${styles.description} body-text-16`}>
            10,000+ properties are added every day
          </div>
        </div>
        <div className={styles.reason1}>
          <div className={styles.icondiv}>
            <img
              src="/add_home_work.png"
              alt="add_home_work.png"
              className={styles['benifit-icon']}
            />
          </div>
          <h4 className={styles.highlight}>2. Verification by Urbanrealities team</h4>
          <div className={`${styles.description} body-text-16`}>
            Photos/Videos and other details are
            <br /> Verified on location
          </div>
        </div>
        <div className={styles.reason1}>
          <div className={styles.icondiv}>
            <img
              src="/person_apron.png"
              alt="person_apron.png"
              className={styles['benifit-icon']}
            />
          </div>
          <h4 className={styles.highlight}>3. Large user base</h4>
          <div className={`${styles.description} body-text-16`}>
            High active user count and user engagement to
            <br /> find and close deals
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseus;
