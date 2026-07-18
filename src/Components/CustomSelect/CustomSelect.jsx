'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';
import { FaChevronDown } from 'react-icons/fa';

const CustomSelect = ({ options = [], value, onChange, placeholder = "Select..." }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || null;

  return (
    <div className={styles.customSelectWrapper} ref={dropdownRef}>
      <div 
        className={`${styles.selectBox} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.selectedText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <FaChevronDown className={`${styles.chevron} ${isOpen ? styles.rotate : ''}`} />
      </div>
      
      {isOpen && (
        <div className={styles.optionsList}>
          {options.map((opt) => (
            <div 
              key={opt.value} 
              className={`${styles.optionItem} ${opt.value === value ? styles.selected : ''}`}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
