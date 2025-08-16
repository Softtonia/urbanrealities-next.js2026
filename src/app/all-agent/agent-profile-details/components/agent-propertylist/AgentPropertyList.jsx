"use client";
import React from "react";
import styles from "./AgentPropertyList.module.css";
import AgentPropertyCard from "./AgentPropertyCard";

const properties = [
  {
    id: 1,
    image: "/projectcarouselimage.png", 
    title: "2 BHK Builder Floor 750 Sq.ft",
    location: "Bangalore, Karnataka",
    price: "₹75 Lac",
    status: "Featured",
    agency: "Ganesh Property",
    availableFor: "Family",
    carpetArea: "720 sqft",
  },
  {
    id: 2,
    image: "/projectcarouselimage.png", 
    title: "3 BHK Apartment 1200 Sq.ft",
    location: "Delhi, India",
    price: "₹1.25 Cr",
    status: "Premium",
    agency: "Sharma Realtors",
    availableFor: "Bachelors / Family",
    carpetArea: "1150 sqft",
  },
  {
    id: 3,
    image: "/projectcarouselimage.png", 
    title: "3 BHK Builder Floor 1700 Sq.ft",
    location: "Ernakulam, Kerala",
    price: "₹3 Cr",
    status: "Featured",
    agency: "Ganesh Property",
    availableFor: "Family",
    carpetArea: "1720 sqft",
  },
];

const AboutPropertyList = () => {
  return (
    <div className={styles.listWrapper}>
      {/* Top Filter Buttons */}
      <div className={styles.filters}>
        <button className={styles.tabBtn}>Rent</button>
        <button className={styles.tabBtn}>Sell</button>
        <button className={styles.tabBtn}>Pg</button>

        <div className={styles.sortSelect}>
          <option>Sort by</option>
          {/* <option>Price Low to High</option>
          <option>Price High to Low</option> */}
        </div>
      </div>

      {/* Property Cards */}
      {properties.map((property) => (
        <AgentPropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default AboutPropertyList;
