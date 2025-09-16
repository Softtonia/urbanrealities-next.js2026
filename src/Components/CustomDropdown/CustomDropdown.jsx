"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdown.module.css";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const CustomDropdown = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      {/* <label className={styles.label}>{label}</label> */}
      <div
        className={`${styles.dropdownHeader} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        {value || `Select ${label.toLowerCase()}`}
        <span className={styles.arrow}>{open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span>
      </div>
      {open && (
        <div className={styles.dropdownList}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
