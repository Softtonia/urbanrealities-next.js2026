"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Basic-DetailsSteps.module.css";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

export default function StepContent() {
  const [loading,setLoading] =useState(false);
  const { token } = useSiteSettings();
  const { formData, updateFormData, setFormData } = useContext(PostPropertyContext);

  const [purposeList, setPurposeList] = useState([])
  const [propertyListing, setPropertyListing] = useState([])
  const [propertyType, setPropertyType] = useState([])
  const [propertyStatus, setPropertyStatus] = useState([])
  const router = useRouter();

  // Initialize state from context formData
  const [selectedPurpose, setSelectedPurpose] = useState(formData.basicDetails?.purpose || "");
  const [selectedProperty, setSelectedProperty] = useState(formData.basicDetails?.property || "");
  const [selectedPropertyType, setSelectedPropertyType] = useState(formData.basicDetails?.property_type || "");
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState(formData.basicDetails?.property_status || "");
  
  console.log("token", token)


  useEffect(() => {
    // Clear local storage data when this page is mounted
    localStorage.removeItem("postPropertyData");
    setFormData({});
  }, []);

  useEffect(() => {
    const fetchPurpose = async () => {
      setLoading(true)
      // console.log(token)
      try {
        const res = await fetch('/api/post-property/get-purpose', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setLoading(false)
        if (Array.isArray(data)) {
          setPurposeList(data);
        } else if (data?.data) {
          setPurposeList(data.data);
        }
      } catch (err) {
        setLoading(false)
        console.error('Error fetching roles:', err);
      }
    };
    if (token) {
      fetchPurpose();
    }
  }, [token]);


  useEffect(() => {
    const fetchPurpose = async () => {
      // console.log(token)
      try {
        const res = await fetch('/api/post-property/get-property-listing', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setPropertyListing(data);
        } else if (data?.data) {
          setPropertyListing(data.data);
        }
      } catch (err) {
        console.error('Error fetching properties:', err);
      }
    };
    if (token) {
      fetchPurpose();
    }
  }, [token]);

  useEffect(() => {
    const fetchPropertyType = async () => {
      // console.log(token)
      try {
        const res = await fetch(`/api/post-property/get-property-type/${selectedProperty}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setPropertyType(data);
        } else if (data?.data) {
          setPropertyType(data.data);
        }
        setPropertyStatus([])
      } catch (err) {
        console.error('Error fetching roles:', err);
      }
    };
    if (token) {
      fetchPropertyType();
    }
  }, [selectedProperty]);

  useEffect(() => {
    const fetchPropertyType = async () => {
      // console.log(token)
      try {
        const res = await fetch(`/api/post-property/get-property-status/${selectedPropertyType}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setPropertyStatus(data);
        } else if (data?.data) {
          setPropertyStatus(data.data);
        }
      } catch (err) {
        console.error('Error fetching status:', err);
      }
    };
    if (token) {
      fetchPropertyType();
    }
  }, [selectedPropertyType]);





  // Determine categories based on selectedProperty
  // const categories =
  //   selectedProperty === "Residential"
  //     ? residentialCategories
  //     : commercialCategories;

  // Debugging: Log state changes
  useEffect(() => {
    console.log("BasicDetails - Current State:");
    console.log("  Purpose:", selectedPurpose);
    console.log("  Property Type:", selectedProperty);
    console.log("  Category:", selectedPropertyType);
    console.log("  Sub Option:", selectedPropertyStatus);
  }, [selectedPurpose, selectedProperty, selectedPropertyType, selectedPropertyStatus]);


  const [error, setError] = useState("");

  const handleContinue = () => {
    if (!selectedPurpose || !selectedProperty || !selectedPropertyType || !selectedPropertyStatus) {
      setError("Please fill all the required fields before continuing.");
      return;
    }
    setError("");

    updateFormData("basicDetails", {
      purpose: selectedPurpose,
      property: selectedProperty,
      property_type: selectedPropertyType,
      // expandedCategory: expandedCategory,
      property_status: selectedPropertyStatus,
    });

    router.push("/auth/post-property/location-details");
  };
  console.log(propertyStatus)

  return (
    <div className={styles.content}>
      <h3>Welcome back user,</h3>
      <h3>Fill out basic details</h3>

      {/* Purpose Selection */}
      <div className={styles.optionGroup}>
        <p className={styles.subPara}>I'm looking to</p>
        <div className={styles.optionButtons}>
        {loading
          ? (
            // Skeleton loading state
            Array.from({ length: 2 }).map((_, i) => (
              <button
                key={i}
                className={`${styles.optionBtn} placeholder col-1`}
                disabled
                style={{ height: "38px" }} // match your button height
              ></button>
            ))
          )
          : purposeList.map((p) => (
            <button
              key={p.id}
              className={`${styles.optionBtn} ${selectedPurpose === p.id ? styles.selected : ""
                }`}
              onClick={() => setSelectedPurpose(p.id)}
            >
              {p.name}
            </button>
          ))}
          </div>
      </div>

      {/* Property Type Selection */}<p className={`d-block ${styles.subPara}`}>What kind of property do you have?</p>
      <div className={styles.optionGroup}>

        <div className={styles.radioGroup}>
          {propertyListing.map((type, index) => {
            // If no selection yet, select the first one
            if (index === 0 && !selectedProperty) {
              setSelectedProperty(type.id);
            }

            return (
              <label
                key={type.id}
                className={`${styles.radioLabel} ${selectedProperty === type.id ? styles.selected : ""}`}
              >
                <input
                  type="radio"
                  name="property"
                  value={type.id}
                  checked={selectedProperty === type.id}
                  onChange={() => {
                    setSelectedProperty(type.id);
                    setSelectedPropertyType("");
                    setSelectedPropertyStatus("");
                  }}
                  className={styles.radioInput}
                />
                {type.name}
              </label>
            );
          })}
        </div>

      </div>
      <p className={`d-block w-100 ${styles.subPara}`}>What kind of property-Type do you have?</p>
      {/* type Buttons */}
      <div className={styles.optionButtons}>

        {propertyType.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.optionBtn} ${selectedPropertyType === cat.id ? styles.selected : ""}`}
            onClick={() => {
              setSelectedPropertyType(cat.id);
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>
      {propertyStatus?.length > 0 &&
        <div>
          <p className={styles.subPara}>What is Property status?</p>
          {/* Sub-options shown separately below */}
          <div className={styles.optionButtons}>

            {propertyStatus.map((cat) => (
              <button
                key={cat.id}
                className={`${styles.optionBtn} ${selectedPropertyStatus === cat.id ? styles.selected : ""}`}
                onClick={() => {
                  setSelectedPropertyStatus(cat.id);
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

        </div>}

      {error && <p className="text-red-500 " style={{ color: 'red' }}>{error}</p>}

      {/* Continue Button */}
      <button className={` continueBtn ${styles.continueBtn}`} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
