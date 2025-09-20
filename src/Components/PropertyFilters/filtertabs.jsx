"use client";
import { useState, useRef, useEffect } from "react";
import { FaSlidersH } from "react-icons/fa";
import { BiSolidDownArrow } from "react-icons/bi";
import styles from "./filtertabs.module.css";
import Slider from "rc-slider";

import MoreFiltersPanel from "./MoreFiltersPanel";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useCity } from "@/utils/CityContext";
import { useSearch } from "@/hooks/useSearch";


export default function PropertyFilters({ initialFilters }) {
  const { city } = useCity();
  const { globalFilters, setGlobalFilters, debouncedFilters } = useSearch({},{ autoPush: true });
  // const initialFilters = globalFilters

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const filterRefs = useRef({}); // all dropdown refs
  const [propertyType, setPropertyType] = useState(null);
  const [properties, setProperties] = useState(null);
  // track selected types per propertyId
  const [selectedTypes, setSelectedTypes] = useState({});
  const [purposes, setPurpose] = useState([])
  const [budgetRange, setBudgetRange] = useState([0, 0]); // [min, max]
  const [openDropdown, setOpenDropdown] = useState(null);
  const [localities, setLocalities] = useState([])
  // const [activePriceType, setActivePriceType] = useState("min");
  // const [budgetDropdown, setBudgetDropdown] = useState(false);
  // const [isLocationOpen, setIsLocationOpen] = useState(false);
  // const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState({
    purpose:'',
    topLocalities: "",
    budget: "",
    propertyType: "",
    bhk: "",
    postedBy: "",
  });

  console.log('global filter',globalFilters)

  const [filter, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    propertyId: "",
    propertyType: "",
    purpose: selectedValues.purpose || "",
    location: "",

  });
  const handleFilterChange = (key, value) => {
    console.log(key,value)
    // setFilter((prev) => ({ ...prev, [key]: value }));
    setGlobalFilters((prev = {}) => ({ ...prev, [key]: value }));

  };
  

  const priceOptions = [
    { label: "5 Lac", value: 500000 },
    { label: "10 Lac", value: 1000000 },
    { label: "20 Lac", value: 2000000 },
    { label: "30 Lac", value: 3000000 },
    { label: "40 Lac", value: 4000000 },
    { label: "50 Lac", value: 5000000 },
    { label: "60 Lac", value: 6000000 },
    { label: "70 Lac", value: 7000000 },
    { label: "80 Lac", value: 8000000 },
    { label: "90 Lac", value: 9000000 },
    { label: "1 Cr", value: 10000000 },
    { label: "1.2 Cr", value: 12000000 },
    { label: "1.4 Cr", value: 14000000 },
    { label: "1.6 Cr", value: 16000000 },
    { label: "1.8 Cr", value: 18000000 },
    { label: "2 Cr", value: 20000000 },
    { label: "2.3 Cr", value: 23000000 },
    { label: "2.6 Cr", value: 26000000 },
    { label: "3 Cr", value: 30000000 },
    { label: "3.5 Cr", value: 35000000 },
    { label: "4 Cr", value: 40000000 },
    { label: "4.5 Cr", value: 45000000 },
    { label: "5 Cr", value: 50000000 },
    { label: "10 Cr", value: 100000000 },
    { label: "20 Cr", value: 200000000 },
  ];
  console.log('==>', filter)

  // Format number to label
  const formatBudget = (val) => {
    const item = priceOptions.find((p) => p.value === val);
    return item ? item.label : val;
  };
  // const selectPrice = (price, e) => {
  //   e.stopPropagation();
  //   if (activePriceType === "min") {
  //     handleFilterChange("minPrice", price.value);
  //   } else {
  //     handleFilterChange("maxPrice", price.value);
  //   }
  // };

  // Initialize budgetRange fromglobalFilters
  useEffect(() => {
    if (initialFilters) {
      const min = Number(initialFilters.property_price_low) || priceOptions[0].value;
      const max = Number(initialFilters.property_price_high) || priceOptions[priceOptions.length - 1].value;

      setBudgetRange([min, max]);
    }
  }, [initialFilters]);

  // const handleSelectBudget = (type, value) => {
  //   if (type === "min") {
  //     // Ensure min < max
  //     const max = budgetRange[1];
  //     const newMin = value >= max ? priceOptions.find(p => p.value < value)?.value || max : value;
  //     setBudgetRange([newMin, max]);
  //   } else {
  //     const min = budgetRange[0];
  //     const newMax = value <= min ? priceOptions.find(p => p.value > value)?.value || min : value;
  //     setBudgetRange([min, newMax]);
  //   }
  // };
  const handlePrice = (price) => {
    e.stopPropagation();
    handleFilterChange("maxPrice", price[0]);
    handleFilterChange("minPrice", price[1]);

    if (activePriceType === "min") {
      setBudgetRange((prev) => [price.value, prev[1]]); // update min
    } else {
      setBudgetRange((prev) => [prev[0], price.value]); // update max
    }
  };



  // const allCities = [
  //   "Mumbai",
  //   "Delhi",
  //   "Bangalore",
  //   "Pune",
  //   "Hyderabad",
  //   "Ahmedabad",
  //   "Chennai",
  //   "Kolkata",
  //   "Jaipur",
  // ];

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
      type: "list",
      heading: "Select Locality",
      className: "dropdown-toplocalities",
      options: ["Sobat", "Rajiv Chowk"],
    },
    {
      key: "budget",
      label: "Budget",
      type: "slider",
      heading: "Select Budget Range",
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
      type: "pills",
      heading: "Select BHK",
      className: "dropdown-bhk",
      options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"],
    },
    {
      key: "postedBy",
      label: "Posted By",
      type: "list",
      heading: "Select Posted By",
      className: "dropdown-postedby",
      options: ["Owner", "Broker", "Builder/Developer"],
    },
  ];
  console.log('\\\>',globalFilters)

  useEffect(() => {
    if (initialFilters?.property_type_id && propertyType?.length) {
      const typeIds =globalFilters.property_type_id
        .split(",")
        .map((id) => String(id).trim());


      const mappedSelections = {};

      typeIds.forEach((id) => {
        propertyType.forEach((prop) => {
          const found = prop.types.find((t) => String(t.id) === id);
          if (found) {
            if (!mappedSelections[prop.id]) {
              mappedSelections[prop.id] = [];
            }
            mappedSelections[prop.id].push(String(found.id));
          }
        });
      });

      setSelectedTypes(mappedSelections);
    }
  }, [initialFilters, propertyType]);
  useEffect(() => {
    if (initialFilters) {
      setSelectedValues((prev) => ({
        ...prev,
        purpose:globalFilters.purpose,
      }))
    }
  }, [initialFilters])
  console.log('-->',globalFilters)


  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/post-property/get-property-listing`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setProperties(data);
        } else if (data?.data) {
          setProperties(data.data);
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };
    fetchProperty();
  }, []);



  useEffect(() => {
    const fetchLocalities = async () => {
      try {
        const res = await fetch(`/api/global-search-filter/get-locality?${city ? `city_id=${city.id}&state_id=${city.state_id}&country_id=${city.country_id}` : ''}&model=PropertyList`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setLocalities(data);
        } else if (data?.data) {
          setLocalities(data.data);
        }
      } catch (err) {
        console.error("Error fetching purpose:", err);
      }
    };
    if (city) {
      fetchLocalities();
    }

  }, [city]);


  useEffect(() => {
    const fetchPurpose = async () => {
      try {
        const res = await fetch(`/api/post-property/get-purpose`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setPurpose(data);
        } else if (data?.data) {
          setPurpose(data.data);
        }
      } catch (err) {
        console.error("Error fetching purpose:", err);
      }
    };
    fetchPurpose();
  }, []);

  // Fetch property types
  useEffect(() => {
    if (!properties || properties.length === 0) return;
    const fetchPropertyTypes = async () => {
      try {
        const typeRequests = properties.map((prop) =>
          fetch(`/api/post-property/get-property-type/${prop.id}`)
            .then((res) => res.json())
            .then((data) => ({
              ...prop,
              types: Array.isArray(data) ? data : data?.data || [],
            }))
        );
        const results = await Promise.all(typeRequests);
        setPropertyType(results);
      } catch (err) {
        console.error("Error fetching property types:", err);
      }
    };
    fetchPropertyTypes();
  }, [properties]);

  // Toggle dropdown
  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
    setShowMoreFilters(false);
  };

  const toggleMoreFilters = () => {
    setShowMoreFilters((prev) => !prev);
    setActiveDropdown(null);
  };

  // const handleSelect = (key, value) => {
  //   setSelectedValues((prev) => ({ ...prev, [key]: value }));
  //   setActiveDropdown(null);
  // };
  // Handle property type checkboxes
  const handleSelect = (typeId, propertyId) => {
    typeId = String(typeId);
    propertyId = String(propertyId);

    setSelectedTypes((prev) => {
      const prevTypes = prev[propertyId] || [];
      const updatedTypes = prevTypes.includes(typeId)
        ? prevTypes.filter((id) => id !== typeId)
        : [...prevTypes, typeId];

      const newSelection = {
        ...prev,
        [propertyId]: updatedTypes.length > 0 ? updatedTypes : undefined,
      };

      // cleanup empty
      Object.keys(newSelection).forEach(
        (k) => !newSelection[k] && delete newSelection[k]
      );

      return newSelection;
    });
  };



  const handleSelectPurpose = (type) => {
    setSelectedValues((prev) => ({
      ...prev,
      purpose: type
    }))
  }
  console.log("-=->", selectedTypes)


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
  const moreFiltersRef = useRef(null);

  // In useEffect
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedInside =
        Object.values(filterRefs.current).some(
          (ref) => ref && ref.contains(e.target)
        ) ||
        (moreFiltersRef.current && moreFiltersRef.current.contains(e.target));

      if (!clickedInside) {
        setActiveDropdown(null);
        setShowMoreFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   setGlobalFilters((prev) => ({
  //     ...prev,
  //     filter
  //   }))
  // }, [filter]);

  return (
    <div className={styles.filterContainer}>
      <div className={`${styles.filterBar} container`}>
        {/* Search + Buy */}
        <div className={styles.searchGroup}>
          {/* Buy Dropdown */}
          <div
            className={styles.buyWrapper}
            ref={(el) => (filterRefs.current["buy"] = el)}
          >
            <button
              className={`${styles.filterButton} ${styles.buyButton}`}
              onClick={() => toggleDropdown("buy")}
            >
              <small>{selectedValues.purpose} </small>
              <BiSolidDownArrow className={styles.dropdownIcon} />
            </button>
            {activeDropdown === "buy" && (
              <div className={`${styles.dropdownPanel} ${styles.buyDropdown}`}>
                {purposes.map((option) => (
                  <div
                    key={option}
                    className={`${styles.option} ${selectedValues.purpose === option.name ? styles.pillOptionActive : ''}`}

                    onClick={() => handleSelectPurpose(option.name)}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={styles.searchDivider}></div>

          {/* Search Input */}
          <div
            className={styles.searchWrapper}
            ref={(el) => (filterRefs.current["search"] = el)}
          >
            <input
              type="text"
              placeholder="Enter city, locality..."
              className={styles.searchInput}
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setFilteredCities(allCities)}
            />
            {filteredCities.length > 0 && (
              <div
                className={`${styles.dropdownPanel} ${styles.searchDropdown}`}
              >
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
              ref={(el) => (filterRefs.current[filter.key] = el)}
              className={`${styles.filterWrapper} ${filter.key === "postedBy" ? styles.postedByWrapper : ""
                } ${filter.key === "bhk" ? styles.bhkWrapper : ""} ${filter.key === "propertyType" ? styles.propertyTypeWrapper : ""
                } ${filter.key === "budget" ? styles.budgetWrapper : ""} ${filter.key === "topLocalities"
                  ? styles.topLocalitiesWrapper
                  : ""
                }`}
            >
              <button
                className={`${styles.filterButton} ${selectedValues[filter.key] ? styles.active : ""
                  }`}
                onClick={() => toggleDropdown(filter.key)}
              >
                <small>{selectedValues[filter.key] || filter.label}</small>
                <BiSolidDownArrow className={styles.dropdownIcon} />
              </button>

              {activeDropdown === filter.key && (
                <div
                  className={`${styles.dropdownPanel} ${styles[filter.className]
                    }`}
                >
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
                    localities.map((opt, index) => (
                      <div
                        key={index}
                        className={styles.listOption}
                        onClick={() => handleSelect(filter.key, opt)}
                      >
                        <small>{opt}</small>
                      </div>
                    ))}

                  {filter.type === "grouped" &&
                    propertyType && propertyType.map((property, index) => (
                      <div key={index} className={styles.groupSection}>
                        <div className={styles.groupHeading}>{property.name}</div>
                        <div className={styles.groupOptions}>
                          {property.types.map((type, index) => {
                            const isSelected = selectedTypes[property.id]?.includes(String(type.id));
                            return (
                              <div
                                key={index}
                                className={`${styles.pillOption} ${isSelected ? styles.pillOptionActive : ""}`}
                                onClick={() => handleSelect(type.id, property.id)}
                              >
                                {isSelected ? "✓" : "+"} {type.name}
                              </div>
                            );
                          })}

                        </div>
                      </div>
                    ))}

                  {filter.type === "slider" && (
                    <div className={styles.filterSection}>
                      {/* <h3 className={styles.filterTitle}>Budget </h3> */}
                      <div className={styles.budgetDropdowns}>
                        <div className={styles.rangeDropdown}>
                          <div
                            className={styles.customSelect}
                            onClick={() => setOpenDropdown(openDropdown === "min" ? null : "min")}
                          >
                            {/* {formatBudget(budgetRange[0])} <IoMdArrowDropdown /> */}
                          </div>
                          {/* {openDropdown === "min" && (
                            <ul className={styles.dropdownMenuCustom}>
                              <small>Min</small>
                              {priceOptions.map((p) => (
                                <li
                                  key={p.value}
                                  className={styles.menuList}
                                  onClick={() => handleSelectBudget("min", p.value)}
                                >
                                  {p.label}
                                </li>
                              ))}
                            </ul>
                          )} */}
                        </div>
                        {/* <span>to</span> */}
                        <div className={styles.rangeDropdown}>
                          <div
                            className={styles.customSelect}
                            onClick={() => setOpenDropdown(openDropdown === "max" ? null : "max")}
                          >
                            {/* {formatBudget(budgetRange[1])} <IoMdArrowDropdown /> */}
                          </div>
                          {/* //</div> {openDropdown === "max" && (
                          //   <ul className={styles.dropdownMenuCustom}>
                          //     <small>Max</small>
                          //     {priceOptions.map((p) => (
                          //       <li
                          //         key={p.value}
                          //         className={styles.menuList}
                          //         onClick={() => handleSelectBudget("max", p.value)}
                          //       >
                          //         {p.label}
                          //       </li>
                          //     ))}
                          //   </ul>
                          // )} */}
                        </div>
                      </div>
                      <Slider
                        range
                        min={priceOptions[0].value}
                        max={priceOptions[priceOptions.length - 1].value}
                        step={50000}
                        value={budgetRange}
                        onChange={(val) => {
                          setBudgetRange(val);        // update local state
                          handlePrice(val)
                        }}
                        trackStyle={[{ backgroundColor: "var(--Orange-Red)" }]}
                        handleStyle={[
                          { border: "4px solid var(--Orange-Red)", backgroundColor: "var(--White)" },
                          { border: "4px solid var(--Orange-Red)", backgroundColor: "var(--White)" },
                        ]}
                        railStyle={{ backgroundColor: "var(--Gray)" }}
                      />
                      <div className={styles.budgetDropdowns}>
                        <div className={styles.rangeDropdown}>
                          <div
                            className={styles.customSelect}
                            onClick={() => setOpenDropdown(openDropdown === "min" ? null : "min")}
                          >
                            ₹{formatBudget(budgetRange[0])}
                          </div>
                          {/* {openDropdown === "min" && (
                            <ul className={styles.dropdownMenuCustom}>
                              <small>Min</small>
                              {priceOptions.map((p) => (
                                <li
                                  key={p.value}
                                  className={styles.menuList}
                                  onClick={() => handleSelectBudget("min", p.value)}
                                >
                                  {p.label}
                                </li>
                              ))}
                            </ul>
                          )} */}
                        </div>
                        {/* <span>to</span> */}
                        <div className={styles.rangeDropdown}>
                          <div
                            className={styles.customSelect}
                            onClick={() => setOpenDropdown(openDropdown === "max" ? null : "max")}
                          >
                            ₹{formatBudget(budgetRange[1])}
                          </div>
                          {/* //</div> {openDropdown === "max" && (
                          //   <ul className={styles.dropdownMenuCustom}>
                          //     <small>Max</small>
                          //     {priceOptions.map((p) => (
                          //       <li
                          //         key={p.value}
                          //         className={styles.menuList}
                          //         onClick={() => handleSelectBudget("max", p.value)}
                          //       >
                          //         {p.label}
                          //       </li>
                          //     ))}
                          //   </ul>
                          // )} */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* More Filters */}
          <div
            className={styles.moreFiltersWrapper}
            ref={(el) => (filterRefs.current["more"] = el)}
          >
            <button
              className={`${styles.filterButton} ${showMoreFilters ? styles.active : ""
                }`}
              onClick={toggleMoreFilters}
            >
              <small><FaSlidersH className={styles.icon} /> More Filters</small>
              <BiSolidDownArrow className={styles.dropdownIcon} />
            </button>
          </div>
        </div>

        {showMoreFilters && (
          <div className={styles.moreFiltersPanel} ref={moreFiltersRef}>
            <MoreFiltersPanel onClose={() => setShowMoreFilters(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
