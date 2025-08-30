import React, { useState, useEffect } from "react";
import styles from "./MoreFiltersPanel.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const MoreFiltersPanel = ({ onClose }) => {
  const [activeFilter, setActiveFilter] = useState("Covered Area");
  const [expandedSections, setExpandedSections] = useState({});
  const [isMobile, setIsMobile] = useState(false); // mobile check
  const [selectedPossessionStatus, setSelectedPossessionStatus] = useState([]);
  const [selectedSubPropertyType, setSelectedSubPropertyType] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [selectedSaleType, setSelectedSaleType] = useState([]);
  const [budgetRange, setBudgetRange] = useState([5, 2000]);
  const [openDropdown, setOpenDropdown] = useState(null);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
        ? state.filter((i) => i !== value)
        : [...state, value]
    );
  };

  const budgetOptions = [
    5, 10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 150, 200, 250, 300,
    400, 500, 600, 700, 800, 900, 1000, 1500, 2000,
  ];
  const formatBudget = (value) =>
    value >= 100 ? `₹${value / 100} Cr` : `₹${value} L`;

  const handleSelect = (type, value) => {
    if (type === "min") setBudgetRange([value, budgetRange[1]]);
    else setBudgetRange([budgetRange[0], value]);
    setOpenDropdown(null);
  };

  const toggleAccordion = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const renderAccordionSection = (title, content) => (
    <div className={styles.accordionSection} key={title}>
      <div
        className={styles.accordionHeader}
        onClick={() => toggleAccordion(title)}
      >
        {title}
        {expandedSections[title] ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>
      {expandedSections[title] && (
        <div className={styles.accordionContent}>{content}</div>
      )}
    </div>
  );

  // Content for each section
  const coveredAreaContent = (
    <div className={styles.filterSection}>
      <h3>Covered Area (sqft)</h3>
      <div className={styles.budgetDropdowns}>
        <div className={styles.rangeDropdown}>
          <div
            className={styles.customSelect}
            onClick={() =>
              setOpenDropdown(openDropdown === "min" ? null : "min")
            }
          >
            {formatBudget(budgetRange[0])} <IoMdArrowDropdown />
          </div>
          {openDropdown === "min" && (
            <ul className={styles.dropdownMenuCustom}>
              {budgetOptions.map((val) => (
                <li
                  key={val}
                  className={styles.menuList}
                  onClick={() => handleSelect("min", val)}
                >
                  {formatBudget(val)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <span>to</span>
        <div className={styles.rangeDropdown}>
          <div
            className={styles.customSelect}
            onClick={() =>
              setOpenDropdown(openDropdown === "max" ? null : "max")
            }
          >
            {formatBudget(budgetRange[1])} <IoMdArrowDropdown />
          </div>
          {openDropdown === "max" && (
            <ul className={styles.dropdownMenuCustom}>
              {budgetOptions.map((val) => (
                <li
                  key={val}
                  className={styles.menuList}
                  onClick={() => handleSelect("max", val)}
                >
                  {formatBudget(val)}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
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
  );

  return (
    <div
      className={`${styles.moreFiltersPanel} ${styles.show}`}
      onClick={(e) => e.stopPropagation()}
    >
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

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          {isMobile ? (
            <>
              {renderAccordionSection("Covered Area", coveredAreaContent)}
              {renderAccordionSection(
                "Possession Status",
                <div className={styles.filterSection}>
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
              )}
              {renderAccordionSection(
                "Sub Property Type",
                <div className={styles.filterSection}>
                  {data.subPropertyType.map((group, i) => (
                    <div key={i} className={styles.optionsWrapper}>
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
              )}
              {renderAccordionSection(
                "Sale Type",
                <div className={styles.filterSection}>
                  {data.saleType.map((item) => (
                    <button
                      key={item}
                      className={`${styles.filterOption} ${
                        selectedSaleType.includes(item) ? styles.active : ""
                      }`}
                      onClick={() =>
                        handleToggle(
                          selectedSaleType,
                          setSelectedSaleType,
                          item
                        )
                      }
                    >
                      + {item}
                    </button>
                  ))}
                </div>
              )}
              {renderAccordionSection(
                "Posted By",
                <div className={styles.filterSection}>
                  {data.postedBy.map((item) => (
                    <button
                      key={item}
                      className={`${styles.filterOption} ${
                        selectedPostedBy.includes(item) ? styles.active : ""
                      }`}
                      onClick={() =>
                        handleToggle(
                          selectedPostedBy,
                          setSelectedPostedBy,
                          item
                        )
                      }
                    >
                      + {item}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Desktop view: normal panel */}
              {coveredAreaContent}
              <div className={styles.filterSection}>
                <h3>Possession Status</h3>
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
              <div className={styles.filterSection}>
                <h3>Sub Property Type</h3>
                {data.subPropertyType.map((group, i) => (
                  <div key={i} className={styles.optionsWrapper}>
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
              <div className={styles.filterSection}>
                <h3>Sale Type</h3>
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
              <div className={styles.filterSection}>
                <h3>Posted By</h3>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoreFiltersPanel;
