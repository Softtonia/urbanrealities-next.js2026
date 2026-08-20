"use client";

import React, { useEffect, useState } from "react";
import "./PropertyListing.css";
import { useRouter } from "next/navigation";
import SubHero from "./../SubHero/SubHero";
import { slugify } from "@/utils/slugify";
import { formatprice } from "@/utils/formatprice";
import { useCity } from "@/utils/CityContext";
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
  console.log("property", property);
  const handleNavigate = async () => {
    const propertyTypeName =
      property?.propertyType?.[0]?.property_type_name ||
      property?.property_type_name ||
      "";
    const stateName = property?.state?.name || property?.state_name || "";
    const slug = await slugify(
      `${bedroom && bedroom} ${area && area} ${propertyTypeName}-for-${property?.purpose_id_name}-in-${stateName}`,
    );
    handleViewProjectlist(`${slug}?id=${property?.id}`);
  };

  const hero = Array.isArray(property?.custom_field_values)
    ? property.custom_field_values.filter(
        (val) =>
          (val?.template?.slug?.startsWith("herosection") ||
            val?.template?.slug?.startsWith("overview")) &&
          (val?.template?.slug?.includes("bedroom") ||
            val?.template?.slug?.includes("furnished") ||
            val?.template?.slug?.includes("built-up-area") ||
            val?.template?.slug?.includes("price")),
      )
    : [];

  console.log("herroo", hero);
  const bedroom = hero.find((val) =>
    val?.template?.slug.includes("bedroom"),
  )?.field_value;

  const furnished = hero.find((val) =>
    val?.template?.slug.includes("furnished"),
  )?.field_value;

  const area = hero.find((val) =>
    val?.template?.slug.includes("built-up-area"),
  )?.field_value;

  const price = hero.find((val) =>
    val?.template?.slug.includes("price"),
  )?.field_value;

  // const area = property.custom_field_values?.find(
  //   (field) => field.field_label === "Bedrooms"
  // )?.field_value;
  // const areasqft = property.custom_field_values?.find(
  //   (field) => field.field_label === "Area Sq Ft"
  // )?.field_value;
  // const furnishStatus = property.custom_field_values?.find(
  //   (field) => field.field_label === "Furnishing Status"
  // )?.field_value;
  const title = property?.title || property?.name || "Premium Property";
  const propertyTypeName =
    property?.propertyType?.[0]?.property_type_name ||
    property?.property_type_name ||
    "Property";
  const cityStr = property?.city?.name || property?.city_name || "";
  const stateStr = property?.state?.name || property?.state_name || "";
  const locationText = [cityStr, stateStr].filter(Boolean).join(", ");

  return (
    <div className="property-card" onClick={handleNavigate} style={{cursor: 'pointer'}}>
      <div className="property-image-container" style={{position: 'relative'}}>
        <img
          src={property?.featured_image}
          alt={title}
          className="property-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/property-placeholders.jpg";
          }}
        />
        {property?.purpose_id_name && (
          <span className="property-badge" style={{position: 'absolute', top: '10px', left: '10px', backgroundColor: 'var(--Orange-Red, #ff6b35)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase'}}>
            For {property.purpose_id_name}
          </span>
        )}
      </div>

      <div className="property-content">
        <h3 className="property-main-title" style={{fontSize: '18px', fontWeight: '600', margin: '12px 10px 4px', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
          {title}
        </h3>
        
        {locationText && (
          <div className="property-location-new" style={{fontSize: '13px', color: '#666', margin: '0 10px 12px', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            {locationText}
          </div>
        )}

        <div className="property-features" style={{display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '0 10px 12px', borderBottom: '1px solid #eee'}}>
          {bedroom && (
            <div className="feature-item" style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#555', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"></path><path d="M2 8h18a2 2 0 0 1 2 2v10"></path><path d="M2 17h20"></path><path d="M6 8v9"></path></svg>
              <span>{bedroom} BHK</span>
            </div>
          )}
          {area && (
            <div className="feature-item" style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#555', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
              <span>{area}</span>
            </div>
          )}
          {propertyTypeName && (
             <div className="feature-item" style={{display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#555', backgroundColor: '#f5f5f5', padding: '4px 8px', borderRadius: '4px'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect><path d="M9 22v-4h6v4"></path><path d="M8 6h.01"></path><path d="M16 6h.01"></path><path d="M12 6h.01"></path><path d="M12 10h.01"></path><path d="M12 14h.01"></path><path d="M16 10h.01"></path><path d="M16 14h.01"></path><path d="M8 10h.01"></path><path d="M8 14h.01"></path></svg>
              <span>{propertyTypeName}</span>
            </div>
          )}
        </div>

        <div className="property-footer" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', marginTop: 'auto'}}>
          <div className="property-price" style={{fontSize: '18px', fontWeight: 'bold', color: 'var(--Orange-Red, #ff6b35)'}}>
            {price ? `₹${formatprice(price)}` : "Price on Request"}
          </div>
          <div
            className="btn-property-detail btn-more-details"
            style={{margin: '0', padding: '6px 12px', fontSize: '13px'}}
            onClick={(e) => { e.stopPropagation(); handleNavigate(); }}
          >
            More Details
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyListing = ({ propertyList }) => {
  const { city } = useCity();
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

  console.log("property", propertyList);

  return (
    <div className="container">
      <div className="property-container">
        <SubHero
          subHeroHeading={`Owner property in ${city?.name || 'India'}`}
          subHeroText={""}
        />

        <div className="property-listing-scroll">
          <div className="property-listing">
            {propertyList.length > 0 ? (
              propertyList &&
              propertyList.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  handleViewProjectlist={handleViewProjectlist}
                />
              ))
            ) : (
              <div className="empty-state-wrapper">
                <div className="empty-state-content">
                  <div className="empty-state-icon">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ff6b35" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      <circle cx="10" cy="10" r="4" fill="#fff" stroke="#ff6b35" strokeWidth="2"></circle>
                      <line x1="12.5" y1="12.5" x2="16" y2="16" stroke="#ff6b35" strokeWidth="2"></line>
                    </svg>
                  </div>
                  <h3>No Properties Found</h3>
                  <p>We couldn't find any property listings in this location at the moment.</p>
                  <a href="/property-listing" className="empty-state-btn">Explore All Properties</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
