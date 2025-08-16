"use client";
import React from "react";
import styles from "./ContactInfo.module.css";

const ContactInfo = () => {
  return (
<div className={styles.infoWrapper}>
  <div className={styles.images}>
    <img src="/ownerproperties1.png" alt="House 1" className={styles.mainImage} />
    <div className={styles.subimages}>
      <img src="/ownerproperties2.png" alt="House 2" />
      <img src="/ownerproperties3.png" alt="House 3" />
    </div>
  </div>
</div>

  );
};

export default ContactInfo;
