"use client";
import styles from "./company-bg.module.css"; // Import the CSS module
import Link from "next/link";
import Breadcrumbs from "@/Components/All-Breadcrumbs/Breadcrumbs";

const CompanyBg = ({ imageUrl }) => {
  const defaultImage = "/project_details_hero.png"; // Default image path
  const bgImage = imageUrl && imageUrl.trim() !== "" ? imageUrl : defaultImage;
  
  return (
    <div className={styles["section-header"]}
    style={{ backgroundImage: `url(${bgImage})` }}>
      {/* <h1 className=''>Our wall of love</h1> */}
      <div className="">
        <Breadcrumbs color="white"   fontSize="1.1rem"  fontFamily="poppins-medium"  />
      </div>
    </div>
  );
};

export default CompanyBg;
