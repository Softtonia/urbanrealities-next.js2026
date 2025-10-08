import React, { useState, useEffect } from "react";
import styles from "./MoreFiltersPanel.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const MoreFiltersPanel = ({ }) => {
  const [activeFilter, setActiveFilter] = useState("Covered Area");
  const [expandedSections, setExpandedSections] = useState({
    "Covered Area": true,
  });
  const [isMobile, setIsMobile] = useState(false);
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
    "floorLevel",
    "totalFloors",
    "bathrooms",
    "parking",
    "powerBackup",
    "petFriendly",
    "gatedCommunity",
    "propertyAge",
    "pricePerSqft",
    "furnishingType",
    "nearbyFacilities",
    "facingDetail",
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
    5, 10, 20, 30, 50, 100, 200, 300, 500, 1000, 1500, 2000,
  ];
  const formatBudget = (value) =>
    value >= 100 ? `₹${value / 100} Cr` : `₹${value} L`;

  const handleSelect = (type, value) => {
    if (type === "min") setBudgetRange([value, budgetRange[1]]);
    else setBudgetRange([budgetRange[0], value]);
    setOpenDropdown(null);
  };

  const toggleAccordion = (section) => {
    setExpandedSections({
      [section]: !expandedSections[section],
    });
  };

  // 🔥 Content render function (for reuse in desktop + mobile)
  const renderFilterContent = (title) => {
    switch (title) {
      case "Covered Area":
        return (
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Covered Area (sqft)</h3>
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
                    <small>Min</small>
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
                    <small>Max</small>

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

      case "Possession Status":
        return (
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Possession Status</h3>
            <div className={styles.optionsWrapper}>
              {data.possessionStatus.map((item) => (
                <button
                  key={item}
                  className={`${styles.filterOption} ${selectedPossessionStatus.includes(item) ? styles.active : ""
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
        );

      case "Sub Property Type":
        return (
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Sub Property Type</h3>

            {data.subPropertyType.map((group, i) => (
              <div key={i} className={styles.optionsWrapper}>
                {group.items.map((item) => (
                  <button
                    key={item}
                    className={`${styles.filterOption} ${selectedSubPropertyType.includes(item)
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
        );

      case "Sale Type":
        return (
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Sale Type</h3>
            <div className={styles.optionsWrapper}>
              {data.saleType.map((item) => (
                <button
                  key={item}
                  className={`${styles.filterOption} ${selectedSaleType.includes(item) ? styles.active : ""
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
        );

      case "Posted By":
        return (
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Posted By</h3>
            <div className={styles.optionsWrapper}>
              {data.postedBy.map((item) => (
                <button
                  key={item}
                  className={`${styles.filterOption} ${selectedPostedBy.includes(item) ? styles.active : ""
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
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`${styles.moreFiltersPanel} ${styles.show}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.panelContent}>
        {isMobile ? (
          // 📱 Mobile = Accordion
          <>
            <div className={styles.accordionWrapper}>
              {filtersMenu.map((item) => (
                <div key={item} className={styles.accordionSection}>
                  <div
                    className={`${styles.accordionHeader} ${expandedSections[item] ? styles.active : ""
                      }`}
                    onClick={() => toggleAccordion(item)}
                  >
                    {item}
                    {expandedSections[item] ? (
                      <IoMdArrowDropup className={styles.arrowIcon} />
                    ) : (
                      <IoMdArrowDropdown className={styles.arrowIcon} />
                    )}
                  </div>

                  {expandedSections[item] && (
                    <div className={styles.accordionContent}>
                      {renderFilterContent(item)}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.footerButtons}>
              <button
                className={`${styles.clearBtn} btn-small`}
                onClick={() => {
                  setSelectedPossessionStatus([]);
                  setSelectedSubPropertyType([]);
                  setSelectedPostedBy([]);
                  setSelectedSaleType([]);
                  setBudgetRange([5, 2000]);
                }}
              >
                Clear Filters
              </button>
              <button className={` ${styles.applyBtn} btn-small`}>
                Apply Filters
              </button>
            </div>
          </>
        ) : (
          // 💻 Desktop = Left + Right panel
          <>
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

            <div className={styles.rightPanel}>
              {renderFilterContent(activeFilter)}
            </div>
          </>
        )}
      </div>




    </div>
  );
};

export default MoreFiltersPanel;
