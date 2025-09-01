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
    {
      key: "buy",
      label: "Buy",
      type: "select",
      heading: "Select Buy Option",
      className: "dropdown-buy",
      options: ["Buy", "Rent"],
    },
    {
      key: "topLocalities",
      label: "Top Localities",
      heading: "Select Locality",
      type: "list",
      className: "dropdown-toplocalities",
      options: ["Sobat", "Rajiv Chowk"],
    },
    {
      key: "budget",
      label: "Budget",
      heading: "Select Budget Range",
      type: "slider",
      className: "dropdown-budget",
      min: 0,
      max: 20000000,
      step: 50000,
    },
    {
      key: "propertyType",
      label: "Property Type",
      type: "grouped",
      heading: "Select Property Type",
      className: "dropdown-propertytype",
      options: {
        Residential: ["Flat", "House/Villas", "Plot/Land"],
        Commercial: ["Office", "Shop", "Industrial Shed/Land"],
        Others: ["Farm Houses"],
      },
    },
    {
      key: "bhk",
      label: "BHK",
      heading: "Select BHK",
      type: "pills",
      className: "dropdown-bhk",
      options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"],
    },
    {
      key: "postedBy",
      label: "Posted By",
      heading: "Select Posted By",
      type: "list",
      className: "dropdown-postedby",
      options: ["Owner", "Broker", "Builder/Developer"],
    },
  ];

  const [selectedValues, setSelectedValues] = useState({
    buy: "",
    topLocalities: "",
    budget: "",
    propertyType: "",
    bhk: "",
    postedBy: "",
  });

  // Toggle dropdown
  const toggleDropdown = (key) => {
    console.log("Toggling dropdown:", key);
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
    setSelectedValues((prev) => {
      const updated = { ...prev, [key]: value };
      console.log("selected:", updated);
      return updated;
    });
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
      // Check if click is outside ALL filter buttons
      const isFilterButton = Object.values(filterButtonsRef.current).some(
        (btn) => btn && btn.contains(e.target)
      );

      console.log("Clicked outside:", !isFilterButton);

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
          {/* Buy Dropdown */}
          <div className={styles.buyWrapper}>
            <button
              className={`${styles.filterButton} ${styles.buyButton}`}
              ref={(el) => (filterButtonsRef.current["buy"] = el)}
              onClick={(e) => {
                e.stopPropagation(); // Important: event bubble stop karo
                toggleDropdown("buy");
              }}
            >
              {selectedValues.buy || "Buy"}
              <BiSolidDownArrow className={styles.dropdownIcon} />
            </button>

            {activeDropdown === "buy" && (
              <div className={`${styles.dropdownPanel} ${styles.buyDropdown}`}>
                {filters[0].options.map((option) => (
                  <div
                    key={option}
                    className={styles.option}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect("buy", option);
                    }}
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
              <div className={`${styles.dropdownPanel} ${styles.searchDropdown}`}>
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
                ${
                  filter.key === "propertyType"
                    ? styles.propertyTypeWrapper
                    : ""
                }
                ${filter.key === "budget" ? styles.budgetWrapper : ""}
                ${
                  filter.key === "topLocalities"
                    ? styles.topLocalitiesWrapper
                    : ""
                }
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
                  className={`${styles.dropdownPanel} ${
                    styles[filter.className]
                  }`}
                >
                  {/* Heading */}
                  <div className={styles.dropdownHeading}>{filter.heading}</div>

                  {filter.type === "pills" &&
                    filter.options.map((opt) => (
                      <div
                        key={opt}
                        className={styles.pillOption}
                        onClick={() => handleSelect(filter.key, opt)}
                      >
                        {opt}
                      </div>
                    ))}

                  {filter.type === "list" &&
                    filter.options.map((opt) => (
                      <div
                        key={opt}
                        className={styles.listOption}
                        onClick={() => handleSelect(filter.key, opt)}
                      >
                        {opt}
                      </div>
                    ))}

                  {filter.type === "grouped" &&
                    Object.entries(filter.options).map(([group, opts]) => (
                      <div key={group} className={styles.groupSection}>
                        <div className={styles.groupHeading}>{group}</div>
                        <div className={styles.groupOptions}>
                          {opts.map((opt) => (
                            <div
                              key={opt}
                              className={styles.pillOption}
                              onClick={() => handleSelect(filter.key, opt)}
                            >
                              + {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                  {filter.type === "slider" && (
                    <div className={styles.sliderWrapper}>
                      <input
                        type="range"
                        min={filter.min}
                        max={filter.max}
                        step={filter.step}
                        onChange={(e) =>
                          handleSelect(filter.key, e.target.value)
                        }
                      />
                      {/* <div>{selectedValues.budget}</div>  */}
                    </div>
                  )}
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
