"use client";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import styles from "./Location.module.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";

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
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(formData.locationDetails?.country || null);
  const [selectedState, setSelectedState] = useState(formData.locationDetails?.state || null);
  const [selectedCity, setSelectedCity] = useState(formData.locationDetails?.city || null);
  const [errors, setErrors] = useState({});

  const handleContinue = () => {
    const newErrors = {};

    if (!selectedCountry) newErrors.country = "Country is required";
    if (!selectedState) newErrors.state = "State is required";
    if (!selectedCity) newErrors.city = "City is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFormData("locationDetails", {
      country: selectedCountry,
      state: selectedState,
      city: selectedCity,
    });

    router.push("/auth/post-property/property-profile");
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

  const stateOptions =
    selectedCountry &&
    Object.keys(locationData[selectedCountry.value]).map((state) => ({
      label: state,
      value: state,
    }));

  const cityOptions =
    selectedCountry &&
    selectedState &&
    locationData[selectedCountry.value][selectedState.value].map((city) => ({
      label: city,
      value: city,
    }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #9E9E9E",
      backgroundColor: "#fff",
      borderRadius: "8px",
      paddingLeft: "4px",
      minHeight: "42px",
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        border: "1px solid #9E9E9E",
      },
    }),

    option: (provided, state) => ({
      ...provided,
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

    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  return (
    <div className={styles.content}>
      <div className={styles.backWrapper}>
        <IoArrowBackSharp size={20} onClick={goBack} />
        <p className="m-0">Back</p>
      </div>

      <h3 className={styles.title}>Where is your Property Location</h3>
      <p className={styles.subtitle}>
        An accurate location helps you connect with the right buyers
      </p>

      <div className={styles.formGroup}>
        <label className={styles.label}>Country</label>
        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={(option) => {
            setSelectedCountry(option);
            setSelectedState(null);
            setSelectedCity(null);
            setErrors((prev) => ({ ...prev, country: null }));
          }}
          placeholder="Select Country"
          error={errors.country}
          styles={customStyles}
          className="w-20"
        />
        {errors.country && <p className={styles.error}>{errors.country}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>State</label>
        <Select
          options={stateOptions}
          value={selectedState}
          onChange={(option) => {
            setSelectedState(option);
            setSelectedCity(null);
            setErrors((prev) => ({ ...prev, state: null }));
          }}
          placeholder="Select State"
          error={errors.state}
          styles={customStyles}
        />
        {errors.state && <p className={styles.error}>{errors.state}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>City</label>
        <Select
          options={cityOptions}
          value={selectedCity}
          onChange={(option) => {
            setSelectedCity(option);
            setErrors((prev) => ({ ...prev, city: null }));
          }}
          placeholder="Select City"
          error={errors.city}
          styles={customStyles}
        />
        {errors.city && <p className={styles.error}>{errors.city}</p>}
      </div>

      <button className={` continueBtn ${styles.continueBtn}`} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default Location;
