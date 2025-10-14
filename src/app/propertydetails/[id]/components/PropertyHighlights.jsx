"use client";

import React from "react";
import "./PropertyHighlights.css";
import { FaBed, FaBath } from "react-icons/fa";
import { PiElevatorFill } from 'react-icons/pi';
import { RiParkingBoxLine } from 'react-icons/ri';
import { BiRuler } from 'react-icons/bi';
import { MdBatteryFull, MdLocationOn, MdBalcony } from "react-icons/md";

// icon map for each template field
const iconMap = {
  bedroom: <FaBed className="highlight-svg" />,
  bathroom: <FaBath className="highlight-svg" />,
  balconie: <MdBalcony className="highlight-svg" />,
  lift: <PiElevatorFill className="highlight-svg" />,
  "built-up": <BiRuler className="highlight-svg" />,
  "furnished": <MdBatteryFull className="highlight-svg" />,
  "parking": <RiParkingBoxLine className="highlight-svg" />,
};

const PropertyHighlights = ({ property }) => {
  // list of all templates you want to show
  const templates = ["bedroom", "bathrooms", "balconies", "furnished","lift","built-up","parking"];

  const overview = Array.isArray(property?.repeater_fields)
    ? property.repeater_fields.filter(
      (val) =>
        (val?.template?.slug?.startsWith("overview")) )
    : [];


  // const price = hero.find(val =>
  //   val?.template?.slug.includes("price")
  // )?.field_value;

  console.log("overview", overview);


  // ✅ Pre-filter and transform the fields before rendering
  const highlights = templates
    .map((templateLabel) => {
      // normalize template name
      const templateName = templateLabel.replace(/\s+/g, ".");

      const field = Array.isArray(overview) ? overview?.find(
        (f) => f?.template?.slug?.includes(templateName)
      ) : [];

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
