"use client";
import { useState, useRef, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import styles from "./PropertyFilters.module.css";
import MoreFiltersPanel from "./MoreFiltersPanel";
import Portal from "./Portal";

export default function PropertyFilters() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const filterButtonsRef = useRef({});
  const filterRef = useRef(null);
  const moreFiltersRef = useRef(null);
  const searchRef = useRef(null);

  const [dropdownStyle, setDropdownStyle] = useState({});
  const [searchDropdownStyle, setSearchDropdownStyle] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

  const allCities = ["Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Jaipur"];

  const filters = [
    { key: "buy", label: "Buy", options: ["Buy", "Rent"] },
    { key: "topLocalities", label: "Top Localities", options: [{ group: "Top Localities", items: ["Sobat", "Rajiv Chowk"] }] },
    { key: "budget", label: "Budget", options: [{ group: "Budget", items: ["< ₹10 L", "₹10 L - ₹20 L", "₹20 L - ₹50 L", "> ₹50 L"] }] },
    { key: "propertyType", label: "Property Type", options: [
      { group: "Residential", items: ["Flat", "House/ Villas", "Plot/Land"] },
      { group: "Commercial", items: ["Office", "Shop", "Industrials Shed/Land", "Godown", "Commercial"] },
      { group: "Others", items: ["Farm Houses"] }
    ]},
    { key: "bhk", label: "BHK", options: [{ group: "BHK", items: ["1 Bhk", "2 Bhk", "3 Bhk", "4 Bhk", "5 Bhk"] }] },
    { key: "postedBy", label: "Posted By", options: ["Owner", "Broker", "Developer"] },
  ];

  const [selectedValues, setSelectedValues] = useState({
    buy: "Buy",
    budget: "",
    propertyType: "",
    bhk: "",
    postedBy: "",
  });

  // Helper: position dropdown
  const getDropdownStyle = (rect, dropdownWidth = 300) => {
    const viewportWidth = window.innerWidth;
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY + 8;

    if (left < 10) left = 10;
    if (left + dropdownWidth > viewportWidth - 10) {
      left = viewportWidth - dropdownWidth - 10;
    }

    return { position: "absolute", top, left, zIndex: 10000, width: dropdownWidth, background: "#fff", borderRadius: 6, padding: 16, boxShadow: "0 4px 10px rgba(0,0,0,0.15)" };
  };

  const toggleDropdown = (key) => {
    if (filterButtonsRef.current[key]) {
      const rect = filterButtonsRef.current[key].getBoundingClientRect();
      setDropdownStyle(getDropdownStyle(rect, 300));
    }
    setActiveDropdown(activeDropdown === key ? null : key);
    setShowMoreFilters(false);
  };

  const handleSelect = (filterKey, value) => {
    setSelectedValues({ ...selectedValues, [filterKey]: value });
    setActiveDropdown(null);
  };

  // Search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setFilteredCities(value ? allCities.filter(city => city.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleCitySelect = (city) => {
    setSearchTerm(city);
    setFilteredCities([]);
  };

  useEffect(() => {
    if (filteredCities.length && searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setSearchDropdownStyle(getDropdownStyle(rect, 300));
    }
  }, [filteredCities]);

  // Outside click close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !filterRef.current?.contains(event.target) &&
        !moreFiltersRef.current?.contains(event.target) &&
        !searchRef.current?.contains(event.target)
      ) {
        setActiveDropdown(null);
        setShowMoreFilters(false);
        setFilteredCities([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderDropdownContent = (key) => {
    const filter = filters.find(f => f.key === key);
    if (!filter) return null;

    return (
      <div onClick={e => e.stopPropagation()}>
        <ul>
          {filter.options.map((option, idx) => typeof option === "string" ? (
            <li key={option + idx} onClick={() => handleSelect(filter.key, option)} className={styles.dropdownItem}>{option}</li>
          ) : (
            <li key={idx} className={styles.groupWrapper}>
              <strong>{option.group}</strong>
              <ul>
                {option.items.map(item => (
                  <li key={item} onClick={() => handleSelect(filter.key, item)} className={styles.dropdownItem}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.filterContainer}>
      <div className={`${styles.filterBar} container`} ref={filterRef}>

        {/* Search + Buy */}
        <div className={styles.searchGroup}>
          <button ref={el => filterButtonsRef.current["buy"] = el} className={styles.filterButton} onClick={() => toggleDropdown("buy")}>
            {selectedValues.buy} <BiSolidDownArrow className={styles.dropdownIcon} />
          </button>

          <div className={styles.searchDivider}></div>

          <div ref={searchRef} className={styles.searchWrapper}>
            <input type="text" placeholder="Enter city, locality..." value={searchTerm} onChange={handleSearchChange} className={styles.searchInput} />
            {filteredCities.length > 0 && (
              <Portal>
                <div className={styles.portalDropdown} style={searchDropdownStyle}>
                  <ul className={styles.dropdown}>
                    {filteredCities.map(city => (
                      <li key={city} className={styles.dropdownItem} onClick={() => handleCitySelect(city)}>{city}</li>
                    ))}
                  </ul>
                </div>
              </Portal>
            )}
          </div>
        </div>

        {/* Other filters */}
        <div className={styles.filtersWrapper}>
          {filters.slice(1).map(filter => (
            <div key={filter.key} className={styles.filterDropdownWrapper}>
              <button ref={el => filterButtonsRef.current[filter.key] = el} className={styles.filterButton} onClick={() => toggleDropdown(filter.key)}>
                {selectedValues[filter.key] || filter.label} <BiSolidDownArrow className={styles.dropdownIcon} />
              </button>
            </div>
          ))}

          {/* More filters */}
          <div ref={moreFiltersRef} className={styles.filterDropdownWrapper}>
            <button className={styles.filterButton} onClick={() => setShowMoreFilters(!showMoreFilters)}>
              <FaSlidersH className={styles.icon} /> More Filters <BiSolidDownArrow className={styles.dropdownIcon} />
            </button>
          </div>
        </div>
      </div>

      {/* Portal dropdown */}
      {activeDropdown && (
        <Portal>
          <div className={styles.portalDropdown} style={dropdownStyle}>
            {renderDropdownContent(activeDropdown)}
          </div>
        </Portal>
      )}

      {showMoreFilters && (
        <Portal>
          <div style={{ position: 'absolute', top: '75%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10000 }}>
            <MoreFiltersPanel onClose={() => setShowMoreFilters(false)} />
          </div>
        </Portal>
      )}
    </div>
  );
}
