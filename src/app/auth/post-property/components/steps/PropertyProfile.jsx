"use client";
import React, { useState, useContext, useEffect } from "react";
import styles from "./PropertyProfile.module.css";
import Select from "react-select";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

export default function PropertyProfileStep() {
  const { formData, updateFormData } = useContext(PostPropertyContext);
  const { token } = useSiteSettings();
  const [profileFieldsMap, setProfileFieldsMap] = useState([])
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const model_fields = Object.entries(formData.basicDetails).map(([key, value]) => ({
    model: key,
    condition: [value]
  }));

  useEffect(() => {
    const fetchCustomFields = async () => {
      try {
        const response = await fetch("/api/post-property/property-profile/custom-field", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            post_type: 'property_list', model_fields
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "custom field fetch failed");
        }
        const res = result.data
        setProfileFieldsMap(res)
        updateFormData("custom_field", res)
      } catch (err) {
        console.log(err)
        // setError(err.message);
      } finally {
        // setLoading(false);
      }
    }
    fetchCustomFields();

  }, [token])

  // console.log(model_fields);

  // Initialize local state from context formData.propertyProfile
  const [localFields, setLocalFields] = useState(formData.propertyProfile || {});

  // Get selectedCategory from context basicDetails
  const selectedCategory = formData.basicDetails?.category || "";

  // Debugging: Log the selectedCategory and full formData
  useEffect(() => {
    console.log("PropertyProfile - formData:", formData);
    console.log("PropertyProfile - selectedCategory from Context:", selectedCategory);
  }, [formData, selectedCategory]);


  // Update localFields and save to context
  const handleChange = (fieldName, value) => {
    setLocalFields((prev) => {
      const updatedFields = {
        ...prev,
        [fieldName]: value,
      };
      updateFormData("propertyProfile", updatedFields);
      return updatedFields;
    });
  };


  console.log("updated fields", localFields)
  const goBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        router.push("/");
      }
    }
  };
  function buildRepeaterFields(localFields, profileFieldsMap) {
    return profileFieldsMap
      .filter(field => !["file", "media"].includes(field.field_type)) // skip file & media types
      .map(field => {
        const fieldValue = localFields[field.field_name_slug];
        return {
          custom_field_id: field.id,
          field_type: field.field_type,
          field_value:
            typeof fieldValue === "object" && fieldValue !== null
              ? fieldValue.value || fieldValue.label // handle select objects
              : fieldValue || ""
        };
      })
      .filter(f => f.field_value !== ""); // remove empty values
  }

  // Example usage:
  const repeaterFields = buildRepeaterFields(localFields, profileFieldsMap);


  const handleContinue = () => {
    // Validation
    const newErrors = {};
  
    (profileFieldsMap || [])
      .filter(field =>
        field.field_type !== "file" &&
        field.field_type !== "media" &&
        !/price/i.test(field.field_label || "") &&  // hide if label contains "price"
        !/price/i.test(field.field_name_slug || "") // hide if slug contains "price"
      )
      .forEach((field) => {
        const value = localFields[field.field_name_slug];
        if (field.required === "yes" && (!value || value === "")) {
          newErrors[field.field_name_slug] = `${field.field_label} is required`;
        }
      });
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop here if validation fails
    }
  
    const repeaterFields = buildRepeaterFields(localFields, profileFieldsMap || []);
    updateFormData("repeater_fields", repeaterFields);
    console.log("Saved Property Profile Data:", localFields);
  
    router.push("/auth/post-property/photodetails");
  };
  

  // const fieldsToRender = profileFieldsMap[selectedCategory] || [];

  console.log("data", errors)

  return (
    <div className={styles.selectedCategory}>
      <div className={styles.backWrapper}>
        <IoArrowBackSharp size={20} onClick={goBack} />
        <p className="m-0">Back</p>
      </div>
      <h3>Tell us about your property</h3>

      <div className="">

        {profileFieldsMap.length === 0 ? (
          <p>No fields available for this category. Please select a property type and category in Basic Details.</p>
        ) : (
          profileFieldsMap
            .filter(field =>
              field.field_type !== "file" &&
              field.field_type !== "media" &&
              !/price/i.test(field.field_label) &&      // hide if label contains "price"
              !/price/i.test(field.field_name_slug)     // hide if slug contains "price"
            )
            .map((field) => {
              const fieldKey = field.field_name_slug;
              const fieldValue = localFields[fieldKey] || "";

              return (

                <div className="">
                  <div className={`  ${field.field_type === "radio" ? styles.formRadio : styles.formGroup}`} key={field.id}>
                    <label className={`${field.field_type === "select" ? 'd-flex' : ''}`}
                      style={{
                        textTransform: "capitalize",
                        // display: "inline-block",
                        width: "fit-content"
                      }}
                    >
                      {field.field_label}{" "}
                      <span style={{ color: "red" }}>{field.required ? "*" : ""}</span>
                    </label>

                    {/* Area Input with Units */}
                    {field.field_type === "units" && field.options.length > 0 ? (
                      <div className={`${styles.areaInputWrapper} w-100`}>
                        <input
                          type="number"
                          placeholder="Enter area"
                          value={fieldValue.value || ""}
                          onChange={(e) =>
                            handleChange(fieldKey, {
                              ...fieldValue,
                              value: e.target.value,
                              unit: fieldValue.unit || "sq.ft"
                            })
                          }
                          className={styles.areaInput}
                        />
                        <Select
                          className={styles.unitSelect}
                          classNamePrefix="unit"
                          value={field.options
                            .map(opt => ({ label: opt.value, value: opt.value }))
                            .find(opt => opt.value === (fieldValue.unit || "sq.ft"))
                          }
                          onChange={(selected) =>
                            handleChange(fieldKey, {
                              ...fieldValue,
                              value: fieldValue.value || "",
                              unit: selected.value
                            })
                          }
                          options={field.options.map(opt => ({
                            label: opt.value,
                            value: opt.value
                          }))}
                          placeholder="sq.ft"
                        />
                      </div>
                    ) : field.field_type === "text" ? (
                      <input
                        type="text"
                        placeholder={field.field_placeholder}
                        name={fieldKey}
                        value={fieldValue}
                        onChange={(e) => handleChange(fieldKey, e.target.value)}
                        className={styles.input}
                      />
                    ) : null}

                    {/* Select Field */}
                    {field.field_type === "select" && (
                    <Select
                      placeholder={field.field_placeholder}
                      name={fieldKey}
                      className={styles.select}

                      classNamePrefix="react-select"
                      value={field.options
                        .map(opt => ({ label: opt.name, value: opt.value }))
                        .find(opt => opt.value === fieldValue?.value) || null
                      }
                      onChange={(selected) =>
                        handleChange(fieldKey, {
                          value: selected.value,
                          label: selected.label
                        })
                      }
                      options={field.options.map(opt => ({
                        label: opt.name,
                        value: opt.value
                      }))}
                    />
                  )}

                    {/* Radio Buttons */}
                    {field.field_type === "radio" && (
                      <div className={` ${styles.optionButtons}`}>
                        {field.options.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className={`${styles.optionBtn} ${fieldValue === option.value ? styles.selected : ""}`}
                            onClick={() => handleChange(fieldKey, option.value)}
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>

                    )}
                  </div>
                  {errors[fieldKey] && (
                    <p className={` ${styles.error}`}>{errors[fieldKey]}</p>
                  )}
                </div>

              );
            })
        )}
      </div>

      <button
        className={`continueBtn ${styles.continueBtn}`}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );

}

