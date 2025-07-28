"use client";
import { createContext, useContext, useState } from "react";

// Context object को export करें
export const PostPropertyContext = createContext();

export function PostPropertyProvider({ children }) {
  const [formData, setFormData] = useState({
    basicDetails: {
      purpose: "",
      propertyType: "",
      category: "",
      subOption: "",
    },
    locationDetails: {
      country: null,
      state: null,
      city: null,
      address: "", // Added address field
      locality: "", // Added locality field
      pincode: "", // Added pincode field
    },
    propertyProfile: {
      // These will be dynamically set based on category
      carpetArea: { value: "", unit: "sq.ft" },
      superBuiltupArea: { value: "", unit: "sq.ft" },
      plotArea: { value: "", unit: "sq.ft" },
      bhk: { value: "", label: "" },
      furnishing: { value: "", label: "" },
      floorNo: { value: "", label: "" },
      totalFloors: "",
      boundaryWall: "",
      cornerPlot: "",
      pantry: "",
      washroom: "",
      builtUpArea: { value: "", unit: "sq.ft" },
      ceilingHeight: "",
      loadingDock: "",
    },
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
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <PostPropertyContext.Provider value={{ formData, updateFormData }}>
      {children}
    </PostPropertyContext.Provider>
  );
}

export function usePostProperty() {
  return useContext(PostPropertyContext);
}
