"use client";
import React, { useEffect, useState } from "react";
import "./PropertygalleryBreadcrum.css";
import SharePropertyPopup from "./SharePropertyPopup";
import { usePathname } from "next/navigation";

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
  console.log(popupLink)

  const priceField = property.repeater_fields.find(
    (field) => field.template.name === "Property.price"
  );

  const sqftField = property.repeater_fields.find(
    (field) => field.template.name === "Area.sq.ft"
  );
  const galleryField = property.repeater_fields.find(
    (field) => field.template.name === "Property.gallery"
  );
  // store it in a variable
  const sqft = sqftField ? sqftField.field_value : null;
  const price = priceField ? priceField.field_value : null;
  const gallery = galleryField ? galleryField.field_value : null;
  const editgallery = gallery.map((url) => url.replace(/^127\.0\.0\.1:8000/, 'https://api.urbanrealities.com'))
  console.log("==>", editgallery)

  return (
    <div className="property-wrapper">
      <div className="container">
        <div className="sub-header  d-flex justify-content-between align-items-center ">
          <div className="data-header m-0">
            {price && (
              <div className="header-info d-flex mb-2">
                <h4 className="body-text-20 m-0">{'Price'}</h4>
                <span className="price body-text-20">₹{price}</span>
              </div>)}

            <div className="label-desc d-flex flex-direction-column">
              <span className="rent-label body-text-14">
                For {property.purpose_id_name}
              </span>
              <span className="description"> {`${sqft}  `}</span>
              <span className="state"> {"sqft " + property.city.name + " " + property.state.name}</span>
            </div>
          </div>

          <div className="gallery-icon m-0 ">

            <img src="/View.svg" alt="" />

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
                src={property.featured_image ? property.featured_image : "/living.png"}
                alt="Main"
                width={832}
                height={493}
                className="featured-img"
              />
            </div>
            <div className="side-images">
              <img
                src={editgallery[0] ? editgallery[0] : "/kitchen.png"}
                alt="img"
                width={584}
                height={246}
                className="project-img"
              />
              <div className="overlay-view d-flex">
                <div className="side-sub-image">
                  <img
                    src={editgallery[1] ? editgallery[1] : "/patio.png"}
                    alt="img"
                    width={274}
                    height={227}
                    className="project-thumb-img"
                  />
                </div>

                <div className="view-more">
                  <img
                    src={editgallery[2] ? editgallery[2] : "/pool.png"}
                    alt="img"
                    width={274}
                    height={227}
                    className="project-thumb-img"
                  />
                  <span className="overlay-text">View All 15 Photos</span>
                </div>
              </div>
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
