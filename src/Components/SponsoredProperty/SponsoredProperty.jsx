'use client';
import React from 'react';
import './SponsoredProperty.css';

const SponsoredProperty = ({ developer }) => {
  console.log("Developer list:", developer);


  return (
    <div className="container">
      <div className="sponsored-property-row-container">
        {developer && developer.length > 0 ? (
          developer.map((val, index) => (
            <div key={index} className="sponsored-property-card">
              <div className="sponsored-property-image-container">
                <img
                  src={val.image || "/sponsored-property-image.png"}
                  alt={val.title || "Sponsored Property"}
                  className="sponsored-property-image"
                />
                <div className="sponser-tag">Sponsored</div>
              </div>
              <div className="sponsored-property-content">
                <div className="sponsored-property-content-inner">
                  <div className="sponsored-property-title body-text-16 text-dark">
                  <a
                      href={`/developer-detail?name=${val.name}&property-name=${val.property_id_name}&id=${val.id}`}
                      // className="explore-btn"
                      style={{color:'black',textDecoration:"none"}}
                    >
                      {val.name}
                    </a>
                  </div>
                  <div className="sponsored-property-info-row">
                    <div className="sponsored-property-description text-gray body-text-14">
                      {
                        val?.custom_field_values?.find(
                          (temp) => temp?.template?.name === "developer.bedrooms"
                      )?.field_value?.join(", ") 
                      } {
                        val?.custom_field_values?.find(
                          (temp) => temp?.template?.name === "developer.area-sqft"
                        )?.field_value
                      } sqft.
                    </div>
                    <div className="sponsored-property-location text-gray body-text-14">
                      {val.city_name + ',' + val.state_name}
                    </div>
                    <div className="sponsored-property-price body-text-14">
                      ₹{
                        val?.custom_field_values?.find(
                          (temp) => temp?.template?.name === "developer.price"
                        )?.field_value
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No sponsored properties available</p>
        )}
      </div>
    </div>
  );
};

export default SponsoredProperty;
