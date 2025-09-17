"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CityContext = createContext();

export function CityProvider({ children }) {
  const [city, setCity] = useState(null);

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setCity(JSON.parse(storedCity));
    }
  }, []); // 👈 empty dependency array so it runs once
  

  const updateCity = (newCity) => {
    setCity(newCity);
    localStorage.setItem("selectedCity", JSON.stringify(newCity)); // ✅ stringify
  };

  return (
    <CityContext.Provider value={{ city, setCity: updateCity }}>
      {children}
    </CityContext.Provider>
  );
}

export const useCity = () => useContext(CityContext);
