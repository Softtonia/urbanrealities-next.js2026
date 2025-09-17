"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdownWithMultipleSelect.module.css";
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdClose } from "react-icons/io";

const CustomDropdownWithMultiSelectAndSearch = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    if (!value.includes(option)) {
      onChange([...value, option]);
    }
  };

  const handleRemove = (option, e) => {
    e.stopPropagation();
    const newValue = value.filter((item) => item !== option);
    onChange(newValue);
  };

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !value.includes(option)
  );

  return (
    <div className={styles.dropdownWrapper} ref={dropdownRef}>
      <div
        className={`${styles.dropdownHeader} ${open ? styles.open : ""}`}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.selectedItems}>
          {value.length > 0 ? (
            value.map((val, idx) => (
              <div key={idx} className={styles.selectedItem}>
                {val}
                <IoMdClose
                  className={styles.removeIcon}
                  onClick={(e) => handleRemove(val, e)}
                />
              </div>
            ))
          ) : (
            <span >{`Select ${label.toLowerCase()}`}</span>
        //         <span className={value ? "" : styles.placeholderText}>
        //   {`Select ${label.toLowerCase()}`}
        // </span>
          )}
        </div>
        <span className={styles.arrow}>
          {open ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </span>
      </div>
      {open && (
        <div className={styles.dropdownList}>
          <input
            type="text"
            placeholder={`Search ${label.toLowerCase()}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              <div className={styles.noResult}>No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdownWithMultiSelectAndSearch;
