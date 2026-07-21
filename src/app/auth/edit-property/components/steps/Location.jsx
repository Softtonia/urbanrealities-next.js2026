"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select, { createFilter } from "react-select";
import styles from "./Location.module.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { PostPropertyContext } from "@/app/auth/edit-property/context/PostPropertyContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { getCountries, getStates, getCities } from "@/services/location.service";

const locationData = {
  India: {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    Delhi: ["New Delhi", "Dwarka", "Rohini"],
    UttarPradesh: ["Lucknow", "Kanpur", "Noida"],
  },
  USA: {
    California: ["Los Angeles", "San Francisco", "San Diego"],
    Texas: ["Houston", "Austin", "Dallas"],
    NewYork: ["New York City", "Buffalo", "Rochester"],
  },
  Canada: {
    Ontario: ["Toronto", "Ottawa", "Mississauga"],
    BritishColumbia: ["Vancouver", "Victoria"],
    Alberta: ["Calgary", "Edmonton"],
  },
};

const Location = () => {
  const { formData, updateFormData } = useContext(PostPropertyContext);
  const { token } = useSiteSettings();
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(
    formData.locationDetails?.country || ""
  );
  const [selectedState, setSelectedState] = useState(
    formData.locationDetails?.state || ""
  );
  const [selectedCity, setSelectedCity] = useState(
    formData.locationDetails?.city || ""
  );
  const [selectedPinCode, setSelectedPinCode] = useState(
    formData.locationDetails?.pin_code || ""
  );
  const [areaLocality, setAreaLocality] = useState(
    formData.locationDetails?.area_locality || ""
  );
  const [colony, setColony] = useState(
    formData.locationDetails?.colony || ""
  );
  const [streetAddress, setStreetAddress] = useState(
    formData.locationDetails?.street_address || ""
  );

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFetchingCountry, setIsFetchingCountry] = useState(false);
  const [isFetchingState, setIsFetchingState] = useState(false);
  const [isFetchingCity, setIsFetchingCity] = useState(false);

  console.log(selectedCountry);
  useEffect(() => {
    const fetchPurpose = async () => {
      setIsFetchingCountry(true);
      try {
        const res = await getCountries(token);
        setIsFetchingCountry(false);
        if (res && res.status) {
          setCountries(res.data || []);
        }
      } catch (err) {
        setIsFetchingCountry(false);
        console.error("Error fetching country:", err);
      }
    };
    if (token) {
      fetchPurpose();
    }
  }, [token]);

  useEffect(() => {
    const fetchPurpose = async () => {
      setIsFetchingState(true);
      try {
        const res = await getStates(selectedCountry, token);
        setIsFetchingState(false);
        if (res && res.status) {
          setStates(res.data || []);
        }
      } catch (err) {
        setIsFetchingState(false);
        console.error("Error fetching states:", err);
      }
    };
    if (token && selectedCountry) {
      fetchPurpose();
    }
  }, [selectedCountry, token]);

  useEffect(() => {
    const fetchPurpose = async () => {
      setIsFetchingCity(true);
      try {
        const res = await getCities(selectedState, token);
        setIsFetchingCity(false);
        if (res && res.status) {
          setCities(res.data || []);
        }
      } catch (err) {
        setIsFetchingCity(false);
        console.error("Error fetching city:", err);
      }
    };
    if (token && selectedState) {
      fetchPurpose();
    }
  }, [selectedState, token]);

  const handleContinue = () => {
    const newErrors = {};

    if (!selectedCountry) newErrors.country = "Country is required";
    if (!selectedState) newErrors.state = "State is required";
    if (!selectedCity) newErrors.city = "City is required";
    if (!selectedPinCode) {
      newErrors.pin_code = "Pin Code is required";
    } else if (selectedPinCode.length !== 6) {
      newErrors.pin_code = "Pin Code must be 6 digits";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFormData("locationDetails", {
      country_id: selectedCountry,
      state_id: selectedState,
      city_id: selectedCity,
      pin_code: selectedPinCode,
           street_address: streetAddress,
            area_locality: areaLocality,
            colony:colony,
    });

    router.push(`/auth/edit-property/property-profile` + (typeof window !== 'undefined' ? window.location.search : ''));
  };

  const goBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push("/");
      }
    }
  };

  const countryOptions = Object.keys(locationData).map((country) => ({
    label: country,
    value: country,
  }));

  // const stateOptions =
  //   selectedCountry &&
  //   Object.keys(locationData[selectedCountry.value]).map((state) => ({
  //     label: state,
  //     value: state,
  //   }));

  // const cityOptions =
  //   selectedCountry &&
  //   selectedState &&
  //   locationData[selectedCountry.value][selectedState.value].map((city) => ({
  //     label: city,
  //     value: city,
  //   }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #9E9E9E",
      backgroundColor: "#fff",
      borderRadius: "8px",
      // paddingLeft: "4px",
      // minHeight: "42px",
      boxShadow: "none",
      outline: "none",
      fontSize: "clamp(14px, 1.5vw, 16px)",
      fontFamily: "var(--font-regular)",
      "&:hover": {
        border: "1px solid #9E9E9E",
      },
    }),

    option: (provided, state) => ({
      ...provided,
      fontSize: "clamp(12px, 1.5vw, 14px)",
      fontFamily: "var(--font-regular)",
      backgroundColor: state.isSelected
        ? "#fff"
        : state.isFocused
          ? "#f0f0f0"
          : "#fff",
      color: "#000",
      cursor: "pointer",

      ":active": {
        backgroundColor: "#f0f0f0",
        color: "#000",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "clamp(12px, 1.5vw, 14px)",
      fontFamily: "var(--font-regular)",
    }),

    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  console.log(streetAddress)

  return (
    <div className={styles.content}>
      <div className={`${styles.backWrapper} d-flex gap-2 mb-3`}>
        <IoArrowBackSharp size={20} onClick={goBack} className="back-btn" />
        <p className="m-0">Back</p>
      </div>

      <h3 className={styles.title}>Where is your Property Location</h3>
      <p className={styles.subtitle}>
        An accurate location helps you connect with the right buyers
      </p>

      <div className={styles.formGroup}>
        <label className={styles.label}>Country</label>
        <Select filterOption={(option, inputValue) => { if (!inputValue) return true; return option.label.toLowerCase().startsWith(inputValue.toLowerCase()); }}
          options={countries.map((country) => ({
            value: country.id,
            label: country.name,
          }))}
          value={
            countries
              .map((country) => ({
                value: country.id,
                label: country.name,
              }))
              .find((opt) => opt.value === selectedCountry) || null
          }
          onChange={(option) => {
            setSelectedCountry(option?.value || null);
            setSelectedState(null);
            setSelectedCity(null);
            setErrors((prev) => ({ ...prev, country: null }));
          }}
          placeholder="Select Country"
          styles={customStyles}
          className="w-20"
          instanceId="country-select"
          noOptionsMessage={() =>
            isFetchingCountry ? "Loading countries..." : "No countries found"
          }
        />

        {errors.country && <p className={styles.error}>{errors.country}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>State</label>
        <Select filterOption={(option, inputValue) => { if (!inputValue) return true; return option.label.toLowerCase().startsWith(inputValue.toLowerCase()); }}
          options={states.map((state) => ({
            value: state.id,
            label: state.name,
          }))}
          instanceId="state-select"
          value={
            states
              .map((state) => ({
                value: state.id,
                label: state.name,
              }))
              .find((opt) => opt.value === selectedState) || null
          }
          onChange={(option) => {
            setSelectedState(option?.value || null);

            setSelectedCity(null);
            setErrors((prev) => ({ ...prev, state: null }));
          }}
          placeholder="Select state"
          styles={customStyles}
          className="w-20"
          isDisabled={!selectedCountry}
          noOptionsMessage={() =>
            isFetchingState ? "Loading states..." : "No states found"
          }
        />
        {errors.state && <p className={styles.error}>{errors.state}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>City</label>
        <Select filterOption={(option, inputValue) => { if (!inputValue) return true; return option.label.toLowerCase().startsWith(inputValue.toLowerCase()); }}
          options={cities.map((city) => ({
            value: city.id,
            label: city.name,
          }))}
          instanceId="city-select"
          value={
            cities
              .map((city) => ({
                value: city.id,
                label: city.name,
              }))
              .find((opt) => opt.value === selectedCity) || null
          }
          onChange={(option) => {
            setSelectedCity(option?.value || null);

            setErrors((prev) => ({ ...prev, city: null }));
          }}
          placeholder="Select City"
          styles={customStyles}
          className="w-20"
          isDisabled={!selectedState}
          noOptionsMessage={() =>
            isFetchingCity ? "Loading cities..." : "No cities found"
          }
        />
        {errors.city && <p className={styles.error}>{errors.city}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>PIN Code</label>
        <input
          type="text"
          inputMode="numeric"
          value={selectedPinCode}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, "").slice(0, 6);
            setSelectedPinCode(numericValue);
            setErrors((prev) => ({ ...prev, pin_code: null }));
          }}
          placeholder="Enter PIN code"
          className={`${styles.inputField} w-20`} // keep consistent with Select styling
        />
        {errors.pin_code && <p className={styles.error}>{errors.pin_code}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Area / locality</label>
        <input
          type="text"
          value={areaLocality}
          onChange={(e) => {
            setAreaLocality(e.target.value);
          }}
          placeholder="Enter Area / Locality"
          className={`${styles.inputField} w-20`} // keep consistent with Select styling
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>Colony</label>
        <input
          type="text"
          value={colony}
          onChange={(e) => {
            setColony(e.target.value);
          }}
          placeholder="Enter Conlony"
          className={`${styles.inputField} w-20`} // keep consistent with Select styling
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Street Address</label>
        
        <textarea
          className={styles.formTextarea}
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
          placeholder="Enter Street Address"
          rows="5"
        ></textarea>
      </div>

      <button
        className={` continueBtn ${styles.continueBtn}`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
};

export default Location;
