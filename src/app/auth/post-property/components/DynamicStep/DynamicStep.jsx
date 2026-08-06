"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";
import DynamicField from "./DynamicField";
import styles from "../steps/Basic-DetailsSteps.module.css"; 
import { getTaxonomies } from "@/services/post-property.service";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { toast } from "react-toastify";
import { submitListing } from "@/services/listing.service";

let cachedTaxonomiesData = null;

export default function DynamicStep({ stepData, allSteps, currentStepIndex }) {
  const { formData, updateFormData, setFormData } = useContext(PostPropertyContext);
  const { token } = useSiteSettings();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!stepData) {
    return <div>Loading step...</div>;
  }

  const { base_fields = [], custom_fields = [] } = stepData;
  let fields = [...base_fields, ...custom_fields].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));

  // Hide Title, Content, and Excerpt on the first step
  if (currentStepIndex === 0) {
    fields = fields.filter(f => !['title', 'excerpt', 'content'].includes(f.key || f.request_key));
  }

  // Taxonomy logic (only for step 1)
  const [taxonomies, setTaxonomies] = useState(cachedTaxonomiesData || []);
  const [loadingTaxonomies, setLoadingTaxonomies] = useState(!cachedTaxonomiesData);
  const [selectedTaxonomies, setSelectedTaxonomies] = useState(formData.dynamicData?.taxonomies || {});

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const newErrors = { ...errors };
      let changed = false;
      fields.forEach((field) => {
        const key = field.key || field.request_key;
        if (newErrors[key]) {
          const val = formData.dynamicData?.[key];
          if (val !== undefined && val !== null && val !== "" && !(Array.isArray(val) && val.length === 0)) {
            delete newErrors[key];
            changed = true;
          }
        }
      });
      if (changed) setErrors(newErrors);
    }
  }, [formData.dynamicData, errors, fields]);

  useEffect(() => {
    if (currentStepIndex === 0) {
      const fetchTaxonomiesData = async () => {
        if (taxonomies.length === 0) setLoadingTaxonomies(true);
        try {
          const termIds = Object.entries(selectedTaxonomies)
            .filter(([taxId]) => {
              const taxonomy = taxonomies.find(t => String(t.id) === String(taxId));
              return taxonomy ? taxonomy.hierarchical : true;
            })
            .map(([_, termId]) => termId); 
          
          const response = await getTaxonomies(termIds);
          if (response?.data) {
            const sortedData = [...response.data].sort((a, b) => a.sort_order - b.sort_order);
            cachedTaxonomiesData = sortedData;
            setTaxonomies(sortedData);
          }
        } catch (error) {
          console.error("Error fetching taxonomies:", error);
        } finally {
          setLoadingTaxonomies(false);
        }
      };
      fetchTaxonomiesData();
    }
  }, [selectedTaxonomies, currentStepIndex]);

  const handleContinue = () => {
    // Validation
    const newErrors = {};
    fields.forEach((field) => {
      const isReq = field.required === "1" || field.required === 1 || field.required === true;
      if (isReq) {
        const val = formData.dynamicData?.[field.key || field.request_key];
        if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
          newErrors[field.key || field.request_key] = `${field.label || 'This field'} is required`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
    }

    // save taxonomies if on first step
    if (currentStepIndex === 0) {
      updateFormData("dynamicData", {
        ...formData.dynamicData,
        taxonomies: selectedTaxonomies
      });
    }
    if (currentStepIndex < allSteps.length - 1) {
      const nextStep = allSteps[currentStepIndex + 1];
      const nextPath = nextStep.step_key;
      router.push(`/auth/post-property/${nextPath}`);
    } else {
      submitData();
    }
  };

  const submitData = async () => {
    try {
      setIsSubmitting(true);
      const payload = new FormData();
      
      // Default static fields
      payload.append("post_type_id", 1);
      payload.append("status", "draft");
      payload.append("live_status", "under_review");

      const dynamicData = formData.dynamicData || {};
      const allBaseFields = allSteps.flatMap(s => s.base_fields || []);
      const allCustomFields = allSteps.flatMap(s => s.custom_fields || []);

      // 1. Process Base Fields & Media
      allBaseFields.forEach(field => {
        const val = dynamicData[field.request_key];
        if (val !== undefined && val !== null && val !== "") {
          if (field.type === "media" || field.type === "gallery") {
             if (Array.isArray(val)) {
                val.forEach(file => {
                   if (file instanceof File) payload.append(`${field.request_key}[]`, file);
                });
             } else if (val instanceof File) {
                payload.append(field.request_key, val);
             }
          } else {
             payload.append(field.request_key, val);
          }
        }
      });

      // 2. Process Custom Fields
      let cfIndex = 0;
      allCustomFields.forEach(field => {
        const val = dynamicData[field.request_key];
        if (val !== undefined && val !== null && val !== "") {
          const fieldId = field.id || field.custom_field_id;
          
          if (field.type === "media" || field.type === "gallery") {
             // If media is a custom field
             if (Array.isArray(val)) {
                val.forEach(file => {
                   if (file instanceof File) payload.append(`${field.request_key}[]`, file);
                });
             } else if (val instanceof File) {
                payload.append(field.request_key, val);
             }
          } else if (fieldId) {
             // Standard custom fields
             payload.append(`custom_fields[${cfIndex}][custom_field_id]`, fieldId);
             if (field.type === "number") {
                payload.append(`custom_fields[${cfIndex}][value_number]`, val);
             } else {
                payload.append(`custom_fields[${cfIndex}][value_string]`, val);
             }
             cfIndex++;
          }
        }
      });

      // 3. Process Taxonomies
      const taxonomies = dynamicData.taxonomies || {};
      Object.entries(taxonomies).forEach(([taxId, termId]) => {
         payload.append(`taxonomies[${taxId}]`, termId);
      });

      const result = await submitListing(token, payload);
      
      if (result && result.status) {
        toast.success("Listing submitted successfully!");
        setFormData({});
        router.push("/auth/user/listing");
      } else {
        toast.error(result?.message || "Failed to submit listing");
      }
    } catch (error) {
       console.error("Submit error:", error);
       const errorMessage = error.response?.data?.message || error.response?.data?.error || "An error occurred during submission";
       toast.error(errorMessage);
    } finally {
       setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevStep = allSteps[currentStepIndex - 1];
      const prevPath = prevStep.step_key;
      router.push(`/auth/post-property/${prevPath}`);
    } else {
      if (typeof window !== "undefined") {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          router.push("/");
        }
      }
    }
  };

  const handleReset = () => {
    // If it's the first step, clear taxonomies
    if (currentStepIndex === 0) {
      setSelectedTaxonomies({});
    }

    // Clear fields for this step
    const keysToClear = fields.map(f => f.key || f.request_key);
    
    setFormData(prev => {
      const newDynamicData = { ...prev.dynamicData };
      
      // Delete all fields on this step
      keysToClear.forEach(key => {
        delete newDynamicData[key];
      });
      
      // Clear taxonomies from context if step 0
      if (currentStepIndex === 0) {
        delete newDynamicData.taxonomies;
      }

      return {
        ...prev,
        dynamicData: newDynamicData
      };
    });
  };

  return (
    <div className={styles.content}>
      <div className="d-flex gap-2 mb-3 align-items-center" style={{ cursor: "pointer", color: "var(--Orange-Red)" }} onClick={handleBack}>
        <IoArrowBackSharp size={20} />
        <p className="m-0" style={{ color: "#000" }}>Back</p>
      </div>

      <h3>{stepData.step_label}</h3>
      {stepData.description && <p>{stepData.description}</p>}

      {/* Render Taxonomies only on first step */}
      {currentStepIndex === 0 && (
        <div className="mb-4">
          {loadingTaxonomies ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={`skel-${index}`} className={styles.optionGroup}>
                <p className={styles.skeletonText} style={{ width: ['120px', '160px', '140px'][index % 3] }}></p>
                <div className={styles.optionButtons}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={`skel-btn-${i}`}
                      className={styles.skeletonButton}
                      style={{ width: ['100px', '140px', '90px', '160px', '110px', '130px'][i % 6] }}
                    ></div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            taxonomies.map(taxonomy => (
              taxonomy.terms && taxonomy.terms.length > 0 ? (
                <div key={taxonomy.id} className={styles.optionGroup}>
                  <p className={styles.subPara}>{taxonomy.name}</p>
                  <div className={styles.optionButtons}>
                    {taxonomy.terms.map((term) => (
                      <button
                        key={term.id}
                        className={`${styles.optionBtn} ${selectedTaxonomies[taxonomy.id] === term.id ? styles.selected : ""}`}
                        onClick={() => setSelectedTaxonomies(prev => ({
                          ...prev,
                          [taxonomy.id]: term.id
                        }))}
                      >
                        {term.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null
            ))
          )}
        </div>
      )}

      <div className={styles.formContainer}>
        {fields.map((field) => (
          <DynamicField 
            key={field.key || field.request_key} 
            field={field}
            error={errors[field.key || field.request_key]} 
          />
        ))}
      </div>

      <div className="d-flex gap-3 mt-4">
        <button className={`btn ${styles.orangeBtn} ${styles.btn}`} onClick={handleContinue} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : (currentStepIndex < allSteps.length - 1 ? "Continue" : "Submit")}
        </button>
        <button 
          className={`btn btn-outline-secondary ${styles.btn}`} 
          onClick={handleReset}
          disabled={isSubmitting}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
