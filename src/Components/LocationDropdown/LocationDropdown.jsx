'use client';

import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../LocationDropdown/LocationDropdown.css";
import { useCity } from "@/utils/CityContext";

const LocationDropdown = () => {
  const { setCity } = useCity();
  const [activeCity, setActiveCity] = useState(null);
  const [cities, setCities] = useState({
    filter_city: null,
    nearby: [],
    popular: [],
    other: []
  });

  // Fetch cities with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchCities = async () => {
        try {
          const res = await fetch(`/api/navbar-location?country_id=1&city_id=3`);
          const data = await res.json();
          if (data?.cities) {
            setCities(data.cities);
          }
        } catch (err) {
          console.error("Error fetching cities:", err);
        }
      };
      fetchCities();
    }, 400); // debounce delay

    return () => clearTimeout(handler);
  }, []);

  const handleSuggestionClick = (city) => {
    setCity(city); // Save globally in context
    setActiveCity(city.id); // Highlight by id
  };

  const renderCityGrid = (citiesArray) => {
    if (!citiesArray?.length) return null;
    const columnsPerRow = 5;
    const rows = [];

    for (let i = 0; i < citiesArray.length; i += columnsPerRow) {
      const rowItems = citiesArray.slice(i, i + columnsPerRow);
      rows.push(
        <div className="row" key={i}>
          {rowItems.map((city) => (
            <div className="col" key={city.id}>
              <div
                className={`city-text mb-2 ${activeCity === city.id ? "active" : ""}`}
                onClick={() => handleSuggestionClick(city)}
              >
                {city.name}
              </div>
            </div>
          ))}
        </div>
      );
    }
    return rows;
  };

  return (
    <div
      className="position-absolute bg-white shadow rounded border p-4"
      style={{
        width: "900px",
        height: "90vh",
        top: "100%",
        left: 0,
        zIndex: 1000,
        overflowY: "auto",
      }}
    >
      <div className="text-dark d-flex align-items-center mb-3">
        <FaMapMarkerAlt className="m-0 mt-1 p-0" />
        <h6 className="text-state ms-2 p-0">{cities?.filter_city?.country_name || "India"}</h6>
      </div>

      {cities?.filter_city && (
        <div className="mb-3">
          <div className="city-name mb-2">Selected City</div>
          <div className="city-text active">{cities.filter_city.name}</div>
        </div>
      )}

      <div>
        <div className="city-name mb-2">Nearby Cities</div>
        {renderCityGrid(cities.nearby)}
      </div>

      <div>
        <div className="city-name mb-2 mt-2">Popular Cities</div>
        {renderCityGrid(cities.popular)}
      </div>

      <div>
        <div className="city-name mb-2 mt-2">Other Cities</div>
        {renderCityGrid(cities.other)}
      </div>
    </div>
  );
};

export default LocationDropdown;
