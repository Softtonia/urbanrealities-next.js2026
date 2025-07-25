"use client";
import { createContext, useContext, useState } from "react";

const PostPropertyContext = createContext();

export function PostPropertyProvider({ children }) {
  const [formData, setFormData] = useState({
    purpose: "Sell",
    propertyType: "Residential",
    category: "",
    subOption: "",
    // Add more as steps progress
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
