
import axios from "axios";

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

        return { isAuthenticated: true, user: res.data?.name,is_otp_verified: res.data?.is_otp_verified };
    } catch (error) {
        console.error("Auth check failed:", error.response?.data || error.message);
        
        if (error.response?.status === 401) {
            // localStorage.removeItem("token");
            // localStorage.removeItem("userId");
            // Option 1: Reload page
            // window.location.reload();

            // Option 2: Redirect to login page
            // window.location.href = "/auth/login";
        }
        return { isAuthenticated: false, user: null, is_otp_verified: false};
    }
}
