"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./PropertySearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLocation, IoSearch } from "react-icons/io5";
import { FaMapPin, FaHouse, FaRupeeSign, FaBuilding } from "react-icons/fa6";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useCity } from "@/utils/CityContext";
import { slugify } from "@/utils/slugify";
import { useSearch } from "@/hooks/useSearch";
import Search from "antd/es/transfer/search";
import { LARAVEL_API_BASE_URL, LARAVEL_APPLICATION_PASSWORD, APP_TYPE } from "@/lib/config";

export default function PropertySearch({ purpose }) {
  const [activePriceType, setActivePriceType] = useState("min");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [searchOptions, setSearchOptions] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [localPurpose, setLocalPurpose] = useState(purpose || "sell");

  useEffect(() => {
    if (purpose) {
      // Map 'Buy' to 'sell' to match common API values, otherwise use purpose directly
      const mappedPurpose = purpose.toLowerCase() === "buy" ? "sell" : purpose.toLowerCase();
      setLocalPurpose(mappedPurpose);
    }
  }, [purpose]);

  const [budgetDropdown, setBudgetDropdown] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isTypeOpen, setIsTypeOpen] = useState(false); // ✅ custom dropdown state
  const [expandedGroups, setExpandedGroups] = useState([0]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  const toggleGroup = (groupIdx) => {
    setExpandedGroups((prev) =>
      prev.includes(groupIdx) ? prev.filter((id) => id !== groupIdx) : [...prev, groupIdx]
    );
  };


  const dropdownRef = useRef(null);
  const locationRef = useRef(null)
  const budgetDropdownRef = useRef(null);
  const router = useRouter();
  const { city: globalCity, setCity: setGlobalCity } = useCity();
  const [localCity, setLocalCity] = useState(null);

  useEffect(() => {
    setLocalCity(globalCity);
  }, [globalCity]);

  const handleViewsearch = () => {
    router.push("/FilterMobile");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsTypeOpen(false);
      }
      if (
        budgetDropdownRef.current &&
        !budgetDropdownRef.current.contains(e.target)
      ) {
        setBudgetDropdown(false);
      }
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target)
      ) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // to handle property type and type id

  const handleTypeChange = (typeId) => {
    setSelectedTypes((prev) => {
      if (prev.includes(typeId)) {
        return prev.filter((id) => id !== typeId);
      }
      return [...prev, typeId];
    });
  };

  const formatPrice = (value) => {
    if (value >= 10000000) {
      const cr = value / 10000000;
      return `₹${Number.isInteger(cr) ? cr : cr.toFixed(1)} Cr`;
    }
    if (value >= 100000) {
      const lac = value / 100000;
      return `₹${Number.isInteger(lac) ? lac : lac.toFixed(1)} Lac`;
    }
    return `₹${value}`;
  };

  const handleTogglePrice = (type) => {
    setActivePriceType(type);
  };


  const selectMinPrice = (price, e) => {
    e.stopPropagation();
    setMinPrice(price.value);
    setActivePriceType("max");
  };

  const selectMaxPrice = (price, e) => {
    e.stopPropagation();
    setMaxPrice(price.value);
  };

  // Fetch search options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(`${LARAVEL_API_BASE_URL}/api/frontend/property-search/options`, {
          headers: {
            "Content-Type": "application/json",
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE,
          }
        });
        const data = await res.json();
        if (data?.status) {

          setSearchOptions(data.data);
        }
      } catch (err) {
        console.error("Error fetching property search options:", err);
      }
    };
    fetchOptions();
  }, []);

  // Fetch location suggestions
  useEffect(() => {
    if (!inputLocation || inputLocation.length < 2) {
      setLocationSuggestions([]);
      return;
    }
    const fetchLocations = async () => {
      try {
        const res = await fetch(`${LARAVEL_API_BASE_URL}/api/frontend/property-search/location-suggestions?search=${inputLocation}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
            "X-App-Type": APP_TYPE,
          }
        });
        const data = await res.json();
        if (data?.status && Array.isArray(data.data)) {
          setLocationSuggestions(data.data);
        } else {
          setLocationSuggestions([]);
        }
      } catch (err) {
        console.error("Error fetching location suggestions:", err);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchLocations();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [inputLocation]);



  const selectedTypeNames = (() => {
    const allSelectedTypeSlugs = selectedTypes.map(String);
    const selected = searchOptions?.property_types?.filter((t) => allSelectedTypeSlugs.includes(String(t.slug))) || [];

    if (selected.length === 0) return "Property Type";
    if (selected.length === 1) return selected[0].name;
    return `${selected[0].name} +${selected.length - 1} more`;
  })();


  const { search } = useSearch({}, { autoPush: false });
  const handleSearch = () => {

    const typeIds = selectedTypes;

    const filters = {
      minPrice,
      maxPrice,
      propertyId: "",
      propertyType: typeIds.join(","),
      purpose: localPurpose,
      location: inputLocation || localCity?.name || "",
      city_id: selectedCityId || localCity?.id || "",
    };
    search(filters)
    

  };

  // Min options → less than maxPrice (if maxPrice chosen)
  const filteredMinOptions = (searchOptions?.budget_options?.min || []).filter(
    (val) => !maxPrice || val < maxPrice
  ).map(val => ({ label: formatPrice(val), value: val }));

  // Max options → greater than minPrice (if minPrice chosen)
  const filteredMaxOptions = (searchOptions?.budget_options?.max || []).filter(
    (val) => !minPrice || val > minPrice
  ).map(val => ({ label: formatPrice(val), value: val }));


  // console.log('==>', );
  return (
    <>
      <div className="container">
        <div className="searchbar-cts d-flex justify-content-center align-items-center">
          <div className="search-container">
            {/* Location Dropdown */}
            <div className="dropdown full-click-area" ref={locationRef} style={{ width: "280px" }}>
              <div
                className="dropdown-toggle d-flex align-items-center gap-2"
                onClick={() => setIsLocationOpen((prev) => !prev)}
              >
                <IoLocation className={"icon-custom"} />
                {localCity && (
                  <span className="Add-city d-flex align-items-center gap-1">
                    {localCity.name}
                    <span 
                      style={{ 
                        cursor: "pointer", 
                        fontWeight: "bold", 
                        marginLeft: "4px",
                        display: isLocationOpen ? "inline" : "none"
                      }} 
                      onClick={(e) => {
                        e.stopPropagation();
                        setLocalCity(null);
                        setInputLocation("");
                      }}
                    >
                      ×
                    </span>
                  </span>
                )}
                <input
                  type="text"
                  placeholder={localCity ? "" : "Search location..."}
                  className="search-input"
                  style={{ flex: 1, minWidth: "50px" }}
                  value={inputLocation}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLocationOpen(true);
                  }}
                  onChange={(e) => {
                    setInputLocation(e.target.value);
                    setIsLocationOpen(true);
                  }}
                />
              </div>
              {isLocationOpen && (
                <div
                  className="dropdown-menu body-text-14 custom-dropdown show p-3"
                  onClick={(e) => e.stopPropagation()}
                  style={{ minWidth: "720px", border: "none", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", borderRadius: "8px" }}
                >
                  {/* Recent Searches */}
                  <div className="recent-searches mb-3">
                    <h6 style={{ fontSize: "12px", fontWeight: "bold", color: "#555" }}>Recent Searches</h6>
                    <div 
                      className="recent-search-item p-2 mt-2" 
                      style={{ backgroundColor: "#f8f9fa", border: "1px solid #e9ecef", borderRadius: "8px", cursor: "pointer" }}
                      onClick={() => {
                        setInputLocation("Bangalore");
                        setIsLocationOpen(false);
                      }}
                    >
                      <div style={{ color: "#333", fontSize: "14px" }}>Buy in Bangalore</div>
                      <div style={{ color: "#888", fontSize: "12px" }}>Flat, House/Villa, Plot, All ...</div>
                    </div>
                  </div>

                  {/* Location Header and List - ONLY visible when NO city is selected */}
                  {!localCity && (
                    <>
                      <div className="location-header mb-2">
                    <span style={{ backgroundColor: "var(--Orange-Red)", color: "#fff", padding: "2px 6px", fontSize: "12px", fontWeight: "bold", borderRadius: "2px" }}>
                      Location
                    </span>
                  </div>

                  {/* Location List */}
                  <ul className="list-unstyled mb-0" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {locationSuggestions.length > 0 ? (
                      locationSuggestions.map((loc, idx) => {
                        // Highlight matching text in red
                        const matchIndex = loc.name.toLowerCase().indexOf(inputLocation.toLowerCase());
                        let beforeMatch = loc.name;
                        let matchText = "";
                        let afterMatch = "";

                        if (inputLocation && matchIndex !== -1) {
                          beforeMatch = loc.name.substring(0, matchIndex);
                          matchText = loc.name.substring(matchIndex, matchIndex + inputLocation.length);
                          afterMatch = loc.name.substring(matchIndex + inputLocation.length);
                        }

                        return (
                          <li 
                            key={idx} 
                            style={{ padding: "6px 0", cursor: "pointer", fontSize: "14px", color: "#555" }}
                            onClick={() => {
                              setInputLocation(loc.name);
                              setSelectedCityId(loc.city_id);
                              setGlobalCity({ id: loc.city_id, name: loc.name });
                              setIsLocationOpen(false);
                            }}
                          >
                            <div>
                              {beforeMatch}
                              <span style={{ color: "#ff4d4f" }}>{matchText}</span>
                              {afterMatch}
                            </div>
                            <div style={{ fontSize: "11px", color: "#888" }}>{loc.full_location}</div>
                          </li>
                        );
                      })
                    ) : inputLocation.length >= 2 ? (
                      <li style={{ padding: "6px 0", fontSize: "14px", color: "#555" }}>No suggestions found</li>
                    ) : (
                      // Default locations when input is empty or too short
                      [
                        "Delhi Ncr",
                        "New Delhi",
                        "Gurgaon",
                        "Noida",
                        "Bangalore",
                        "Mumbai",
                        "Pune"
                      ]
                        .filter((loc) => loc.toLowerCase().includes(inputLocation.toLowerCase()))
                        .map((loc, idx) => {
                          const matchIndex = loc.toLowerCase().indexOf(inputLocation.toLowerCase());
                          let beforeMatch = loc;
                          let matchText = "";
                          let afterMatch = "";

                          if (inputLocation && matchIndex !== -1) {
                            beforeMatch = loc.substring(0, matchIndex);
                            matchText = loc.substring(matchIndex, matchIndex + inputLocation.length);
                            afterMatch = loc.substring(matchIndex + inputLocation.length);
                          }

                          return (
                            <li 
                              key={idx} 
                              style={{ padding: "6px 0", cursor: "pointer", fontSize: "14px", color: "#555" }}
                              onClick={() => {
                                setInputLocation(loc);
                                setIsLocationOpen(false);
                              }}
                            >
                              {beforeMatch}
                              <span style={{ color: "#ff4d4f" }}>{matchText}</span>
                              {afterMatch}
                            </li>
                          );
                        })
                    )}
                  </ul>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="vertical-line"></div>

            {/* ✅ Custom Type Dropdown */}
            <div className="dropdown full-click-area" ref={dropdownRef}>
              <div
                className="dropdown-toggle d-flex align-items-center gap-2"
                onClick={() => setIsTypeOpen((prev) => !prev)}
              >
                <FaHouse className={"icon-custom"} />
                <div className="nav-text">
                  <span className="text-muted nav-text">
                    {selectedTypeNames || "Property Type"}
                  </span>
                </div>
              </div>

              {isTypeOpen && (
                <div className="dropdown-menu custom-dropdown-2 show">
                  <div className="w-100 p-3">
                    {/* {searchOptions?.purposes && searchOptions.purposes.length > 0 && (
                      <div className="mb-3">
                        <h6 style={{ fontSize: "12px", fontWeight: "bold", color: "#555", marginBottom: "8px" }}>Purpose</h6>
                        <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                          {searchOptions.purposes.map((p, idx) => (
                            <div className="radio-group body-text-12 text-muted" key={`purpose-${idx}`}>
                              <input
                                type="radio"
                                id={`purpose-${p.id}`}
                                checked={localPurpose === p.value}
                                onChange={() => setLocalPurpose(p.value)}
                                name="propertyPurpose"
                                className="radio-input"
                              />
                              <label htmlFor={`purpose-${p.id}`} className="radio-label">
                                {p.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )} */}
                    
                    <div className="d-flex flex-column gap-3">
                      {searchOptions?.grouped_property_types &&
                        searchOptions.grouped_property_types.map((group, groupIdx) => (
                          <div key={`group-${groupIdx}`}>
                            <h6 
                              style={{ fontSize: "12px", fontWeight: "bold", color: "#555", marginBottom: "8px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                              onClick={() => toggleGroup(groupIdx)}
                            >
                              {group.name}
                              <span>{expandedGroups.includes(groupIdx) ? <GoChevronUp /> : <GoChevronDown />}</span>
                            </h6>
                            {expandedGroups.includes(groupIdx) && (
                              <div className="d-flex flex-wrap" style={{ gap: "10px" }}>
                                {group.children &&
                                  group.children.map((type, idx) => (
                                    <div
                                      className="radio-group body-text-12 text-muted"
                                      key={idx}
                                    >
                                      <input
                                        type="checkbox"
                                        id={`type-${type.slug}`}
                                        checked={selectedTypes.includes(String(type.slug))}
                                        onChange={() => handleTypeChange(String(type.slug))}
                                        name="propertyType"
                                        className="radio-input"
                                      />
                                      <label
                                        htmlFor={`type-${type.slug}`}
                                        className="radio-label"
                                      >
                                        {type.name}
                                      </label>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="vertical-line"></div>

            {/* Budget Dropdown (unchanged) */}
            <div className="dropdown full-click-area" ref={budgetDropdownRef}>
              <div
                className="dropdown-toggle d-flex align-items-center gap-2"
                onClick={() => setBudgetDropdown((prev) => !prev)}

              >
                <FaRupeeSign className="icon-custom" />
                <div className="nav-text">
                  <span className="text-muted nav-text">
                    {minPrice && maxPrice
                      ? `${minPrice}-${maxPrice}`
                      : minPrice
                        ? `${minPrice}+`
                        : maxPrice
                          ? `Up to ${maxPrice}`
                          : "Budget"}
                  </span>

                </div>
              </div>
              {budgetDropdown && (
                <div className="dropdown-menu custom-dropdown-3 show">
                  <div className="price-tabs d-flex justify-content-between gap-2 mb-3">
                    <button
                      type="button"
                      className={`price-tab-btn ${activePriceType === "min" ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePrice("min");
                      }}
                    >
                      {minPrice ? formatPrice(minPrice) : "Min Price"}
                    </button>
                    <button
                      type="button"
                      className={`price-tab-btn ${activePriceType === "max" ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePrice("max");
                      }}
                    >
                      {maxPrice ? formatPrice(maxPrice) : "Max Price"}
                    </button>
                  </div>

                  <div className="price-container d-flex body-text-12 text-muted">
                    <div className="price-section w-50 pe-2" style={{ display: 'block' }}>
                      <div className="price-list">
                        <span className="toggle-link">Min</span>
                        {filteredMinOptions.map((price, index) => (
                          <div
                            key={index}
                            onClick={(e) => selectMinPrice(price, e)}
                            style={{ padding: "6px 8px", cursor: "pointer" }}
                            className="price-option-item"
                          >
                            {price.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="price-section w-50 ps-2" style={{ display: 'block', borderLeft: '1px solid #eee' }}>
                      <div className="price-list">
                        <span className="toggle-link">Max</span>
                        {filteredMaxOptions.map((price, index) => (
                          <div
                            key={index}
                            onClick={(e) => selectMaxPrice(price, e)}
                            style={{ padding: "6px 8px", cursor: "pointer" }}
                            className="price-option-item"
                          >
                            {price.label}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>)
              }
            </div>

            <button
              type="button"
              onClick={handleSearch}
              className="btn search-btn text-white"
            >
              <IoSearch />

              Search
            </button>
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="container">
        <div className="search-container-small" onClick={handleViewsearch}>
          <IoLocation className="icon-custom me-2" />
          <input
            type="text"
            className="search-text"
            placeholder="Search By City, Locality, Project"
          />
          <div className="small-btn">
            <div
              className="btn circle-btn text-white "
              onClick={handleViewsearch}
            >

              <IoSearch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
