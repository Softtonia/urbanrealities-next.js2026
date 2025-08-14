"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const PostPropertyContext = createContext();

export function PostPropertyProvider({ children }) {
  // Load saved data from localStorage (if any)
  const [formData, setFormData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("postPropertyData");
      return saved
        ? JSON.parse(saved)
        : {
            basicDetails: {
              purpose: "",
              property: "",
              property_type: "",
              property_status: "",
            },
            locationDetails: {
              country: null,
              state: null,
              city: null,
            },
            // propertyProfile: {},
            repeater_fields:{},
            custom_field:{},
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
    }
    return {};
  });
  console.log(formData.repeater_fields)
  
// 
  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("postPropertyData", JSON.stringify(formData));
  }, [formData]);

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
