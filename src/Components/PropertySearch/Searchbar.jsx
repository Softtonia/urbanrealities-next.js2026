"use client";
import { useState } from "react";
import "./Searchbar.css";
import PropertySearch from "./PropertySearch";
import Link from "next/link";

export default function Searchbar() {
  const [activeTab, setActiveTab] = useState("Buy");

  const navItems = [
    { label: "Buy", value: "Buy" },
    { label: "Rent", value: "Rent" },
    { label: "New Projects", value: "New Project" },
    { label: "PG", value: "PG" },
    { label: "Plot", value: "Plot" },
    { label: "Commercial", value: "Commercial" },
    { label: "Post Free Property Ad", value: "Post Free Property Ad", link:"/post-property" },
  ];

  return (
    <>
      <nav className="nav">
        {navItems.map((item) =>
          item.link ? (
            <Link
              key={item.value}
              href={item.link}
              className="nav-link special-link" // extra class if needed
            >
              {item.label}
            </Link>
          ) : (
            <a
              key={item.value}
              className={`nav-link ${activeTab === item.value ? "active" : ""}`}
              onClick={() => setActiveTab(item.value)}
            >
              {item.label}
            </a>
          )
        )}
      </nav>

      {navItems.map((item) =>
        !item.link ? ( // tab-content sirf un items ke liye jisme link nahi hai
          <div
            key={item.value}
            className={`tab-content ${activeTab === item.value ? "active" : ""}`}
          >
            <PropertySearch />
          </div>
        ) : null
      )}
    </>
  );
}
