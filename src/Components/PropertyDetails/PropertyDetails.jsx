import React from "react";
import "./PropertyDetails.css";
import PropertydetailsBreadcrum from "../Breadcrum/PropertydetailsBreadcrum";
import PropertygalleryBreadcrum from "../Breadcrum/PropertygalleryBreadcrum";
import PropertyHighlights from "../Breadcrum/PropertyHighlights";
import Projectactive from "../Breadcrum/Projectactive";
import Projectagent from "../Breadcrum/Propertyagent";
import ProjectDescription from "../Breadcrum/PropertyDescription";
import PropertyEnquiryFrom from "../Breadcrum/PropertyEnquiryFrom";
import Propertyareadata from "../Breadcrum/Propertyareadata";
import Propertyprice from "../Breadcrum/Propertyprice";





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
            {/* <Propertyprice/> */}
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
