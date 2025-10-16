"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FiMoreVertical } from "react-icons/fi";
import styles from "./ProfileCard.module.css";
import Link from "next/link";

const ProfileCard = ({ profile }) => {
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
              <Link href={`/auth/user/setting/edit-profile?id=${profile.id}`} className={styles.dropdownItem} role="button">
                Edit Profile
              </Link>
            </div>
          )}
        </div>
        <div className={styles.profileImageContainer}>
          <Image
            src={profile?.profile_photo ? profile?.profile_photo : "/albert-camus.png"}
            alt="Albert Camus"
            width={90}
            height={90}
            className={styles.profileImage}
          />
        </div>
        <h3 className={styles.profileName}>{profile.first_name}</h3>
      </div>

      <div className={styles.profileDetails}>
        {/* <div className={styles.detailItem}>
          <span className={styles.label}>Age:</span>
          <span className={styles.value}>76</span>
        </div> */}
        {profile.phone &&
          <div className={styles.detailItem}>
            <span className={styles.label}>Phone Number:</span>
            <span className={styles.value}>{profile.phone}</span>
          </div>
        }
        {profile.email &&
          <div className={styles.detailItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{profile.email}</span>
          </div>
        }
        {profile?.state?.name &&
          <div className={styles.detailItem}>
            <span className={styles.label}>State:</span>
            <span className={styles.value}>{profile?.state?.name}</span>
          </div>
          }
        {profile?.country?.name &&
          <div className={styles.detailItem}>
            <span className={styles.label}>Country:</span>
            <span className={styles.value}>{profile?.country?.name}</span>
          </div>}
      </div>
    </div>
  );
};

export default ProfileCard;
