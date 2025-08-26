"use client";

import React from "react";
import "./PropertyHighlights.css";
import { FaBed, FaBath } from "react-icons/fa";
import { MdBatteryFull, MdLocationOn, MdBalcony } from "react-icons/md";

// icon map for each template field
const iconMap = {
  Bedrooms: <FaBed className="highlight-svg" />,
  Bathrooms: <FaBath className="highlight-svg" />,
  Balconies: <MdBalcony className="highlight-svg" />,
  "Furnishing Status": <MdBatteryFull className="highlight-svg" />,
};

const PropertyHighlights = ({ property }) => {
  // list of all templates you want to show
  const templates = ["Bedrooms", "Bathrooms", "Balconies", "Furnishing Status"];

  // ✅ Pre-filter and transform the fields before rendering
  const highlights = templates
    .map((templateLabel) => {
      // normalize template name
      const templateName = templateLabel.replace(/\s+/g, ".");

      const field = property.repeater_fields.find(
        (f) => f.template.name === templateName
      );

      if (!field) return null;

      return {
        label: templateLabel,
        value: Array.isArray(field.field_value)
          ? field.field_value.join(", ")
          : field.field_value,
        fieldLabel: field.field_label,
        icon: iconMap[templateLabel] || (
          <MdLocationOn className="highlight-svg" />
        ),
      };
    })
    .filter(Boolean); // remove nulls

    if (!highlights.length) return null;

  return (
    <div className="highlite-container">
      <div className="property-highlights-container">
        <div className="highlights-grid">
          {highlights.map((item, idx) => (
            <div key={idx} className="highlight-box">
              {item.icon}
              <span className="highlight-span">{item.value}</span>
              <p className="highlight-para">{item.fieldLabel}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default PropertyHighlights;
