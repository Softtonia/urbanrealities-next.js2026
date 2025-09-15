'use client';

import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../LocationDropdown/LocationDropdown.css";
import { useCity } from "@/utils/CityContext";

const LocationDropdown = () => {
  const { setCity } = useCity();

  const [activeCity, setActiveCity] = useState(null); // ✅ initially null
  const [cities, setCities] = useState({
    filter_city: null,
    nearby: [],
    popular: [],
    other: []
  });
  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity.length>0 ||savedCity) {
      const parsed = JSON.parse(savedCity);
      setActiveCity(parsed.id);
      setCity(parsed);
    }
  }, []);
  

  // Fetch cities with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchCities = async () => {
        try {
          const res = await fetch(
            `/api/navbar-location?country_id=1${activeCity ? `&city_id=${activeCity}` : ""}`
          );
          const data = await res.json();
          if (data?.cities) {
            setCities(data.cities);

            // ✅ If no activeCity yet, try restoring from localStorage
            if (!activeCity) {
              const savedCity = localStorage.getItem("selectedCity");
              if (savedCity) {
                const parsed = JSON.parse(savedCity);
                setActiveCity(parsed.id);
                setCity([parsed]);
              }
            }
          }
        } catch (err) {
          console.error("Error fetching cities:", err);
        }
      };
      fetchCities();
    }, 400);

    return () => clearTimeout(handler);
  }, [activeCity]);

  const handleSuggestionClick = (city) => {
    setCity([city]); // update in context
    setActiveCity(city.id); // set selected city id
    localStorage.setItem("selectedCity", JSON.stringify(city)); // ✅ store full city object
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
      {cities?.filter_city?.country_name && (
        <div className="text-dark d-flex align-items-center mb-3">
          <FaMapMarkerAlt className="m-0 mt-1 p-0" />
          <h6 className="text-state ms-2 p-0">
            {cities?.filter_city?.country_name || "India"}
          </h6>
        </div>
      )}

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
