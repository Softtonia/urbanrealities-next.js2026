"use client";
import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import "./FilterMobileLocalities.css";

const cities = {
  nearbyCities: [
    "New Delhi",
    "Gurgaon",
    "Greater Noida",
    "Ghaziabad",
    "Mumbai",
  ],
  popularCities: [
    "Ahmedabad",
    "Bangalore",
    "Beyond Thane",
    "Chennai",
    "Gurgaon",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Navi Mumbai",
    "New Delhi",
    "Noida",
    "Pune",
    "Thane",
  ],
  otherCities: [
    "Agra",
    "Ahmadnagar",
    "Allahabad",
    "Aluva",
    "Amritsar",
    "Aurangabad",
    "Badlapur",
    "Bareilly",
    "Belgaum",
    "Bhiwadi",
    "Bhiwandi",
    "Bhopal",
    "Bhubaneswar",
    "Bokaro Steel City",
    "Chandigarh",
    "Chengalpattu",
    "Coimbatore",
    "Dehradun",
    "Durgapur",
    "Ernakulam",
    "Erode",
    "Faridabad",
    "Ghaziabad",
    "Goa",
    "Gorakhpur",
    "Greater Noida",
    "Guntur",
    "Guwahati",
    "Gwalior",
    "Haridwar",
    "Hosur",
    "Hubli",
    "Jabalpur",
    "Jalandhar",
    "Jammu",
    "Jamshedpur",
    "Jodhpur",
    "Kalyan",
    "Kannur",
    "Kanpur",
    "Khopoli",
    "Kochi",
    "Kodaikanal",
    "Kottayam",
    "Kozhikode",
    "Lonavala",
    "Ludhiana",
    "Madurai",
    "Mangalore",
    "Mohali",
    "Mysore",
    "Nagpur",
    "Nainital",
    "Nanded",
    "Nashik",
    "Navsari",
    "Nellore",
    "Newtown",
    "Ooty",
    "Palakkad",
    "Palghar",
  ],
};

const FilterMobileLocalities = ({ onDone, onBack }) => {
  const [selectedCity, setSelectedCity] = useState("");

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const handleDoneClick = () => {
  if (selectedCity) {
    localStorage.setItem("selectedCity", selectedCity);  // Save to localStorage
    if (onDone) {
      onDone(selectedCity);
    }
  } else {
    alert("Please select a city before proceeding");
  }
};

  return (
    <div className="location-container">
      {/* Header */}
      <div className="location-header">
        <div className="location-header-left" onClick={onBack || (() => window.history.back())}>
          <IoArrowBackSharp size={20} />
          <span className="location-title body-text-16">Add Location</span>
        </div>
        <span className="location-done" onClick={handleDoneClick}>
          Done
        </span>
      </div>

      {/* Search */}
      <input
        type="text"
        className="location-search body-text-14"
        placeholder="Enter City, Location"
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      />

      {/* Popular Cities */}
      <div className="city-section">
        <div className="city-section-title body-text-16">Popular City</div>
        <div className="city-list">
          {cities.popularCities.map((city, index) => (
            <div
              className={`loc-city-name body-text-rg16 ${selectedCity === city ? "selected" : ""}`}
              key={index}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      </div>

      {/* Other Cities */}
      <div className="city-section">
        <div className="city-section-title body-text-16">Other City</div>
        <div className="city-list">
          {cities.otherCities.map((city, index) => (
            <div
              className={`loc-city-name body-text-rg16 ${selectedCity === city ? "selected" : ""}`}
              key={index}
              onClick={() => handleCityClick(city)}
            >
              {city}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterMobileLocalities;
