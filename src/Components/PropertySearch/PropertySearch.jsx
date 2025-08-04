"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./PropertySearch.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoLocation } from "react-icons/io5";
import { FaMapPin, FaHouse, FaRupeeSign, FaBuilding } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

export default function PropertySearch() {
  const [activePriceType, setActivePriceType] = useState("min");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inputLocation, setInputLocation] = useState("");
  const router = useRouter();


  const handleViewsearch = () => {
    router.push("/FilterMobile");
  };
 useEffect(() => {
  const dropdownMenus = document.querySelectorAll(".dropdown-menu");

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  dropdownMenus.forEach((menu) => {
    menu.addEventListener("click", stopPropagation);
  });

  return () => {
    dropdownMenus.forEach((menu) => {
      menu.removeEventListener("click", stopPropagation);
    });
  };
}, []);

  useEffect(() => {
    const flatCheckbox = document.getElementById("flat");
    const villaCheckbox = document.getElementById("villa");
    const plotCheckbox = document.getElementById("plot");
    const bhkOptions = document.getElementById("bhkOptions");

    const handleCheckboxChange = () => {
      if (
        flatCheckbox?.checked ||
        villaCheckbox?.checked ||
        plotCheckbox?.checked
      ) {
        bhkOptions.style.display = "flex";
      } else {
        bhkOptions.style.display = "none";
      }
    };

    flatCheckbox?.addEventListener("change", handleCheckboxChange);
    villaCheckbox?.addEventListener("change", handleCheckboxChange);
    plotCheckbox?.addEventListener("change", handleCheckboxChange);

    return () => {
      flatCheckbox?.removeEventListener("change", handleCheckboxChange);
      villaCheckbox?.removeEventListener("change", handleCheckboxChange);
      plotCheckbox?.removeEventListener("change", handleCheckboxChange);
    };
  }, []);

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
    console.log(`${activePriceType.toUpperCase()} Price Selected:`, price);
  };

  return (
    <>
      <div className="container">
        <div className="searchbar-cts d-flex justify-content-center align-items-center">
          <div className="search-container">
            {/* Location Dropdown */}
            <div className="dropdown full-click-area">
              <div
                className="dropdown-toggle d-flex align-items-center gap-2"
                data-bs-toggle="dropdown"
              >
                <IoLocation className={"icon-custom"} />
                <span className="Add-city">Bangalore</span>
                <input
                  type="text"
                  placeholder="Add more..."
                  className="search-input"
                  value={inputLocation}
                  onChange={(e) => setInputLocation(e.target.value)}
                />
              </div>
              <ul
                className="dropdown-menu body-text-14 custom-dropdown"
                onClick={(e) => e.stopPropagation()}
              >
                <li>
                  <a className="dropdown-item text-muted" href="#">
                    <i>
                      {" "}
                      <IoLocation />
                    </i>
                    City,Locality
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-muted" href="#">
                    <i>
                      {" "}
                      <FaMapPin />{" "}
                    </i>
                    Area (Like South Delhi)
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-muted" href="#">
                    <i>
                      <FaBuilding />
                    </i>
                    Project or builder name
                  </a>
                </li>
              </ul>
            </div>

            <div className="vertical-line"></div>

            {/* Type Dropdown */}
            <div className="dropdown full-click-area">
              <div
                className="dropdown-toggle d-flex align-items-center gap-2"
                data-bs-toggle="dropdown"
              >
                <FaHouse className={"icon-custom"} />
                <div className="nav-text">
                  <span className="text-muted nav-text">Flate+1</span>
                </div>
              </div>
              <div
                className="dropdown-menu custom-dropdown-2"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="accordion" id="propertyAccordion">
                  {/* Residential */}
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button collapsed body-text-14"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Residential
                      </button>
                    </div>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#propertyAccordion"
                    >
                      <div className="accordion-body">
                        <div className="radio-group body-text-12 text-muted">
                          <input
                            type="checkbox"
                            id="flat"
                            name="propertyType"
                            className="radio-input"
                          />
                          <label htmlFor="flat" className="radio-label">
                            Flat
                          </label>

                          <input
                            type="checkbox"
                            id="villa"
                            name="propertyType"
                            className="radio-input"
                          />
                          <label htmlFor="villa" className="radio-label">
                            House/Villa
                          </label>

                          <input
                            type="checkbox"
                            id="plot"
                            name="propertyType"
                            className="radio-input"
                          />
                          <label htmlFor="plot" className="radio-label">
                            Plot
                          </label>
                        </div>

                        <div
                          id="bhkOptions"
                          className="radio-group body-text-12 text-muted mt-2"
                          style={{ display: "none" }}
                        >
                          {[
                            "1Bhk",
                            "2Bhk",
                            "3Bhk",
                            "4Bhk",
                            "5Bhk",
                            "5+Bhk",
                          ].map((label, idx) => (
                            <div key={idx}>
                              <input
                                type="checkbox"
                                id={label.toLowerCase()}
                                className="radio-input"
                              />
                              <label
                                htmlFor={label.toLowerCase()}
                                className="radio-label"
                              >
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Commercial */}
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingTwo">
                      <button
                        className="accordion-button collapsed body-text-14"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="true"
                        aria-controls="collapseTwo"
                      >
                        Commercial
                      </button>
                    </div>
                    <div
                      id="collapseTwo"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#propertyAccordion"
                    >
                      <div className="accordion-body">
                        <div className="radio-group body-text-12 d-flex flex-wrap text-muted">
                          {[
                            ["office", "Office Space"],
                            ["shop", "Shop/Showroom"],
                            ["land", "Commercial Land"],
                            ["Warehouse", "Warehouse/Godown"],
                            ["indbuild", "Industrial Building"],
                            ["shed", "Industrial Shed"],
                          ].map(([id, label], i) => (
                            <div key={i}>
                              <input
                                type="checkbox"
                                id={id}
                                name="propertyType"
                                className="radio-input"
                              />
                              <label htmlFor={id} className="radio-label">
                                {label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Other Property Types */}
                  <div className="accordion-item">
                    <div className="accordion-header" id="headingThree">
                      <button
                        className="accordion-button collapsed body-text-14"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="true"
                        aria-controls="collapseThree"
                      >
                        Other Property Types
                      </button>
                    </div>
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#propertyAccordion"
                    >
                      <div className="accordion-body">
                        <div className="radio-group body-text-12 text-muted">
                          <input
                            type="checkbox"
                            id="agri"
                            name="propertyType"
                            className="radio-input"
                          />
                          <label htmlFor="agri" className="radio-label">
                            Agricultural Land
                          </label>

                          <input
                            type="checkbox"
                            id="farm"
                            name="propertyType"
                            className="radio-input"
                          />
                          <label htmlFor="farm" className="radio-label">
                            Farm House
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="vertical-line"></div>

            {/* Budget Dropdown */}
            <div className="dropdown full-click-area">
              <div
                className="dropdown-toggle d-flex align-items-center gap-2"
                data-bs-toggle="dropdown"
              >
                <FaRupeeSign className="icon-custom" />
                <div className="nav-text">
                  <span className="text-muted nav-text">Budget</span>
                </div>
              </div>

              <div
                className="dropdown-menu custom-dropdown-3"
                onClick={(e) => e.stopPropagation()}
              >
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
                    className={`price-section ${
                      activePriceType === "min" ? "active" : ""
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
                        <div key={index} onClick={(e) => selectPrice(price, e)}>
                          {price}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div
                    className={`price-section ${
                      activePriceType === "max" ? "active" : ""
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
                        <div key={index} onClick={(e) => selectPrice(price, e)}>
                          {price}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button type="button" className="btn search-btn text-white">
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
            // size={80}
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
