"use client";

import React, { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./featurepricing.module.css"; // Ensure this path is correct
import { ToWords } from "to-words";
import { PostPropertyContext } from "@/app/auth/post-property/context/PostPropertyContext";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";

const AmenitiesSection = () => {
    const router = useRouter();
    const { formData, updateFormData, setFormData } = useContext(PostPropertyContext);
    const [errors, setErrors] = useState({})


    const [pricingData, setPricingData] = useState(formData.custom_field || {});


    const aminityFields = (Array.isArray(formData.custom_field) ? formData.custom_field : []).filter(field => {
        return field.template?.name?.toLowerCase().startsWith("project.features.");
    });


    console.log("fields", aminityFields)
    const { token } = useSiteSettings();





    const handleChange = (fieldName, value, field_id, field_type) => {
        // Update pricing data state
        setPricingData(prev => {
            const updatedFields = {
                ...prev,
                [fieldName]: value,
            };
            updateFormData("pricingDetails", updatedFields);
            return updatedFields;
        });

        // Update repeater_fields inside formData
        setFormData(prevFormData => {
            const repeater = [...(prevFormData.repeater_fields || [])];
            const existingIndex = repeater.findIndex(item => item.custom_field_id === field_id);

            if (existingIndex !== -1) {
                // Update existing entry
                repeater[existingIndex] = {
                    ...repeater[existingIndex],
                    field_value: value
                };
            } else {
                // Add new entry
                repeater.push({
                    custom_field_id: field_id,
                    field_type: field_type,
                    field_value: value
                });
            }

            return { ...prevFormData, repeater_fields: repeater };
        });
    };




    const toggleBoolean = (fieldName) => {
        handleChange(fieldName, !pricingData[fieldName]);
    };




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const newErrors = {};

            // 1. Validate price fields
            aminityFields.forEach(field => {
                const repeaterField = (formData.repeater_fields || []).find(
                    f => f.custom_field_id === field.id
                );
                const value = repeaterField?.field_value;

                if (field.required === "yes" && (!value || value === "")) {
                    newErrors[field.field_name_slug] = `${field.field_label} is required`;
                }
            });

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return; // stop submission if errors
            }

            setErrors({}); // clear errors if validation passes

            // 2. Create FormData for submission
            const formDataToSend = new FormData();

            // Add basicDetails
            Object.entries(formData.basicDetails || {}).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    // For arrays, append each value
                    value.forEach((v,id) => formDataToSend.append(`${key}[${id}]`, v));
                } else {
                    // For single values, append directly
                    formDataToSend.append(key, value ?? "");
                }
            });


            // Add locationDetails
            Object.entries(formData.locationDetails || {}).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            });

            // Add repeater_fields
            (formData.repeater_fields || []).forEach((field, index) => {
                formDataToSend.append(`repeater_fields[${index}][custom_field_id]`, field.custom_field_id);
                formDataToSend.append(`repeater_fields[${index}][field_type]`, field.field_type);

                if (field.field_type === "file" || field.field_type === "media") {
                    if (Array.isArray(field.field_value)) {
                        field.field_value.forEach(item => {
                            if (item?.file instanceof File) {
                                formDataToSend.append(`repeater_fields[${index}][field_value][]`, item.file);
                            }
                        });
                    } else if (field.field_value?.file instanceof File) {
                        formDataToSend.append(`repeater_fields[${index}][field_value][]`, field.field_value.file);
                    }
                } else if (Array.isArray(field.field_value)) {
                    formDataToSend.append(
                        `repeater_fields[${index}][field_value]`,
                        field.field_value.join(",")
                    );
                } else {
                    formDataToSend.append(`repeater_fields[${index}][field_value]`, field.field_value ?? "");
                }
            });

            // Append extra fields
            formDataToSend.append('featured_image', formData.featured_image.file)
            formDataToSend.append('live_status', "Under Review");
            formDataToSend.append('temporary_status', "Active");

            console.log("Final FormData before submit:");
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0], ":", pair[1]);
            }

            // 3. Send API request
            const response = await fetch("/api/post-property/add-property", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formDataToSend,
            });

            if (!response.ok) throw new Error("Failed to submit");

            const result = await response.json();
            console.log("Submitted successfully:", result);

            router.push('/'); // Navigate after successful submission

        } catch (err) {
            console.error("Submit error:", err);
        }
    };




    console.log(errors)

    const goBack = () => {
        if (typeof window !== "undefined") {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                router.push("/");
            }
        }
    };


    return (
        <div className={styles.wrapper}>
            <div className={styles.backWrapper}>
                <IoArrowBackSharp size={20} onClick={goBack} />
                <p className="m-0">Back</p>
            </div>

            <h2 className={styles.sectionTitle}>Add Amenities and details...</h2>

            <div className={styles.warningBox}>
                You might get <strong className={styles.warningHighlight}>Low responses</strong>, as your listing has no Amenities. Rank up your listing by adding Amenities{" "}

                <button className={styles.closeWarningButton}>&times;</button>
            </div>

            {aminityFields.length === 0 && (
                <p className={styles.formQuestion}>
                    Please go back to Basic Details and select a Purpose and Property Type/Category to see Amenities options.
                </p>
            )}


            {aminityFields.filter(f => !primaryPricingFields.includes(f)).map((field) => {

                if (field.field_type === "checkbox") {
                    return (
                        <div className={styles.checkboxGroup} key={field.field_name_slug}>
                            <label htmlFor={field.field_name_slug} className={styles.formLabel}>
                                {field.field_label}{" "} <span style={{ color: "red" }}>{field.required === "yes" ? "*" : ""}</span>
                            </label>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    className={styles.formCheckbox}
                                    checked={pricingData[field.name] || false}
                                    onChange={() => toggleBoolean(field.name)}
                                />
                                {field.label}
                            </label>
                        </div>
                    );
                }
                return null;
            })}

            {/* Maintenance and Booking Section - conditionally rendered based on showMaintenanceBooking */}


            <div className={styles.navigationButtons}>
                <button
                    className={`${styles.continueBtn} continueBtn`} // Added direct class "continueBtn"
                    onClick={handleSubmit}
                >
                    Finish Properties
                </button>
            </div>
        </div>
    );
};

export default AmenitiesSection;
