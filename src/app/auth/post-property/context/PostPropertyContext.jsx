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
            colony:"",
            pin_code: null
          },
          // propertyProfile: {},
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
    }
    return {};
  });
  console.log(formData.repeater_fields)

  // 
  // Save to localStorage whenever formData changes
  useEffect(() => {
    const sanitizeData = (data) => {
      if (!data) return data;
      if (typeof window !== "undefined" && data instanceof File) return undefined;
      
      if (Array.isArray(data)) {
        const newArr = data.map(sanitizeData).filter(item => item !== undefined);
        return newArr.length > 0 ? newArr : undefined;
      }
      
      if (typeof data === 'object' && !(data instanceof Date)) {
        const newObj = {};
        for (const [key, val] of Object.entries(data)) {
          const sanitizedVal = sanitizeData(val);
          if (sanitizedVal !== undefined) {
            newObj[key] = sanitizedVal;
          }
        }
        return newObj;
      }
      
      return data;
    };

    const cleanFormData = sanitizeData(formData);
    localStorage.setItem("postPropertyData", JSON.stringify(cleanFormData));
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
