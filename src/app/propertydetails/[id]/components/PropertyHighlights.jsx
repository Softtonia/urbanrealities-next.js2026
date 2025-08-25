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

// icon map for each template field
const iconMap = {
  Bedrooms: <FaBed className="highlight-svg" />,
  Bathrooms: <FaBath className="highlight-svg" />,
  Balconies: <MdBalcony className="highlight-svg" />,
  "Furnishing Status": <MdBatteryFull className="highlight-svg" />,
};

const PropertyHighlights = ({ property }) => {
  // list of all templates you shared
  const templates = [
    "Bedrooms",
    "Bathrooms",
    "Balconies",
    "Furnishing status",
  ];

  return (
    <div className="highlite-container">
      <div className="property-highlights-container">
        <div className="highlights-grid">
          {templates.map((templateLabel, idx) => {
            const templateName = templateLabel.replace(/\s+/g, '.');

            const field = property.repeater_fields.find(
              (f) => f.template.name === templateName
            );

            if (!field) return null;

            return (
              <div key={idx} className="highlight-box">
                {iconMap[templateName] || <MdLocationOn className="highlight-svg" />}
                <span className="highlight-span">
                  {Array.isArray(field.field_value)
                    ? field.field_value.join(", ")
                    : field.field_value}
                </span>
                <p className="highlight-para">{templateLabel}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PropertyHighlights;
