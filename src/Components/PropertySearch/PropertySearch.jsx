"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "./PropertySearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLocation, IoSearch } from "react-icons/io5";
import { FaMapPin, FaHouse, FaRupeeSign, FaBuilding } from "react-icons/fa6";
import { useCity } from "@/utils/CityContext";
import { slugify } from "@/utils/slugify";

export default function PropertySearch() {
  const [activePriceType, setActivePriceType] = useState("min");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const [propertyType, setPropertyType] = useState(null);
  const [properties, setProperties] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [budgetDropdown,setBudgetDropdown] = useState(false)

  const [isTypeOpen, setIsTypeOpen] = useState(false); // ✅ custom dropdown state

  const dropdownRef = useRef(null);
  const budgetDropdownRef = useRef(null)
  const router = useRouter();
  const { city } = useCity();

  const handleViewsearch = () => {
    router.push("/FilterMobile");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsTypeOpen(false);
      }
      if (budgetDropdownRef.current && !budgetDropdownRef.current.contains(e.target)) {
        setBudgetDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTypeChange = (typeId) => {
    console.log(typeId)
    setSelectedTypes((prev) =>
      prev.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...prev, typeId]
    );
  };

  const handleTogglePrice = (type) => {
    setActivePriceType(type);
  };

  const priceOptions = [
    "₹5 Lac",
    "₹10 Lac",
    "₹20 Lac",
    "₹30 Lac",
    "₹40 Lac",
    "₹50 Lac",
    "₹60 Lac",
    "₹70 Lac",
    "₹80 Lac",
    "₹90 Lac",
    "₹1 Cr",
    "₹1.2 Cr",
    "₹1.4 Cr",
    "₹1.6 Cr",
    "₹1.8 Cr",
    "₹2 Cr",
    "₹2.3 Cr",
    "₹2.6 Cr",
    "₹3 Cr",
    "₹3.5 Cr",
    "₹4 Cr",
    "₹4.5 Cr",
    "₹5 Cr",
    "₹10 Cr",
    "₹20 Cr",
  ];

  const selectPrice = (price, e) => {
    e.stopPropagation();
    if (activePriceType === "min") {
      setMinPrice(price);
    } else {
      setMaxPrice(price);
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
        console.error("Error fetching properties:", err);
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
        setPropertyType(results);
      } catch (err) {
        console.error("Error fetching property types:", err);
      }
    };
    fetchPropertyTypes();
  }, [properties]);

  // Map selected IDs → names
  const selectedTypeNames = (() => {
    const selected = propertyType
      ?.flatMap((p) => p.types || [])
      .filter((t) => selectedTypes.includes(String(t.id))) || [];

    if (selected.length === 0) return "Select Type";
    if (selected.length === 1) return selected[0].name;
    return `${selected[0].name} +${selected.length - 1} more`;
  })();


  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      location: inputLocation || city?.name || "",
      minPrice,
      maxPrice,
      types: slugify(selectedTypes.join(",")),
    });
    router.push(`/search/property-for-sell?${queryParams.toString()}`);
  };

  console.log(selectedTypes)
  return (
    <>
      <div className="container">
        <div className="searchbar-cts d-flex justify-content-center align-items-center">
          <div className="search-container">
            {/* Location Dropdown */}
            <div className="dropdown full-click-area">
              <div className="dropdown-toggle d-flex align-items-center gap-2">
                <IoLocation className={"icon-custom"} />
                <span className="Add-city">{city && city.name}</span>
                <input
                  type="text"
                  placeholder="Add more..."
                  className="search-input"
                  value={inputLocation}
                  onChange={(e) => setInputLocation(e.target.value)}
                />
              </div>
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
                            <div className="accordion-body w-100">
                              {property.types &&
                                property.types.map((type, idx) => (
                                  <div
                                    className="radio-group d-flex flex-wrap body-text-12 text-muted"
                                    key={idx}
                                  >
                                    <input
                                      type="checkbox"
                                      id={`type-${type.id}`}
                                      checked={selectedTypes.includes(
                                        String(type.id)
                                      )}
                                      onChange={() =>
                                        handleTypeChange(String(type.id))
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
                onClick={()=>setBudgetDropdown((prev) => !prev)}
              // data-bs-toggle="dropdown"
              >
                <FaRupeeSign className="icon-custom" />
                <div className="nav-text">
                  <span className="text-muted nav-text"> {minPrice||maxPrice ? minPrice+'-'+maxPrice:'Budget'}</span>
                </div>
              </div>
              {budgetDropdown &&(
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
                        {priceOptions.map((price, index) => (
                          <div
                            key={index}
                            onClick={(e) => selectPrice(price, e)}
                          >
                            {price}
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
                        {priceOptions.map((price, index) => (
                          <div
                            key={index}
                            onClick={(e) => selectPrice(price, e)}
                          >
                            {price}
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
            <div className="btn circle-btn text-white " onClick={handleViewsearch}>
              <IoSearch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
