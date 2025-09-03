"use client";
import { useState, useRef, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import styles from "./PropertyFilters.module.css";
import MoreFiltersPanel from "./MoreFiltersPanel";


export default function PropertyFilters() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const filterButtonsRef = useRef({});
  const filterRef = useRef(null);
  const moreFiltersRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const searchRef = useRef(null);
  const [searchDropdownStyle, setSearchDropdownStyle] = useState({});

  const allCities = [
    "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad",
    "Ahmedabad", "Chennai", "Kolkata", "Jaipur"
  ];

  const filters = [
    { key: "buy", label: "Buy", options: ["Buy", "Rent"] },
    { key: "topLocalities", label: "Top Localities", options: [{ group: "Top Localities", items: ["Sobat", "Rajiv Chowk"] }] },
    { key: "budget", label: "Budget", options: [{ group: "Budget", items: ["< ₹10 L", "₹10 L - ₹20 L", "₹20 L - ₹50 L", "> ₹50 L"] }] },
    { key: "propertyType", label: "Property Type", options: [
        { group: "Residential", items: ["Flat", "House/ Villas", "Plot/Land"] },
        { group: "Commercial", items: ["Office","Shop","Industrials Shed/Land","Godown","Commercial"] },
        { group: "Others", items: ["Farm Houses"] }
      ] 
    },
    { key: "bhk", label: "BHK", options: [{ group: "BHK", items: ["1 Bhk","2 Bhk","3 Bhk","4 Bhk","5 Bhk"] }] },
    { key: "postedBy", label: "Posted By", options: ["Owner","Broker","Developer"] }
  ];

  const [selectedValues, setSelectedValues] = useState({
    buy: "Buy", budget: "", propertyType: "", bhk: "", postedBy: ""
  });

  // Dropdown position helper
  const getDropdownStyle = (rect, width = 300) => {
    const viewportWidth = window.innerWidth;
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 8;
    if (left + width > viewportWidth - 10) left = viewportWidth - width - 10;
    if (left < 10) left = 10;
    return { position: "absolute", top, left };
  };

  // Toggle normal dropdown
  const toggleDropdown = (key) => {
    if (activeDropdown === key) {
      setActiveDropdown(null);
    } else {
      if (filterButtonsRef.current[key]) {
        const rect = filterButtonsRef.current[key].getBoundingClientRect();
        setDropdownStyle(getDropdownStyle(rect));
      }
      setActiveDropdown(key);
      setShowMoreFilters(false); // close MoreFilters
    }
  };

  const toggleMoreFilters = () => {
    setShowMoreFilters(!showMoreFilters);
    setActiveDropdown(null);
  };

  const handleSelect = (key, value) => {
    setSelectedValues({ ...selectedValues, [key]: value });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilteredCities(val ? allCities.filter(c => c.toLowerCase().includes(val.toLowerCase())) : []);
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city);
    setFilteredCities([]);
  };

  // Search dropdown position
  useEffect(() => {
    if (filteredCities.length && searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setSearchDropdownStyle(getDropdownStyle(rect));
    }
  }, [filteredCities]);

  const dropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInsideDropdown = dropdownRef.current?.contains(e.target);
      const clickedInsideButton = Object.values(filterButtonsRef.current).some(btn => btn?.contains(e.target));
      const clickedInsideMoreFilters = moreFiltersRef.current?.contains(e.target);

      if (!clickedInsideDropdown && !clickedInsideButton && !clickedInsideMoreFilters) {
        setActiveDropdown(null);
        setShowMoreFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderDropdownContent = (key) => {
    const filter = filters.find(f => f.key === key);
    if (!filter) return null;

    return (
      <div className={`${styles.dropdown} ${styles[`dropdown-${key}`]}`} onClick={e => e.stopPropagation()}>
        <ul>
          {filter.options.map((opt, i) =>
            typeof opt === "string" ? (
              <li key={opt + i} onClick={() => handleSelect(filter.key, opt)} className={`${styles.dropdownItem} ${styles[`dropdownItem-${key}`]}`}>
                {opt}
              </li>
            ) : (
              <li key={i} className={styles.groupWrapper}>
                <strong>{opt.group}</strong>
                <ul>
                  {opt.items.map(item => (
                    <li key={item} onClick={() => handleSelect(filter.key, item)} className={`${styles.dropdownItem} ${styles[`dropdownItem-${key}`]}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            )
          )}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.filterContainer}>
      <div className={`${styles.filterBar} container`} ref={filterRef}>
        {/* Search + Buy */}
        <div className={styles.searchGroup}>
          <button
            className={`${styles.filterButton} ${styles['filterButton-buy']}`}
            ref={el => filterButtonsRef.current["buy"] = el}
            onClick={() => toggleDropdown("buy")}
          >
            {selectedValues.buy} <BiSolidDownArrow className={styles.dropdownIcon} />
          </button>

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
                <div className={styles.portalDropdown} style={searchDropdownStyle}>
                  <ul className={styles.dropdown}>
                    {filteredCities.map(city => (
                      <li key={city} className={styles.dropdownItem} onClick={() => handleCitySelect(city)}>
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
          {filters.slice(1).map(f => (
            <div key={f.key} className={styles.filterDropdownWrapper}>
              <button
                className={`${styles.filterButton}  ${styles['filterButton-' + f.key]}`}
                ref={el => filterButtonsRef.current[f.key] = el}
                onClick={() => toggleDropdown(f.key)}
              >
                {selectedValues[f.key] || f.label} <BiSolidDownArrow className={styles.dropdownIcon} />
              </button>
            </div>
          ))}

          {/* More Filters */}
          <div className={styles.filterDropdownWrapper} ref={moreFiltersRef}>
            <button className={styles.filterButton} onClick={toggleMoreFilters}>
              <FaSlidersH className={styles.icon} /> More Filters <BiSolidDownArrow className={styles.dropdownIcon} />
            </button>
          </div>
        </div>
      </div>

      {/* Normal Dropdown Portal */}
      {activeDropdown && (
          <div ref={dropdownRef} className={styles.portalDropdown} style={dropdownStyle}>
            {renderDropdownContent(activeDropdown)}
          </div>
      )}

      {/* More Filters Portal */}
      {showMoreFilters && (
          <div className={styles.moreFiltersPanel} ref={dropdownRef}>
            <MoreFiltersPanel onClose={() => setShowMoreFilters(false)} />
          </div>
      )}
    </div>
  );
}
