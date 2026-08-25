"use client";
import React from "react";
import Link from "next/link";
import "./PropertydetailsBreadcrum.css";
import { FaChevronRight } from "react-icons/fa";

const PropertydetailsBreadcrum = ({property}) => {
  console.log(property);
  const repeaterFields = property?.repeater_fields ? Object.values(property.repeater_fields) : [];
  const bhk = repeaterFields?.find(val => val?.template?.slug?.includes("bedroom"))?.field_value;
  const sqft = repeaterFields?.find(val => val?.template?.slug?.includes("built-up-area"))?.field_value;
  const propertyTypes = property?.propertyType?.map(value => value.property_type_name).join(", ");
  const purpose = property?.purpose_id_name;
  
  const dynamicTitleParts = [];
  if (bhk) dynamicTitleParts.push(`${bhk} BHK`);
  if (sqft) dynamicTitleParts.push(`${sqft} sqft`);
  if (propertyTypes) dynamicTitleParts.push(propertyTypes);
  if (purpose) dynamicTitleParts.push(`for ${purpose}`);
  
  const dynamicTitle = dynamicTitleParts.length > 0 ? dynamicTitleParts.join(" ") : property?.property_name;

      return (
          <>
              <div className="breadcrumb-container">
                  <div className="container">
                      <div className="details-breadcrum body-text-rg16">
                          <div className="left-breadcrumb m-0">
                              <Link className="" href="/">Home</Link>
                              <FaChevronRight />
                              {/* <Link className="ms-3" href="/newly-listed ">Newly Listed Properties</Link> */}
                              {/* <FaChevronRight /> */}
                              <span className="body-text-rg16 ms-3">{dynamicTitle} </span>
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
