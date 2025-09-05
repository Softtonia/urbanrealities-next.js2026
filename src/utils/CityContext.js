"use client";
import { createContext, useContext, useState } from "react";

const CityContext = createContext();

export function CityProvider({ children }) {
  const [city, setCity] = useState("Mohali"); // default city

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  return useContext(CityContext);
}
