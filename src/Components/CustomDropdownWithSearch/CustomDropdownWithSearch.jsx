"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdownWithSearch.module.css";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";

const CustomDropdownWithSearch = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setSearchText("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
    setSearchText("");
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <div
        className={`${styles.dropdownHeader} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        {/* {value || `Select ${label.toLowerCase()}`} */}
            <span className={value ? "" : styles.placeholderText}>
          {value || `Select ${label.toLowerCase()}`}
        </span>
        <span className={styles.arrow}>{open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}</span>
      </div>
      {open && (
        <div className={styles.dropdownList}>
          <input
            type="text"
            placeholder={`Search ${label.toLowerCase()}`}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={styles.searchInput}
          />
          <div className={styles.optionsContainer}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className={styles.dropdownItem}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className={styles.noResult}>No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdownWithSearch;
