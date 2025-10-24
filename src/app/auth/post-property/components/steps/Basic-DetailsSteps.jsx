"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Basic-DetailsSteps.module.css";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

export default function StepContent({ purposeList, propertyListing }) {
  const [loading, setLoading] = useState(false);
  const { token } = useSiteSettings();
  const { formData, updateFormData, setFormData } = useContext(PostPropertyContext);

  // const [purposeList, setPurposeList] = useState([])
  // const [propertyListing, setPropertyListing] = useState([])
  const [propertyType, setPropertyType] = useState([])
  const [propertyStatus, setPropertyStatus] = useState([])
  const router = useRouter();

  // Initialize state from context formData
  const [selectedPurpose, setSelectedPurpose] = useState(formData.basicDetails?.purpose || "");
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState(formData.basicDetails?.property_type || []);
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState(formData.basicDetails?.property_status || []);
  const [name, setName] = useState(formData.basicDetails?.name || "")
  const [description, setDescription] = useState(formData.basicDetails?.description || "")
  useEffect(() => {
    if (propertyListing?.length > 0 && !selectedProperty) {
      setSelectedProperty(propertyListing[0].id);
    }
  }, [propertyListing, selectedProperty])
  console.log(name)

  useEffect(() => {
    // Clear local storage data when this page is mounted
    localStorage.removeItem("postPropertyData");
    setFormData({});
  }, []);


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
        const res = await fetch(`/api/post-property/get-property-status/${selectedPropertyType[0]}`, {
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
        }else{
          setPropertyStatus([])
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
      name: name,
      description: description,
      purpose_id: selectedPurpose,
      property_id: selectedProperty,
      property_type_id: selectedPropertyType,
      // expandedCategory: expandedCategory,
      property_status_id: selectedPropertyStatus,
    });

    router.push("/auth/post-property/location-details");
  };
  console.log(propertyStatus)

  return (
    <div className={styles.content}>
      <h3>Welcome back user,</h3>
      <h3>Fill out basic details</h3>
      <div>
        <label className={styles.formLabel}>
          Name
        </label>
        <input
          type="text"
          className={styles.formInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
        />
      </div>
      <div>
        <label className={styles.formLabel}>
          Description
        </label>
        <textarea
          className={styles.formTextarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="ENter Description"
          rows="5"
        ></textarea>

      </div>
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
                  aria-label="Loading"
                >
                  Loading...
                </button>
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
                    setSelectedPropertyType([]);
                    setSelectedPropertyStatus([]);
                  }}
                  className={styles.radioInput}
                />
                {type.name}
              </label>
            );
          })}
        </div>

      </div>
      {propertyType?.length > 0 && (
        <div>
          <p className={`d-block w-100 ${styles.subPara}`}>
            What kind of property-Type do you have?
          </p>

          <div className={styles.optionButtons}>
            {propertyType.map((cat) => {
              const isSelected = selectedPropertyType.includes(cat.id);

              return (
                <button
                  key={cat.id}
                  className={`${styles.optionBtn} ${isSelected ? styles.selected : ""}`}
                  onClick={() => {
                    setSelectedPropertyType((prev) =>
                      isSelected
                        ? prev.filter((id) => id !== cat.id) // Remove if already selected
                        : [...prev, cat.id] // Add if not selected
                    );
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {propertyStatus?.length > 0 && (
        <div>
          <p className={styles.subPara}>What is Property status?</p>

          <div className={styles.optionButtons}>
            {propertyStatus.map((cat) => {
              const isSelected = selectedPropertyStatus.includes(cat.id);

              return (
                <button
                  key={cat.id}
                  className={`${styles.optionBtn} ${isSelected ? styles.selected : ""}`}
                  onClick={() => {
                    setSelectedPropertyStatus((prev) =>
                      isSelected
                        ? prev.filter((id) => id !== cat.id)
                        : [...prev, cat.id]
                    );
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 " style={{ color: 'red' }}>{error}</p>}

      {/* Continue Button */}
      <button className={` continueBtn ${styles.continueBtn}`} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
