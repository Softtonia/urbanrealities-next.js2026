// "use client";
// import { useState, useRef, useEffect } from "react";
// import { FaSlidersH } from "react-icons/fa";
// import { BiSolidDownArrow } from "react-icons/bi";
// import styles from "./filtertabs.module.css";
// import MoreFiltersPanel from "./MoreFiltersPanel";

// export default function PropertyFilters() {
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [showMoreFilters, setShowMoreFilters] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredCities, setFilteredCities] = useState([]);
//   const filterRefs = useRef({}); // all dropdown refs

//   const allCities = [
//     "Mumbai",
//     "Delhi",
//     "Bangalore",
//     "Pune",
//     "Hyderabad",
//     "Ahmedabad",
//     "Chennai",
//     "Kolkata",
//     "Jaipur",
//   ];

//   const filters = [
//     {
//       key: "buy",
//       label: "Buy",
//       type: "select",
//       heading: "Select Buy Option",
//       className: "dropdown-buy",
//       options: ["Buy", "Rent"],
//     },
//     {
//       key: "topLocalities",
//       label: "Top Localities",
//       type: "list",
//       heading: "Select Locality",
//       className: "dropdown-toplocalities",
//       options: ["Sobat", "Rajiv Chowk"],
//     },
//     {
//       key: "budget",
//       label: "Budget",
//       type: "slider",
//       heading: "Select Budget Range",
//       className: "dropdown-budget",
//       min: 0,
//       max: 20000000,
//       step: 50000,
//     },
//     {
//       key: "propertyType",
//       label: "Property Type",
//       type: "grouped",
//       heading: "Select Property Type",
//       className: "dropdown-propertytype",
//       options: {
//         Residential: ["Flat", "House/Villas", "Plot/Land"],
//         Commercial: ["Office", "Shop", "Industrial Shed/Land"],
//         Others: ["Farm Houses"],
//       },
//     },
//     {
//       key: "bhk",
//       label: "BHK",
//       type: "pills",
//       heading: "Select BHK",
//       className: "dropdown-bhk",
//       options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK"],
//     },
//     {
//       key: "postedBy",
//       label: "Posted By",
//       type: "list",
//       heading: "Select Posted By",
//       className: "dropdown-postedby",
//       options: ["Owner", "Broker", "Builder/Developer"],
//     },
//   ];

//   const [selectedValues, setSelectedValues] = useState({
//     buy: "",
//     topLocalities: "",
//     budget: "",
//     propertyType: "",
//     bhk: "",
//     postedBy: "",
//   });

//   // Toggle dropdown
//   const toggleDropdown = (key) => {
//     setActiveDropdown((prev) => (prev === key ? null : key));
//     setShowMoreFilters(false);
//   };

//   const toggleMoreFilters = () => {
//     setShowMoreFilters((prev) => !prev);
//     setActiveDropdown(null);
//   };

//   const handleSelect = (key, value) => {
//     setSelectedValues((prev) => ({ ...prev, [key]: value }));
//     setActiveDropdown(null);
//   };

//   const handleSearchChange = (e) => {
//     const val = e.target.value;
//     setSearchTerm(val);
//     setFilteredCities(
//       val
//         ? allCities.filter((c) => c.toLowerCase().includes(val.toLowerCase()))
//         : []
//     );
//   };

//   const handleCitySelect = (city) => {
//     setSearchTerm(city);
//     setFilteredCities([]);
//   };

//   // Close dropdowns on outside click
//   const moreFiltersRef = useRef(null);

//   // In useEffect
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       const clickedInside =
//         Object.values(filterRefs.current).some(
//           (ref) => ref && ref.contains(e.target)
//         ) ||
//         (moreFiltersRef.current && moreFiltersRef.current.contains(e.target));

//       if (!clickedInside) {
//         setActiveDropdown(null);
//         setShowMoreFilters(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className={styles.filterContainer}>
//       <div className={`${styles.filterBar} container`}>
//         {/* Search + Buy */}
//         <div className={styles.searchGroup}>
//           {/* Buy Dropdown */}
//           <div
//             className={styles.buyWrapper}
//             ref={(el) => (filterRefs.current["buy"] = el)}
//           >
//             <button
//               className={`${styles.filterButton} ${styles.buyButton}`}
//               onClick={() => toggleDropdown("buy")}
//             >
//              <small>{selectedValues.buy || "Buy"} </small> 
//               <BiSolidDownArrow className={styles.dropdownIcon} />
//             </button>
//             {activeDropdown === "buy" && (
//               <div className={`${styles.dropdownPanel} ${styles.buyDropdown}`}>
//                 {filters[0].options.map((option) => (
//                   <div
//                     key={option}
//                     className={styles.option}
//                     onClick={() => handleSelect("buy", option)}
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className={styles.searchDivider}></div>

