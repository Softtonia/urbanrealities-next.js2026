"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileForm.module.css";
import { useDashboard } from "../../../../DashboardContext/DashboardContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { decodeId } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Select, { createFilter } from "react-select";
import {
  FaUser,
  FaBuilding,
  FaMapMarkerAlt,
  FaIdCard,
  FaCamera,
  FaCheckCircle,
  FaExclamationCircle,
  FaHeadset,
  FaClock,
} from "react-icons/fa";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import KycDocuments from "../KycDocuments/KycDocuments";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import KycTimeline from "../KycTimeline/KycTimeline";
import ReviewSubmit from "@/app/auth/user/dashboard/edit-profile/components/ReviewSubmit/ReviewSubmit";
import VerificationStep from "@/app/auth/user/dashboard/edit-profile/components/VerificationStep/VerificationStep";
import ApprovedProfileView from "@/app/auth/user/dashboard/edit-profile/components/ApprovedProfileView/ApprovedProfileView";
import ProfileTabs from "../ProfileTabs/ProfileTabs";
import {
  LARAVEL_API_BASE_URL,
  LARAVEL_APPLICATION_PASSWORD,
  APP_TYPE,
} from "@/lib/config";
import {
  updatePersonalProfile,
  updateProfilePhoto,
  updateAddressProfile,
  getUserProfile,
} from "@/services/auth.service";
import {
  getCountries,
  getStates,
  getCities,
} from "@/services/location.service";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const searchParams = useSearchParams();
  const id = decodeId(searchParams.get("id"));
  const router = useRouter();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(tabParam || "personal");

  const { setShowSidebar, setPageHeading } = useDashboard();
  const { token } = useSiteSettings();
  const fileInputRef = useRef(null);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const [profileImage, setProfileImage] = useState("/profile-placeholder.png");
  const [profile, setProfile] = useState({});
  const [profileCompletion, setProfileCompletion] = useState({
    percentage: 0,
    missing_fields: [],
  });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    alternate_number: "",
    user_name: "",
    unique_id: "",
    bussiness_name: "",
    bussiness_email: "",
    business_phone: "",
    country_id: "",
    state_id: "",
    city_id: "",
    pin_code: "",
    address: "",
    street_address: "",
    area_locality: "",
    colony: "",
    about_us: "",
    aadhaar_number: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [isSaving, setIsSaving] = useState(false);
  const [hasTimeline, setHasTimeline] = useState(false);
  const [isKycApproved, setIsKycApproved] = useState(false);

  const getBaseUrl = () => LARAVEL_API_BASE_URL;

  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile data
  const fetchProfile = async (manageLoading = true) => {
    if (manageLoading) setLoading(true);
    try {
      const res = await getUserProfile(id, token);
      if (manageLoading) setLoading(false);

      if (res && res.status && res.data) {
        const rawData = res.data.raw || {};
        setProfile(rawData);
        if (res.data.profile_completion) {
          setProfileCompletion(res.data.profile_completion);
        }

        const normalize = (value) => {
          if (
            value === null ||
            value === undefined ||
            value === "N/A" ||
            value === "null" ||
            value === "undefined"
          ) {
            return "";
          }
          return value;
        };

        const formatPhone = (val) => {
          let str = normalize(val);
          if (str && /^\d{10}$/.test(str)) {
            return "91" + str;
          }
          return str;
        };

        // ✅ Pre-fill the form fields with normalization
        setFormData({
          unique_id: normalize(rawData.unique_id),
          email: normalize(rawData.email),
          first_name: normalize(rawData.first_name),
          last_name: normalize(rawData.last_name),
          role_id: normalize(rawData.role_name),
          user_name: normalize(rawData.user_name),
          phone: formatPhone(rawData.phone),
          alternate_number: formatPhone(rawData.alternate_number),
          bussiness_name: normalize(rawData.bussiness_name),
          bussiness_email: normalize(rawData.bussiness_email),
          business_phone: formatPhone(rawData.business_phone),
          country_id: normalize(rawData.country_id),
          state_id: normalize(rawData.state_id),
          city_id: normalize(rawData.city_id),
          pin_code: normalize(rawData.pin_code),
          area_locality: normalize(rawData.area_locality),
          colony: normalize(rawData.colony),
          street_address: normalize(rawData.street_address),
          address: normalize(rawData.address),
          about_us: normalize(rawData.about_us || rawData.about),
          aadhaar_number: normalize(rawData.aadhaar_number),
          gst_number: normalize(rawData.gst_number),
          rera_number: normalize(rawData.rera_number),
        });

        if (rawData.profile_photo) {
          setProfileImage(rawData.profile_photo);
        }

        if (rawData.kyc_status && ["approved", "verified", "completed"].includes(rawData.kyc_status.toLowerCase())) {
          setIsKycApproved(true);
        }
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (manageLoading) setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      const loadAllData = async () => {
        setLoading(true);

        const fetchTimelineCheck = async () => {
          try {
            const res = await fetch(
              getBaseUrl() + "/api/kyc/timeline?per_page=1",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
                  "X-App-Type": APP_TYPE,
                },
              },
            );
            if (res.ok) {
              const data = await res.json();
              if (data.status && data.data && data.data.length > 0) {
                setHasTimeline(true);
              }
            }
          } catch (e) {
            console.error(e);
          }
        };

        const fetchKycStatus = async () => {
          try {
            const res = await fetch(getBaseUrl() + "/api/kyc/status", {
              headers: {
                Authorization: `Bearer ${token}`,
                "X-Application-Password": LARAVEL_APPLICATION_PASSWORD,
                "X-App-Type": APP_TYPE,
              },
            });
            if (res.ok) {
              const data = await res.json();
              const status = data?.data?.latest_kyc_request?.status;
              if (status && status.toLowerCase() === "submitted") {
                setActiveTab("verification");
              }
            }
          } catch (e) {
            console.error(e);
          }
        };

        try {
          await Promise.all([
            fetchProfile(false),
            fetchTimelineCheck(),
            fetchKycStatus(),
          ]);
        } finally {
          setLoading(false);
        }
      };
      
      loadAllData();
    }
  }, [token]);

  useEffect(() => {
    setPageHeading("");
  }, []);

  useEffect(() => {
    setShowSidebar(false);

    // Restore the sidebar when the component is unmounted (user leaves the page)
    return () => setShowSidebar(true);
  }, [activeTab, setShowSidebar]);

  useEffect(() => {
    getCountries(token)
      .then((data) => {
        if (data && data.status) setCountries(data.data || []);
      })
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (formData.country_id) {
      getStates(formData.country_id, token)
        .then((data) => {
          if (data && data.status) setStates(data.data || []);
        })
        .catch(console.error);
    } else {
      setStates([]);
    }
  }, [formData.country_id, token]);

  useEffect(() => {
    if (formData.state_id) {
      getCities(formData.state_id, token)
        .then((data) => {
          if (data && data.status) setCities(data.data || []);
        })
        .catch(console.error);
    } else {
      setCities([]);
    }
  }, [formData.state_id, token]);

  // ✅ Handle image change
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const [photoProgress, setPhotoProgress] = useState(0);
  const [kycStatus, setKycStatus] = useState(null);
  const [kycReasons, setKycReasons] = useState([]);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setIsUploadingPhoto(true);
      setPhotoProgress(10);

      // Hit API immediately
      const payload = new FormData();
      payload.append("profile_photo", file);

      try {
        const data = await updateProfilePhoto(token, payload);

        if (data && data.status) {
          if (data.upload_id) {
            const { checkUploadProgress } =
              await import("@/services/document.service");
            const pollInterval = setInterval(async () => {
              try {
                const progressRes = await checkUploadProgress(
                  token,
                  data.upload_id,
                );
                if (progressRes.ok) {
                  const progressData = await progressRes.json();
                  const fileProgress =
                    progressData?.progress?.files?.profile_photo;

                  if (fileProgress) {
                    setPhotoProgress(fileProgress.percent || 10);
                    if (
                      fileProgress.percent >= 100 ||
                      fileProgress.status === "completed" ||
                      fileProgress.status === "verified"
                    ) {
                      clearInterval(pollInterval);
                      setPhotoProgress(100);
                      setTimeout(() => {
                        setIsUploadingPhoto(false);
                        toast.success(
                          data.message || "Profile photo updated successfully!",
                        );
                      }, 1000);
                    }
                  }
                }
              } catch (err) {
                console.error("Polling error", err);
              }
            }, 2000);
          } else {
            setPhotoProgress(100);
            setTimeout(() => {
              setIsUploadingPhoto(false);
              toast.success(
                data.message || "Profile photo updated successfully!",
              );
            }, 1000);
          }
        } else {
          setIsUploadingPhoto(false);
          setPhotoProgress(0);
          toast.error(data?.message || "Failed to update profile photo.");
        }
      } catch (err) {
        console.error("Profile photo upload error:", err);
        setIsUploadingPhoto(false);
        setPhotoProgress(0);
        toast.error("An error occurred while uploading photo.");
      }
    }
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormErrors((prev) => ({ ...prev, [name]: null }));

    // Allow only numeric input for specific fields
    if (
      [
        "phone",
        "business_phone",
        "alternate_number",
        "aadhaar_number",
        "pin_code",
      ].includes(name)
    ) {
      value = value.replace(/\D/g, "");

      // Limit phone numbers to 10 digits
      if (
        ["phone", "business_phone", "alternate_number"].includes(name) &&
        value.length > 10
      ) {
        value = value.slice(0, 10);
      }

      // Limit pin codes to 6 digits
      if (name === "pin_code" && value.length > 6) {
        value = value.slice(0, 6);
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let data;
      if (activeTab === "personal") {
        const dataToSend = new FormData();
        const personalKeys = [
          "first_name",
          "last_name",
          "user_name",
          "email",
          "phone",
          "alternate_number",
          "about_us",
          "business_name",
          "business_email",
          "business_phone",
          "no_of_employees"
        ];
        
        personalKeys.forEach((key) => {
          let val = formData[key];
          if (key === "business_name") val = formData.bussiness_name || formData.business_name;
          if (key === "business_email") val = formData.bussiness_email || formData.business_email;

          if (val !== undefined && val !== null && val !== "N/A" && val !== "") {
            dataToSend.append(key, val);
          }
        });
        data = await updatePersonalProfile(token, dataToSend);
      } else if (activeTab === "address") {
        // Basic validation for pin code
        if (formData.pin_code && formData.pin_code.length !== 6) {
          toast.error("Please enter a valid 6-digit pin code.");
          return;
        }

        const dataToSend = new FormData();
        const addressKeys = [
          "country_id",
          "state_id",
          "city_id",
          "street_address",
          "colony",
          "area_locality",
          "address",
          "pin_code",
          "business_country_id",
          "business_state_id",
          "business_city_id",
          "business_address",
          "business_pin_code"
        ];
        addressKeys.forEach((key) => {
          let val = formData[key];
          if (key === "business_address") val = formData.bussiness_address || formData.business_address;

          if (
            val !== undefined &&
            val !== null &&
            val !== "N/A" &&
            val !== ""
          ) {
            dataToSend.append(key, val);
          }
        });
        data = await updateAddressProfile(token, dataToSend);
      } else {
        return; // Other tabs not handled here
      }

      if (data && data.status) {
        console.log("✅ Profile Updated Successfully:", data);
        toast.success(data.message || "Information updated successfully.");

        // Advance to the next step
        if (activeTab === "personal") {
          setActiveTab("document");
        } else {
          router.push("/auth/user/dashboard");
        }
      } else {
        console.error("❌ Update Failed:", data?.message || "Unknown error");
        if (data?.errors) {
          setFormErrors(data.errors);
        }
        toast.error(
          data?.message || "Profile update failed. Please try again.",
        );
      }
    } catch (err) {
      console.error("❌ Update Failed:", err);
      toast.error("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchPurpose = async () => {
      // setIsFetchingCountry(true);
      // console.log(token)
      try {
        const res = await fetch("/api/post-property/location/country", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        // setIsFetchingCountry(false);
        if (Array.isArray(data)) {
          setCountries(data);
        } else if (data?.data) {
          setCountries(data.data);
        }
      } catch (err) {
        // setIsFetchingCountry(false);
        console.error("Error fetching country:", err);
      }
    };
    if (token) {
      fetchPurpose();
    }
  }, [token]);
  useEffect(() => {
    const fetchPurpose = async () => {
      // setIsFetchingState(true);
      // console.log(token)
      try {
        const res = await fetch(
          `/api/post-property/location/state/${formData.country_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        // setIsFetchingState(false);
        if (Array.isArray(data)) {
          setStates(data);
        } else if (data?.data) {
          setStates(data.data);
        }
      } catch (err) {
        // setIsFetchingState(false);
        console.error("Error fetching states:", err);
      }
    };
    if (token && formData.country_id) {
      fetchPurpose();
    }
  }, [formData.country_id]);
  useEffect(() => {
    const fetchPurpose = async () => {
      // setIsFetchingCity(true);
      // console.log(token)
      try {
        const res = await fetch(
          `/api/post-property/location/city/${formData.state_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const data = await res.json();
        // setIsFetchingCity(false);
        if (Array.isArray(data)) {
          setCities(data);
        } else if (data?.data) {
          setCities(data.data);
        }
      } catch (err) {
        // setIsFetchingCity(false);
        console.error("Error fetching city:", err);
      }
    };
    if (token && formData.state_id) {
      fetchPurpose();
    }
  }, [formData.state_id]);

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
  if (loading || isSaving) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <p></p>
      </div>
    );
  }

  return (
    <div className={styles.profileWraper}>
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/auth/user/dashboard" },
          { label: "Edit Profile", link: "" },
        ]}
      />
      {isKycApproved ? (
        <ApprovedProfileView 
          formData={formData} 
          profileImage={profileImage} 
          token={token} 
          isBusiness={false} 
        />
      ) : (
        <>
      {/* Tabs */}
      <ProfileTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasTimeline={hasTimeline}
      />

      <div
        className={styles.layoutGrid}
        style={
          ["document", "review", "verification"].includes(activeTab)
            ? { gridTemplateColumns: "1fr" }
            : {}
        }
      >
        {/* Main Content Area (Left) */}
        <div className={styles.mainContent}>
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className={styles.formHeader}>
              <div className={styles.formHeaderIcon}>
                <FaUser />
              </div>
              <div className={styles.formHeaderText}>
                <h3>
                  {activeTab === "personal"
                    ? "Personal & Business Details"
                    : activeTab === "address"
                      ? "Address Information"
                      : activeTab === "kyc"
                        ? "Documents & KYC"
                        : "Remarks"}
                </h3>
                <p>
                  {activeTab === "personal"
                    ? "Please enter your details as per official documents."
                    : "Update your details"}
                </p>
              </div>
            </div>

            {activeTab === "personal" && (
              <div className={styles.fieldsGrid}>
                {/* Row 1: Full Name */}
                <div
                  className={styles.inputGroup}
                  style={{ gridColumn: "1 / -1" }}
                >
                  <label>
                    Full Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name || ""}
                    onChange={handleChange}
                    placeholder="Full Name"
                    style={
                      formErrors.first_name
                        ? { borderColor: "red", outline: "none" }
                        : {}
                    }
                  />
                  {formErrors.first_name && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {formErrors.first_name[0]}
                    </span>
                  )}
                </div>

                {/* Row 2: Email and Mobile */}
                <div className={styles.inputGroup}>
                  <label>
                    Email Address <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    readOnly
                    className={styles.readOnly}
                    style={
                      formErrors.email
                        ? { borderColor: "red", outline: "none" }
                        : {}
                    }
                  />
                  {formErrors.email && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {formErrors.email[0]}
                    </span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label>
                    Mobile Number <span className={styles.required}>*</span>
                  </label>
                  <PhoneInput
                    country={"in"}
                    onlyCountries={['in']}
                    disableDropdown={true}
                    value={formData.phone || ""}
                    countryCodeEditable={false}
                    onChange={(val) =>
                      setFormData((p) => ({ ...p, phone: val }))
                    }
                    isValid={(value) => {
                      if (value && value.length < 10) return false;
                      return true;
                    }}
                    inputStyle={{
                      width: "100%",
                      height: "45px",
                      fontSize: "14px",
                      fontFamily: "var(--font-regular)",
                      borderRadius: "8px",
                      border: formErrors.phone
                        ? "1px solid red"
                        : "1px solid #E0E0E0",
                      boxShadow: "none",
                      paddingLeft: "48px",
                    }}
                    buttonStyle={{
                      border: formErrors.phone
                        ? "1px solid red"
                        : "1px solid #E0E0E0",
                      borderRight: "none",
                      borderTopLeftRadius: "8px",
                      borderBottomLeftRadius: "8px",
                      backgroundColor: "#fff",
                      padding: "2px",
                    }}
                    placeholder="Mobile Number"
                  />
                  {formErrors.phone && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {formErrors.phone[0]}
                    </span>
                  )}
                </div>

                {/* Row 3: Role */}
                <div className={styles.inputGroup}>
                  <label>
                    Role <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    name="role_id"
                    value={formData.role_id || ""}
                    readOnly
                    className={styles.readOnly}
                    style={
                      formErrors.role_id
                        ? { borderColor: "red", outline: "none" }
                        : {}
                    }
                  />
                  {formErrors.role_id && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {formErrors.role_id[0]}
                    </span>
                  )}
                </div>
                {/* Empty div to fill the second column for Row 3 */}
                <div></div>

              </div>
            )}

            {activeTab === "address" && (
              <div className={styles.fieldsGrid}>
                <div className={styles.inputGroup}>
                  <label>Street Address</label>
                  <textarea
                    name="street_address"
                    value={formData.street_address || ""}
                    onChange={handleChange}
                    placeholder="Enter street address"
                    autoComplete="new-password"
                    style={{
                      height: "100px",
                      ...(formErrors.street_address
                        ? { borderColor: "red", outline: "none" }
                        : {}),
                    }}
                  ></textarea>
                  {formErrors.street_address && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {formErrors.street_address[0]}
                    </span>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <label>Area / Locality</label>
                  <textarea
                    name="area_locality"
                    value={formData.area_locality || ""}
                    onChange={handleChange}
                    placeholder="Enter area or locality"
                    autoComplete="new-password"
                    style={{
                      height: "100px",
                      ...(formErrors.area_locality
                        ? { borderColor: "red", outline: "none" }
                        : {}),
                    }}
                  ></textarea>
                  {formErrors.area_locality && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {formErrors.area_locality[0]}
                    </span>
                  )}
                </div>
                <div className={styles.inputGroup}>
                  <label>Country</label>
                  <Select
                    filterOption={(option, inputValue) => {
                      if (!inputValue) return true;
                      return option.label
                        .toLowerCase()
                        .startsWith(inputValue.toLowerCase());
                    }}
                    options={countries.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                    value={
                      countries
                        .map((c) => ({ value: c.id, label: c.name }))
                        .find((opt) => opt.value === formData.country_id) ||
                      null
                    }
                    onChange={(opt) =>
                      setFormData((p) => ({
                        ...p,
                        country_id: opt?.value || null,
                        state_id: null,
                        city_id: null,
                      }))
                    }
                    placeholder="Select Country"
                    styles={customStyles}
                    instanceId="country-select-dummy-88"
                    name="random_country_select_88"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>State</label>
                  <Select
                    filterOption={(option, inputValue) => {
                      if (!inputValue) return true;
                      return option.label
                        .toLowerCase()
                        .startsWith(inputValue.toLowerCase());
                    }}
                    options={states.map((s) => ({
                      value: s.id,
                      label: s.name,
                    }))}
                    value={
                      states
                        .map((s) => ({ value: s.id, label: s.name }))
                        .find((opt) => opt.value === formData.state_id) || null
                    }
                    onChange={(opt) =>
                      setFormData((p) => ({
                        ...p,
                        state_id: opt?.value || null,
                        city_id: null,
                      }))
                    }
                    placeholder="Select State"
                    styles={customStyles}
                    instanceId="state-select-dummy-88"
                    name="random_state_select_88"
                    isDisabled={!formData.country_id}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>City</label>
                  <Select
                    filterOption={(option, inputValue) => {
                      if (!inputValue) return true;
                      return option.label
                        .toLowerCase()
                        .startsWith(inputValue.toLowerCase());
                    }}
                    options={cities.map((c) => ({
                      value: c.id,
                      label: c.name,
                    }))}
                    value={
                      cities
                        .map((city) => ({ value: city.id, label: city.name }))
                        .find((opt) => opt.value === formData.city_id) || null
                    }
                    onChange={(opt) =>
                      setFormData((p) => ({
                        ...p,
                        city_id: opt?.value || null,
                      }))
                    }
                    placeholder="Select City"
                    styles={customStyles}
                    instanceId="city-select-dummy-88"
                    name="random_city_select_88"
                    isDisabled={!formData.state_id}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Pin Code</label>
                  <input
                    type="text"
                    name="pin_code"
                    value={formData.pin_code || ""}
                    onChange={handleChange}
                    placeholder="Enter pin code"
                    autoComplete="new-password"
                    style={
                      formErrors.pin_code
                        ? { borderColor: "red", outline: "none" }
                        : {}
                    }
                  />
                  {formErrors.pin_code && (
                    <span
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "4px",
                        display: "block",
                      }}
                    >
                      {formErrors.pin_code[0]}
                    </span>
                  )}
                </div>
              </div>
            )}

            {activeTab === "document" && (
              <div className={styles.fieldsGrid} style={{ display: "block" }}>
                <KycDocuments
                  profile={profile}
                  token={token}
                  onKycError={(status, reasons) => {
                    setKycStatus(status);
                    setKycReasons(reasons);
                  }}
                  onSuccess={() => setActiveTab("review")}
                />
              </div>
            )}

            {activeTab === "review" && (
              <div className={styles.fieldsGrid} style={{ display: "block" }}>
                <ReviewSubmit
                  formData={formData}
                  setActiveTab={setActiveTab}
                  token={token}
                  fetchProfile={fetchProfile}
                />
              </div>
            )}

            {activeTab === "timeline" && (
              <div className={styles.fieldsGrid} style={{ display: "block" }}>
                <KycTimeline token={token} />
              </div>
            )}

            {activeTab === "verification" && (
              <div className={styles.fieldsGrid} style={{ display: "block" }}>
                <VerificationStep
                  formData={formData}
                  profile={profile}
                  setActiveTab={setActiveTab}
                />
              </div>
            )}

            {activeTab !== "document" &&
              activeTab !== "timeline" &&
              activeTab !== "review" &&
              activeTab !== "verification" && (
                <div
                  className={styles.formActions}
                  style={
                    activeTab === "personal"
                      ? { justifyContent: "flex-end" }
                      : {}
                  }
                >
                  <button type="submit" className={styles.btnSave}>
                    {activeTab === "personal"
                      ? "Save & Continue \u2192"
                      : "Save Changes"}
                  </button>
                  {activeTab !== "personal" && (
                    <button
                      type="button"
                      className={styles.btnCancel}
                      onClick={() => router.push("/auth/user/dashboard")}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}
          </form>
        </div>

        {/* Sidebar Widgets (Right) */}
        {!["document", "review", "verification"].includes(activeTab) && (
          <div className={styles.sidebarWidgets}>
            {/* Profile Photo Widget */}
            <div className={styles.widgetCard}>
              <h4 className={styles.widgetTitle}>Profile Photo</h4>
              <div className={styles.photoContainer}>
                <div className={styles.photoWrapper}>
                  <img
                    src={profileImage}
                    alt="Profile"
                    className={styles.avatarImg}
                  />
                  <button
                    className={styles.cameraBtn}
                    onClick={handleImageClick}
                  >
                    <FaCamera />
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <button
                className={styles.uploadPhotoBtn}
                onClick={handleImageClick}
              >
                {isUploadingPhoto
                  ? `Uploading (${photoProgress}%)`
                  : "Upload New Photo"}
              </button>
              <p className={styles.photoInfo}>
                Recommended: JPG, PNG or WEBP
                <br />
                Max size: 2MB. Min dimension: 200x200px
              </p>
            </div>

            {/* Need Help Widget */}
            <div className={styles.widgetCard}>
              <h4 className={styles.widgetTitle}>Need Help?</h4>
              <p className={styles.helpText}>
                If you face any issues while updating your profile, our support
                team is here to help you.
              </p>
              <button
                className={styles.contactSupportBtn}
                onClick={() => router.push("/auth/user/support")}
              >
                <FaHeadset /> Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
      </>
      )}
    </div>
  );
};

export default ProfileForm;
