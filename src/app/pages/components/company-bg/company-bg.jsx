"use client";
import styles from "./company-bg.module.css"; // Import the CSS module
import Link from "next/link";
import PrivacyPolicy from "./../../privacy-policy/components/Privacy-Policy";

const companybg = () => {
  return (
    <div className={styles["section-header"]}>
      {/* <h1 className=''>Our wall of love</h1> */}
      <div className="">
        <Link href="" className={` ${styles["company-link"]}`}>
          Home
        </Link>
        <Link href="" className={` ${styles["company-link"]}`}>
          /PrivacyPolicy
        </Link>
      </div>
    </div>
  );
};

export default companybg;
