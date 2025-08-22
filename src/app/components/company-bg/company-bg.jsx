"use client";
import styles from "./company-bg.module.css"; // Import the CSS module
import Link from "next/link";
import Breadcrumbs from "@/Components/All-Breadcrumbs/Breadcrumbs";

const companybg = () => {
  return (
    <div className={styles["section-header"]}>
      {/* <h1 className=''>Our wall of love</h1> */}
      <div className="">
        {/* <Link href="" className={` ${styles["company-link"]}`}>
          Home
        </Link>
        <Link href="" className={` ${styles["company-link"]}`}>
          /PrivacyPolicy
        </Link> */}
        <Breadcrumbs color="white"   fontSize="1.1rem"  fontFamily="poppins-medium"  />
      </div>
    </div>
  );
};

export default companybg;
