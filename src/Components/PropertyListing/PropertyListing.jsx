"use client";

import React, { useEffect, useState } from "react";
import "./PropertyListing.css";
import { useRouter } from "next/navigation";
import SubHero from "./../SubHero/SubHero";
import { slugify } from "@/utils/slugify";
// import axios from "axios";
// import {get} from "@/lib/api";
// const properties = Array.from({ length: 8 }, (_, index) => ({
//   id: index,
//   titleSegments: ['3BHK', 'Builder', 'Floor', '1700sqft.'],
//   location: 'Ernakulam, Kerala',
//   builder: 'Ganesh Property',
//   status: 'Ready To Move',
//   carpetArea: '1720 sqft',
//   imageUrl: '/propertylistingimage.png',
// }));

export const PropertyCard = ({ property, handleViewProjectlist }) => {

console.log("property", property)
  const handleNavigate = async () => {
   const slug = await slugify(`${bedroom} ${areasqft} ${property.propertyType[0]?.property_type_name}-for-${property?.purpose_id_name}-in-${property?.state.name}`)
    handleViewProjectlist(`${slug}?id=${property?.id}`);
  }

  const bedroom = property.custom_field_values?.find(
    (field) => field.field_label === "Bedrooms"
  )?.field_value;
  const areasqft = property.custom_field_values?.find(
    (field) => field.field_label === "Area Sq Ft"
  )?.field_value;
  const furnishStatus = property.custom_field_values?.find(
    (field) => field.field_label === "Furnishing Status"
  )?.field_value;
  return (
    <div className="property-card">
      <img
        src={
          property.featured_image ||
          "https://api.urbanrealities.com/public/uploads/properties/1754920384_pexels-binyaminmellish-106399.jpg"
        }
        alt="Property"
        className="property-image"
      />

      <div className="property-content">
        <div className="property-title body-text-14 bord-bottom ">

          <span >
            {bedroom && <>
              <span >
                {bedroom}
              </span>
              <span className="pipe-divider"> | </span>
            </>
            }
            {property.property_type_id_name && <>
              <span >
                {property &&
                  property.property_type_id_name
                }
              </span>
              <span className="pipe-divider"> | </span>
            </>
            }{areasqft &&
              <span >
                {areasqft}sq.ft
              </span>
            }

          </span>

        </div>
        {property.state.name &&
          <div className="property-details body-text-14 bord-bottom">
            <div className="">
              {` ${property.state.name}`}
            </div>

          </div>}


        <div className="property-details body-text-14 bord-bottom">
          {property.property_status_id_name &&
            <span className="property-status-1">
              {property.property_status_id_name}
            </span>}
          {furnishStatus &&
            <span className="property-carpet-area">
              {furnishStatus}
            </span>}
        </div>
      </div>

      <div
        className="btn-property-detail btn-more-details"
        onClick={handleNavigate}
      >
        More Details
      </div>
    </div>
  )
};


const PropertyListing = ({ propertyList }) => {
  // const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleViewProjectlist = (slug) => {
    router.push(`/propertydetails/${slug}`);
  };
  // console.log("env",process.env.LARAVEL_API_BASE_URL)

  // useEffect(() => {
  //   const fetchPropertyList = async () => {
  //     try {
  //       const response = await fetch("/api/get-all-properties"); // This hits Next.js API route
  //       const data = await response.json();

  //       if (!response.ok) throw new Error(data.error || "Failed to fetch");

  //       setPropertyList(data.data); // Assuming Laravel returns { data: [...] }
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPropertyList();
  // }, []);

  console.log("property", propertyList)

  return (
    <div className="container">
      <div className="property-container">
        <SubHero
          subHeroHeading={"PROPERTY LISTINGSS"}
          subHeroText={"PROPERTIES FOR RENT"}
        />

        <div className="property-listing-scroll">
          <div className="property-listing">
            {propertyList.length > 0 ? (
              propertyList && propertyList.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  handleViewProjectlist={handleViewProjectlist}
                />
              ))
            ) : (
              <p>No properties available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
