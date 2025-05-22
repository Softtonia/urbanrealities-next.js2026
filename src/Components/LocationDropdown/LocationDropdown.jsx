import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import "../LocationDropdown/LocationDropdown.css"
const cities = {
  nearbyCities: ["New Delhi", "Gurgaon", "Greater Noida", "Ghaziabad"],
  popularCities: [
    "Ahmedabad", "Bangalore", "Beyond Thane", "Chennai", "Gurgaon", "Hyderabad",
    "Indore", "Jaipur", "Kolkata", "Lucknow", "Mumbai", "Navi Mumbai", "New Delhi",
    "Noida", "Pune", "Thane"
  ],
  otherCities: [
    "Agra", "Ahmadnagar", "Allahabad", "Aluva", "Amritsar", "Aurangabad", "Badlapur", "Bareilly",
    "Belgaum", "Bhiwadi", "Bhiwandi", "Bhopal", "Bhubaneswar", "Bokaro Steel City", "Chandigarh", "Chengalpattu",
    "Coimbatore", "Dehradun", "Durgapur", "Ernakulam", "Erode", "Faridabad", "Ghaziabad", "Goa", "Gorakhpur",
    "Greater Noida", "Guntur", "Guwahati", "Gwalior", "Haridwar", "Hosur", "Hubli", "Jabalpur", "Jalandhar",
    "Jammu", "Jamshedpur", "Jodhpur", "Kalyan", "Kannur", "Kanpur", "Khopoli", "Kochi", "Kodaikanal",
    "Kottayam", "Kozhikode", "Lonavala", "Ludhiana", "Madurai", "Mangalore", "Mohali", "Mysore", "Nagpur",
    "Nainital", "Nanded", "Nashik", "Navsari", "Nellore", "Newtown", "Ooty", "Palakkad", "Palghar"
  ]
};

const renderCityGrid = (citiesArray) => {
  const columnsPerRow = 5;
  const rows = [];

  for (let i = 0; i < citiesArray.length; i += columnsPerRow) {
    const rowItems = citiesArray.slice(i, i + columnsPerRow);
    rows.push(
      <div className="row mb-1" key={i}>
        {rowItems.map((city, index) => (
          <div className="col" key={index}>
            <div className="city-text">{city}</div>
          </div>
        ))}
      </div>
    );
  }

  return rows;
};

const LocationDropdown = () => {
  return (
    <div
      className="position-absolute bg-white shadow rounded border p-4"
      style={{ width: '900px', height: '90vh', top: '100%', left: 0, zIndex: 1000, overflowY: 'auto' }}
    >
      <h6 className="  text-black mb-3 d-flex  align-items-center gap-2">
  <FaMapMarkerAlt className="orange-red" />
  INDIA
</h6>


      <div className="mb-3">
        <div className="city-name mb-2">Nearby Cities</div>
        {renderCityGrid(cities.nearbyCities)}
      </div>

      <div className="mb-3">
        <div className="city-name mb-2">Popular Cities</div>
        {renderCityGrid(cities.popularCities)}
      </div>

      <div>
        <div className="city-name mb-2">Other Cities</div>
        {renderCityGrid(cities.otherCities)}
      </div>
    </div>
  );
};

export default LocationDropdown;
