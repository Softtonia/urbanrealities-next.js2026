"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileForm.module.css";
import { useDashboard } from "../../../../DashboardContext/DashboardContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import { FaUser, FaBuilding, FaMapMarkerAlt, FaIdCard, FaCamera, FaCheckCircle, FaExclamationCircle, FaHeadset } from "react-icons/fa";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";

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
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: '',
    alternate_number: "",
    user_name: "",
    unique_id: "",
    dob: "",
    gender: "",
    no_of_employees: "",
    country_id: "",
    state_id: "",
    city_id: "",
    pin_code: "",
    address: "",
    street_address: "",
    area_locality: '',
    colony: "",
    about: "",
  });


  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile data
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/user-profile?id=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const normalize = (value) => {
        // Converts unwanted values to empty string
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

      const data = await res.json();
      setLoading(false);

      if (data) {
        setProfile(data);

        // ✅ Pre-fill the form fields with normalization
        setFormData({
          unique_id: normalize(data.unique_id),
          email: normalize(data.email),
          first_name: normalize(data.first_name),
          last_name: normalize(data.last_name),
          role_id: normalize(data.role_name),
          user_name: normalize(data.user_name),
          phone: normalize(data.phone),
          alternate_number: normalize(data.alternate_number),
          dob: normalize(data.dob),
          gender: normalize(data.gender),
          no_of_employees: normalize(data.no_of_employees),
          country_id: normalize(data.country_id),
          state_id: normalize(data.state_id),
          city_id: normalize(data.city_id),
          pin_code: normalize(data.pin_code),
          area_locality: normalize(data.area_locality),
          colony: normalize(data.colony),
          street_address: normalize(data.street_address),
          address: normalize(data.address),
          about: normalize(data.about),
        });

        if (data.profile_photo) {
          setProfileImage(data.profile_photo);
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

  // ✅ Handle image change
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setFormData((prev) => ({
        ...prev,
        profile_photo: file,
      }));
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

    const dataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== 'N/A') {
        dataToSend.append(key, value);
        console.log(key, ":", value)
      }
    });

    try {
      const res = await fetch(`/api/auth/user-profile/update-profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: dataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Profile Updated Successfully:", data);
        router.push("/auth/user/dashboard");
      } else {
        console.error("❌ Update Failed:", data?.message || "Unknown error");
        alert("Profile update failed. Please try again.");
      }
      console.log("✅ Updated Successfully:", data);
    } catch (err) {
      console.error("❌ Update Failed:", err);
      alert("An error occurred. Please try again later.");
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
        { label: 'Dashboard', link: '/auth/user/dashboard' },
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
          
          <form className={styles.form} onSubmit={handleSubmit}>
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
                  <label>Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} />
                </div>

                {/* Row 3 */}
                <div className={styles.inputGroup}>
                  <label>Email Address <span className={styles.required}>*</span></label>
                  <input type="email" name="email" value={formData.email || ""} readOnly className={styles.readOnly} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Gender</label>
                  <select name="gender" value={formData.gender || ""} onChange={handleChange} className={styles.selectInput}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Row 4 */}
                <div className={styles.inputGroup}>
                  <label>Mobile Number <span className={styles.required}>*</span></label>
                  <div className={styles.phoneInputWrap}>
                    <select className={styles.phoneCode}><option>+91</option></select>
                    <input type="tel" name="phone" value={formData.phone || ""} onChange={handleChange} placeholder="Mobile Number" />
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label>No. of Employees</label>
                  <input type="number" name="no_of_employees" value={formData.no_of_employees || ""} onChange={handleChange} placeholder="Enter number of employees" />
                </div>

                {/* Row 5 */}
                <div className={styles.inputGroup}>
                  <label>Alternate Number</label>
                  <input type="tel" name="alternate_number" value={formData.alternate_number || ""} onChange={handleChange} placeholder="Enter alternate number (optional)" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Role <span className={styles.required}>*</span></label>
                  <input type="text" name="role_id" value={formData.role_id || ""} readOnly className={styles.readOnly} />
                </div>
                
                {/* Row 6 */}
                <div className={styles.inputGroup}>
                  <label>Aadhaar Number</label>
                  <div className={styles.verifiedInputWrap}>
                    <input type="text" value="8730 5119 8062" readOnly className={styles.readOnly} />
                    <span className={styles.verifiedBadge}><FaCheckCircle /> Verified</span>
                  </div>
                </div>
                
                <div className={styles.inputGroup} style={{gridColumn: "1 / -1"}}>
                  <label>About You</label>
                  <textarea name="about" value={formData.about || ""} onChange={handleChange} placeholder="Tell us something about yourself..." rows={4}></textarea>
                </div>
              </div>
            )}
            
            {activeTab === 'address' && (
              <div className={styles.fieldsGrid}>
                {/* Simplified address fields for now as they weren't explicitly requested to change structure, but we adapt them to grid */}
                <div className={styles.inputGroup}>
                  <label>Street Address</label>
                  <input type="text" name="street_address" value={formData.street_address || ""} onChange={handleChange} placeholder="Enter street address" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Area / Locality</label>
                  <input type="text" name="area_locality" value={formData.area_locality || ""} onChange={handleChange} placeholder="Enter area or locality" />
                </div>
                <div className={styles.inputGroup}>
                  <label>City</label>
                  <Select options={cities.map(c => ({ value: c.id, label: c.name }))} value={cities.map((city) => ({ value: city.id, label: city.name })).find((opt) => opt.value === formData.city_id) || null} onChange={(opt) => setFormData(p => ({ ...p, city_id: opt?.value || null }))} placeholder="Select City" styles={customStyles} instanceId="city-select" />
                </div>
                <div className={styles.inputGroup}>
                  <label>State</label>
                  <Select options={states.map(s => ({ value: s.id, label: s.name }))} value={states.map((s) => ({ value: s.id, label: s.name })).find((opt) => opt.value === formData.state_id) || null} onChange={(opt) => setFormData(p => ({ ...p, state_id: opt?.value || null, city_id: null }))} placeholder="Select State" styles={customStyles} instanceId="state-select" />
                </div>
                <div className={styles.inputGroup}>
                  <label>Pin Code</label>
                  <input type="text" name="pin_code" value={formData.pin_code || ""} onChange={handleChange} placeholder="Enter pin code" />
                </div>
              </div>
            )}
            
            {activeTab === 'kyc' && (
              <div className={styles.fieldsGrid}>
                <p>KYC documents will appear here.</p>
              </div>
            )}

            <div className={styles.formActions}>
              <button type="submit" className={styles.btnSave}>Save Changes</button>
              <button type="button" className={styles.btnCancel} onClick={() => router.push('/auth/user/dashboard')}>Cancel</button>
            </div>
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
            <button className={styles.uploadPhotoBtn} onClick={handleImageClick}>Upload New Photo</button>
            <p className={styles.photoInfo}>Recommended: JPG, PNG or WEBP<br/>Max size: 2MB. Min dimension: 200x200px</p>
          </div>

          {/* Profile Completion Widget */}
          <div className={styles.widgetCard}>
            <h4 className={styles.widgetTitle}>Profile Completion</h4>
            <div className={styles.completionHeader}>
              <div className={styles.circularProgress}><span>72%</span></div>
              <div>
                <h5>Profile Strength</h5>
                <p>Almost there! Keep going.</p>
              </div>
            </div>
            <div className={styles.progressLine}><div className={styles.progressFill} style={{width: '72%'}}></div></div>
            <ul className={styles.checklist}>
              <li className={styles.checked}><FaCheckCircle /> Email Verified</li>
              <li className={styles.checked}><FaCheckCircle /> Mobile Verified</li>
              <li className={styles.checked}><FaCheckCircle /> Account Approved</li>
              <li className={styles.pending}><FaExclamationCircle /> Add Profile Photo</li>
              <li className={styles.pending}><FaExclamationCircle /> Complete Address</li>
              <li className={styles.pending}><FaExclamationCircle /> Complete KYC</li>
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
