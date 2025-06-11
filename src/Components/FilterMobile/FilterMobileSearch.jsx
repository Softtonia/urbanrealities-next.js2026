"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import "./FilterMobileSearch.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const FilterMobileSearch = () => {
  const [city, setCity] = useState("");
  const [verified, setVerified] = useState(false);
  const [certified, setCertified] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [budgetRange, setBudgetRange] = useState([5, 2000]); // ₹5L to ₹20Cr
  const [openDropdown, setOpenDropdown] = useState(null); // 'min' or 'max'

  const router = useRouter();

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) setCity(storedCity);
  }, []);

  const resetFilters = () => {
    setVerified(false);
    setCertified(false);
    setSelectedTags([]);
    setAmenities([]);
    setCity("");
    localStorage.removeItem("selectedCity");
  };

  const openLocalities = () => {
    router.push("/filterpropertyresult");
  };

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
    <div className="filter-section" onClick={openLocalities}>
      <label className="">{label}</label>
      <input
        type="text"
        className="input-location body-text-14"
        placeholder={placeholder}
        // readOnly
        value={city}
      />
    </div>
  );
  // {
  //   renderInputSection(
  //     "Select City/ Localities",
  //     city || "+ Enter city , Location"
  //   );
  // }

  const budgetOptions = [
    5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300,
    400, 500, 600, 700, 800, 900, 1000, 1500, 2000,
  ];
 const formatBudget = (value) => {
  return value >= 100 ? `₹${value / 100} Cr` : `₹${value} L`;
};

const renderBudgetSection = () => {

  const handleSelect = (type, value) => {
    if (type === "min") {
      setBudgetRange([value, budgetRange[1]]);
    } else {
      setBudgetRange([budgetRange[0], value]);
    }
    setOpenDropdown(null); // close dropdown after selection
  };

  return (
    <div className="filter-section">
      <label>Budget</label>

      {/* Custom Dropdowns */}
      <div className="budget-dropdowns">
        {/* Min Budget */}
        <div className="range-dropdown">
          <div
            className="custom-select"
            onClick={() =>
              setOpenDropdown(openDropdown === "min" ? null : "min")
            }
          >
            {formatBudget(budgetRange[0])}
          </div>
          {openDropdown === "min" && (
            <ul className="dropdown-menu-custom">
              {budgetOptions.map((val) => (
                <li className="menu-list" key={val} onClick={() => handleSelect("min", val)}>
                  {formatBudget(val)}
                </li>
              ))}
            </ul>
          )}
        </div>

        <span>to</span>

        {/* Max Budget */}
        <div className="range-dropdown">
          <div
            className="custom-select"
            onClick={() =>
              setOpenDropdown(openDropdown === "max" ? null : "max")
            }
          >
            {formatBudget(budgetRange[1])}
          </div>
          {openDropdown === "max" && (
            <ul className="dropdown-menu-custom">
              {budgetOptions.map((val) => (
                <li className="menu-list"  key={val} onClick={() => handleSelect("max", val)}>
                  {formatBudget(val)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Slider */}
      <div className="range-slider-container">
        <Slider
          range
          min={5}
          max={2000}
          step={5}
          value={budgetRange}
          onChange={(value) => setBudgetRange(value)}
          trackStyle={[{ backgroundColor: "var(--Orange-Red)" }]}
          handleStyle={[
            {
              border: "4px solid var(--Orange-Red)",
              backgroundColor: "var(--White)",
            },
            {
              border: "4px solid var(--Orange-Red)",
              backgroundColor: "var(--White)",
            },
          ]}
          railStyle={{ backgroundColor: "var(--Gray)" }}
        />
      </div>
    </div>
  );
};


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
      {label === "Amenities" && (
        <span className="see-all body-text-14">See all</span>
      )}
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
