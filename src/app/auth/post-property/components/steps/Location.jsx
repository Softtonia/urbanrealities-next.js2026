"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Select from "react-select";
import styles from "./Location.module.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

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
  const { token } = useSiteSettings()
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState(formData.locationDetails?.country || '');
  const [selectedState, setSelectedState] = useState(formData.locationDetails?.state || '');
  const [selectedCity, setSelectedCity] = useState(formData.locationDetails?.city || '');
  const [selectedPinCode, setSelectedPinCode] = useState(formData.locationDetails?.pin_code || '');


  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [states, setStates] = useState([])
  const [errors, setErrors] = useState({});
  const [isFetchingCountry, setIsFetchingCountry] = useState(false)
  const [isFetchingState, setIsFetchingState] = useState(false)
  const [isFetchingCity, setIsFetchingCity] = useState(false)

  console.log(selectedCountry)
  // fetch country  /api/countries
  useEffect(() => {
    const fetchPurpose = async () => {
      setIsFetchingCountry(true)
      // console.log(token)
      try {
        const res = await fetch('/api/post-property/location/country', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setIsFetchingCountry(false)
        if (Array.isArray(data)) {
          setCountries(data);
        } else if (data?.data) {
          setCountries(data.data);
        }
      } catch (err) {
        setIsFetchingCountry(false)
        console.error('Error fetching properties:', err);
      }
    };
    if (token) {
      fetchPurpose();
    }
  }, [token]);
  useEffect(() => {
    const fetchPurpose = async () => {
      setIsFetchingState(true)
      // console.log(token)
      try {
        const res = await fetch(`/api/post-property/location/state/${selectedCountry}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setIsFetchingState(false)
        if (Array.isArray(data)) {
          setStates(data);
        } else if (data?.data) {
          setStates(data.data);
        }
      } catch (err) {
        setIsFetchingState(false)
        console.error('Error fetching properties:', err);
      }
    };
    if (token) {
      fetchPurpose();
    }
  }, [selectedCountry]);
  useEffect(() => {
    const fetchPurpose = async () => {
      setIsFetchingCity(true)
      // console.log(token)
      try {
        const res = await fetch(`/api/post-property/location/city/${selectedState}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setIsFetchingCity(false)
        if (Array.isArray(data)) {
          setCities(data);
        } else if (data?.data) {
          setCities(data.data);
        }
      } catch (err) {
        setIsFetchingCity(false)
        console.error('Error fetching properties:', err);
      }
    };
    if (token) {
      fetchPurpose();
    }
  }, [selectedState]);





  const handleContinue = () => {
    const newErrors = {};

    if (!selectedCountry) newErrors.country = "Country is required";
    if (!selectedState) newErrors.state = "State is required";
    if (!selectedCity) newErrors.city = "City is required";
    if (!selectedPinCode) newErrors.pin_code = "Pin Code is required";


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    updateFormData("locationDetails", {
      country_id: selectedCountry,
      state_id: selectedState,
      city_id: selectedCity,
      pin_code: selectedPinCode
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
      paddingLeft: "4px",
      minHeight: "42px",
      boxShadow: "none",
      outline: "none",
      fontSize: "14px",
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
        <Select
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
          noOptionsMessage={() =>
            isFetchingState ? "Loading states..." : "No states found"
          }
        />
        {errors.state && <p className={styles.error}>{errors.state}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>City</label>
        <Select
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
          noOptionsMessage={() =>
            isFetchingCity ? "Loading cities..." : "No city found"
          }
        />
        {errors.city && <p className={styles.error}>{errors.city}</p>}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label}>PIN Code</label>
        <input
          type="number"
          value={selectedPinCode}
          onChange={(e) => {
            setSelectedPinCode(e.target.value);
            setErrors((prev) => ({ ...prev, pin_code: null }));
          }}
          placeholder="Enter PIN code"
          className={`${styles.inputField} w-20`} // keep consistent with Select styling
        />
        {errors.pin_code && <p className={styles.error}>{errors.pin_code}</p>}
      </div>


      <button className={` continueBtn ${styles.continueBtn}`} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
};

export default Location;
