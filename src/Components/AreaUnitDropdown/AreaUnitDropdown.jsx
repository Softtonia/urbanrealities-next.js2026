"'use client';"

import { useState } from "react";
import styles from "./AreaUnitDropdown.module.css";

// Conversion rates: 1 unit = how many sqft
const unitRatesByRegion = {
  bangalore: {
    sqft: 1,
    sqyrd: 9,
    sqm: 10.7639,
    acre: 43560,
    bigha: 14400,
    hectare: 107639,
    marla: 272.25,
    kanal: 5445,
    biswa1: 1350,
    biswa2: 1000000,
    ground: 2400,
    aankadam: 72,
    rood: 10890,
    chatak: 45,
    kottah: 720,
    cent: 435.6,
    perch: 272.25,
    guntha: 1089,
    are: 1076.4,
    katha: 720,
    gaj: 9,
    killa: 43560,
    kyncham: 4356,
  },
  punjab: {
    sqft: 1,
    sqyrd: 9,
    sqm: 10.7639,
    acre: 43560,
    bigha: 27225,
    hectare: 107639,
    marla: 272.25,
    kanal: 5445,
    biswa1: 1361,
    biswa2: 1361,
    ground: 2400,
    aankadam: 30.25,
    rood: 10890,
    chatak: 45,
    kottah: 720,
    cent: 435.6,
    perch: 272.25,
    guntha: 1089,
    are: 1076.4,
    katha: 720,
    gaj: 9,
    killa: 43560,
    kyncham: 4300,
  },
  hyderabad: {
    sqft: 1,
    sqyrd: 9,         // 1 sq yd = 9 sqft
    sqm: 10.7639,     // 1 sqm = 10.7639 sqft
    acre: 43560,      // 1 acre = 43,560 sqft
    guntha: 1089,     // 1 guntha = 1,089 sqft
    gajam: 9,         // local term for 1 sq yd = 9 sqft
    cent: 435.6,      // 1 cent = 435.6 sqft
    hectare: 107639,  // 1 hectare = 107,639 sqft
    are: 1076.4,      // 1 are = 1,076.4 sqft
    killa: 43560,     // often same as acre in Telangana
    // rarely used in Hyderabad, but you can include for uniformity
    rood: 10890,      
    ground: 2400,     
    marla: 272.25,    
    kanal: 5445,      
  },
};



const AreaUnitDropdown = ({baseSqft}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [region, setRegion] = useState("hyderabad");
  const [selectedUnit, setSelectedUnit] = useState("sqft");

  const unitRatesInSqft = unitRatesByRegion[region];
  const unitOptions = Object.keys(unitRatesInSqft);

  const handleSelect = (unit) => {
    setSelectedUnit(unit);
    setIsOpen(false);
  };

  const rawValue = (baseSqft / unitRatesInSqft[selectedUnit]);
  let convertedValue;
  if (selectedUnit === "sqft") {
    convertedValue = baseSqft;
  } else if (rawValue >= 100) {
    convertedValue = Math.round(rawValue);
  } else if (rawValue >= 10) {
    convertedValue = rawValue.toFixed(1);
  } else {
    convertedValue = rawValue.toFixed(2);
  }
  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.selectedValue} onClick={() => setIsOpen(!isOpen)}>
        {convertedValue} {selectedUnit}
        <span className={styles.arrow}>▼</span>
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          {unitOptions.map((unit, index) => (
            <div
              key={index}
              className={styles.option}
              onClick={() => handleSelect(unit)}
            >
              {unit}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreaUnitDropdown;
