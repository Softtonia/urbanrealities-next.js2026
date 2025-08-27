"use client";
import { useState, useRef, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import styles from "./PropertyFilters.module.css";
import MoreFiltersPanel from "./MoreFiltersPanel"; // ✅ नया कॉम्पोनेंट इंपोर्ट करें

export default function PropertyFilters() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const filterRef = useRef(null);
  const searchRef = useRef(null);
  const moreFiltersRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false); // ✅ नया स्टेट

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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredCities(
      value
        ? allCities.filter((city) =>
            city.toLowerCase().includes(value.toLowerCase())
          )
        : []
    );
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city);
    setFilteredCities([]);
  };

  const filters = [
    {
      key: "buy",
      label: "Buy",
      options: ["Buy", "Rent"],
    },
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
      options: [
        {
          group: "Residential",
          items: ["Flat", "House/ Villas", "Plot/Land"],
        },
        {
          group: "Commercial",
          items: [
            "Office",
            "Shop",
            "Industrials Shed/Land",
            "Godown",
            "Commercial",
          ],
        },
        {
          group: "Others",
          items: ["Farm Houses"],
        },
      ],
    },
    {
      key: "bhk",
      label: "BHK",
      options: ["1 bhk", "2 bhk", "3 bhk", "4 bhk", "5 bhk"],
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

  const toggleDropdown = (key) => {
    setActiveDropdown(activeDropdown === key ? null : key);
    setShowMoreFilters(false); // ✅ बाकी फ़िल्टर पर क्लिक करने पर 'More Filters' बंद हो जाएगा
  };

  const handleSelect = (filterKey, value) => {
    setSelectedValues({ ...selectedValues, [filterKey]: value });
    setActiveDropdown(null);
  };

  // ✅ 'More Filters' पैनल को दिखाने/छिपाने का फंक्शन
  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
    setActiveDropdown(null); // बाकी ड्रॉपडाउन बंद हो जाएंगे
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        !moreFiltersRef.current?.contains(event.target)
      ) {
        setActiveDropdown(null);
        setShowMoreFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close city dropdown on outside click
  useEffect(() => {
    const handleClickOutsideSearch = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredCities([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSearch);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideSearch);
  }, []);

  return (
    <div className={`${styles.filterContainer}`}>
      <div className={`${styles.filterBar} container`} ref={filterRef}>
        {/* Buy and Search Group */}
        <div className={styles.searchGroup}>
          <button
            className={styles.filterButton}
            onClick={() => toggleDropdown("buy")}
          >
            {selectedValues.buy} <BiSolidDownArrow className={styles.dropdownIcon} />
          </button>
          {activeDropdown === "buy" && (
            <ul className={`${styles.dropdown} ${styles['dropdown-buy']}`}>
              {filters[0].options.map((option) => (
                <li
                  key={option}
                  onClick={() => handleSelect("buy", option)}
                  className={styles.dropdownItem}
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
          <div className={styles.searchDivider}></div>
          <div className={styles.searchWrapper} ref={searchRef}>
            <input
              type="text"
              placeholder="Enter city, locality..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {filteredCities.length > 0 && (
              <ul className={`${styles.dropdown} ${styles['dropdown-city']}`}>
                {filteredCities.map((city) => (
                  <li
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className={styles.dropdownItem}
                  >
                    {city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Other Regular Filters */}
        <div className={styles.filtersWrapper}>
          {filters.slice(1).map((filter) => (
            <div key={filter.key} className={styles.filterDropdownWrapper}>
              <button
                className={styles.filterButton}
                onClick={() => toggleDropdown(filter.key)}
              >
                {selectedValues[filter.key] || filter.label}{" "}
                <BiSolidDownArrow className={styles.dropdownIcon} />
              </button>
              {activeDropdown === filter.key && (
                <ul
                  className={`${styles.dropdown} ${styles[`dropdown-${filter.key}`]}`}
                >
                  {filter.options.map((option, index) =>
                    typeof option === "string" ? (
                      <li
                        key={option + index}
                        onClick={() => handleSelect(filter.key, option)}
                        className={styles.dropdownItem}
                      >
                        {option}
                      </li>
                    ) : (
                      <li key={index} className={styles.groupWrapper}>
                        <strong>{option.group}</strong>
                        <ul>
                          {option.items.map((item) => (
                            <li
                              key={item}
                              onClick={() => handleSelect(filter.key, item)}
                              className={styles.dropdownItem}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>
          ))}

          {/* More Filters Button */}
          <div className={styles.filterDropdownWrapper} ref={moreFiltersRef}>
            <button
              className={styles.filterButton}
              onClick={toggleMoreFilters}
            >
              <FaSlidersH className={styles.icon} /> More Filters <BiSolidDownArrow className={styles.dropdownIcon} />
            </button>
            {showMoreFilters && <MoreFiltersPanel onClose={() => setShowMoreFilters(false)} />}
          </div>
        </div>
      </div>
    </div>
  );
}