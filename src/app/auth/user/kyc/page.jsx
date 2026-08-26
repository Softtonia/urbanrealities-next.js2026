"use client";
import React, { useEffect, useState } from "react";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import KycDocuments from "@/app/auth/user/dashboard/edit-profile/components/KycDocuments/KycDocuments";
import { getUserProfile } from "@/services/auth.service";
import ProtectedRoute from "@/Components/protectedRoute";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useDashboard } from "@/app/auth/user/DashboardContext/DashboardContext";

export default function UserKycPage() {
  const { token, user } = useSiteSettings();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setPageHeading } = useDashboard();

  useEffect(() => {
    setPageHeading("");
  }, [setPageHeading]);

  useEffect(() => {
    if (token) {
      const fetchProfile = async () => {
        try {
          const id = user?.id || "";
          const res = await getUserProfile(id, token);
          if (res && res.status && res.data) {
            setProfile(res.data.raw || {});
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [token, user]);

  return (
    <ProtectedRoute>
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, margin: "0 auto" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, mb: 4, color: "var(--Gray-800)" }}
        >
          KYC Documents
        </Typography>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "var(--Orange-500)" }} />
          </Box>
        ) : (
          <KycDocuments
            profile={profile}
            token={token}
            viewOnly={true}
            onKycError={(err) => console.error(err)}
            onSuccess={() => window.location.reload()}
          />
        )}
      </Box>
    </ProtectedRoute>
  );
}
