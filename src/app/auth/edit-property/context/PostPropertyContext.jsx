"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LARAVEL_API_BASE_URL, APP_TYPE, LARAVEL_APPLICATION_PASSWORD } from "@/lib/config";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

export const PostPropertyContext = createContext();

export function PostPropertyProvider({ children }) {
  const searchParams = useSearchParams();
  const listing_id = searchParams.get('listing_id');
  console.log(listing_id , "ListingId")
  
  const { token } = useSiteSettings();

  // Default empty state
  const defaultState = {
    basicDetails: {
      name: "",
      description: "",
      purpose_id: "",
      property_id: "",
      property_type_id: [],
      property_status_id: [],
    },
    locationDetails: {
      country_id: null,
      state_id: null,
      city_id: null,
      street_address: "",
      area_locality: "",
      colony: "",
      pin_code: null
    },
    repeater_fields: {},
    custom_field: {},
    photos: [],
    video: null,
    pricingDetails: {
      expectedRent: "",
      pricePerSqFt: "",
      basedOn: "Carpet Area",
      electricityWaterExcluded: false,
      priceNegotiable: false,
      showMaintenanceBooking: false,
      maintenanceCharges: "",
      bookingAmount: "",
      securityDepositType: "Fixed",
      securityDepositValue: "",
      lockInPeriod: "",
      yearlyRentIncrease: "",
      propertyUniqueDescription: "",
    },
  };

  const [formData, setFormData] = useState(defaultState);

  // Fetch listing data on mount
  useEffect(() => {
    if (listing_id && token) {
      fetch(`${LARAVEL_API_BASE_URL}/api/users-property-listing/${listing_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-App-Type": APP_TYPE,
          "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
          "Authorization": `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(response => {
            console.log("edit-listing", response);
            if (response?.status && response?.data) {
              const propData = response.data;
              
              const parsedDynamicData = {
                title: propData.title || "",
                content: propData.content || "",
                excerpt: propData.excerpt || "",
                taxonomies: {}
              };

              if (propData.selected_taxonomies && Array.isArray(propData.selected_taxonomies)) {
                propData.selected_taxonomies.forEach(tax => {
                  if (tax.taxonomy_id && tax.selected_term_ids && tax.selected_term_ids.length > 0) {
                    parsedDynamicData.taxonomies[tax.taxonomy_id] = tax.selected_term_ids[0];
                  }
                });
              }

              if (propData.meta && Array.isArray(propData.meta)) {
                propData.meta.forEach(m => {
                  if (m.custom_field && m.custom_field.field_name_slug) {
                    parsedDynamicData[m.custom_field.field_name_slug] = m.value_string || m.value_number || m.value_text || "";
                  }
                });
              }
              
              // Location Details
              parsedDynamicData.country_id = propData.country_id || propData.country || "";
              parsedDynamicData.state_id = propData.state_id || propData.state || "";
              parsedDynamicData.city_id = propData.city_id || propData.city || "";
              parsedDynamicData.area_locality = propData.area_locality || "";
              parsedDynamicData.full_address = propData.full_address || "";
              
              // Media fields mapping
              const featImgData = propData.featured_image_media ? [propData.featured_image_media] : (propData.featured_image ? [propData.featured_image] : []);
              const galImgData = propData.gallery_image_files && propData.gallery_image_files.length > 0 ? propData.gallery_image_files : (propData.gallery_images || []);

              parsedDynamicData['featured-image'] = featImgData;
              parsedDynamicData['featured_image'] = featImgData;
              parsedDynamicData['featured_image_id'] = featImgData;
              
              parsedDynamicData['gallery'] = galImgData;
              parsedDynamicData['gallery_images'] = galImgData;
              parsedDynamicData['gallery_image_ids'] = galImgData;
              
              setFormData(prev => ({
                ...prev,
                basicDetails: {
                  ...prev.basicDetails,
                  name: propData.title || "",
                  description: propData.content || "",
                },
                locationDetails: {
                  ...prev.locationDetails,
                  area_locality: propData.area_locality || "",
                },
                dynamicData: parsedDynamicData,
              }));
            }
        })
        .catch(err => console.error("Error fetching listing data:", err));
    }
  }, [listing_id, token]);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <PostPropertyContext.Provider value={{ formData, updateFormData, setFormData }}>
      {children}
    </PostPropertyContext.Provider>
  );
}

export function usePostProperty() {
  return useContext(PostPropertyContext);
}
