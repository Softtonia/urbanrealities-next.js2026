"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileForm.module.css";
import { useDashboard } from "../../../../DashboardContext/DashboardContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import { FaUser, FaBuilding, FaMapMarkerAlt, FaIdCard, FaCamera, FaCheckCircle, FaExclamationCircle, FaHeadset } from "react-icons/fa";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import KycDocuments from "../KycDocuments/KycDocuments";
import { updatePersonalProfile, updateProfilePhoto, updateAddressProfile, getUserProfile } from "@/services/auth.service";
import { getCountries, getStates, getCities } from "@/services/location.service";
import { toast } from "react-toastify";

const ProfileForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState("personal");



  const { setShowSidebar, setPageHeading } = useDashboard();
  const { token } = useSiteSettings();
  const fileInputRef = useRef(null);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const [profileImage, setProfileImage] = useState("/profile-placeholder.png");
  const [profile, setProfile] = useState({});
  const [profileCompletion, setProfileCompletion] = useState({ percentage: 0, missing_fields: [] });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: '',
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
    area_locality: '',
    colony: "",
    about_us: "",
    business_country_id: "",
    business_state_id: "",
    business_city_id: "",
    business_area_locality: "",
    business_colony: "",
    business_street_address: "",
    business_pin_code: "",
    bussiness_address: "",
    aadhar_number: "",
    no_of_employees: "",
  });


  const [loading, setLoading] = useState(true);
  const [businessStates, setBusinessStates] = useState([]);
  const [businessCities, setBusinessCities] = useState([]);

  // ✅ Fetch profile data
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getUserProfile(id, token);
      setLoading(false);

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

        // ✅ Pre-fill the form fields with normalization
        setFormData({
          unique_id: normalize(rawData.unique_id),
          email: normalize(rawData.email),
          first_name: normalize(rawData.first_name),
          last_name: normalize(rawData.last_name),
          role_id: normalize(rawData.role_name),
          user_name: normalize(rawData.user_name),
          phone: normalize(rawData.phone),
          alternate_number: normalize(rawData.alternate_number),
          bussiness_name: normalize(rawData.bussiness_name),
          bussiness_email: normalize(rawData.bussiness_email),
          business_phone: normalize(rawData.business_phone),
          country_id: normalize(rawData.country_id),
          state_id: normalize(rawData.state_id),
          city_id: normalize(rawData.city_id),
          pin_code: normalize(rawData.pin_code),
          area_locality: normalize(rawData.area_locality),
          colony: normalize(rawData.colony),
          street_address: normalize(rawData.street_address),
          address: normalize(rawData.address),
          about_us: normalize(rawData.about_us || rawData.about),
          business_country_id: normalize(rawData.business_country_id),
          business_state_id: normalize(rawData.business_state_id),
          business_city_id: normalize(rawData.business_city_id),
          business_area_locality: normalize(rawData.business_area_locality),
          business_colony: normalize(rawData.business_colony),
          business_street_address: normalize(rawData.business_street_address),
          business_pin_code: normalize(rawData.business_pin_code),
          bussiness_address: normalize(rawData.bussiness_address),
          aadhar_number: normalize(rawData.aadhar_number),
          no_of_employees: normalize(rawData.no_of_employees),
        });

        if (rawData.profile_photo) {
          setProfileImage(rawData.profile_photo);
        }
      }

    } catch (err) {
      console.error("Error fetching profile:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  useEffect(() => {
    setPageHeading("");
  }, []);

  useEffect(() => {
    getCountries(token)
      .then(data => {
        if (Array.isArray(data)) setCountries(data);
        else if (data && data.status) setCountries(data.data || []);
      })
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    if (formData.country_id) {
      getStates(formData.country_id, token)
        .then(data => {
          if (Array.isArray(data)) setStates(data);
          else if (data && data.status) setStates(data.data || []);
        })
        .catch(console.error);
    } else {
      setStates([]);
    }
  }, [formData.country_id, token]);

  useEffect(() => {
    if (formData.state_id) {
      getCities(formData.state_id, token)
        .then(data => {
          if (Array.isArray(data)) setCities(data);
          else if (data && data.status) setCities(data.data || []);
        })
        .catch(console.error);
    } else {
      setCities([]);
    }
  }, [formData.state_id, token]);

  useEffect(() => {
    if (formData.business_country_id) {
      getStates(formData.business_country_id, token)
        .then(data => {
          if (Array.isArray(data)) setBusinessStates(data);
          else if (data && data.status) setBusinessStates(data.data || []);
        })
        .catch(console.error);
    } else {
      setBusinessStates([]);
    }
  }, [formData.business_country_id, token]);

  useEffect(() => {
    if (formData.business_state_id) {
      getCities(formData.business_state_id, token)
        .then(data => {
          if (Array.isArray(data)) setBusinessCities(data);
          else if (data && data.status) setBusinessCities(data.data || []);
        })
        .catch(console.error);
    } else {
      setBusinessCities([]);
    }
  }, [formData.business_state_id, token]);

  // ✅ Handle image change
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const [photoProgress, setPhotoProgress] = useState(0);
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
            const { checkUploadProgress } = await import('@/services/document.service');
            const pollInterval = setInterval(async () => {
              try {
                const progressRes = await checkUploadProgress(token, data.upload_id);
                if (progressRes.ok) {
                  const progressData = await progressRes.json();
                  const fileProgress = progressData?.progress?.files?.profile_photo;
                  
                  if (fileProgress) {
                    setPhotoProgress(fileProgress.percent || 10);
                    if (fileProgress.percent >= 100 || fileProgress.status === "completed" || fileProgress.status === "verified") {
                      clearInterval(pollInterval);
                      setIsUploadingPhoto(false);
                      setPhotoProgress(100);
                      toast.success(data.message || "Profile photo updated successfully!");
                    }
                  }
                }
              } catch (err) {
                console.error("Polling error", err);
              }
            }, 2000);
          } else {
            setIsUploadingPhoto(false);
            setPhotoProgress(100);
            toast.success(data.message || "Profile photo updated successfully!");
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
    const { name, value } = e.target;
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
      if (activeTab === 'personal') {
        const dataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== 'N/A') {
            dataToSend.append(key, value);
          }
        });
        data = await updatePersonalProfile(token, dataToSend);
      } else if (activeTab === 'address') {
        const dataToSend = new FormData();
        const addressKeys = [
          'country_id', 'state_id', 'city_id', 'street_address', 'pin_code', 'area_locality', 'colony', 'address',
          'business_country_id', 'business_state_id', 'business_city_id', 'business_area_locality', 'business_colony', 'business_street_address', 'business_pin_code', 'bussiness_address'
        ];
        addressKeys.forEach(key => {
          if (formData[key] !== undefined && formData[key] !== null && formData[key] !== 'N/A') {
            dataToSend.append(key, formData[key]);
          }
        });
        data = await updateAddressProfile(token, dataToSend);
      } else {
        return; // Other tabs not handled here
      }

      if (data && data.status) {
        console.log("✅ Profile Updated Successfully:", data);
        toast.success(data.message || "Information updated successfully.");
        router.push("/auth/business/dashboard");
      } else {
        console.error("❌ Update Failed:", data?.message || "Unknown error");
        toast.error(data?.message || "Profile update failed. Please try again.");
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
          }
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
          }
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
  if (loading) {
    return (
      <div className={styles.loadingOverlay}>
        <div className={styles.spinner}></div>
        <p></p>
      </div>
    )
  }

  return (
    <div className={styles.profileWraper}>
      <Breadcrumb items={[
        { label: 'Dashboard', link: '/auth/business/dashboard' },
        { label: 'Edit Profile', link: '' }
      ]} />
      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tab} ${activeTab === 'personal' ? styles.activeTab : ''}`}
          onClick={(e) => { e.preventDefault(); setActiveTab('personal'); }}
        >
          <FaUser className={styles.tabIcon} /> Personal Information
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'address' ? styles.activeTab : ''}`}
          onClick={(e) => { e.preventDefault(); setActiveTab('address'); }}
        >
          <FaMapMarkerAlt className={styles.tabIcon} /> Address Information
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'kyc' ? styles.activeTab : ''}`}
          onClick={(e) => { e.preventDefault(); setActiveTab('kyc'); }}
        >
          <FaIdCard className={styles.tabIcon} /> Documents & KYC
        </button>
      </div>

      <div className={styles.layoutGrid}>
        {/* Main Content Area (Left) */}
        <div className={styles.mainContent}>
          
          <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
            <div className={styles.formHeader}>
              <div className={styles.formHeaderIcon}>
                <FaUser />
              </div>
              <div className={styles.formHeaderText}>
                <h3>{activeTab === 'personal' ? 'Personal Information' : activeTab === 'address' ? 'Address Information' : 'Documents & KYC'}</h3>
                <p>Update your details</p>
              </div>
            </div>

            {activeTab === 'personal' && (
              <div className={styles.fieldsGrid}>
                {/* Row 1 */}
                <div className={styles.inputGroup}>
                  <label>First Name <span className={styles.required}>*</span></label>
                  <input type="text" name="first_name" value={formData.first_name || ""} onChange={handleChange} placeholder="First name" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Last Name <span className={styles.required}>*</span></label>
                  <input type="text" name="last_name" value={formData.last_name || ""} onChange={handleChange} placeholder="Last name" />
                </div>

                {/* Row 2 */}
                <div className={styles.inputGroup}>
                  <label>Username <span className={styles.required}>*</span></label>
                  <input type="text" name="user_name" value={formData.user_name || ""} readOnly className={styles.readOnly} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Email Address <span className={styles.required}>*</span></label>
                  <input type="email" name="email" value={formData.email || ""} readOnly className={styles.readOnly} />
                </div>

                {/* Row 3 */}
                <div className={styles.inputGroup}>
                  <label>Mobile Number <span className={styles.required}>*</span></label>
                  <div className={styles.phoneInputWrap}>
                    <select className={styles.phoneCode}><option>+91</option></select>
                    <input type="tel" name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Mobile Number" />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>Alternate Number</label>
                  <input type="tel" name="alternate_number" value={formData.alternate_number || ""} onChange={handleChange} placeholder="Enter alternate number (optional)" />
                </div>

                {/* Row 4 */}
                <div className={styles.inputGroup}>
                  <label>Role <span className={styles.required}>*</span></label>
                  <input type="text" name="role_id" value={formData.role_id || ""} readOnly className={styles.readOnly} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Aadhar Number</label>
                  <input type="text" name="aadhar_number" value={formData.aadhar_number || ""} onChange={handleChange} placeholder="Enter your 12 digit Aadhar number" autoComplete="new-password" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Business Email</label>
                  <input type="email" name="bussiness_email" value={formData.bussiness_email || ""} onChange={handleChange} placeholder="Enter business email" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Business Phone</label>
                  <input type="text" name="business_phone" value={formData.business_phone || ""} onChange={handleChange} placeholder="Enter business phone number" />
                </div>
                
                <div className={styles.inputGroup} style={{gridColumn: "1 / -1"}}>
                  <label>About You</label>
                  <textarea name="about_us" value={formData.about_us || ""} onChange={handleChange} placeholder="Tell us something about yourself..." rows={4}></textarea>
                </div>
              </div>
            )}
            
            {activeTab === 'address' && (
              <div className={styles.fieldsGrid}>
                <div className={styles.inputGroup}>
                  <label>Street Address</label>
                  <input type="text" name="street_address" value={formData.street_address || ""} onChange={handleChange} placeholder="Enter street address" autoComplete="new-password" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Area / Locality</label>
                  <input type="text" name="area_locality" value={formData.area_locality || ""} onChange={handleChange} placeholder="Enter area or locality" autoComplete="new-password" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Country</label>
                  <Select 
                    options={countries.map(c => ({ value: c.id, label: c.name }))} 
                    value={countries.map((c) => ({ value: c.id, label: c.name })).find((opt) => opt.value === formData.country_id) || null} 
                    onChange={(opt) => setFormData(p => ({ ...p, country_id: opt?.value || null, state_id: null, city_id: null }))} 
                    placeholder="Select Country" 
                    styles={customStyles} 
                    instanceId="country-select-dummy-88" 
                    name="random_country_select_88"
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>State</label>
                  <Select 
                    options={states.map(s => ({ value: s.id, label: s.name }))} 
                    value={states.map((s) => ({ value: s.id, label: s.name })).find((opt) => opt.value === formData.state_id) || null} 
                    onChange={(opt) => setFormData(p => ({ ...p, state_id: opt?.value || null, city_id: null }))} 
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
                    options={cities.map(c => ({ value: c.id, label: c.name }))} 
                    value={cities.map((city) => ({ value: city.id, label: city.name })).find((opt) => opt.value === formData.city_id) || null} 
                    onChange={(opt) => setFormData(p => ({ ...p, city_id: opt?.value || null }))} 
                    placeholder="Select City" 
                    styles={customStyles} 
                    instanceId="city-select-dummy-88" 
                    name="random_city_select_88"
                    isDisabled={!formData.state_id}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label>Pin Code</label>
                  <input type="text" name="pin_code" value={formData.pin_code || ""} onChange={handleChange} placeholder="Enter pin code" autoComplete="new-password" />
                </div>
              </div>
            )}
            
            {activeTab === 'address' && (
              <div style={{ marginTop: '2rem' }}>
                <div className={styles.formHeader}>
                  <div className={styles.formHeaderIcon}>
                    <FaBuilding />
                  </div>
                  <div className={styles.formHeaderText}>
                    <h3>Business Address Information</h3>
                    <p>Update your business address details</p>
                  </div>
                </div>
                <div className={styles.fieldsGrid}>
                  <div className={styles.inputGroup}>
                    <label>Business Name</label>
                    <input type="text" name="bussiness_name" value={formData.bussiness_name || ""} onChange={handleChange} placeholder="Enter business name" autoComplete="new-password" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>No. of Employees</label>
                    <input type="number" name="no_of_employees" value={formData.no_of_employees || ""} onChange={handleChange} placeholder="Enter number of employees" autoComplete="new-password" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Business Street Address</label>
                    <input type="text" name="business_street_address" value={formData.business_street_address || ""} onChange={handleChange} placeholder="Enter business street address" autoComplete="new-password" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Business Area / Locality</label>
                    <input type="text" name="business_area_locality" value={formData.business_area_locality || ""} onChange={handleChange} placeholder="Enter business area or locality" autoComplete="new-password" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Business Country</label>
                    <Select 
                      options={countries.map(c => ({ value: c.id, label: c.name }))} 
                      value={countries.map((c) => ({ value: c.id, label: c.name })).find((opt) => opt.value === formData.business_country_id) || null} 
                      onChange={(opt) => setFormData(p => ({ ...p, business_country_id: opt?.value || null, business_state_id: null, business_city_id: null }))} 
                      placeholder="Select Country" 
                      styles={customStyles} 
                      instanceId="business-country-select-dummy-88" 
                      name="business_country_id"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Business State</label>
                    <Select 
                      options={businessStates.map(s => ({ value: s.id, label: s.name }))} 
                      value={businessStates.map((s) => ({ value: s.id, label: s.name })).find((opt) => opt.value === formData.business_state_id) || null} 
                      onChange={(opt) => setFormData(p => ({ ...p, business_state_id: opt?.value || null, business_city_id: null }))} 
                      placeholder="Select State" 
                      styles={customStyles} 
                      instanceId="business-state-select-dummy-88" 
                      name="business_state_id"
                      isDisabled={!formData.business_country_id}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Business City</label>
                    <Select 
                      options={businessCities.map(c => ({ value: c.id, label: c.name }))} 
                      value={businessCities.map((city) => ({ value: city.id, label: city.name })).find((opt) => opt.value === formData.business_city_id) || null} 
                      onChange={(opt) => setFormData(p => ({ ...p, business_city_id: opt?.value || null }))} 
                      placeholder="Select City" 
                      styles={customStyles} 
                      instanceId="business-city-select-dummy-88" 
                      name="business_city_id"
                      isDisabled={!formData.business_state_id}
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Business Pin Code</label>
                    <input type="text" name="business_pin_code" value={formData.business_pin_code || ""} onChange={handleChange} placeholder="Enter business pin code" autoComplete="new-password" />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'kyc' && (
              <div className={styles.fieldsGrid} style={{ display: 'block' }}>
                <KycDocuments profile={profile} token={token} />
              </div>
            )}

            {activeTab !== 'kyc' && (
              <div className={styles.formActions}>
                <button type="submit" className={styles.btnSave}>Save Changes</button>
                <button type="button" className={styles.btnCancel} onClick={() => router.push('/auth/business/dashboard')}>Cancel</button>
              </div>
            )}
          </form>
        </div>

        {/* Sidebar Widgets (Right) */}
        <div className={styles.sidebarWidgets}>
          {/* Profile Photo Widget */}
          <div className={styles.widgetCard}>
            <h4 className={styles.widgetTitle}>Profile Photo</h4>
            <div className={styles.photoContainer}>
              <div className={styles.photoWrapper}>
                <img src={profileImage} alt="Profile" className={styles.avatarImg} />
                <button className={styles.cameraBtn} onClick={handleImageClick}>
                  <FaCamera />
                </button>
                <input type="file" accept="image/*" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
              </div>
            </div>
            <button className={styles.uploadPhotoBtn} onClick={handleImageClick}>
              {isUploadingPhoto ? `Uploading (${photoProgress}%)` : "Upload New Photo"}
            </button>
            <p className={styles.photoInfo}>Recommended: JPG, PNG or WEBP<br/>Max size: 2MB. Min dimension: 200x200px</p>
          </div>

          {/* Profile Completion Widget */}
          <div className={styles.widgetCard}>
            <h4 className={styles.widgetTitle}>Profile Completion</h4>
            <div className={styles.completionHeader}>
              <div className={styles.circularProgress}><span>{profileCompletion.percentage || 0}%</span></div>
              <div>
                <h5>Profile Strength</h5>
                <p>{profileCompletion.percentage === 100 ? "Excellent! Profile complete." : "Almost there! Keep going."}</p>
              </div>
            </div>
            <div className={styles.progressLine}><div className={styles.progressFill} style={{width: `${profileCompletion.percentage || 0}%`}}></div></div>
            <ul className={styles.checklist}>
              {profileCompletion.missing_fields && profileCompletion.missing_fields.length > 0 ? (
                profileCompletion.missing_fields.map((field, index) => {
                  const label = field.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                  return (
                    <li key={index} className={styles.pending}>
                      <FaExclamationCircle /> {label}
                    </li>
                  );
                })
              ) : (
                <li className={styles.checked}><FaCheckCircle /> Profile is 100% Complete!</li>
              )}
            </ul>
          </div>

          {/* Need Help Widget */}
          <div className={styles.widgetCard}>
            <h4 className={styles.widgetTitle}>Need Help?</h4>
            <p className={styles.helpText}>If you face any issues while updating your profile, our support team is here to help you.</p>
            <button className={styles.contactSupportBtn}>
              <FaHeadset /> Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>

  );

};

export default ProfileForm;
