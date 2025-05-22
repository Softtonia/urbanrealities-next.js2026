"use client";

// import { useEffect } from "react";

export default function PropertySearch() {


  //   useEffect(() => {
  //   const links = document.querySelectorAll(".nav-link");
  //   const activeLink = document.querySelector(".nav-link.active");

  //   links.forEach((link) => {
  //     link.addEventListener("mouseenter", () => {
  //       activeLink?.classList.remove("active");
  //     });
  //     link.addEventListener("mouseleave", () => {
  //       activeLink?.classList.add("active");
  //     });
  //   });

  //   return () => {
  //     links.forEach((link) => {
  //       link.removeEventListener("mouseenter", () => {});
  //       link.removeEventListener("mouseleave", () => {});
  //     });
  //   };
  // }, []);

  const selectPrice = (price) =>{
    alert(price)
  } 



  return (
    <div className="search-property-section">
      <div className="container">
        <h2 className="text-center">Find Buy,Rent,Sell Property in India</h2>
        <span className="sell-rent"></span>

        <nav className="nav">
          <a className="nav-link active" aria-current="page" href="#">
            Buy
          </a>
          <a className="nav-link" href="#">
            Rent
          </a>
          <a className="nav-link" href="#">
            New Project
          </a>
          <a className="nav-link" href="#">
            PG
          </a>
          <a className="nav-link" href="#">
            Plot
          </a>
          <a className="nav-link" href="#">
            Commerecial
          </a>
          <a className="nav-link" href="#">
            Post Free Property Ad
          </a>
        </nav>

        <div className="search-container">
          {/* <!-- Location Dropdown --> */}
          <div className="dropdown full-click-area">
            <div
              className="dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <i className="fa-solid fa-location-dot"></i>
              <span className="Add-city">Bangalore</span>
              <input
                type="text"
                placeholder="Add more..."
                className="search-input"
              />
            </div>
            <ul
              className="dropdown-menu body-text-14 custom-dropdown"
              // onclick="event.stopPropagation()"
            >
              <li>
                <a className="dropdown-item text-muted" href="#">
                  <i className="fa-solid fa-location-dot"></i> City,Locality
                </a>
              </li>
              <li>
                <a className="dropdown-item text-muted" href="#">
                  <i className="fa-solid fa-map-pin"></i> Area (Like South
                  Delhi)
                </a>
              </li>
              <li>
                <a className="dropdown-item text-muted" href="#">
                  <i className="fa-solid fa-building"></i> Project or builder
                  name
                </a>
              </li>
            </ul>
          </div>

          <div className="vertical-line"></div>

          {/* <!-- Type Dropdown --> */}
          <div className="dropdown full-click-area">
            <div
              className="dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-home"></i>
              <div className="nav-text">
                <span className="text-muted nav-text">Flate+1</span>
              </div>
            </div>
            <div
              className="dropdown-menu custom-dropdown-2"
              // onclick="event.stopPropagation()"
            >
              <div className="accordion" id="propertyAccordion">
                {/* <!-- Residential Accordion --> */}
                <div className="accordion-item">
                  <div className="accordion-header" id="headingOne">
                    <div
                      className="accordion-button collapsed body-text-14"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Residential
                    </div>
                  </div>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#propertyAccordion"
                  >
                    <div className="accordion-body">
                      {/* <!-- Radio Buttons --> */}
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
                      {/* <!-- BHK Options (Hidden Initially) --> */}
                      <div
                        id="bhkOptions"
                        className="radio-group body-text-12 text-muted mt-2"
                        // style="display: no ne"
                      >
                        <input
                          type="checkbox"
                          id="1bhk"
                          className="radio-input"
                        />
                        <label htmlFor="1bhk" className="radio-label">
                          1Bhk
                        </label>

                        <input
                          type="checkbox"
                          id="2bhk"
                          className="radio-input"
                        />
                        <label htmlFor="2bhk" className="radio-label">
                          2Bhk
                        </label>

                        <input
                          type="checkbox"
                          id="3bhk"
                          className="radio-input"
                        />
                        <label htmlFor="3bhk" className="radio-label">
                          3Bhk
                        </label>

                        <input
                          type="checkbox"
                          id="4bhk"
                          className="radio-input"
                        />
                        <label htmlFor="4bhk" className="radio-label">
                          4Bhk
                        </label>

                        <input
                          type="checkbox"
                          id="5bhk"
                          className="radio-input"
                        />
                        <label htmlFor="5bhk" className="radio-label">
                          5Bhk
                        </label>

                        <input
                          type="checkbox"
                          id="5plusbhk"
                          className="radio-input"
                        />
                        <label htmlFor="5plusbhk" className="radio-label">
                          5+Bhk
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="accordion-header" id="headingTwo">
                    <div
                      className="accordion-button collapsed body-text-14"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="true"
                      aria-controls="collapseTwo"
                    >
                      Commercial
                    </div>
                  </div>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingtwo"
                    data-bs-parent="#propertyAccordion"
                  >
                    <div className="accordion-body">
                      {/* <!-- Radio Buttons --> */}
                      <div className="radio-group body-text-12 text-muted">
                        <input
                          type="checkbox"
                          id="office"
                          name="propertyType"
                          className="radio-input"
                        />
                        <label htmlFor="office" className="radio-label">
                          Office Space
                        </label>

                        <input
                          type="checkbox"
                          id="shop"
                          name="propertyType"
                          className="radio-input"
                        />
                        <label htmlFor="shop" className="radio-label">
                          Shop/Showroom
                        </label>

                        <input
                          type="checkbox"
                          id="land"
                          name="propertyType"
                          className="radio-input"
                        />
                        <label htmlFor="land" className="radio-label">
                          Commercial Land
                        </label>

                        <input
                          type="checkbox"
                          id="Warehouse"
                          name="propertyType"
                          className="radio-input"
                        />
                        <label htmlFor="Warehouse" className="radio-label">
                          Warehouse/Godown
                        </label>

                        <input
                          type="checkbox"
                          id="indbuild"
                          name="propertyType"
                          className="radio-input"
                        />
                        <label htmlFor="indbuild" className="radio-label">
                          Industrial Building
                        </label>

                        <input
                          type="checkbox"
                          id="shed"
                          name="propertyType"
                          className="radio-input"
                        />
                        <label htmlFor="shed" className="radio-label">
                          Industrial Shed
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="accordion-item">
                  <div className="accordion-header" id="headingThree">
                    <div
                      className="accordion-button collapsed body-text-14"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="true"
                      aria-controls="collapseThree"
                    >
                      Other Property Types
                    </div>
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

          {/* <!-- Budget Dropdown --> */}
          <div className="dropdown full-click-area">
            <div
              className="dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <i className="fas fa-rupee-sign"></i>
              <div className="nav-text">
                <span className="text-muted nav-text">Budget</span>
              </div>
            </div>
            <div
              className="dropdown-menu custom-dropdown-3"
              // onclick="event.stopPropagation()"
            >
              <div className="price-text d-flex gap-2 mb-2 body-text-14">
                <input
                  type="text"
                  id="minInput"
                  className="htmlForm-control"
                  placeholder="Min Price"
                  // onclick="togglePrice('min')"
                />
                <input
                  type="text"
                  id="maxInput"
                  className="htmlForm-control"
                  placeholder="Max Price"
                  // onclick="togglePrice('max')"
                />
              </div>

              <div className="price-container d-flex body-text-12 text-muted">
                <div id="minSection" className="price-section active">
                  <div className="price-list1">
                    <span
                      id="minBtn"
                      className="toggle-link"
                      // onclick="togglePrice('min')"
                    >
                      Min
                    </span>
                    <div onclick={()=>selectPrice("5 lac")}>₹5 Lac</div>
                    {/* <div onclick="selectPrice('₹10 Lac')">₹10 Lac</div>
                    <div onclick="selectPrice('₹20 Lac')">₹20 Lac</div>
                    <div onclick="selectPrice('₹30 Lac')">₹30 Lac</div>
                    <div onclick="selectPrice('₹40 Lac')">₹40 Lac</div>
                    <div onclick="selectPrice('₹50 Lac')">₹50 Lac</div>
                    <div onclick="selectPrice('₹60 Lac')">₹60 Lac</div>
                    <div onclick="selectPrice('₹70 Lac')">₹70 Lac</div>
                    <div onclick="selectPrice('₹80 Lac')">₹80 Lac</div>
                    <div onclick="selectPrice('₹90 Lac')">₹90 Lac</div>
                    <div onclick="selectPrice('₹1 Cr')">₹1 Cr</div>
                    <div onclick="selectPrice('₹1.2 Cr')">₹1.2 Cr</div>
                    <div onclick="selectPrice('₹1.4 Cr')">₹1.4 Cr</div>
                    <div onclick="selectPrice('₹1.6 Cr')">₹1.6 Cr</div>
                    <div onclick="selectPrice('₹1.8 Cr')">₹1.8 Cr</div>
                    <div onclick="selectPrice('₹2 Cr')">₹2 Cr</div>
                    <div onclick="selectPrice('₹2.3 Cr')">₹2.3 Cr</div>
                    <div onclick="selectPrice('₹2.6 Cr')">₹2.6 Cr</div>
                    <div onclick="selectPrice('₹3 Cr')">₹3 Cr</div>
                    <div onclick="selectPrice('₹3.5 Cr')">₹3.5 Cr</div>
                    <div onclick="selectPrice('₹4 Cr')">₹4 Cr</div>
                    <div onclick="selectPrice('₹4.5 Cr')">₹4.5 Cr</div>
                    <div onclick="selectPrice('₹5 Cr')">₹5 Cr</div>
                    <div onclick="selectPrice('₹10 Cr')">₹10 Cr</div>
                    <div onclick="selectPrice('₹20 Cr')">₹20 Cr</div> */}
                  </div>
                </div>

                <div id="maxSection" className="price-section">
                  <div className="price-list">
                    <span
                      id="maxBtn"
                      className="toggle-link"
                      onclick="togglePrice('max')"
                    >
                      Max
                    </span>
                    <div onclick={()=>selectPrice("5 lac")}>₹5 Lac</div>
                    {/* <div onclick="selectPrice('₹10 Lac')">₹10 Lac</div>
                    <div onclick="selectPrice('₹20 Lac')">₹20 Lac</div>
                    <div onclick="selectPrice('₹30 Lac')">₹30 Lac</div>
                    <div onclick="selectPrice('₹40 Lac')">₹40 Lac</div>
                    <div onclick="selectPrice('₹50 Lac')">₹50 Lac</div>
                    <div onclick="selectPrice('₹60 Lac')">₹60 Lac</div>
                    <div onclick="selectPrice('₹70 Lac')">₹70 Lac</div>
                    <div onclick="selectPrice('₹80 Lac')">₹80 Lac</div>
                    <div onclick="selectPrice('₹90 Lac')">₹90 Lac</div>
                    <div onclick="selectPrice('₹1 Cr')">₹1 Cr</div>
                    <div onclick="selectPrice('₹1.2 Cr')">₹1.2 Cr</div>
                    <div onclick="selectPrice('₹1.4 Cr')">₹1.4 Cr</div>
                    <div onclick="selectPrice('₹1.6 Cr')">₹1.6 Cr</div>
                    <div onclick="selectPrice('₹1.8 Cr')">₹1.8 Cr</div>
                    <div onclick="selectPrice('₹2 Cr')">₹2 Cr</div>
                    <div onclick="selectPrice('₹2.3 Cr')">₹2.3 Cr</div>
                    <div onclick="selectPrice('₹2.6 Cr')">₹2.6 Cr</div>
                    <div onclick="selectPrice('₹3 Cr')">₹3 Cr</div>
                    <div onclick="selectPrice('₹3.5 Cr')">₹3.5 Cr</div>
                    <div onclick="selectPrice('₹4 Cr')">₹4 Cr</div>
                    <div onclick="selectPrice('₹4.5 Cr')">₹4.5 Cr</div>
                    <div onclick="selectPrice('₹5 Cr')">₹5 Cr</div>
                    <div onclick="selectPrice('₹10 Cr')">₹10 Cr</div>
                    <div onclick="selectPrice('₹20 Cr')">₹20 Cr</div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button className="btn search-btn orange-red text-white">
            <i className="fas fa-search"></i> Search
          </button>
        </div>
      </div>
    </div>
  );
}
