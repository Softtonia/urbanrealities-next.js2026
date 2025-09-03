"use client";
import { useState, useRef, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import styles from "./PropertyFilters.module.css";
import MoreFiltersPanel from "./MoreFiltersPanel";
import Portal from "./Portal";

export default function PropertyFilters() {
    const [activeDropdown, setActiveDropdown] = useState(null);
    const filterRef = useRef(null);
    const moreFiltersRef = useRef(null);
    const searchRef = useRef(null);
    const filterButtonsRef = useRef({});
    const [dropdownStyle, setDropdownStyle] = useState({});
    const [searchDropdownStyle, setSearchDropdownStyle] = useState({});
    const [showMoreFilters, setShowMoreFilters] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);

    const allCities = [
        "Mumbai", "Delhi", "Bangalore", "Pune", "Hyderabad",
        "Ahmedabad", "Chennai", "Kolkata", "Jaipur",
    ];

    const filters = [
        { key: "buy", label: "Buy", options: ["Buy", "Rent"] },
        { key: "topLocalities", label: "Top Localities", options: [{ group: "Top Localities", items: ["Sobat", "Rajiv Chowk"] }] },
        { key: "budget", label: "Budget", options: [{ group: "Budget", items: ["< ₹10 L", "₹10 L - ₹20 L", "₹20 L - ₹50 L", "> ₹50 L"] }] },
        {
            key: "propertyType", label: "Property Type", options: [
                { group: "Residential", items: ["Flat", "House/ Villas", "Plot/Land"] },
                { group: "Commercial", items: ["Office", "Shop", "Industrials Shed/Land", "Godown", "Commercial"] },
                { group: "Others", items: ["Farm Houses"] }
            ]
        },
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

    const getDropdownStyle = (rect, dropdownWidth = 300) => {
        const viewportWidth = window.innerWidth;
        let left = rect.left + window.scrollX;
        let top = rect.bottom + window.scrollY + 8;

        if (left < 10) left = 10;
        if (left + dropdownWidth > viewportWidth - 10) {
            left = viewportWidth - dropdownWidth - 10;
        }

        return { position: "absolute", top, left };
    };

    const toggleDropdown = (key) => {
        if (filterButtonsRef.current[key]) {
            const rect = filterButtonsRef.current[key].getBoundingClientRect();
            const style = getDropdownStyle(rect, 300);
            setDropdownStyle(style);
        }
        setActiveDropdown(activeDropdown === key ? null : key);
        setShowMoreFilters(false);
    };

    const handleSelect = (filterKey, value) => {
        setSelectedValues({ ...selectedValues, [filterKey]: value });
        setActiveDropdown(null);
    };

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

    useEffect(() => {
        if (filteredCities.length > 0 && searchRef.current) {
            const rect = searchRef.current.getBoundingClientRect();
            const style = getDropdownStyle(rect, 300);
            setSearchDropdownStyle(style);
        }
    }, [filteredCities]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target) &&
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

    function renderDropdownContent(key) {
        const filter = filters.find(f => f.key === key);
        if (!filter) return null;

        return (
            <div
                className={`${styles.dropdown} ${styles[`dropdown-${key}`]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <ul>
                    {filter.options.map((option, index) =>
                        typeof option === "string" ? (
                            <li
                                key={option + index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(filter.key, option);
                                }}
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelect(filter.key, item);
                                            }}
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
            </div>
        );
    }

    return (
        <div className={styles.filterContainer}>
            <div className={`${styles.filterBar} container`} ref={filterRef}>
                {/* Search + Buy */}
                <div className={styles.searchGroup}>
                    <button
                        className={styles.filterButton}
                        onClick={() => toggleDropdown("buy")}
                        ref={(el) => (filterButtonsRef.current["buy"] = el)}
                    >
                        {selectedValues.buy}{" "}
                        <BiSolidDownArrow className={styles.dropdownIcon} />
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
                            <Portal>
                                <div
                                    className={styles.portalDropdown}
                                    style={searchDropdownStyle}
                                >
                                    <ul className={styles.dropdown}>
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
                                </div>
                            </Portal>
                        )}
                    </div>
                </div>

                {/* Other Filters */}
                <div className={styles.filtersWrapper}>
                    {filters.slice(1).map((filter) => (
                        <div key={filter.key} className={styles.filterDropdownWrapper}>
                            <button
                                className={styles.filterButton}
                                onClick={() => toggleDropdown(filter.key)}
                                ref={(el) => (filterButtonsRef.current[filter.key] = el)}
                            >
                                {selectedValues[filter.key] || filter.label}{" "}
                                <BiSolidDownArrow className={styles.dropdownIcon} />
                            </button>
                        </div>
                    ))}

                    {/* More Filters */}
                    <div className={styles.filterDropdownWrapper} ref={moreFiltersRef}>
                        <button
                            className={styles.filterButton}
                            onClick={() => setShowMoreFilters(!showMoreFilters)}
                        >
                            <FaSlidersH className={styles.icon} /> More Filters{" "}
                            <BiSolidDownArrow className={styles.dropdownIcon} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Portal: Normal dropdowns */}
            {activeDropdown && (
                <Portal>
                    <div className={styles.portalDropdown} style={dropdownStyle}>
                        {renderDropdownContent(activeDropdown)}
                    </div>
                </Portal>
            )}

            {/* Portal: More Filters */}
            {showMoreFilters && (
                <Portal>
                    <div
                        style={{
                            position: "absolute",
                            top: "75%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10000,
                        }}
                    >
                        <MoreFiltersPanel onClose={() => setShowMoreFilters(false)} />
                    </div>
                </Portal>
            )}
        </div>
    );
}
