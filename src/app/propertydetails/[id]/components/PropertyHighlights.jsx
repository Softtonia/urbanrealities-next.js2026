'use client';

import React from "react";
import "./PropertyHighlights.css";
import { FaBed, FaBath, FaCar } from "react-icons/fa";
import {
  MdBatteryFull,
  MdOutlineKey,
  MdLocationOn,
  MdBalcony,
} from "react-icons/md";

const PropertyHighlights = () => {
  return (
        <div className="highlite-container">
            <div className="property-highlights-container">
              <div className="highlights-grid">
                <div className="highlight-box">
                  <FaBed className="highlight-svg" />
                  <span className="highlight-span">3 BHK</span>
                  <p className="highlight-para">Bedroom</p>
                </div>
                <div className="highlight-box">
                  <FaBath className="highlight-svg" />
                  <span className="highlight-span">2 Baths</span>
                  <p className="highlight-para">Bathroom</p>
                </div>
                <div className="highlight-box">
                  <MdBatteryFull className="highlight-svg" />
                  <span className="highlight-span">Full</span>
                  <p className="highlight-para">Battery Backup</p>
                </div>
                <div className="highlight-box">
                  <MdOutlineKey className="highlight-svg" />
                  <span className="highlight-span">Immediately</span>
                  <p className="highlight-para">Possession</p>
                </div>
                <div className="highlight-box">
                  <MdBalcony className="highlight-svg" />
                  <span className="highlight-span">2 Balcony</span>
                  <p className="highlight-para">Balcony</p>
                </div>

                <div className="highlight-box">
                  <MdLocationOn className="highlight-svg" />
                  <span className="highlight-span">Ganesh Property</span>
                  <p className="highlight-para">Mundeshwari</p>
                </div>
                <div className="highlight-box">
                  <MdLocationOn className="highlight-svg" />
                  <span className="highlight-span">Ganesh Property</span>
                  <p className="highlight-para">Mundeshwari</p>
                </div>
                <div className="highlight-box">
                  <FaCar className="highlight-svg" />
                  <span className="highlight-span">Parking</span>
                  <p className="highlight-para">Car</p>
                </div>
                <div className="highlight-box">
                  <FaCar className="highlight-svg" />
                  <span className="highlight-span">Parking</span>
                  <p className="highlight-para">Car</p>
                </div>
                <div className="highlight-box">
                  <MdBalcony className="highlight-svg" />
                  <span className="highlight-span">2 Balcony</span>
                  <p className="highlight-para">Balcony</p>
                </div>
              </div>
            </div>

       
        </div>
  );
};

export default PropertyHighlights;
