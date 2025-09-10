import axios from "axios";
import { cookies } from "next/headers"; // Next.js App Router cookies

const axiosInstance = axios.create({
  baseURL: process.env.LARAVEL_API_BASE_URL,
  headers: {
    "X-Client-ID": process.env.X_CLIENT_ID,
    "X-Client-Secret": process.env.X_CLIENT_SECRET,
    "Content-Type": "application/json",
    "Origin": process.env.NEXT_PUBLIC_API_URL,
  },
  withCredentials: true,
});

// 🔹 Add token if found, otherwise skip
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get("token")?.value;

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    } catch (err) {
      // Skip if cookies() not available (e.g. client-side request)
      console.warn("No token found in cookies:", err?.message);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
