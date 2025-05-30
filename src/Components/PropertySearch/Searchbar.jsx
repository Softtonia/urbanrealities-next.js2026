// "use client";
// import { useState } from "react";
// import "./Searchbar.css";
// import PropertySearch from "./PropertySearch";


// export default function Searchbar() {
//   const [activeTab, setActiveTab] = useState("buy");

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

// const navItems = [
//     "buy",
//     "rent",
//     "new project",
//     "pG",
//     "plot",
//     "commercial",
//     "post Free Property Ad",
//   ];
//   return (
//     <>
// <nav className="nav">
//   {navItems.map((item) => (
//     <a
//       key={item}
//       className={`nav-link ${activeTab === item ? "active" : ""}`}
//       onClick={() => handleTabChange(item)}
//     >
//       {item.charAt(0).toUpperCase() + item.slice(1)}
//     </a>
//   ))}
// </nav>

// <div className={`tab-content ${activeTab === "buy" ? "active" : ""}`}>
//   <PropertySearch />
// </div>
// <div className={`tab-content ${activeTab === "rent" ? "active" : ""}`}>
//   <PropertySearch />
// </div>
// <div className={`tab-content ${activeTab === "new project" ? "active" : ""}`}>
//   <PropertySearch />
// </div>
// <div className={`tab-content ${activeTab === "pG" ? "active" : ""}`}>
//   <PropertySearch />
// </div>
// <div className={`tab-content ${activeTab === "plot" ? "active" : ""}`}>
//   <PropertySearch />
// </div>
// <div className={`tab-content ${activeTab === "commercial" ? "active" : ""}`}>
//   <PropertySearch />
// </div>
// <div className={`tab-content ${activeTab === "post Free Property Ad" ? "active" : ""}`}>
//   <PropertySearch />
// </div>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import "./Searchbar.css";
import PropertySearch from "./PropertySearch";

export default function Searchbar() {
  const [activeTab, setActiveTab] = useState("Buy");

  const navItems = [
    { label: "Buy", value: "Buy" },
    { label: "Rent", value: "Rent" },
    { label: "New Project", value: "New Project" },
    { label: "PG", value: "PG" },
    { label: "Plot", value: "Plot" },
    { label: "Commercial", value: "Commercial" },
    { label: "Post Free Property Ad", value: "Post Free Property Ad" },
  ];

  return (
    <>
      <nav className="nav">
        {navItems.map((item) => (
          <a
            key={item.value}
            className={`nav-link ${activeTab === item.value ? "active" : ""}`}
            onClick={() => setActiveTab(item.value)}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {navItems.map((item) => (
        <div
          key={item.value}
          className={`tab-content ${activeTab === item.value ? "active" : ""}`}
        >
          <PropertySearch />
        </div>
      ))}
    </>
  );
}
