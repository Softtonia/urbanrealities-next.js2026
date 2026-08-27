"use client";
import React, { useState, useEffect } from "react";
import styles from "./ProfileFormInline.module.css";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import { getUserProfile } from "@/services/auth.service";
import ApprovedProfileView from "@/app/auth/user/dashboard/edit-profile/components/ApprovedProfileView/ApprovedProfileView";
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import { CircularProgress, Box } from "@mui/material";

import { decodeId } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const ProfileFormInline = () => {
  const { token, userId } = useSiteSettings();
  const searchParams = useSearchParams();
  const paramId = decodeId(searchParams.get("id"));
  const actualId = paramId || userId;
  
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (token && actualId) {
        try {
          const data = await getUserProfile(actualId, token);
          if (data && data.status && data.data) {
            const raw = data.data.raw || {};
            setFormData(raw);
            if (raw.profile_photo_url) {
              setProfileImage(raw.profile_photo_url);
            }
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      } else if (!token || !actualId) {
        setLoading(false);
      }
    };
    
    // Timeout as fallback
    const timer = setTimeout(() => {
        setLoading(false);
    }, 2000);
    
    fetchProfile();
    
    return () => clearTimeout(timer);
  }, [token, actualId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress sx={{ color: 'var(--Orange-Red, #ea580c)' }} />
      </Box>
    );
  }

  return (
    <div className={styles.profileWraper}>
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/auth/business/dashboard" },
          { label: "Edit Profile", link: "" },
        ]}
      />
      <ApprovedProfileView
        formData={formData}
        profileImage={profileImage}
        token={token}
        isBusiness={true}
      />
    </div>
  );
};

export default ProfileFormInline;
