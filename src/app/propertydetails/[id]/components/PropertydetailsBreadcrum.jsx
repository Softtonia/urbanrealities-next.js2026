"use client";
import React from "react";
import Link from "next/link";
import "./PropertydetailsBreadcrum.css";
import { FaChevronRight } from "react-icons/fa";

const PropertydetailsBreadcrum = ({property}) => {
  console.log(property);
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
                              <span className="body-text-rg16 ms-3">{property?.property_name} </span>
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
