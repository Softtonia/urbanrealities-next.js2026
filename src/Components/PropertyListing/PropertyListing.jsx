"use client";

import React, { useEffect, useState } from "react";
import "./PropertyListing.css";
import { useRouter } from "next/navigation";
import SubHero from "./../SubHero/SubHero";
import axios from "axios";
// const properties = Array.from({ length: 8 }, (_, index) => ({
//   id: index,
//   titleSegments: ['3BHK', 'Builder', 'Floor', '1700sqft.'],
//   location: 'Ernakulam, Kerala',
//   builder: 'Ganesh Property',
//   status: 'Ready To Move',
//   carpetArea: '1720 sqft',
//   imageUrl: '/propertylistingimage.png',
// }));

const PropertyCard = ({ property, handleViewProjectlist }) => (
  <div className="property-card">
    <img
      src={
        property.featured_image ||
        "https://cdn.pixabay.com/photo/2017/04/24/13/37/architecture-2256489_1280.jpg"
      }
      alt="Property"
      className="property-image"
    />

    <div className="property-content">
      <div className="property-title body-text-14 bord-bottom">
        {property.titleSegments?.map((segment, i) => (
          <span key={i}>
            {segment}
            {i < property.titleSegments.length - 1 && (
              <span className="pipe-divider"> | </span>
            )}
          </span>
        ))}
      </div>

      <div className="property-info-row bord-bottom">
        <div className="property-location">
          {property.location || "Ernakulam, Kerala"}
        </div>
        <div className="property-builder">
          {property.builder || "Ganesh Property"}
        </div>
      </div>

      <div className="property-details body-text-14 bord-bottom">
        <span className="property-status-1">
          {property.status || "Ready To Move"}
        </span>
        <span className="property-carpet-area">
          Carpet Area {property.carpetArea || "1720 sqft"}
        </span>
      </div>
    </div>

    <div
      className="btn-property-detail btn-more-details"
      onClick={handleViewProjectlist}
    >
      More Details
    </div>
  </div>
);

const PropertyListing = () => {
  const [propertyList, setPropertyList] = useState([]);
  const router = useRouter();
  const handleViewProjectlist = () => {
    router.push("/Breadcrum");
  };
  useEffect(() => {
    const fetchpropertlist = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}api/get-all-properties-listing`
        );
        const data = response.data;
        console.log(" Property Data Fetched:", data);
        setPropertyList(data);
      } catch (error) {
        console.error("Error fetching Property Lists:", error);
      }
    };
    fetchpropertlist();
  }, []);
  return (
    <div className="container">
      <div className="property-container">
        <SubHero
          subHeroHeading={"PROPERTY LISTINGSS"}
          subHeroText={"PROPERTIES FOR RENT"}
        />

        <div className="property-listing-scroll">
          <div className="property-listing">
            {propertyList.slice(0, 8).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                handleViewProjectlist={handleViewProjectlist}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
