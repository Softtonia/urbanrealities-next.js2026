"use client";
import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import "../Navebar/navbar.css";
import {
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaChevronRight,
  FaAngleDown,
  FaSearch,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../img/Logo.png";
import homeLogo from "../../../img/add_home.svg";
import LocationDropdown from "../LocationDropdown/LocationDropdown";
import { GoChevronDown } from "react-icons/go";
import { IoArrowBackSharp } from "react-icons/io5";

const cities = {
  nearbyCities: ["New Delhi", "Gurgaon", "Greater Noida"],
  popularCities: ["Ahmedabad", "Bangalore", "Beyond Thane"],
  otherCities: [
    "Agra",
    "Ahmadnagar",
    "Allahabad",
    "Aluva",
    "Amritsar",
    "Aurangabad",
    "Badlapur",
    "Bareilly",
    "Belgaum",
    "Bhiwadi",
    "Bhiwandi",
    "Bhopal",
    "Bhubaneswar",
    "Bokaro Steel City",
    "Chandigarh",
    "Chengalpattu",
    "Coimbatore",
    "Dehradun",
    "Durgapur",
    "Ernakulam",
    "Erode",
    "Faridabad",
    "Ghaziabad",
    "Goa",
    "Gorakhpur",
    "Greater Noida",
    "Guntur",
    "Guwahati",
    "Gwalior",
    "Haridwar",
    "Hosur",
    "Hubli",
    "Jabalpur",
    "Jalandhar",
    "Jammu",
    "Jamshedpur",
    "Jodhpur",
    "Kalyan",
    "Kannur",
    "Kanpur",
    "Khopoli",
    "Kochi",
    "Kodaikanal",
    "Kottayam",
    "Kozhikode",
    "Lonavala",
    "Ludhiana",
    "Madurai",
    "Mangalore",
    "Mohali",
    "Mysore",
    "Nagpur",
    "Nainital",
    "Nanded",
    "Nashik",
    "Navsari",
    "Nellore",
    "Newtown",
    "Ooty",
    "Palakkad",
    "Palghar",
    "Gurgaon",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Navi Mumbai",
    "New Delhi",
    "Noida",
    "Pune",
    "Thane",
    "Chennai",
    ,
    "Ghaziabad",
  ],
};

const renderCityGrid = (citiesArray) => {
  const columnsPerRow = 5;
  const rows = [];

  for (let i = 0; i < citiesArray.length; i += columnsPerRow) {
    const rowItems = citiesArray.slice(i, i + columnsPerRow);
    rows.push(
      <div className="row mb-1 ms-3" key={i}>
        {rowItems.map((city, index) => (
          <div key={index}>
            <div className="city-name mb-2">{city}</div>
          </div>
        ))}
      </div>
    );
  }

  return rows;
};

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocationSlider, setShowLocationSlider] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = cities.otherCities
      .filter((city) => city.toLowerCase().includes(value.toLowerCase()))
      .slice(0, 5);

    setSuggestions(filtered);
  };

  const handleSuggestionClick = (city) => {
    setSearchText(city); // Set selected city in input
    setSuggestions([]); // Hide suggestions
  };

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Desktop Navbar - visible from xl and up */}
      <nav className="navbar navbar-expand-xl  px-4 py-2 d-none d-xl-flex">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Left Side */}
          <div className="d-flex align-items-center">
            <Link className="navbar-brand d-flex align-items-center" href="/">
              <Image src={logo} alt="Urbanrealities" width={90} height={30} />
            </Link>
            <div
              className="position-relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="nav-link d-flex align-items-center" role="button">
                <FaMapMarkerAlt className="me-1" />
              </div>

              {/* Add transition class for dropdown if needed */}
              <div
                className={`transition-opacity duration-300 ${
                  showDropdown ? "opacity-100 visible" : "opacity-0 invisible"
                } position-absolute top-100 start-0`}
              >
                <LocationDropdown />
              </div>
            </div>
          </div>

          {/* Center Nav Links */}
          <ul className="navbar-nav d-flex flex-row align-items-center gap-3 mb-0 ">
            <li className="nav-item">
              <div className="nav-items-name ">
                Buy
                <GoChevronDown />
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-items-name ">
                Rent
                <GoChevronDown />
              </div>
            </li>

            {[
              "Sell",
              "Find Agent",
              "Projects",
              "Property Services",
              "Home Loans",
            ].map((label, index) => (
              <li key={index} className="nav-item">
                <div className="nav-items-name ">{label}</div>
              </li>
            ))}
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-3">
            <button className="btn-property d-flex align-items-center gap-2 rounded-pill">
              <Image
                src={homeLogo}
                alt="Post Property"
                width={22}
                height={22}
              />
              Post Property <span className="badge-property">Free</span>
            </button>
            <div className=" nav-items-name d-flex align-items-center gap-3">
              <a className="text-white text-decoration-none" href="#">
                Help
              </a>
              <a className="text-white text-decoration-none" href="#">
                Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - visible only below xl */}
      <nav className="d-flex flex-column d-xl-none text-white  bg-dark  align-items-center justify-content-between">
        <div className="bg-white text-dark w-100  d-flex justify-content-between px-4 py-2">
          <div>
            <div
              className="nav-link d-flex align-items-center"
              role="button"
              onClick={() => setShowLocationSlider(true)}
            >
              Location <FaAngleDown />
            </div>
          </div>

          <div className="  nav-items-name d-flex align-items-center gap-3">
            <a className="text-decoration-none" href="#">
              Help
            </a>
            <a className="text-decoration-none" href="#">
              Sign In
            </a>
          </div>
        </div>

        <div className="d-flex d-xl-none bg-dark  text-white w-100 px-4 py-3  align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3">
            {/* <FaBars
              size={22}
              onClick={() => setMobileMenuOpen(true)}
              className="cursor-pointer"
            /> */}

            <div
              onClick={() => setMobileMenuOpen(true)}
              className="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 64 64"
              >
                <path
                  fill="currentColor"
                  d="M4 26.6h56c1.2 0 2.3-1 2.3-2.3S61.3 22 60 22H4c-1.2 0-2.3 1-2.3 2.3s1.1 2.3 2.3 2.3m56 10.8H4c-1.2 0-2.3 1-2.3 2.3S2.7 42 4 42h56c1.2 0 2.3-1 2.3-2.3s-1.1-2.3-2.3-2.3"
                />
              </svg>
            </div>

            <div>
              <Image src={logo} alt="Urbanrealities" width={100} height={25} />
            </div>
          </div>

          <div>
            <button className="btn-property d-flex align-items-center gap-2 rounded-pill text-sm px-3 py-1">
              <Image
                src={homeLogo}
                alt="Post Property"
                width={18}
                height={18}
              />
              Post Property <span className="badge-property">Free</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <div
        className={`position-fixed  top-0 start-0 h-100 bg-white text-black zindex-tooltip transition-transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-n100"
        } d-xl-none`}
        style={{
          width: "280px",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="d-flex align-items-end justify-content-end   px-3 py-2">
          {/* <span className="fw-bold fs-5">Menu</span> */}
          <FaTimes
            size={20}
            onClick={() => setMobileMenuOpen(false)}
            className="cursor-pointer"
          />
        </div>

        <ul className="list-unstyled px-3 py-2 ">
          {[
            "Buy",
            "Rent",
            "Sell",
            "Find Agent",
            "Projects",
            "Property Services",
            "Home Loans",
            "Help",
            "Sign In",
          ].map((item, i) => (
            <li
              key={i}
              className="py-3 d-flex justify-content-between align-items-center border-bottom"
            >
              <a href="#" className=" text-decoration-none ">
                {item}
              </a>
              <FaChevronRight size={14} className="text-muted" />
            </li>
          ))}
        </ul>
      </div>

      {/* ------------------------------------- Location slider ------------------------------------- */}

      {showLocationSlider && (
        <div class="location-slideup  position-fixed top-0 start-0 w-100 h-100 bg-white zindex-1050 d-xl-none">
          <div class="p-3 border-bottom d-flex align-items-center gap-3">
            <button
              class="btn btn-link p-0 m-0"
              onClick={() => setShowLocationSlider(false)}
            >
              <IoArrowBackSharp className="loction-heading-mob" />
            </button>
            <div class="loction-heading-mob ">Location</div>
          </div>

          {/* ---- input box for search and seggitions ---- */}

          <div className="container mb-3 mt-1" style={{ maxWidth: "90vw" }}>
            <div className="position-relative">
              {/* Input */}
              <div className="d-flex align-items-center  border rounded-3 shadow-sm px-3 py-2 bg-white">
                <FaSearch className="me-2 icon-color" />
                <input
                  type="text"
                  className=" city-text form-control border-0 shadow-none p-0"
                  placeholder="Search city, area or locality"
                  value={searchText}
                  onChange={handleSearchChange}
                  style={{ fontSize: "16px" }}
                />
              </div>

              {/* Suggestions */}
              {searchText && suggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100 shadow-sm "
                  style={{
                    top: "100%",
                    zIndex: 1050,
                    borderRadius: "0.5rem",
                    overflow: "hidden",
                  }}
                >
                  {suggestions.map((city, index) => (
                    <li
                      key={index}
                      className=" city-text list-group-item list-group-item-action px-3 py-2"
                      onClick={() => handleSuggestionClick(city)}
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

         {
          searchText.length === 0 ? (
            <>
              <div className="mb-3">
            <div className="city-heading-mob mb-2 ms-3">Nearby Cities</div>
            {renderCityGrid(cities.nearbyCities)}
          </div>

          <div className="mb-3">
            <div className="city-heading-mob  mb-2 ms-3">Popular Cities</div>
            {renderCityGrid(cities.popularCities)}
          </div>

          <div>
            <div className="city-heading-mob  mb-2 ms-3">Other Cities</div>
            <div
              className="scrollable overflow-auto"
              style={{ maxHeight: "500px" }}
            >
              {renderCityGrid(cities.otherCities)}
            </div>
          </div>
            </>
          ) : (
            <>
           
            </>
          )
         }
        </div>
      )}
    </>
  );
}
