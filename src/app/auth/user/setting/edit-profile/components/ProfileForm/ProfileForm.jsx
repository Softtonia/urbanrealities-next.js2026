"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileForm.module.css";
import { useDashboard } from "../../../../DashboardContext/DashboardContext";

const ProfileForm = () => {
  const { setShowSidebar, setPageHeading } = useDashboard();
const fileInputRef = useRef(null);
const [profileImage, setProfileImage] = useState("/Albert-Camus.png");


  useEffect(() => {
    // setShowSidebar(false); // hide sidebar
    setPageHeading(""); // hide heading

    return () => {
      // setShowSidebar(true); // reset for other pages
      setPageHeading("Welcome Back! Urbanrealities");
    };
  }, []);
 const handleImageClick = () => {
    fileInputRef.current.click(); // open file select dialog
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // set preview image
    }
  };
  return (
    <div className={styles.profileWraper}>
      <div className={styles.profileSection}>
        <img
           src={profileImage}
          alt="Profile"
          className={styles.profileImage}
        />
        <div className={styles.changeProfile} onClick={handleImageClick}>
          (Change Profile)
        </div>
        {/* hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />      </div>

      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>First Name</label>
            <input type="text" placeholder="Enter email id" />
          </div>
          <div className={styles.inputGroup}>
            <label>Last Name</label>
            <input type="text" placeholder="Enter email id" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" placeholder="Enter email id" />
          </div>
          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input type="tel" placeholder="Enter email id" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>State</label>
            <input type="text" placeholder="Enter email id" />
          </div>
          <div className={styles.inputGroup}>
            <label>Country</label>
            <input type="text" placeholder="Enter email id" />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Agency Name</label>
            <input type="text" placeholder="Enter email id" />
          </div>
          <div className={styles.inputGroup}>
            <label>Property ID</label>
            <input type="text" placeholder="Enter email id" />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label>Address</label>
          <input type="text" placeholder="Enter email id" />
        </div>
        
        <div className={styles.inputGroup}>
          <label>About Me</label>
          <textarea placeholder="Write Something" rows={5}></textarea>
        </div>

        <button className={styles.updateButton}>Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileForm;
