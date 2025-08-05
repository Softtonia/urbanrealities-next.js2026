'use client';

import React from "react";
import "./PropertyAllDetails.css";
import PropertydetailsBreadcrum from "./PropertydetailsBreadcrum";
import PropertygalleryBreadcrum from "./PropertygalleryBreadcrum";
import PropertyHighlights from "./PropertyHighlights";
import Projectactive from "./Projectactive";
import Projectagent from "./Propertyagent";
import ProjectDescription from "./PropertyDescription";
import PropertyEnquiryFrom from "./PropertyEnquiryFrom";
import Propertyareadata from "./Propertyareadata";
import Propertyprice from "./Propertyprice";
import PropertyAmenities from "./PropertyAmenities";




const PropertyDetails = () => {

  
  return (
    <div>
      <PropertydetailsBreadcrum />
      <PropertygalleryBreadcrum />


<div className="project-highlight-background">
      <div className="container">
        <div className="row background-row">
          <div className="col-8 large-col">
            <PropertyHighlights/>
            <ProjectDescription/>
            <Propertyareadata/>
            <Propertyprice/>
            <PropertyAmenities/>
          </div>
          <div className="col-4 small-col">
            <Projectactive/>
            <Projectagent/>
            <PropertyEnquiryFrom/>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default PropertyDetails;
