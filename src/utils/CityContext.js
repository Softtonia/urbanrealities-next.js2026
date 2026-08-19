"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CityContext = createContext();

export function CityProvider({ children }) {
  const [city, setCity] = useState(null);
  const [isLoadingCity, setIsLoadingCity] = useState(true);
  const router = useRouter();

  const setCookie = (cityObj) => {
    document.cookie = `selectedCity=${encodeURIComponent(JSON.stringify(cityObj))}; path=/; max-age=31536000`;
  };

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setCity(JSON.parse(storedCity));
      setCookie(JSON.parse(storedCity));
      setTimeout(() => {
        setIsLoadingCity(false);
      }, 800);
    } else {
      // Prompt for geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Try to get city name from coordinates using free API
              const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
              const data = await res.json();
              const cityName = data.address?.city || data.address?.town || data.address?.state_district || "New Delhi";
              
              const newCity = { id: 16, name: cityName }; 
              setCity(newCity);
              localStorage.setItem("selectedCity", JSON.stringify(newCity));
              setCookie(newCity);
            } catch (err) {
              const defaultCity = { id: 16, name: "New Delhi" };
              setCity(defaultCity);
              localStorage.setItem("selectedCity", JSON.stringify(defaultCity));
              setCookie(defaultCity);
            } finally {
              setTimeout(() => setIsLoadingCity(false), 800);
            }
          },
          (error) => {
            // Denied or error
            const defaultCity = { id: 16, name: "New Delhi" };
            setCity(defaultCity);
            localStorage.setItem("selectedCity", JSON.stringify(defaultCity));
            setCookie(defaultCity);
            setTimeout(() => setIsLoadingCity(false), 800);
          }
        );
      } else {
        const defaultCity = { id: 16, name: "New Delhi" };
        setCity(defaultCity);
        localStorage.setItem("selectedCity", JSON.stringify(defaultCity));
        setCookie(defaultCity);
        setTimeout(() => setIsLoadingCity(false), 800);
      }
    }
  }, []);
  

  const updateCity = (newCity) => {
    setCity(newCity);
    localStorage.setItem("selectedCity", JSON.stringify(newCity)); // ✅ stringify
    setCookie(newCity);
    router.refresh();
  };

  return (
    <CityContext.Provider value={{ city, setCity: updateCity, isLoadingCity }}>
      {children}
    </CityContext.Provider>
  );
}

export const useCity = () => useContext(CityContext);
