"use client";
import React, { useState, useEffect, useMemo } from "react";
import "../Navebar/navbar.css";
import DropdownMegaMenu from "../MegaMenu/DropdownMegaMenu";
import SellerDropdown from "../MegaMenu/SellerDropdown";
import MobileSideMenu from "./MobileSideMenu";
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
import { useRouter } from "next/navigation";
import homeLogo from "../../../img/add_home.svg";
import LocationDropdown from "../LocationDropdown/LocationDropdown";
import { GoChevronDown } from "react-icons/go";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSiteSettings } from "../mycontext/siteSettingContext";
import { useCity } from "@/utils/CityContext";
import { getSiteSettingsData } from "@/services/site-setting.service";

const staticCities = {
  filter_city: null,
  nearby: [
    { id: 1, name: "New Delhi" },
    { id: 2, name: "Gurgaon" },
    { id: 3, name: "Greater Noida" }
  ],
  popular: [
    { id: 4, name: "Ahmedabad" },
    { id: 5, name: "Bangalore" },
    { id: 6, name: "Beyond Thane" },
    { id: 7, name: "Chennai" },
    { id: 8, name: "Gurgaon" },
    { id: 9, name: "Hyderabad" },
    { id: 10, name: "Indore" },
    { id: 11, name: "Jaipur" },
    { id: 12, name: "Kolkata" },
    { id: 13, name: "Lucknow" },
    { id: 14, name: "Mumbai" },
    { id: 15, name: "Navi Mumbai" },
    { id: 16, name: "New Delhi" },
    { id: 17, name: "Noida" },
    { id: 18, name: "Pune" },
    { id: 19, name: "Thane" }
  ],
  other: [
    { id: 20, name: "Agra" }, { id: 21, name: "Ahmadnagar" }, { id: 22, name: "Allahabad" },
    { id: 23, name: "Aluva" }, { id: 24, name: "Amritsar" }, { id: 25, name: "Aurangabad" },
    { id: 26, name: "Badlapur" }, { id: 27, name: "Bareilly" }, { id: 28, name: "Belgaum" },
    { id: 29, name: "Bhiwadi" }, { id: 30, name: "Bhiwandi" }, { id: 31, name: "Bhopal" },
    { id: 32, name: "Bhubaneswar" }, { id: 33, name: "Bokaro Steel City" }, { id: 34, name: "Chandigarh" },
    { id: 35, name: "Chengalpattu" }, { id: 36, name: "Coimbatore" }, { id: 37, name: "Dehradun" },
    { id: 38, name: "Durgapur" }, { id: 39, name: "Ernakulam" }, { id: 40, name: "Erode" },
    { id: 41, name: "Faridabad" }, { id: 42, name: "Ghaziabad" }, { id: 43, name: "Goa" },
    { id: 44, name: "Gorakhpur" }, { id: 45, name: "Greater Noida" }, { id: 46, name: "Guntur" },
    { id: 47, name: "Guwahati" }, { id: 48, name: "Gwalior" }, { id: 49, name: "Haridwar" },
    { id: 50, name: "Hosur" }, { id: 51, name: "Hubli" }, { id: 52, name: "Jabalpur" },
    { id: 53, name: "Jalandhar" }, { id: 54, name: "Jammu" }, { id: 55, name: "Jamshedpur" },
    { id: 56, name: "Jodhpur" }, { id: 57, name: "Kalyan" }, { id: 58, name: "Kannur" },
    { id: 59, name: "Kanpur" }, { id: 60, name: "Khopoli" }, { id: 61, name: "Kochi" },
    { id: 62, name: "Kodaikanal" }, { id: 63, name: "Kottayam" }, { id: 64, name: "Kozhikode" },
    { id: 65, name: "Lonavala" }, { id: 66, name: "Ludhiana" }, { id: 67, name: "Madurai" },
    { id: 68, name: "Mangalore" }, { id: 69, name: "Mohali" }, { id: 70, name: "Mysore" },
    { id: 71, name: "Nagpur" }, { id: 72, name: "Nainital" }, { id: 73, name: "Nanded" },
    { id: 74, name: "Nashik" }, { id: 75, name: "Navsari" }, { id: 76, name: "Nellore" },
    { id: 77, name: "Newtown" }, { id: 78, name: "Ooty" }, { id: 79, name: "Palakkad" },
    { id: 80, name: "Palghar" }
  ]
};

