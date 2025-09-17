
import axios from "axios";

export async function checkAuth() {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    console.log(token,userId)

    if (!token || !userId) return { isAuthenticated: false, user: null };

    try {
        const res = await axios.get(`/api/auth/getuser?id=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return { isAuthenticated: true, user: res.data?.name };
    } catch (error) {
        console.error("Auth check failed:", error.response?.data || error.message);
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userId");
        
        if (error.response?.status === 401) {
            // Option 1: Reload page
            window.location.reload();

            // Option 2: Redirect to login page
            // window.location.href = "/auth/login";
        }
        return { isAuthenticated: false, user: null };
    }
}
