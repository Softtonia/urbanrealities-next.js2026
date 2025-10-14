
import React from "react";
import "./PropertyAllDetails.css";
import PropertydetailsBreadcrum from "./PropertydetailsBreadcrum";
import PropertygalleryBreadcrum from "./PropertygalleryBreadcrum";
import PropertyHighlights from "./PropertyHighlights";
import Projectactive from "./Projectactive";
import Projectagent from "./Propertyagent";
import PropertyDescription from "./PropertyDescription";
import PropertyEnquiryFrom from "./PropertyEnquiryFrom";
import Propertyareadata from "./Propertyareadata";
import Propertyprice from "./Propertyprice";
import PropertyAmenities from "./PropertyAmenities";




const PropertyDetails = ({property,leadTypes,userDetail}) => {
  console.log("property details",userDetail)

  return (
    <div>
      <PropertydetailsBreadcrum property={property}/>
      <PropertygalleryBreadcrum property={property} />
      <div className="project-highlight-background">
        <div className="container">
          <div className="row background-row">
            <div className="col-8 large-col">
              <PropertyHighlights  property={property} />
              <PropertyDescription property={property}/>
              <Propertyareadata property={property}/>
              <Propertyprice property={property}/>
              <PropertyAmenities />
            </div>
            <div className="col-4 small-col">
              <Projectactive />
              <Projectagent property={property} userDetail={userDetail} />
              <PropertyEnquiryFrom  property={property} leadTypes={leadTypes}/>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
