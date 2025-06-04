import React from "react";
import "./PropertyDetails.css";
import PropertydetailsBreadcrum from "../Breadcrum/PropertydetailsBreadcrum";
import PropertygalleryBreadcrum from "../Breadcrum/PropertygalleryBreadcrum";
import PropertyHighlights from "../Breadcrum/PropertyHighlights";
import Projectactive from "../Breadcrum/Projectactive";
import Projectagent from "../Breadcrum/Propertyagent";
import ProjectDescription from "../Breadcrum/PropertyDescription";

const PropertyDetails = () => {

  
  return (
    <div>
      <PropertydetailsBreadcrum />
      <PropertygalleryBreadcrum />


<div className="project-highlight-background">
      <div className="container">
        <div className="row background-row">
          <div className="col-9 large-col">
            <PropertyHighlights/>
            <ProjectDescription/>
          </div>
          <div className="col-3 small-col">
            <Projectactive/>
            <Projectagent/>
          </div>

        </div>
      </div>
    </div>
    </div>
  );
};

export default PropertyDetails;
