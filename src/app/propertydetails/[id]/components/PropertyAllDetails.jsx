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

const PropertyDetails = ({ property, leadTypes, userDetail }) => {
  console.log(" details", userDetail);
  const originalData = property?.original_data || {};
  
  // Extract has_template from the root of original_data
  const hasTemplate =
    originalData?.has_template === 1 ||
    originalData?.has_template === "1" ||
    originalData?.has_template === true;

  // Extract template data from the root of original_data
  const templateData = property?.template || originalData?.template || property?.original_data?.post?.template;
  const templateHtml = templateData?.rendered?.html_with_styles || templateData?.rendered?.html;

  return (
    <div>
     
      <PropertydetailsBreadcrum property={property} />
      <PropertygalleryBreadcrum property={property} />

      {hasTemplate && templateHtml ? (
        <div dangerouslySetInnerHTML={{ __html: templateHtml }} />
      ) : (
        <div className="project-highlight-background">
          <div className="container">
            <div className="row background-row">
              <div className="col-8 large-col">
                <PropertyHighlights property={property} />
                <PropertyDescription property={property} />
                <Propertyareadata property={property} />
                <Propertyprice property={property} />
                <PropertyAmenities property={property} />
              </div>
              <div className="col-4 small-col">
                <Projectactive />
                {userDetail?.user && (
                  <Projectagent
                    property={property}
                    userDetail={userDetail?.user}
                  />
                )}
                <PropertyEnquiryFrom
                  property={property}
                  leadTypes={leadTypes}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
