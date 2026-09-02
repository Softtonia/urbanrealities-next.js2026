"use client";
import React from "react";
import Link from "next/link";
import "./PropertydetailsBreadcrum.css";
import { FaChevronRight } from "react-icons/fa";
import AreaUnitDropdown from "@/Components/AreaUnitDropdown/AreaUnitDropdown";

const PropertydetailsBreadcrum = ({property}) => {
  console.log(property);
  const repeaterFields = property?.repeater_fields ? Object.values(property.repeater_fields) : [];
  const bhk = repeaterFields?.find(val => val?.template?.slug?.includes("bedroom"))?.field_value;
  const sqft = repeaterFields?.find(val => val?.template?.slug?.includes("built-up-area"))?.field_value;
  const propertyTypes = property?.propertyType?.map(value => value.property_type_name).join(", ");
  const purpose = property?.purpose_id_name;
  
  const renderDynamicTitle = () => {
    const parts = [];
    if (bhk) parts.push(<React.Fragment key="bhk">{bhk} BHK</React.Fragment>);
    if (sqft) parts.push(<div key="sqft" style={{ display: 'inline-block' }}><AreaUnitDropdown baseSqft={sqft} /></div>);
    if (propertyTypes) parts.push(<React.Fragment key="type">{propertyTypes}</React.Fragment>);
    if (purpose) parts.push(<React.Fragment key="purpose">for {purpose}</React.Fragment>);
    
    if (parts.length === 0) return property?.property_name;

    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && " "}
      </React.Fragment>
    ));
  };

      return (
          <>
              <div className="breadcrumb-container">
                  <div className="container">
                      <div className="details-breadcrum body-text-rg16">
                          <div className="left-breadcrumb m-0" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                              <Link className="" href="/">Home</Link>
                              <FaChevronRight />
                              {/* <Link className="ms-3" href="/newly-listed ">Newly Listed Properties</Link> */}
                              {/* <FaChevronRight /> */}
                              <span className="body-text-rg16 ms-3 d-flex align-items-center gap-1" style={{ whiteSpace: 'nowrap' }}>{renderDynamicTitle()}</span>
                              {property?.city?.name && property?.state?.name &&
                                  <span className="body-text-rg16">in {property.city.name} ,{property.state.name}</span>
                              }
                          </div>
                          <div className="right-info  m-0">
                              <span className="body-text-rg16 me-1">Posted on : {property?.posted_on}</span>
                              <FaChevronRight />
                              <span className="body-text-rg16 ms-3">Property ID : {property?.property_unique_id}</span>
                          </div>
                      </div>
                  </div>
              </div>
          </>
  
      );

};

export default PropertydetailsBreadcrum;
