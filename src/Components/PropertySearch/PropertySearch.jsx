"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./PropertySearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLocation, IoSearch } from "react-icons/io5";
import { FaMapPin, FaHouse, FaRupeeSign, FaBuilding } from "react-icons/fa6";
import { useCity } from "@/utils/CityContext";
import { slugify } from "@/utils/slugify";
import { useSearch } from "@/hooks/useSearch";
import Search from "antd/es/transfer/search";

export default function PropertySearch({ purpose }) {
  const [activePriceType, setActivePriceType] = useState("min");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [propertyType, setPropertyType] = useState(null);
  const [properties, setProperties] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [budgetDropdown, setBudgetDropdown] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false)
  const [isTypeOpen, setIsTypeOpen] = useState(false); // ✅ custom dropdown state


  const dropdownRef = useRef(null);
  const locationRef = useRef(null)
  const budgetDropdownRef = useRef(null);
  const router = useRouter();
  const { city: globalCity } = useCity();
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

  const handleTypeChange = (typeId, propertyId) => {
    setSelectedTypes((prev) => {
      const prevTypes = prev[propertyId] || [];

      let updatedTypes;
      if (prevTypes.includes(typeId)) {
        // remove the type if already selected
        updatedTypes = prevTypes.filter((id) => id !== typeId);
      } else {
        // add the type
        updatedTypes = [...prevTypes, typeId];
      }

      // if no types left for this property → remove propertyId entirely
      if (updatedTypes.length === 0) {
        const { [propertyId]: _, ...rest } = prev;
        return rest;
      }

      // otherwise update propertyId with new types
      return {
        ...prev,
        [propertyId]: updatedTypes,
      };
    });
  };


  const handleTogglePrice = (type) => {
    setActivePriceType(type);
  };

  const priceOptions = [
    { label: "₹5 Lac", value: 500000 },
    { label: "₹10 Lac", value: 1000000 },
    { label: "₹20 Lac", value: 2000000 },
    { label: "₹30 Lac", value: 3000000 },
    { label: "₹40 Lac", value: 4000000 },
    { label: "₹50 Lac", value: 5000000 },
    { label: "₹60 Lac", value: 6000000 },
    { label: "₹70 Lac", value: 7000000 },
    { label: "₹80 Lac", value: 8000000 },
    { label: "₹90 Lac", value: 9000000 },
    { label: "₹1 Cr", value: 10000000 },
    { label: "₹1.2 Cr", value: 12000000 },
    { label: "₹1.4 Cr", value: 14000000 },
    { label: "₹1.6 Cr", value: 16000000 },
    { label: "₹1.8 Cr", value: 18000000 },
    { label: "₹2 Cr", value: 20000000 },
    { label: "₹2.3 Cr", value: 23000000 },
    { label: "₹2.6 Cr", value: 26000000 },
    { label: "₹3 Cr", value: 30000000 },
    { label: "₹3.5 Cr", value: 35000000 },
    { label: "₹4 Cr", value: 40000000 },
    { label: "₹4.5 Cr", value: 45000000 },
    { label: "₹5 Cr", value: 50000000 },
    { label: "₹10 Cr", value: 100000000 },
    { label: "₹20 Cr", value: 200000000 },
  ];


  const selectPrice = (price, e) => {
    e.stopPropagation();
    if (activePriceType === "min") {
      setMinPrice(price.value);
    } else {
      setMaxPrice(price.value);
    }
  };

  // Fetch all properties
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
        console.error("Error fetching properties listing:", err);
      }
    };
    fetchProperty();
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
        console.log(results , "property type--------------------  ")
        setPropertyType(results);
      } catch (err) {
        console.error("Error fetching property types:", err);
      }
    };
    fetchPropertyTypes();
  }, [properties]);

  // Map selected IDs → names
  const selectedTypeNames = (() => {
    // flatten all selected type ids from object
    const allSelectedTypeIds = Object.values(selectedTypes).flat().map(String);

    // match with propertyType list
    const selected = propertyType
      ?.flatMap((p) => p.types || [])
      .filter((t) => allSelectedTypeIds.includes(String(t.id))) || [];

    if (selected.length === 0) return "Select Type";
    if (selected.length === 1) return selected[0].name;
    return `${selected[0].name} +${selected.length - 1} more`;
  })();


  const { search } = useSearch({}, { autoPush: false });
  const handleSearch = () => {

    // extract property ids
    const propertyIds = Object.keys(selectedTypes);

    // flatten all type ids
    const typeIds = Object.values(selectedTypes).flat();

    const filters = {
      minPrice,
      maxPrice,
      propertyId: propertyIds.join(","),   // e.g. 65,70
      propertyType: typeIds.join(","),     // e.g. 1,2,3,4
      purpose,
      location: inputLocation || localCity?.name || "",
    };
    search(filters)
    

  };

  // Min options → less than maxPrice (if maxPrice chosen)
  const filteredMinOptions = priceOptions.filter(
    (option) => !maxPrice || option.value < maxPrice
  );

  // Max options → greater than minPrice (if minPrice chosen)
  const filteredMaxOptions = priceOptions.filter(
    (option) => !minPrice || option.value > minPrice
  );


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
                    {[
                      "Delhi Ncr",
                      "New Delhi",
                      "New Delhi-North",
                      "New Delhi-South",
                      "New Delhi-East",
                      "New Delhi-West",
                      "New Delhi-Central",
                      "Gurgaon",
                      "Noida",
                      "Bangalore",
                      "Mumbai",
                      "Pune"
                    ]
                      .filter((loc) => loc.toLowerCase().includes(inputLocation.toLowerCase()))
                      .map((loc, idx) => {
                        // Highlight matching text in red
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
                      })}
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
                    {selectedTypeNames || "Select Type"}
                  </span>
                </div>
              </div>

              {isTypeOpen && (
                <div className="dropdown-menu custom-dropdown-2 show">
                  <div className="accordion" id="propertyAccordion">
                    {propertyType &&
                      propertyType.map((property, index) => (
                        <div className="accordion-item" key={index}>
                          <div
                            className="accordion-header"
                            id={`heading-${index}`}
                          >
                            <button
                              className="accordion-button collapsed body-text-14"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${index}`}
                              aria-expanded="false"
                              aria-controls={`collapse${index}`}
                            >
                              {property.name}
                            </button>
                          </div>

                          <div
                            id={`collapse${index}`}
                            className="accordion-collapse collapse"
                          >
                            <div className="accordion-body w-100 d-flex flex-wrap">
                              {property.types &&
                                property.types.map((type, idx) => (
                                  <div
                                    className="radio-group  body-text-12 text-muted"
                                    key={idx}
                                  >
                                    <input
                                      type="checkbox"
                                      id={`type-${type.id}`}
                                      checked={selectedTypes[property.id]?.includes(String(type.id)) || false}
                                      onChange={() =>
                                        handleTypeChange(String(type.id), String(property.id))
                                      }
                                      name="propertyType"
                                      className="radio-input"
                                    />
                                    <label
                                      htmlFor={`type-${type.id}`}
                                      className="radio-label"
                                    >
                                      {type.name}
                                    </label>
                                  </div>
                                ))}
                            </div>
                          </div>
                        </div>
                      ))}
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
                  <div className="price-text d-flex gap-2 mb-2 body-text-14">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Min Price"
                      value={minPrice}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePrice("min");
                      }}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Max Price"
                      value={maxPrice}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePrice("max");
                      }}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>

                  <div className="price-container d-flex body-text-12 text-muted">
                    <div
                      className={`price-section ${activePriceType === "min" ? "active" : ""
                        }`}
                    >
                      <div className="price-list">
                        <span
                          className="toggle-link"
                          onClick={() => handleTogglePrice("min")}
                        >
                          Min
                        </span>
                        {filteredMinOptions.map((price, index) => (
                          <div
                            key={index}
                            onClick={(e) => selectPrice(price, e)}
                          >
                            {price.label}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`price-section ${activePriceType === "max" ? "active" : ""
                        }`}
                    >
                      <div className="price-list">
                        <span
                          className="toggle-link"
                          onClick={() => handleTogglePrice("max")}
                        >
                          Max
                        </span>
                        {filteredMaxOptions.map((price, index) => (
                          <div
                            key={index}
                            onClick={(e) => selectPrice(price, e)}
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
