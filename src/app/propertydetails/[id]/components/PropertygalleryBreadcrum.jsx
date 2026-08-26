"use client";
import React, { useEffect, useState } from "react";
import "./PropertygalleryBreadcrum.css";
import SharePropertyPopup from "./SharePropertyPopup";
import { usePathname } from "next/navigation";
import { formatprice } from "@/utils/formatprice";

const propertyData = {
  title: "3BHK, Mundeshwari",
  price: "₹ 3 Crore",
  label: "For Rent",
  details: "Builder Floor 1700sqft.",
  state: " Ernakulam, Kerala",
};

const PropertygalleryBreadcrum = ({ property }) => {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = async () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [popupLink, setPopupLink] = useState("");
  const pathname = usePathname(); // gives /propertydetails/1

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}${pathname}`;
      setPopupLink(fullUrl);
    }
  }, [pathname]);
  console.log(property)
  const repeaterFields = property?.repeater_fields
    ? Object.values(property.repeater_fields)
    : [];
  const hero = Array.isArray(repeaterFields)
    ? repeaterFields?.filter(
      (val) =>
        (val?.template?.slug?.startsWith("herosection") ||
          val?.template?.slug?.startsWith("overview")) &&
        (val?.template?.slug?.includes("price") ||
          val?.template?.slug?.includes("gallery") ||
          val?.template?.slug?.includes("built-up-area") ||
          val?.template?.slug?.includes("bedroom"))
    )
    : [];


  const price = hero.find(val =>
    val?.template?.slug?.includes("price")
  )?.field_value;

  const editgallery = hero.find(val =>
    val?.template?.slug?.includes("gallery")
  )?.field_value;

  const sqft = hero.find(val =>
    val?.template?.slug?.includes("built-up-area")
  )?.field_value;

  const bhk = hero.find(val =>
    val?.template?.slug?.includes("bedroom")
  )?.field_value;

  const propertyTypes = property?.propertyType?.map(value => value.property_type_name).join(", ");
  const purpose = property?.purpose_id_name;
  
  const dynamicTitleParts = [];
  if (bhk) dynamicTitleParts.push(`${bhk} BHK`);
  if (sqft) dynamicTitleParts.push(`${sqft} sqft`);
  if (propertyTypes) dynamicTitleParts.push(propertyTypes);
  if (purpose) dynamicTitleParts.push(`For ${purpose}`);
  if (property?.city?.name || property?.state?.name) {
    const location = [property?.city?.name, property?.state?.name].filter(Boolean).join(", ");
    dynamicTitleParts.push(`in ${location}`);
  }
  
  const dynamicTitle = dynamicTitleParts.join(" ");

  console.log("heroo", property?.repeater_fields)




  // store it in a variable
  // const price = priceField ? priceField.field_value : null;
  // console.log(gallery)
  // const editgallery = gallery
  console.log("==>", hero)

  return (
    <div className="property-wrapper">
      <div className="container">
        <div className="sub-header  d-flex justify-content-between align-items-center ">
          <div className="data-header m-0">
            {price && (
              <div className="header-info d-flex mb-2">
                <h4 className="body-text-20 m-0">{'Price'}</h4>
                <span className="price body-text-20">₹{formatprice(price)} Onwards</span>
              </div>)}

            <div className="label-desc d-flex flex-direction-column mt-2">
              <span className="rent-label body-text-14 mb-2" style={{ width: 'fit-content' }}>
                For {property?.purpose_id_name || "Sale"}
              </span>
              <h1 className="body-text-24 fw-bold m-0" style={{ fontSize: '24px', color: '#111827' }}>
                {dynamicTitle || property?.property_name || "Untitled Listing"}
              </h1>
            </div>
          </div>

          <div className="gallery-icon m-0 ">

            {/* <img src="/View.svg" alt="" /> */}

            <img src="/Heart.svg" alt="" />
            <button
              onClick={handleShowModal}
              aria-label="Share property"
              style={{
                background: "none",
                border: "none",
                outline: "none",
                boxShadow: "none",
                cursor: "pointer",
              }}
            >
              <img src="/Share.svg" alt="Share" />
            </button>
            <img src="/Print.svg" alt="" />
          </div>
        </div>
      </div>

      <div className="gallery">
        <div className="container">
          <div className="gallery-content">
            <div className="main-image">
              <img
                src={property?.featured_image && property?.featured_image }
                alt="Main"
                width={832}
                height={493}
                className="featured-img"
                onError={(e) => {
                  e.currentTarget.src = "/property-placeholders.jpg";
                }}
              />
            </div>

            <div className="side-images">
              {/* Main Side Image */}
              <img
                src={editgallery?.[0] || "/kitchen.png"}
                alt="Main"
                width={584}
                height={246}
                className="project-img"
                onError={(e) => {
                  e.currentTarget.src = "/property-placeholders.jpg";
                }}
              />

              {/* Sub Images */}
              {editgallery?.length > 1 && (
                <div className="overlay-view d-flex">
                  {/* Second Image */}
                  {editgallery?.[1] && (
                    <div className="side-sub-image">
                      <img
                        src={editgallery[1]}
                        alt="Sub Image"
                        width={274}
                        height={227}
                        className="project-thumb-img"
                        onError={(e) => {
                          e.currentTarget.src = "/property-placeholders.jpg";
                        }}
                      />
                    </div>
                  )}

                  {/* Third Image */}
                  {editgallery?.[2] && (
                    <div className="view-more">
                      <img
                        src={editgallery[2]}
                        alt="Sub Image"
                        width={274}
                        height={227}
                        className="project-thumb-img"
                        onError={(e) => {
                          e.currentTarget.src = "/property-placeholders.jpg";
                        }}
                      />
                      {/* <span className="overlay-text">View All {editgallery.length} Photos</span> */}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <SharePropertyPopup
        show={showModal}
        handleClose={handleCloseModal}
        popupLink={popupLink} />
    </div>
  );
};

export default PropertygalleryBreadcrum;
