'use client';

import React from "react";
import "./PropertyDescription.css";

const PropertyDescription = ({property}) => {
  
  return (
    <div className="description-container">
      <div className="property-description">
        <div className=" h3-description">
          <h3 className="body-text-sb18">Property Description</h3>
        </div>
        <div className="description-para">
          <p className="body-text-rg16">
          <div dangerouslySetInnerHTML={{ __html: property.description }} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDescription;
