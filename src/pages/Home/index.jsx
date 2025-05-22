import React from 'react'

const index = () => {
  return (
    <div>
          
    <script>
    const links = document.querySelectorAll(".nav-link");
    const activeLink = document.querySelector(".nav-link.active");

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        if (activeLink) activeLink.classList.remove("active");
      });

      link.addEventListener("mouseleave", () => {
        if (activeLink) activeLink.classList.add("active");
      });
    });
  </script>

  <script>
    const flat = document.getElementById("flat");
    const villa = document.getElementById("villa");
    const plot = document.getElementById("plot");
    const bhkOptions = document.getElementById("bhkOptions");

    function toggleBHKOptions() {
      if (flat.checked || villa.checked || plot.checked) {
        bhkOptions.style.display = "flex";
      } else {
        bhkOptions.style.display = "none";
      }
    }

    flat.addEventListener("change", toggleBHKOptions);
    villa.addEventListener("change", toggleBHKOptions);
    plot.addEventListener("change", toggleBHKOptions);
  </script>

  <script>
    let activeInput = "min";

    function togglePrice(type) {
      activeInput = type;

      // Show/hide sections
      document.getElementById("minSection").classList.remove("active");
      document.getElementById("maxSection").classList.remove("active");

      if (type === "min") {
        document.getElementById("minSection").classList.add("active");
      } else {
        document.getElementById("maxSection").classList.add("active");
      }
    }

    function selectPrice(value) {
      const inputs = document.querySelectorAll(".price-text input");
      if (activeInput === "min") {
        document.getElementById("minInput").value = value;
      } else if (activeInput === "max") {
        document.getElementById("maxInput").value = value;
      }

      // After selection, hide both sections
      document.getElementById("minSection").classList.remove("active");
      document.getElementById("maxSection").classList.remove("active");
    }
  </script>


    <div class="search-property-section">
      <div class="container">
        <h2 class="text-center">Find Buy,Rent,Sell Property in India</h2>
        <span class="sell-rent"></span>

        <nav class="nav">
          <a class="nav-link active" aria-current="page" href="#">Buy</a>
          <a class="nav-link" href="#">Rent</a>
          <a class="nav-link" href="#">New Project</a>
          <a class="nav-link" href="#">PG</a>
          <a class="nav-link" href="#">Plot</a>
          <a class="nav-link" href="#">Commerecial</a>
          <a class="nav-link" href="#">Post Free Property Ad</a>
        </nav>

        <div class="search-container">
          <!-- Location Dropdown -->
          <div class="dropdown full-click-area">
            <div
              class="dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <i class="fa-solid fa-location-dot"></i>
              <span class="Add-city">Bangalore</span>
              <input
                type="text"
                placeholder="Add more..."
                class="search-input"
              />
            </div>
            <ul
              class="dropdown-menu body-text-14 custom-dropdown"
              onclick="event.stopPropagation()"
            >
              <li>
                <a class="dropdown-item text-muted" href="#">
                  <i class="fa-solid fa-location-dot"></i> City,Locality</a
                >
              </li>
              <li>
                <a class="dropdown-item text-muted" href="#">
                  <i class="fa-solid fa-map-pin"></i> Area (Like South Delhi)</a
                >
              </li>
              <li>
                <a class="dropdown-item text-muted" href="#">
                  <i class="fa-solid fa-building"></i> Project or builder
                  name</a
                >
              </li>
            </ul>
          </div>

          <div class="vertical-line"></div>

          <!-- Type Dropdown -->
          <div class="dropdown full-click-area">
            <div
              class="dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <i class="fas fa-home"></i>
              <div class="nav-text">
                <span class="text-muted nav-text">Flate+1</span>
              </div>
            </div>
            <div
              class="dropdown-menu custom-dropdown-2"
              onclick="event.stopPropagation()"
            >
              <div class="accordion" id="propertyAccordion">
                <!-- Residential Accordion -->
                <div class="accordion-item">
                  <div class="accordion-header" id="headingOne">
                    <div
                      class="accordion-button collapsed body-text-14"
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
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#propertyAccordion"
                  >
                    <div class="accordion-body">
                      <!-- Radio Buttons -->
                      <div class="radio-group body-text-12 text-muted">
                        <input
                          type="checkbox"
                          id="flat"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="flat" class="radio-label">Flat</label>

                        <input
                          type="checkbox"
                          id="villa"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="villa" class="radio-label"
                          >House/Villa</label
                        >

                        <input
                          type="checkbox"
                          id="plot"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="plot" class="radio-label">Plot</label>
                      </div>
                      <!-- BHK Options (Hidden Initially) -->
                      <div
                        id="bhkOptions"
                        class="radio-group body-text-12 text-muted mt-2"
                        style="display: none"
                      >
                        <input type="checkbox" id="1bhk" class="radio-input" />
                        <label for="1bhk" class="radio-label">1Bhk</label>

                        <input type="checkbox" id="2bhk" class="radio-input" />
                        <label for="2bhk" class="radio-label">2Bhk</label>

                        <input type="checkbox" id="3bhk" class="radio-input" />
                        <label for="3bhk" class="radio-label">3Bhk</label>

                        <input type="checkbox" id="4bhk" class="radio-input" />
                        <label for="4bhk" class="radio-label">4Bhk</label>

                        <input type="checkbox" id="5bhk" class="radio-input" />
                        <label for="5bhk" class="radio-label">5Bhk</label>

                        <input
                          type="checkbox"
                          id="5plusbhk"
                          class="radio-input"
                        />
                        <label for="5plusbhk" class="radio-label">5+Bhk</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <div class="accordion-header" id="headingTwo">
                    <div
                      class="accordion-button collapsed body-text-14"
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
                    class="accordion-collapse collapse"
                    aria-labelledby="headingtwo"
                    data-bs-parent="#propertyAccordion"
                  >
                    <div class="accordion-body">
                      <!-- Radio Buttons -->
                      <div class="radio-group body-text-12 text-muted">
                        <input
                          type="checkbox"
                          id="office"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="office" class="radio-label"
                          >Office Space</label
                        >

                        <input
                          type="checkbox"
                          id="shop"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="shop" class="radio-label"
                          >Shop/Showroom</label
                        >

                        <input
                          type="checkbox"
                          id="land"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="land" class="radio-label"
                          >Commercial Land</label
                        >

                        <input
                          type="checkbox"
                          id="Warehouse"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="Warehouse" class="radio-label"
                          >Warehouse/Godown</label
                        >

                        <input
                          type="checkbox"
                          id="indbuild"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="indbuild" class="radio-label"
                          >Industrial Building</label
                        >

                        <input
                          type="checkbox"
                          id="shed"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="shed" class="radio-label"
                          >Industrial Shed</label
                        >
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <div class="accordion-header" id="headingThree">
                    <div
                      class="accordion-button collapsed body-text-14"
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
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#propertyAccordion"
                  >
                    <div class="accordion-body">
                      <div class="radio-group body-text-12 text-muted">
                        <input
                          type="checkbox"
                          id="agri"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="agri" class="radio-label"
                          >Agricultural Land</label
                        >

                        <input
                          type="checkbox"
                          id="farm"
                          name="propertyType"
                          class="radio-input"
                        />
                        <label for="farm" class="radio-label">Farm House</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="vertical-line"></div>

          <!-- Budget Dropdown -->
          <div class="dropdown full-click-area">
            <div
              class="dropdown-toggle d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
            >
              <i class="fas fa-rupee-sign"></i>
              <div class="nav-text">
                <span class="text-muted nav-text">Budget</span>
              </div>
            </div>
            <div
              class="dropdown-menu custom-dropdown-3"
              onclick="event.stopPropagation()"
            >
              <div class="price-text d-flex gap-2 mb-2 body-text-14">
                <input
                  type="text"
                  id="minInput"
                  class="form-control"
                  placeholder="Min Price"
                  onclick="togglePrice('min')"
                />
                <input
                  type="text"
                  id="maxInput"
                  class="form-control"
                  placeholder="Max Price"
                  onclick="togglePrice('max')"
                />
              </div>

              <div class="price-container d-flex body-text-12 text-muted">
                <div id="minSection" class="price-section active">
                  <div class="price-list1">
                    <span
                      id="minBtn"
                      class="toggle-link"
                      onclick="togglePrice('min')"
                      >Min</span
                    >
                    <div onclick="selectPrice('₹5 Lac')">₹5 Lac</div>
                    <div onclick="selectPrice('₹10 Lac')">₹10 Lac</div>
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
                    <div onclick="selectPrice('₹20 Cr')">₹20 Cr</div>
                  </div>
                </div>

                <div id="maxSection" class="price-section">
                  <div class="price-list">
                    <span
                      id="maxBtn"
                      class="toggle-link"
                      onclick="togglePrice('max')"
                      >Max</span
                    >
                    <div onclick="selectPrice('₹5 Lac')">₹5 Lac</div>
                    <div onclick="selectPrice('₹10 Lac')">₹10 Lac</div>
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
                    <div onclick="selectPrice('₹20 Cr')">₹20 Cr</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button class="btn search-btn orange-red text-white">
            <i class="fas fa-search"></i> Search
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default index