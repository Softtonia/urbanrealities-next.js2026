import axios from "axios";
import { getUserProfile } from "@/services/auth.service";

export async function checkAuth() {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    console.log(token,userId)

    if (!token || !userId || token === "undefined" || token === "null" || userId === "undefined" || userId === "null") return { isAuthenticated: false, user: null };

    try {
        const res = await axios.get(`/api/auth/getuser?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const fetchedRole = res.data?.role || res.data?.role_name || res.data?.data?.role || res.data?.data?.role_name;
        console.log("CHECK_AUTH_RESPONSE:", res.data);
        let kycStatus = res.data?.kyc_status || res.data?.data?.kyc_status || res.data?.data?.raw?.kyc_status || res.data?.data?.raw?.kyc || res.data?.data?.display?.kyc_status || res.data?.data?.kyc_module?.status;
        
        // If the getuser API doesn't return KYC status, fallback to the profile API which we know has it
        if (kycStatus === undefined || kycStatus === null) {
            try {
                const profileRes = await getUserProfile(userId, token);
                console.log("PROFILE_API_FALLBACK:", profileRes.data);
                kycStatus = profileRes.data?.raw?.kyc_status || profileRes.data?.raw?.kyc || profileRes.data?.kyc_status || profileRes.kyc_status;
            } catch (e) {
                console.error("Profile fallback failed:", e);
            }
        }
        
        return { isAuthenticated: true, user: res.data?.name, role: fetchedRole, is_otp_verified: res.data?.is_otp_verified, kyc_status: kycStatus };
    } catch (error) {
        console.error("Auth check failed:", error.response?.data || error.message);
        
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userRole");
            // Option 1: Reload page
            window.location.reload();

            // Option 2: Redirect to login page
            // window.location.href = "/auth/login";
        }
        return { isAuthenticated: false, user: null, role: null, is_otp_verified: false, kyc_status: null };
    }
}