//           {/* Search Input */}
//           <div
//             className={styles.searchWrapper}
//             ref={(el) => (filterRefs.current["search"] = el)}
//           >
//             <input
//               type="text"
//               placeholder="Enter city, locality..."
//               className={styles.searchInput}
//               value={searchTerm}
//               onChange={handleSearchChange}
//               onFocus={() => setFilteredCities(allCities)}
//             />
//             {filteredCities.length > 0 && (
//               <div
//                 className={`${styles.dropdownPanel} ${styles.searchDropdown}`}
//               >
//                 <ul>
//                   {filteredCities.map((city) => (
//                     <li key={city} onClick={() => handleCitySelect(city)}>
//                       {city}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Other filters */}
//         <div className={styles.filtersWrapper}>
//           {filters.slice(1).map((filter) => (
//             <div
//               key={filter.key}
//               ref={(el) => (filterRefs.current[filter.key] = el)}
//               className={`${styles.filterWrapper} ${
//                 filter.key === "postedBy" ? styles.postedByWrapper : ""
//               } ${filter.key === "bhk" ? styles.bhkWrapper : ""} ${
//                 filter.key === "propertyType" ? styles.propertyTypeWrapper : ""
//               } ${filter.key === "budget" ? styles.budgetWrapper : ""} ${
//                 filter.key === "topLocalities"
//                   ? styles.topLocalitiesWrapper
//                   : ""
//               }`}
//             >
//               <button
//                 className={`${styles.filterButton} ${
//                   selectedValues[filter.key] ? styles.active : ""
//                 }`}
//                 onClick={() => toggleDropdown(filter.key)}
//               >
//                 <small>{selectedValues[filter.key] || filter.label}</small>
//                 <BiSolidDownArrow className={styles.dropdownIcon} />
//               </button>

//               {activeDropdown === filter.key && (
//                 <div
//                   className={`${styles.dropdownPanel} ${
//                     styles[filter.className]
//                   }`}
//                 >
//                   <div className={styles.dropdownHeading}>{filter.heading}</div>

//                   {filter.type === "pills" &&
//                     filter.options.map((opt) => (
//                       <div
//                         key={opt}
//                         className={styles.pillOption}
//                         onClick={() => handleSelect(filter.key, opt)}
//                       >
//                         {opt}
//                       </div>
//                     ))}

//                   {filter.type === "list" &&
//                     filter.options.map((opt) => (
//                       <div
//                         key={opt}
//                         className={styles.listOption}
//                         onClick={() => handleSelect(filter.key, opt)}
//                       >
//                        <small>{opt}</small>
//                       </div>
//                     ))}

//                   {filter.type === "grouped" &&
//                     Object.entries(filter.options).map(([group, opts]) => (
//                       <div key={group} className={styles.groupSection}>
//                         <div className={styles.groupHeading}>{group}</div>
//                         <div className={styles.groupOptions}>
//                           {opts.map((opt) => (
//                             <div
//                               key={opt}
//                               className={styles.pillOption}
//                               onClick={() => handleSelect(filter.key, opt)}
//                             >
//                               + {opt}
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     ))}

//                   {filter.type === "slider" && (
//                     <div className={styles.sliderWrapper}>
//                       <input
//                         type="range"
//                         min={filter.min}
//                         max={filter.max}
//                         step={filter.step}
//                         onChange={(e) =>
//                           handleSelect(filter.key, e.target.value)
//                         }
//                       />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}

//           {/* More Filters */}
//           <div
//             className={styles.moreFiltersWrapper}
//             ref={(el) => (filterRefs.current["more"] = el)}
//           >
//             <button
//               className={`${styles.filterButton} ${
//                 showMoreFilters ? styles.active : ""
//               }`}
//               onClick={toggleMoreFilters}
//             >
//               <small><FaSlidersH className={styles.icon} /> More Filters</small>
//               <BiSolidDownArrow className={styles.dropdownIcon} />
//             </button>
//           </div>
//         </div>

//         {showMoreFilters && (
//           <div className={styles.moreFiltersPanel} ref={moreFiltersRef}>
//             <MoreFiltersPanel onClose={() => setShowMoreFilters(false)} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
