"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const PostPropertyContext = createContext();

export function PostPropertyProvider({ children }) {
  const searchParams = useSearchParams();
  const listing_id = searchParams.get('listing_id');
  console.log(listing_id , "ListingId")
  
  // Default empty state
  const defaultState = {
    basicDetails: {
      name: "",
      description: "",
      purpose_id: "",
      property_id: "",
      property_type_id: [],
      property_status_id: [],
    },
    locationDetails: {
      country_id: null,
      state_id: null,
      city_id: null,
      street_address: "",
      area_locality: "",
      colony: "",
      pin_code: null
    },
    repeater_fields: {},
    custom_field: {},
    photos: [],
    video: null,
    pricingDetails: {
      expectedRent: "",
      pricePerSqFt: "",
      basedOn: "Carpet Area",
      electricityWaterExcluded: false,
      priceNegotiable: false,
      showMaintenanceBooking: false,
      maintenanceCharges: "",
      bookingAmount: "",
      securityDepositType: "Fixed",
      securityDepositValue: "",
      lockInPeriod: "",
      yearlyRentIncrease: "",
      propertyUniqueDescription: "",
    },
  };

  const [formData, setFormData] = useState(defaultState);

  // Fetch listing data on mount
  useEffect(() => {
    if (listing_id) {
      fetch(`/api/users-property-listing?listing_id=${listing_id}`)
        .then(res => res.json())
        .then(response => {
            console.log("edit-listing", response);
            if (response?.data?.data && response.data.data.length > 0) {
              const propData = response.data.data[0];
              
              setFormData(prev => ({
                ...prev,
                basicDetails: {
                  ...prev.basicDetails,
                  name: propData.title || "",
                  description: propData.content || "",
                  // Note: mapping taxonomies like purpose_id, property_id needs parsing `propData.selected_taxonomies`
                },
                locationDetails: {
                  ...prev.locationDetails,
                  area_locality: propData.area_locality || "",
                  // other fields like city_id, state_id might need parsing `propData.city_id`
                },
                // map other meta fields to propertyProfile and pricingDetails later
              }));
            }
        })
        .catch(err => console.error("Error fetching listing data:", err));
    }
  }, [listing_id]);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <PostPropertyContext.Provider value={{ formData, updateFormData, setFormData }}>
      {children}
    </PostPropertyContext.Provider>
  );
}

export function usePostProperty() {
  return useContext(PostPropertyContext);
}
