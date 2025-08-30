"use client";
import { useState, useRef, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import styles from "./filtertabs.module.css";
import MoreFiltersPanel from "./MoreFiltersPanel";

export default function PropertyFilters() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const filterButtonsRef = useRef({});

  const allCities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Pune",
    "Hyderabad",
    "Ahmedabad",
    "Chennai",
    "Kolkata",
    "Jaipur",
  ];

  const filters = [
    { key: "buy", label: "Buy", options: ["Buy", "Rent"] },
    {
      key: "topLocalities",
      label: "Top Localities",
      options: ["Sobat", "Rajiv Chowk"],
    },
    {
      key: "budget",
      label: "Budget",
      options: ["< ₹10 L", "₹10 L - ₹20 L", "₹20 L - ₹50 L", "> ₹50 L"],
    },
    {
      key: "propertyType",
      label: "Property Type",
      options: ["Flat", "House/Villas", "Plot/Land", "Office", "Shop"],
    },
    {
      key: "bhk",
      label: "BHK",
      options: ["1 Bhk", "2 Bhk", "3 Bhk", "4 Bhk", "5 Bhk"],
    },
    {
      key: "postedBy",
      label: "Posted By",
      options: ["Owner", "Broker", "Developer"],
    },
  ];

  const [selectedValues, setSelectedValues] = useState({
    buy: "Buy",
    topLocalities: "",
    budget: "",
    propertyType: "",
    bhk: "",
    postedBy: "",
  });

  // Toggle dropdown
  const toggleDropdown = (key) => {
    if (activeDropdown === key) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(key);
      setShowMoreFilters(false);
    }
  };

  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
    setActiveDropdown(null);
  };

  const handleSelect = (key, value) => {
    setSelectedValues({ ...selectedValues, [key]: value });
    setActiveDropdown(null);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilteredCities(
      val
        ? allCities.filter((c) => c.toLowerCase().includes(val.toLowerCase()))
        : []
    );
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city);
    setFilteredCities([]);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      const isFilterButton = Object.values(filterButtonsRef.current).some(
        (btn) => btn && btn.contains(e.target)
      );
      if (!isFilterButton) {
        setActiveDropdown(null);
        setShowMoreFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.filterContainer}>
      <div className={`${styles.filterBar} container`}>
        {/* Search + Buy */}
        <div className={styles.searchGroup}>
          {/* Buy Dropdown Button */}
          <div className={styles.buyWrapper}>
            <button
              className={`${styles.filterButton} ${styles.buyButton}`}
              ref={(el) => (filterButtonsRef.current["buy"] = el)}
              onClick={() => toggleDropdown("buy")}
            >
              {selectedValues.buy}{" "}
              <BiSolidDownArrow className={styles.dropdownIcon} />
            </button>

            {activeDropdown === "buy" && (
              <div className={`${styles.dropdownPanel} ${styles.buyDropdown}`}>
                {filters[0].options.map((option) => (
                  <div
                    key={option}
                    className={styles.option}
                    onClick={() => handleSelect("buy", option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.searchDivider}></div>

          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Enter city, locality..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setFilteredCities(allCities)}
            />
            {filteredCities.length > 0 && (
              <div className={styles.searchDropdown}>
                <ul>
                  {filteredCities.map((city) => (
                    <li key={city} onClick={() => handleCitySelect(city)}>
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Other filters */}
        <div className={styles.filtersWrapper}>
          {filters.slice(1).map((filter) => (
            <div
              key={filter.key}
              className={`
                ${styles.filterWrapper} 
                ${filter.key === "postedBy" ? styles.postedByWrapper : ""}
                ${filter.key === "bhk" ? styles.bhkWrapper : ""}
                ${filter.key === "propertyType" ? styles.propertyTypeWrapper : ""}
                ${filter.key === "budget" ? styles.budgetWrapper : ""}
                ${filter.key === "topLocalities" ? styles.topLocalitiesWrapper : ""}
              `}
            >
              <button
                className={`${styles.filterButton} ${
                  selectedValues[filter.key] ? styles.active : ""
                }`}
                ref={(el) => (filterButtonsRef.current[filter.key] = el)}
                onClick={() => toggleDropdown(filter.key)}
              >
                {selectedValues[filter.key] || filter.label}
                <BiSolidDownArrow className={styles.dropdownIcon} />
              </button>

              {activeDropdown === filter.key && (
                <div
                  className={`${styles.dropdownPanel} ${styles[`${filter.key}Dropdown`]}`}
                >
                  {filter.options.map((option) => (
                    <div
                      key={option}
                      className={`
                        ${styles.option} 
                        ${filter.key === "bhk" ? styles.bhkOption : ""} 
                        ${filter.key === "propertyType" ? styles.propertyTypeOption : ""} 
                        ${filter.key === "budget" ? styles.budgetOption : ""} 
                        ${filter.key === "topLocalities" ? styles.topLocalitiesOption : ""} 
                        ${filter.key === "postedBy" ? styles.postedByOption : ""}
                      `}
                      onClick={() => handleSelect(filter.key, option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))} 

          {/* More Filters */}
          <div className={styles.filterWrapper}>
            <button
              className={`${styles.filterButton} ${
                showMoreFilters ? styles.active : ""
              }`}
              ref={(el) => (filterButtonsRef.current["more"] = el)}
              onClick={toggleMoreFilters}
            >
              <FaSlidersH className={styles.icon} /> More Filters
              <BiSolidDownArrow className={styles.dropdownIcon} />
            </button>
            {showMoreFilters && (
              <div className={styles.moreFiltersPanel}>
                <MoreFiltersPanel onClose={() => setShowMoreFilters(false)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
