"use client";
import React, { useState } from "react";
import "./FilterMobileSearch.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";


const FilterMobileSearch = ( ) => {
  const [verified, setVerified] = useState(false);
  const [certified, setCertified] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const router = useRouter();
  const resetFilters = () => {
    setVerified(false);
    setCertified(false);
    setSelectedTags([]);
    setAmenities([]);
  };
const openLocalities =()=>{
  router.push("/filterpropertyresult")
}

const goBack = () => {
  if (typeof window !== "undefined") {
    if (window.history.length > 1) {
      window.history.back(); 
    } else {
      router.push("/"); 
    }
  }
};


  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const renderInputSection = (label, placeholder) => (
    <div className="filter-section" onClick={openLocalities}  >
      <label className="">{label}</label>
      <input
        type="text"
        className="input-location body-text-14"
        placeholder={placeholder}
        readOnly
      />
    </div>
  );

  const renderBudgetSection = () => (
    <div className="filter-section">
      <label>Budget</label>
      <div className="budget-dropdowns">
        <select>
          <option>Min</option>
        </select>
        <span>to</span>
        <select>
          <option>Max</option>
        </select>
      </div>
      <input type="range" className="range-slider" />
    </div>
  );

  const renderTagSection = (label, tags) => (
    <div className="filter-tags-group border-bottom">
      <label>{label}</label>
      <div className="tag-row">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`filter-span ${
              selectedTags.includes(tag) ? "selected" : ""
            }`}
            onClick={() => toggleTag(tag)}
          >
            + {tag}
          </span>
        ))}
      </div>
    </div>
  );
  const toggleAmenity = (option) => {
    setAmenities((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option]
    );
  };

  const renderCheckboxSection = (label, options) => (
    <div className="filter-section">
      <label>{label}</label>
      <div className="checkbox-row">
        {options.map((opt) => (
          <label key={opt}>
            <input
              type="checkbox"
              checked={amenities.includes(opt)}
              onChange={() => toggleAmenity(opt)}
            />
            <span className="check-label">{opt} </span>
          </label>
        ))}
      </div>
      {label === "Amenities" && <span className="see-all body-text-14">See all</span>}
    </div>
  );

  const renderToggleSwitch = (label, state, setState) => (
    <div className="filter-switches ">
      <label
        className="form-check-label  body-text-16 m-0"
        htmlFor={`switch-${label.replace(/\s+/g, "-")}`}
      >
        {label}
      </label>
      <div className="form-check form-switch m-0">
        <input
          className="form-check-input"
          type="checkbox"
          checked={state}
          onChange={() => setState(!state)}
          role="switch"
          id={`switch-${label.replace(/\s+/g, "-")}`}
        />
      </div>
    </div>
  );

  return (
    <div className="filter-sidebar m-0">
      <div className="container">
        <div className="filter-header">
          <button className="back-btn" onClick={goBack}>
            <IoArrowBackSharp />
          </button>
          <span>Filters</span>
          <button className="reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>

        {renderInputSection(
          "Select City/ Localities",
          "+ Enter city , Location"
        )}
        {renderBudgetSection()}
        {renderTagSection("Possession Status", [
          "Ready To Move",
          "Under Construction",
        ])}
        {renderTagSection("Sub Property Types", [
          "Flat",
          "House/ Villas",
          "Plot/Land",
          "Office",
          "Shop",
          "Farm House",
          "Godown",
          "Commercial",
          "Industrials Shed/Land",
        ])}
        {renderTagSection("Sales Types", ["New", "Resale"])}
        {renderTagSection("Posted By", ["Owner", "Broker", "Agent"])}
        {renderTagSection("Ownership", [
          "Freehold",
          "leasehold",
          "Co-operative Society",
        ])}
        {renderTagSection("Furnishing", [
          "Furnished",
          "Semi-Furnished",
          "Unfurnished",
        ])}
        {renderCheckboxSection("Amenities", [
          "Lift",
          "Park",
          "Power Backup",
          "Kids Play Area",
          "Club House",
        ])}
        {renderTagSection("Housing Facing", [
          "East",
          "North",
          "North-West",
          "West",
          "South-East",
          "South",
          "South-West",
          "North-East",
        ])}
        {renderTagSection("Floor", [
          "Basement",
          "Ground",
          "1-4",
          "5-8",
          "9-10",
          "11-15",
        ])}
        {renderTagSection("Bathrooms", ["1", "2", "3", "4", "5"])}
        {renderTagSection("Properties in Location", [
          "Upcoming Localities",
          "Premium Localities",
          "Developed Localities",
        ])}
        {renderToggleSwitch("Verified Property", verified, setVerified)}
        {renderToggleSwitch(
          "Posted By Certified Agents",
          certified,
          setCertified
        )}

        <button className="view-btn body-text-16">View 744 Properties</button>
      </div>
    </div>
  );
};

export default FilterMobileSearch;
