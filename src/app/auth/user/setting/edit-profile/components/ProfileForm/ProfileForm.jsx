"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfileForm.module.css";
import { useDashboard } from "../../../../DashboardContext/DashboardContext";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";

const ProfileForm = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();



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

  // Hide sidebar title
  useEffect(() => {
    setPageHeading("");
    return () => {
      setPageHeading("Welcome Back! Urbanrealities");
    };
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
        router.push("/auth/user/setting");
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
      {/* Profile Image Section */}
      <div className={styles.profileSection}>
        <img src={profileImage} alt="Profile" className={styles.profileImage} />
        <div className={styles.changeProfile} onClick={handleImageClick}>
          (Change Profile)
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* Profile Form */}
      <form className={styles.form} onSubmit={handleSubmit}>

        {/* Account Details */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Unique ID</label>
            <input type="text" name="unique_id" value={formData.unique_id || ""} readOnly />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email || ""} readOnly />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>User Name</label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name || ""}
              readOnly
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Role</label>
            <input
              type="text"
              name="role_id"
              value={formData.role_id || ""}
              readOnly
            />
          </div>

        </div>

        {/* Personal Info */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>
        </div>


        {/* Contact Details */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setFormData((prev) => ({ ...prev, phone: value }));
                }
              }}
              placeholder="Enter phone number"
              maxLength={10}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Alternate Number</label>
            <input
              type="tel"
              name="alternate_number"
              value={formData.alternate_number || ""}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  setFormData((prev) => ({ ...prev, alternate_number: value }));
                }
              }}
              placeholder="Enter alternate number"
              maxLength={10}
            />
          </div>
        </div>

        {/* Address Details */}
        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Country</label>
            <Select
              options={countries.map((c) => ({ value: c.id, label: c.name }))}
              value={countries.map((c) => ({ value: c.id, label: c.name }))
                .find((opt) => opt.value === formData.country_id) || null}
              onChange={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  country_id: option?.value || null,
                  state_id: null,
                  city_id: null,
                }))
              }
              placeholder="Select Country"
              styles={customStyles}
              instanceId="country-select"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>State</label>
            <Select
              options={states.map((s) => ({ value: s.id, label: s.name }))}
              value={states.map((s) => ({ value: s.id, label: s.name }))
                .find((opt) => opt.value === formData.state_id) || null}
              onChange={(option) =>
                setFormData((prev) => ({
                  ...prev,
                  state_id: option?.value || null,
                  city_id: null,
                }))
              }
              placeholder="Select State"
              styles={customStyles}
              instanceId="state-select"
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>City</label>
            <Select
              options={cities.map((city) => ({ value: city.id, label: city.name }))}
              value={cities.map((city) => ({ value: city.id, label: city.name }))
                .find((opt) => opt.value === formData.city_id) || null}
              onChange={(option) =>
                setFormData((prev) => ({ ...prev, city_id: option?.value || null }))
              }
              placeholder="Select City"
              styles={customStyles}
              instanceId="city-select"
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
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Area / Locality</label>
            <input
              type="text"
              name="area_locality"
              value={formData.area_locality || ""}
              onChange={handleChange}
              placeholder="Enter area or locality"
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Colony</label>
            <input
              type="text"
              name="colony"
              value={formData.colony || ""}
              onChange={handleChange}
              placeholder="Enter colony or area"
            />
          </div>


        </div>
        <div className={styles.inputGroup}>
          <label>Street Address</label>
          <input
            type="text"
            name="street_address"
            value={formData.street_address || ""}
            onChange={handleChange}
            placeholder="Enter street address"
          />
        </div>
        {/* About Section */}
        <div className={styles.inputGroup}>
          <label>About Me</label>
          <textarea
            name="about"
            value={formData.about || ""}
            onChange={handleChange}
            placeholder="Write something about yourself"
            rows={5}
          ></textarea>
        </div>

        {/* Submit */}
        <button className={styles.updateButton}>Update Profile</button>
      </form>
    </div>

  );

};

export default ProfileForm;
