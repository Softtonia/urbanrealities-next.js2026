"use client";
import React from "react";
import "./PropertygalleryBreadcrum.css";

const propertyData = {
  title: "3BHK, Mundeshwari",
  price: "₹ 3 Crore",
  label: "For Rent",
  details: "Builder Floor 1700sqft.",
  state: " Ernakulam, Kerala",
};

const PropertygalleryBreadcrum = () => {
  return (
    <div className="property-wrapper">
      <div className="container">
        <div className="sub-header  d-flex justify-content-between align-items-center ">
          <div className="data-header m-0">
            <div className="header-info d-flex mb-2">
              <h4 className="body-text-20 m-0">{propertyData.title}</h4>
              <span className="price body-text-20">{propertyData.price}</span>
            </div>

            <div className="label-desc d-flex flex-direction-column">
              <span className="rent-label body-text-14">
                {propertyData.label}
              </span>
              <span className="description">{propertyData.details}</span>
              <span className="state">{propertyData.state}</span>
            </div>
          </div>

          <div className="gallery-icon m-0 ">
            <img src="/View.svg" alt="" />
            <img src="/Heart.svg" alt="" />
            <img src="/Share.svg" alt="" />
            <img src="Print.svg" alt="" />
          </div>
        </div>
      </div>

      <div className="gallery">
        <div className="container">
          <div className="gallery-content">
          <div className="main-image">
            <img
              src="/living.png"
              alt="Main"
              width={832}
              height={493}
              className="featured-img"
            />
          </div>
          <div className="side-images">
            <img
              src="/kitchen.png"
              alt="img"
              width={584}
              height={246}
              className="project-img"
            />
            <div className="overlay-view d-flex">
            <div className="side-sub-image">
              <img
                src="/patio.png"
                alt="img"
                width={274}
                height={227}
                className="project-thumb-img"
              />          
                </div>

              <div className="view-more">
                <img
                  src="/pool.png"
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
    </div>
  );
};

export default PropertygalleryBreadcrum;
