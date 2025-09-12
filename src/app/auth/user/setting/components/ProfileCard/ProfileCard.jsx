"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";
import styles from "./ProfileCard.module.css";
import Link from "next/link";

const ProfileCard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileHeader}>
        <div
          className={styles.moreIcon}
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <FiMoreVertical />
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <Link href="/auth/user/setting/edit-profile" className={styles.dropdownItem} role="button">
                Edit Profile
              </Link>
            </div>
          )}
        </div>
        <div className={styles.profileImageContainer}>
          <Image
            src="/albert-camus.png"
            alt="Albert Camus"
            width={90}
            height={90}
            className={styles.profileImage}
          />
        </div>
        <h3 className={styles.profileName}>Albert Camus</h3>
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Age:</span>
          <span className={styles.value}>76</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Phone Number:</span>
          <span className={styles.value}>7789898576</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>example45@gmail.com</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>State:</span>
          <span className={styles.value}>Delhi</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Country:</span>
          <span className={styles.value}>India</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
