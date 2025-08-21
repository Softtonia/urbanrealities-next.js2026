"'use client';";

import "../SearchPropertySection/SearchPropertySection.css";
// import PropertySearch from './../PropertySearch/PropertySearch';
import Searchbar from "./../PropertySearch/Searchbar";
const SearchPropertySection = () => {
  return (
    <>
<div className="search-property-section text-center">
  <div className="container">
    <h2 className="search-heading">
      <span style={{ marginRight: "20px" }}>Find</span>
      <span style={{ marginRight: "20px" }}>Buy,</span>
      <span style={{ marginRight: "20px" }}>Rent,</span>
      <span style={{ marginRight: "20px" }}>Sell</span>
      <span>Property in India</span>
    </h2>

    <div className="span-tag">
      <span className="sell-rent"></span>
    </div>

    <Searchbar />
  </div>
</div>

    </>
  );
};

export default SearchPropertySection;
