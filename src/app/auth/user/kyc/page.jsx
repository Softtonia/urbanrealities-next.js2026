"use client";
import React, { useEffect, useState } from "react";
import { useSiteSettings } from "@/Components/mycontext/siteSettingContext";
import KycDocuments from "@/app/auth/user/dashboard/edit-profile/components/KycDocuments/KycDocuments";
import KycTimeline from "@/app/auth/user/dashboard/edit-profile/components/KycTimeline/KycTimeline";
import { getUserProfile } from "@/services/auth.service";
import ProtectedRoute from "@/Components/protectedRoute";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useDashboard } from "@/app/auth/user/DashboardContext/DashboardContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
      <Box sx={{ maxWidth: 1200, margin: "0 auto" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h1"
            sx={{ fontSize: "24px", fontWeight: 600, color: "var(--Gray-900)", m: "0 0 4px 0" }}
          >
            KYC Documents
          </Typography>
          {profile?.kyc_status && (
            <Box
              sx={{
                backgroundColor: ["approved", "verified", "completed", "accepted", "2"].includes(String(profile.kyc_status).toLowerCase()) ? "#e0f2fe" : ["rejected", "declined", "failed", "3"].includes(String(profile.kyc_status).toLowerCase()) ? "#fee2e2" : "#ffedd5",
                color: ["approved", "verified", "completed", "accepted", "2"].includes(String(profile.kyc_status).toLowerCase()) ? "#0284c7" : ["rejected", "declined", "failed", "3"].includes(String(profile.kyc_status).toLowerCase()) ? "#b91c1c" : "#c2410c",
                padding: "4px 12px",
                borderRadius: "16px",
                fontSize: "13px",
                fontWeight: 600,
              }}
            >
              {["approved", "verified", "completed", "accepted", "2"].includes(String(profile.kyc_status).toLowerCase()) ? "KYC Verified" : ["rejected", "declined", "failed", "3"].includes(String(profile.kyc_status).toLowerCase()) ? "KYC Rejected" : "KYC Pending"}
            </Box>
          )}
        </Box>
        {profile?.kyc_status && (
          <Box sx={{ 
            mb: 4, 
            display: ["approved", "verified", "completed", "accepted", "2"].includes(String(profile.kyc_status).toLowerCase()) || ["rejected", "declined", "failed", "3"].includes(String(profile.kyc_status).toLowerCase()) ? "flex" : "none",
            alignItems: 'center',
            gap: 1.5
          }}>
            {["approved", "verified", "completed", "accepted", "2"].includes(String(profile.kyc_status).toLowerCase()) 
              ? <FaCheckCircle style={{ color: "#16a34a", fontSize: "20px", flexShrink: 0 }} /> 
              : <FaTimesCircle style={{ color: "#dc2626", fontSize: "20px", flexShrink: 0 }} />
            }
            <Typography sx={{ 
              color: ["approved", "verified", "completed", "accepted", "2"].includes(String(profile.kyc_status).toLowerCase()) ? "#15803d" : "#b91c1c", 
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: 1.5
            }}>
              {["approved", "verified", "completed", "accepted", "2"].includes(String(profile.kyc_status).toLowerCase()) 
                ? "Congratulations! Your KYC is approved and your account is fully verified." 
                : "Your KYC has been rejected. Please review the remarks, check your documents, and try again."}
            </Typography>
          </Box>
        )}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress sx={{ color: "var(--Orange-500)" }} />
          </Box>
        ) : (
          <Box sx={{ 
            display: "grid", 
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, 
            gap: "32px", 
            alignItems: "start" 
          }}>
            <Box>
              <KycDocuments
                profile={profile}
                token={token}
                viewOnly={true}
                onKycError={(err) => console.error(err)}
                onSuccess={() => window.location.reload()}
              />
            </Box>
            <Box>
              <Box sx={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '24px', maxHeight: '800px', overflowY: 'auto' }}>
                <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: 600, mb: 2, mt: 0, color: "#111827" }}>
                  KYC Timeline
                </Typography>
                <KycTimeline token={token} />
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ProtectedRoute>
  );
}