function areaUnitOptions() {
  return [
    { label: "sq.ft", value: "sq.ft" },
    { label: "sq.yd", value: "sq.yd" },
    { label: "sq.m", value: "sq.m" },
    { label: "acre", value: "acre" },
    { label: "bigha", value: "bigha" },
    { label: "hectare", value: "hectare" },
    { label: "marla", value: "marla" },
    { label: "kanal", value: "kanal" },
    { label: "biswa1", value: "biswa1" },
    { label: "biswa2", value: "biswa2" },
    { label: "ground", value: "ground" },
    { label: "aankadam", value: "aankadam" },
    { label: "rood", value: "rood" },
    { label: "chatak", value: "chatak" },
    { label: "kottah", value: "kottah" },
    { label: "cent", value: "cent" },
    { label: "perch", value: "perch" },
    { label: "guntha", value: "guntha" },
    { label: "are", value: "are" },
    { label: "katha", value: "katha" },
    { label: "gaj", value: "gaj" },
    { label: "killa", value: "killa" },
    { label: "kyncham", value: "kyncham" },
  ];
}

function generateFloorOptions() {
  const specialFloors = [
    "Lower Basement",
    "Basement",
    "Lower Ground",
    "Ground",
  ];
  const numberedFloors = Array.from({ length: 50 }, (_, i) =>
    (i + 1).toString()
  );
  return [...specialFloors, ...numberedFloors];
}
