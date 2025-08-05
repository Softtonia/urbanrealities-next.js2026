'use client';

import React from "react";
import Image from "next/image";
import styles from "./PostPropertySection.module.css";
import PostPropertyForm from "../PostPropertyForm/PostPropertyForm";

const PostPropertySection = () => {
  const postdata = {
    dummyUserTypes: ["Owner", "Buyer", "Agent", "Developer"],
    dummyListingPurposes: ["Rent", "Buy", "Sell"],
    postPropertyAdd: [
      "Get Access to 4 Lakh+ Buyers",
      "Sell Faster with Premium Service",
      "Get Expert Advice on Market Trends and Insights",
    ],
  };

  return (
    <>
      <div className={styles.postFormContainer}>
        <div className={styles.postFormLeft}>
          <Image
            src="/post-property-girl.png"
            alt="Woman with laptop"
            width={429}
            height={526}
            className={styles.postFormImage}
          />

          <div className={styles.postFormBenefitsWrapper}>
            <div className={styles.postFormBenefits}>
              <h2 className={`top-heading ${styles["post-add"]}`}>
                Post property Ad to sell or rent online for
                <span className={` top-heading  ${styles.postFormHighlight}`}>Free!</span>
              </h2>
              <div className={styles.postList}>
                {postdata.postPropertyAdd.map((step, index) => (
                  <p key={index} className={`body-text-20 ${styles.postListItem}`}>
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.postFormRight}>
          <PostPropertyForm />
        </div>
      </div>

      {/*1270 Benefits Only */}
      <div className={styles.postMobileBenefitsWrapper}>
        <div className={styles.postFormBenefits}>
          <h2 className={`top-heading ${styles["post-add"]}`}>
            Post property Ad to sell or rent online for
             <span className={` top-heading  ${styles.postFormHighlight}`}>Free!</span>
          </h2>
          <div className={styles.postList}>
            {postdata.postPropertyAdd.map((step, index) => (
              <p key={index} className={`body-text-20 ${styles.postListItem}`}>
                {step}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPropertySection;
