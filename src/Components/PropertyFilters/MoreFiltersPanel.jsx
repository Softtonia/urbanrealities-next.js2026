import React, { useState } from "react";
import styles from "./PropertyFilters.module.css";
import { FaTimes } from "react-icons/fa";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {  IoMdArrowDropdown } from "react-icons/io";

const MoreFiltersPanel = ({ onClose }) => {
  const [activeFilter, setActiveFilter] = useState("Covered Area");
  const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([]);
  const [selectedSubPropertyType, setSelectedSubPropertyType] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [selectedSaleType, setSelectedSaleType] = useState([]);
  const [budgetRange, setBudgetRange] = useState([5, 2000]); // ₹5L to ₹20Cr
  const [openDropdown, setOpenDropdown] = useState(null); // 'min' or 'max'

  const filtersMenu = [
    "Covered Area",
    "Possession Status",
    "Sub Property Type",
    "Sale Type",
    "Posted By",
    "Ownership",
    "Furnishing",
    "Amenities",
    "Verified Property",
    "Facing",
  ];

  const data = {
    possessionStatus: ["Ready To Move", "Under Construction"],
    subPropertyType: [
      {
        items: [
          "Flat",
          "House/ Villas",
          "Plot/Land",
          "Office",
          "Shop",
          "Godown",
          "Industrials Shed/Land",
          "Commercial",
        ],
      },
    ],
    saleType: ["New", "Resale"],
    postedBy: ["Owner", "Broker", "Developer"],
  };

  const handleToggle = (state, setState, value) => {
    setState(
      state.includes(value)
        ? state.filter((item) => item !== value)
        : [...state, value]
    );
  };
  const budgetOptions = [
    5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300,
    400, 500, 600, 700, 800, 900, 1000, 1500, 2000,
  ];
  const formatBudget = (value) => {
    return value >= 100 ? `₹${value / 100} Cr` : `₹${value} L`;
  };

  const handleSelect = (type, value) => {
    if (type === "min") {
      setBudgetRange([value, budgetRange[1]]);
    } else {
      setBudgetRange([budgetRange[0], value]);
    }
    setOpenDropdown(null); // close dropdown after selection
  };

  return (
    <div className={`${styles.moreFiltersPanel} ${styles.show}`}>
      {/* <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button> */}

      <div className={styles.panelContent}>
        {/* Left Menu */}
        <div className={styles.leftPanel}>
          <ul className={styles.filterList}>
            {filtersMenu.map((item) => (
              <li
                key={item}
                className={activeFilter === item ? styles.active : ""}
                onClick={() => setActiveFilter(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Content */}
        <div className={styles.rightPanel}>
          {activeFilter === "Covered Area" && (
            <div className={styles.filterSection}>
              <h3>Covered Area (sqft)</h3>

              <div className={styles.budgetDropdowns}>
                {/* Min Budget */}
                <div className={styles.rangeDropdown}>
                  <div
                    className={styles.customSelect}
                    onClick={() =>
                      setOpenDropdown(openDropdown === "min" ? null : "min")
                    }
                  >
                    {formatBudget(budgetRange[0])}
                    <IoMdArrowDropdown />
                  </div>
                  {openDropdown === "min" && (
                    <ul className={styles.dropdownMenuCustom}>
                      {budgetOptions.map((val) => (
                        <li
                          className={styles.menuList}
                          key={val}
                          onClick={() => handleSelect("min", val)}
                        >
                          {formatBudget(val)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <span>to</span>

                {/* Max Budget */}
                <div className={styles.rangeDropdown}>
                  <div
                    className={styles.customSelect}
                    onClick={() =>
                      setOpenDropdown(openDropdown === "max" ? null : "max")
                    }
                  >
                    {formatBudget(budgetRange[1])}
                    <IoMdArrowDropdown />
                  </div>
                  {openDropdown === "max" && (
                    <ul className={styles.dropdownMenuCustom}>
                      {budgetOptions.map((val) => (
                        <li
                          className={styles.menuList}
                          key={val}
                          onClick={() => handleSelect("max", val)}
                        >
                          {formatBudget(val)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Add range slider here */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "15px",
                  width: "50%",
                }}
              >
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
          )}

          {activeFilter === "Covered Area" && (
            <div className={styles.filterSection}>
              <h3>Possession Status</h3>
              <div className={styles.optionsWrapper}>
                {data.possessionStatus.map((item) => (
                  <button
                    key={item}
                    className={`${styles.filterOption} ${
                      selectedPossessionStatus.includes(item)
                        ? styles.active
                        : ""
                    }`}
                    onClick={() =>
                      handleToggle(
                        selectedPossessionStatus,
                        setSelectedPossessionStatus,
                        item
                      )
                    }
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          {activeFilter === "Covered Area" && (
            <div className={styles.filterSection}>
              <h3>Sub Property Type</h3>
              <div className={styles.optionsgroup}>
                {data.subPropertyType.map((group) => (
                  <div key={group.group} className={styles.optionsWrapper}>
                    {group.items.map((item) => (
                      <button
                        key={item}
                        className={`${styles.filterOption} ${
                          selectedSubPropertyType.includes(item)
                            ? styles.active
                            : ""
                        }`}
                        onClick={() =>
                          handleToggle(
                            selectedSubPropertyType,
                            setSelectedSubPropertyType,
                            item
                          )
                        }
                      >
                        + {item}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFilter === "Covered Area" && (
            <div className={styles.filterSection}>
              <h3>Sale Type</h3>
              <div className={styles.optionsWrapper}>
                {data.saleType.map((item) => (
                  <button
                    key={item}
                    className={`${styles.filterOption} ${
                      selectedSaleType.includes(item) ? styles.active : ""
                    }`}
                    onClick={() =>
                      handleToggle(selectedSaleType, setSelectedSaleType, item)
                    }
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          {activeFilter === "Covered Area" && (
            <div className={styles.filterSection}>
              <h3>Posted By</h3>
              <div className={styles.optionsWrapper}>
                {data.postedBy.map((item) => (
                  <button
                    key={item}
                    className={`${styles.filterOption} ${
                      selectedPostedBy.includes(item) ? styles.active : ""
                    }`}
                    onClick={() =>
                      handleToggle(selectedPostedBy, setSelectedPostedBy, item)
                    }
                  >
                    + {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreFiltersPanel;