export default function Navbar() {
  const { city, setCity, isLoadingCity } = useCity();
  const cityId = city ? city.id : "";
  const cityName = city ? city.name : "";
  const [activeCity, setActiveCity] = useState(cityId);
  const [cities, setCities] = useState(staticCities);
  const router = useRouter();
  console.log(city);

  const handleSuggestionClick = (city) => {
    setCity(city); // Save globally in context
    setActiveCity(city.id); // Highlight by id
    setActiveDropdown(null);
    setShowLocationSlider(false);

    router.push(`/?location=${encodeURIComponent(city.name)}`);
  };

  useEffect(() => {
    // Commented out to use static data for now
    /*
    const handler = setTimeout(() => {
      const fetchCities = async () => {
        try {
          const res = await fetch(
            `/api/navbar-location?country_id=1&city_id=${cityId}`
          );
          const data = await res.json();
          if (data?.cities) {
            setCities(data.cities);
          }
        } catch (err) {
          console.error("Error fetching cities:", err);
        }
      };
      fetchCities();
    }, 400);

    return () => clearTimeout(handler);
    */
  }, [activeCity, cityId]);

  const renderCityGrid = (citiesArray, handleSuggestionClick) => {
    if (!citiesArray?.length) return null;

    return (
      <div className="mobilecity-grid">
        {citiesArray.map((city) => (
          <div
            key={city.id}
            className={`city-nametext mb-2 px-4 py-2 ${activeCity === city.id ? "active" : ""
              }`}
            onClick={() => handleSuggestionClick(city)}
          >
            {city.name}
          </div>
        ))}
      </div>
    );
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocationSlider, setShowLocationSlider] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const { settings, token, logout, isLoadingToken } = useSiteSettings();
  const [siteData, setSiteData] = useState(settings);
  const [isLoadingSiteData, setIsLoadingSiteData] = useState(true);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await getSiteSettingsData();
        if (response) {
          setSiteData(response.data || response); 
        }
      } catch (err) {
        console.error("Error fetching site settings:", err);
      } finally {
        setIsLoadingSiteData(false);
      }
    };
    fetchSiteSettings();
  }, []);

  const [activeDropdown, setActiveDropdown] = useState(null); // "buy" | "rent" | "sell" | null

  const toggleDropdown = (menu) => {
    setActiveDropdown((prev) => (prev === menu ? null : menu));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Agar click kisi dropdown ke andar nahi hua
      if (
        !event.target.closest(".nav-item.dropdown") &&
        !event.target.closest(".position-relative")
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Debounced API call (3 sec)
  useEffect(() => {
    if (!searchText) {
      setSuggestions([]);
      return;
    }

    const handler = setTimeout(() => {
      const fetchCities = async () => {
        try {
          const res = await fetch(
            `/api/navbar-location?search=${encodeURIComponent(searchText)}`
          );
          const data = await res.json();
          console.log("-----=>", data);
          // / Combine multiple arrays if needed
          const combined = [
            ...(data.popular || []),
            ...(data.nearby || []),
            ...(data.other || []),
          ];

          // Take top 5
          setSuggestions(data); // adjust based on API response
        } catch (err) {
          console.error("Error fetching cities:", err);
        }
      };
      fetchCities();
    }, 1000); // 3 sec debounce

    return () => clearTimeout(handler);
  }, [searchText]);
  console.log("----->", suggestions);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    // Clear token (example for localStorage)
    localStorage.removeItem("token");
    // Redirect to home or login page
    window.location.href = "/auth/login";
  };



  return (
    <>
      {/* Desktop Navbar */}
      <nav className="navbar navbar-expand-xl px-4 py-2 d-none d-xl-flex">
        <div className="container-fluid d-flex align-items-center justify-content-between p-0">
          <div className="d-flex align-items-center gap-4">
            <Link className="navbar-brand d-flex align-items-center" href="/">
              {isLoadingSiteData ? (
                <div className="placeholder-glow">
                  <div className="placeholder" style={{ width: "90px", height: "30px", borderRadius: "4px", backgroundColor: "var(--Skeleton-Bg)" }}></div>
                </div>
              ) : (
                <Image
                  src={
                    siteData?.website_logo || siteData?.mobile_logo 
                  }
                  alt="Urbanrealities"
                  width={90}
                  height={30}
                />
              )}
            </Link>

            <div
              className="position-relative"
              onClick={() => toggleDropdown("location")}
            >
              <div className="nav-link d-flex align-items-center pb-1" role="button">
                {isLoadingCity ? (
                  <div className="placeholder-glow d-flex align-items-center">
                    <div className="placeholder" style={{ width: "60px", height: "20px", borderRadius: "4px", backgroundColor: "var(--Skeleton-Bg)", marginRight: "5px" }}></div>
                  </div>
                ) : (
                  <>
                    <FaMapMarkerAlt className="icon-nav-loc me-1" />
                    <div className="nav-items-name">{city && city.name ? city.name : "Location"}</div>
                  </>
                )}
              </div>
              <div
                className={`transition-opacity duration-300 ${activeDropdown === "location"
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
                  } position-absolute top-100 start-0`}
                style={{ marginTop: "15px" }}
              >
                <LocationDropdown cities={cities} onSelectCity={handleSuggestionClick} />
              </div>
            </div>
          </div>

          <ul className="navbar-nav d-flex flex-row align-items-center gap-3 mb-0">
            <li
              className="nav-item dropdown position-static"
              onClick={() => toggleDropdown("buy")}
            >
              <div className="nav-items-name">
                Buy <GoChevronDown />
              </div>
              <div
                className={`dropdown-menu mega-menu p-3 ${activeDropdown === "buy" ? "show" : ""
                  }`}
                style={{ width: "50vw", marginTop: "15px" }}
              >
                <DropdownMegaMenu />
              </div>
            </li>

            <li
              className="nav-item dropdown position-static"
              onClick={() => toggleDropdown("rent")}
            >
              {" "}
              <div className="nav-items-name">
                Rent <GoChevronDown />
              </div>
              <div
                className={`dropdown-menu mega-menu p-3 ${activeDropdown === "rent" ? "show" : ""
                  }`}
                style={{ width: "50vw", marginTop: "15px" }}
              >
                <DropdownMegaMenu />
              </div>
            </li>
            <li
              className="nav-item dropdown position-static"
              onClick={() => toggleDropdown("sell")}
            >
              {" "}
              <div className="nav-items-name">
                Sell <GoChevronDown />
              </div>
              <div
                className={`dropdown-menu mega-menu p-3 ${activeDropdown === "sell" ? "show" : ""
                  }`}
                style={{ width: "60vw", marginTop: "15px" }}
              >
                <SellerDropdown />
              </div>
            </li>
            {[
              { label: " Agent", href: "/all-agent" },
              { label: "Projects", href: "/projects" },
              { label: "Services", href: "/property-services" },
              { label: "Home Loans", href: "/home-loan" },
            ].map((item, i) => (
              <li key={i} className="nav-item">
                <Link href={item.href} className="nav-items-name">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <Link
              href={
                !token ? `/auth/login?redirect=/auth/post-property/basic-details` : "/auth/post-property/basic-details"
              }
              className="btn-property d-flex align-items-center gap-2 rounded-pill"
            >
              <Image
                src={homeLogo}
                alt="Post Property"
                width={22}
                height={22}
              />
              Post Property <span className="badge-property">Free</span>
            </Link>
            <div className="nav-items-name d-flex align-items-center  position-relative">
              <div
                className="dropdown"
                style={{ position: "relative" }}
                onClick={() => toggleDropdown("help")}
              >
                <button
                  className="btn btn-link text-white text-decoration-none dropdown-toggle nav-items-name"
                  type="button"
                >
                  Help
                </button>
                <ul
                  className={`dropdown-menu  ${activeDropdown === "help" ? "show" : ""
                    }`}
                  style={{
                    top: "100%",
                    right: 0,
                    left: "auto",
                    minWidth: "200px",
                  }}
                >
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/help"
                      style={{
                        backgroundColor: "transparent",
                        color: "inherit",
                      }}
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/"
                      style={{
                        backgroundColor: "transparent",
                        color: "inherit",
                      }}
                    >
                      Sales Enquiry
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      href="/"
                      style={{
                        backgroundColor: "transparent",
                        color: "inherit",
                      }}
                    >
                      Chat with Us
                    </Link>
                  </li>
                </ul>
              </div>

              {!isLoadingToken && (
                token ? (
                  <div
                    className="dropdown"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                    style={{ position: "relative" }}
                  >
                    <button
                      className="btn btn-link text-white text-decoration-none dropdown-toggle nav-items-name"
                      type="button"
                    >
                      My Account
                    </button>
                    {isOpen && (
                      <ul
                        className="dropdown-menu show"
                        style={{
                          display: "block",
                          position: "absolute",
                          top: "100%",
                          left: -20,
                          backgroundColor: "#fff",
                          padding: "0.5rem 0",
                          borderRadius: "0.25rem",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                          minWidth: "150px",
                        }}
                      >
                        <li>
                          <Link
                            className="dropdown-item"
                            href="/auth/user/account"
                            style={{
                              backgroundColor: "transparent",
                              color: "inherit",
                            }}
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            href="/auth/user/setting"
                            style={{
                              backgroundColor: "transparent",
                              color: "inherit",
                            }}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={logout}
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    className="text-white text-decoration-none"
                    href="/auth/login"
                  >
                    Sign In
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="d-flex flex-column d-xl-none text-white bg-dark align-items-center justify-content-between">
        <div className="bg-white text-dark w-100 d-flex justify-content-between px-4 py-2">
          <div className="m-0">
            <div
              className="nav-link d-flex align-items-center"
              role="button"
              onClick={() => setShowLocationSlider(true)}
            >
              {isLoadingCity ? (
                <div className="placeholder-glow d-flex align-items-center">
                  <div className="placeholder" style={{ width: "70px", height: "20px", borderRadius: "4px", backgroundColor: "#e9ecef", marginRight: "5px" }}></div>
                </div>
              ) : (
                <>
                  {city ? city.name : "Location"} <FaAngleDown />
                </>
              )}
            </div>
          </div>
          <div className="nav-items-name d-flex align-items-center gap-3 m-0">
            {!isLoadingToken && (token ? (
              <div
                className="dropdown"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                style={{ position: "relative" }}
              >
                <button
                  className="btn btn-link text-black text-decoration-none dropdown-toggle nav-items-name"
                  type="button"
                >
                  My Account
                </button>
                {isOpen && (
                  <ul
                    className="dropdown-menu show"
                    style={{
                      display: "block",
                      position: "absolute",
                      top: "100%",
                      left: -20,
                      backgroundColor: "#fff",
                      padding: "0.5rem 0",
                      borderRadius: "0.25rem",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      minWidth: "150px",
                    }}
                  >
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/auth/user/account"
                        style={{
                          backgroundColor: "transparent",
                          color: "inherit",
                        }}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item"
                        href="/auth/user/setting"
                        style={{
                          backgroundColor: "transparent",
                          color: "inherit",
                        }}
                      >
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                className="text-decoration-none text-dark"
                href="/auth/login"
              >
                Sign In
              </Link>
            ))}
          </div>
        </div>

        <div className="d-flex d-xl-none bg-dark text-white w-100 px-4 py-3 align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-3 m-0">
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
              <Link className="" href="/">
                {isLoadingSiteData ? (
                  <div className="placeholder-glow">
                    <div className="placeholder" style={{ width: "100px", height: "25px", borderRadius: "4px", backgroundColor: "#e9ecef" }}></div>
                  </div>
                ) : (
                  <Image
                    src={
                      siteData?.website_logo?.startsWith("http")
                        ? siteData.website_logo
                        : siteData?.mobile_logo?.startsWith("http")
                          ? siteData.mobile_logo
                          : "/logo.png"
                    }
                    alt="Urbanrealities"
                    width={100}
                    height={25}
                    priority // Optional: for faster loading above-the-fold
                  />
                )}
              </Link>
            </div>
          </div>
          <div className="m-0">
            <Link
              href={!token ? `/auth/login?redirect=/auth/post-property/basic-details` : "/auth/post-property/basic-details"}
              className="btn-property d-flex align-items-center gap-2 rounded-pill text-sm px-3 py-1"
            >
              <Image
                src={homeLogo}
                alt="Post Property"
                width={18}
                height={18}
              />
              Post Property <span className="badge-property">Free</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <>
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1040,
            opacity: mobileMenuOpen ? 1 : 0,
            visibility: mobileMenuOpen ? "visible" : "hidden",
            transition: "opacity 0.3s ease-in-out, visibility 0.3s",
          }}
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className="position-fixed top-0 start-0 h-100 bg-white text-dark d-xl-none"
          style={{
            width: "400px",
            transition: "transform 0.3s ease-in-out",
            transform: mobileMenuOpen ? "translateX(0)" : "translateX(-100%)",
            zIndex: 1050,
            visibility: mobileMenuOpen ? "visible" : "hidden",
          }}
        >
          <div
            className="position-absolute"
            style={{
              top: "16px",
              right: "-48px",
              width: "32px",
              height: "32px",
              backgroundColor: "#000",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1060,
            }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <FaTimes size={18} color="#fff" />
          </div>
          <MobileSideMenu />
        </div>
      </>

      {/* Location Slider (Mobile Only) */}
      {showLocationSlider && (
        <div
          className="location-slideup position-fixed top-0 start-0 w-100 h-100 bg-white zindex-1050 d-xl-none"
          style={{ zIndex: 9999, overflowX: "hidden" }}
        >
          <div className="p-3 border-bottom d-flex align-items-center gap-3">
            <button
              className="btn btn-link p-0 m-0"
              onClick={() => setShowLocationSlider(false)}
            >
              <IoArrowBackSharp className="loction-heading-mob" />
            </button>
            <div className="loction-heading-mob">Location</div>
          </div>

          <div className="container mb-3 mt-1" style={{ maxWidth: "90vw" }}>
            <div className="position-relative">
              <div className="d-flex align-items-center border rounded-3 shadow-sm px-3 py-2 bg-white">
                <FaSearch className="me-2 icon-color" />
                <input
                  type="text"
                  className="city-text form-control border-0 shadow-none p-0"
                  placeholder="Search city, area or locality"
                  value={searchText}
                  onChange={handleSearchChange}
                  style={{ fontSize: "16px" }}
                />
              </div>
              {searchText && suggestions && (
                <>
                  <ul
                    className="list-group position-absolute w-100 shadow-sm"
                    style={{
                      top: "100%",
                      // zIndex:2000,
                      borderRadius: "0.5rem",
                      overflow: "hidden",
                    }}
                  >
                    {suggestions?.cities?.filter_city && (
                      <li
                        // key={index}
                        className="city-text list-group-item list-group-item-action px-3 py-2"
                        onClick={() =>
                          handleSuggestionClick(
                            suggestions?.cities?.filter_city
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {suggestions?.cities?.filter_city.name}
                      </li>
                    )}
                  </ul>
                  <ul
                    className="list-group position-absolute w-100 shadow-sm"
                    style={{
                      top: "100%",
                      // zIndex:2000,
                      borderRadius: "0.5rem",
                      overflow: "hidden",
                    }}
                  >
                    {suggestions?.cities?.other?.length > 0 &&
                      suggestions.cities.other.map((city, index) => (
                        <li
                          key={index}
                          className="city-text list-group-item list-group-item-action px-3 py-2"
                          onClick={() => handleSuggestionClick(city)}
                          style={{ cursor: "pointer" }}
                        >
                          {city.name}
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {searchText.length === 0 && (
            <>
              <div className="mb-3">
                <div className="city-heading-mob mb-2 ms-3">Selected City</div>
                {city && (
                  <div className="city-Nametext active mb-2 px-4 py-2">
                    {city.name}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <div className="city-heading-mob mb-2 ms-3">Nearby Cities</div>
                {renderCityGrid(cities.nearby, handleSuggestionClick)}
              </div>

              <div className="mb-3">
                <div className="city-heading-mob mb-2 ms-3">Popular Cities</div>
                {renderCityGrid(cities.popular, handleSuggestionClick)}
              </div>

              <div>
                <div className="city-heading-mob mb-2 ms-3">Other Cities</div>
                <div
                  className="scrollable overflow-auto overflow-x-hidden"
                  style={{ maxHeight: "500px" }}
                >
                  {renderCityGrid(cities.other, handleSuggestionClick)}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
