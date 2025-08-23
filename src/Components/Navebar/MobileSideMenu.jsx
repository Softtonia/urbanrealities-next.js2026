"use client";
import { useState } from "react";
import { FaChevronRight, FaPlus, FaMinus } from "react-icons/fa";
import { IoArrowBackSharp } from "react-icons/io5";
import BuyData from "../MobileMenudata/BuyData";
import SellData from "../MobileMenudata/SellData";
import "./MobileSideMenu.css";
import Link from "next/link";

const MobileSideMenu = () => {
  const [activeMenu, setActiveMenu] = useState("main");
  const [openSections, setOpenSections] = useState({});

  const menuItems = [
    { name: "Buy", submenu: "buy" },
    { name: "Rent", submenu: "rent" },
    { name: "Sell", submenu: "sell" },
    { name: "Find Agent", href: "/all-agent" },
    { name: "Projects", href: "/projects" },
    { name: "Property Services", href: "/property-services" },
    { name: "Home Loans", href: "/home-loan" },
    { name: "Help", href: "/help" },
    { name: "Sign In", href: "/signin" },
  ];

  const toggleSection = (idx) => {
    setOpenSections((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const renderBuyOrRentSubMenu = (title, data) => (
    <div className={`menu-panel ${activeMenu === title ? "active" : ""}`}>
      <div className="d-flex align-items-center border-bottom px-3 py-3">
        <IoArrowBackSharp
          className="m-0"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveMenu("main")}
        />
        <h6 className="m-3 my-0">
          {title.charAt(0).toUpperCase() + title.slice(1)}
        </h6>
      </div>

      <div className="px-3 pt-3">
        {data.map((section, idx) => {
          const key = `${title}-${idx}`;
          const isOpen = openSections[key];

          return (
            <div key={idx} className="mb-4">
              <div
                className={`section-area d-flex justify-content-between align-items-center p-2 ${
                  section.expandable ? "rounded" : ""
                }`}
                onClick={() => section.expandable && toggleSection(key)}
                style={{ cursor: section.expandable ? "pointer" : "default" }}
              >
                <h6 className="section-heading text-muted m-0">
                  {section.heading}
                </h6>
                {section.expandable &&
                  (isOpen ? (
                    <FaMinus size={14} className="m-0" />
                  ) : (
                    <FaPlus size={14} className="m-0" />
                  ))}
              </div>

              {(!section.expandable || isOpen) && (
                <ul className="list-unstyled ps-3 pt-2">
                  {section.items.map((item, j) => (
                    <li key={j} className="mb-2">
                      <a
                        href={item.href}
                        className="text-dark text-decoration-none d-flex justify-content-between align-items-center"
                      >
                        {item.name}
                        {item.badge && (
                          <span className="badge">{item.badge}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
  const renderSellSubMenu = () => (
    <div className={`menu-panel ${activeMenu === "sell" ? "active" : ""}`}>
      <div className="d-flex align-items-center border-bottom px-3 py-3">
        <IoArrowBackSharp
          className="m-0"
          style={{ cursor: "pointer" }}
          onClick={() => setActiveMenu("main")}
        />
        <h6 className="m-3 my-0">Sell</h6>
      </div>

      <div className="px-3 pt-3">
        {SellData.map((section, idx) => {
          const key = `sell-${idx}`;
          const isOpen = openSections[key];

          return (
            <div key={idx} className="mb-4">
              <div
                className={`section-area d-flex justify-content-between align-items-center p-2 ${
                  section.expandable ? "rounded" : ""
                }`}
                onClick={() => section.expandable && toggleSection(key)}
                style={{ cursor: section.expandable ? "pointer" : "default" }}
              >
                <h6 className="section-heading text-muted m-0">
                  {section.heading}
                </h6>
                {section.expandable &&
                  (isOpen ? (
                    <FaMinus size={14} className="m-0" />
                  ) : (
                    <FaPlus size={14} className="m-0" />
                  ))}
              </div>

              {(!section.expandable || isOpen) && (
                <>
                  <ul className="list-unstyled ps-3 pt-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="mb-2">
                        <span className="text-dark">{item.name}</span>
                        {item.badge && (
                          <span className="badge bg-warning text-dark ms-2">
                            {item.badge}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>

                  {section.extraInfo && (
                    <div className="text-muted text-center small border-top pt-2">
                      <p className="mb-1">{section.extraInfo.title}</p>
                      <p className="mb-0">
                        {section.extraInfo.contact}
                        {section.extraInfo.email && (
                          <a
                            href={section.extraInfo.emailHref}
                            className="email-anchor ms-1 text-decoration-none"
                          >
                            {section.extraInfo.email}
                          </a>
                        )}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div
      className="position-relative overflow-hidden"
      style={{ height: "100vh", backgroundColor: "#fff" }}
    >
      {/* MAIN MENU */}
      <div className={`menu-panel ${activeMenu === "main" ? "active" : ""}`}>
        <div className="d-flex justify-content-between px-2 border-bottom">
          <p className="mb-2 m-0 p-2 pt-3 fw-bold">Sign in Account</p>
          <button className="btn btn-login">Login</button>
        </div>

        <ul className="list-unstyled px-3 py-2">
          {menuItems.map((item, i) => (
            <li
              key={i}
              className="py-3 border-bottom"
              style={{ cursor: "pointer" }}
            >
              {item.submenu ? (
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => setActiveMenu(item.submenu)}
                >
                  <span className="text-dark m-0 px-2">{item.name}</span>
                  <FaChevronRight size={14} className="text-muted me-0" />
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="text-dark text-decoration-none d-flex justify-content-between align-items-center px-2"
                >
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Submenus */}
      {renderBuyOrRentSubMenu("buy", BuyData)}
      {renderBuyOrRentSubMenu("rent", BuyData)}
      {renderSellSubMenu()}
    </div>
  );
};

export default MobileSideMenu;
