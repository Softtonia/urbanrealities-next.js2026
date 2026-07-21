"use client";
import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Basic-DetailsSteps.module.css";
import { PostPropertyContext } from "@/app/auth/edit-property/context/PostPropertyContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { getTaxonomies, getUserDetails } from "@/services/post-property.service";

export default function StepContent({ purposeList, propertyListing }) {
  const [loading, setLoading] = useState(false);
  const { token, userId } = useSiteSettings();
  const { formData, updateFormData, setFormData } = useContext(PostPropertyContext);

  const [taxonomies, setTaxonomies] = useState([]);
  const [loadingTaxonomies, setLoadingTaxonomies] = useState(true);
  const [selectedTaxonomies, setSelectedTaxonomies] = useState(formData.basicDetails?.taxonomies || {});
  const [propertyType, setPropertyType] = useState([])
  const [propertyStatus, setPropertyStatus] = useState([])
  const router = useRouter();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (userId && token) {
        try {
          const res = await getUserDetails(userId, token);
          if (res?.first_name || res?.last_name) {
            setUserName(`${res.first_name || ""} ${res.last_name || ""}`.trim());
          } else if (res?.user_name) {
            setUserName(res.user_name);
          } else if (res?.data?.first_name || res?.data?.last_name) {
            setUserName(`${res.data.first_name || ""} ${res.data.last_name || ""}`.trim());
          } else if (res?.name) {
            setUserName(res.name);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };
    fetchUser();
  }, [userId, token]);

  // Initialize state from context formData
  const [selectedPurpose, setSelectedPurpose] = useState(formData.basicDetails?.purpose || "");
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState(formData.basicDetails?.property_type || []);
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState(formData.basicDetails?.property_status || []);
  useEffect(() => {
    if (propertyListing?.length > 0 && !selectedProperty) {
      setSelectedProperty(propertyListing[0].id);
    }
  }, [propertyListing, selectedProperty])

  useEffect(() => {
    // Clear local storage data when this page is mounted
    localStorage.removeItem("postPropertyData");
    setFormData({});
  }, []);

  useEffect(() => {
    const fetchTaxonomiesData = async () => {
      // Do not set loading state to true on every click to avoid flickering, 
      // but keep it if taxonomies is empty (initial load)
      if (taxonomies.length === 0) {
        setLoadingTaxonomies(true);
      }
      try {
        // Only include termIds for taxonomies where hierarchical is true
        const termIds = Object.entries(selectedTaxonomies)
          .filter(([taxId]) => {
            const taxonomy = taxonomies.find(t => String(t.id) === String(taxId));
            // If taxonomy is known, check hierarchical flag. If unknown (e.g. initial load), include it.
            return taxonomy ? taxonomy.hierarchical : true;
          })
          .map(([_, termId]) => termId); 
        
        const response = await getTaxonomies(termIds);
        if (response?.data) {
          const sortedData = [...response.data].sort((a, b) => a.sort_order - b.sort_order);
          setTaxonomies(sortedData);
        }
      } catch (error) {
        console.error("Error fetching taxonomies:", error);
      } finally {
        setLoadingTaxonomies(false);
      }
    };
    fetchTaxonomiesData();
  }, [selectedTaxonomies]);


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
    if (token && selectedProperty) {
      fetchPropertyType();
    }
  }, [selectedProperty, token]);

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
    if (token && selectedPropertyType?.length > 0) {
      fetchPropertyType();
    }
  }, [selectedPropertyType, token]);





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
    // if (!selectedPurpose || !selectedProperty || !selectedPropertyType || !selectedPropertyStatus) {
    //   setError("Please fill all the required fields before continuing.");
    //   return;
    // }
    setError("");

    updateFormData("basicDetails", {
      purpose_id: selectedPurpose,
      property_id: selectedProperty,
      property_type_id: selectedPropertyType,
      // expandedCategory: expandedCategory,
      property_status_id: selectedPropertyStatus,
      taxonomies: selectedTaxonomies,
    });

    router.push(`/auth/edit-property/location-details` + (typeof window !== 'undefined' ? window.location.search : ''));
  };
  console.log(propertyStatus)

  return (
    <div className={styles.content}>
      <h3>Welcome back <span className={styles.userNameHighlight}>{userName || "user"}</span>,</h3>
      <h3>Fill out basic details</h3>

      {loadingTaxonomies ? (
        // Skeleton loader for taxonomies
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={styles.optionGroup}>
            <p className={styles.skeletonText} style={{ width: ['120px', '160px', '140px'][index % 3] }}></p>
            <div className={styles.optionButtons}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
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

      {error && <p className="text-red-500 " style={{ color: 'red' }}>{error}</p>}

      {/* Continue Button */}
      <button className={` continueBtn ${styles.continueBtn}`} onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}
