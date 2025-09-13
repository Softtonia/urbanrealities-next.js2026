import axios from "axios";

// let getToken;

// // 🔹 Detect runtime
// if (typeof window === "undefined") {
//   // Server-side (App Router)
//   try {
//     // lazy import inside server
//     const { cookies } = require("next/headers");
//     getToken = async () => {
//       const cookieStore = await cookies(); // ✅ await here
//       return cookieStore.get("token")?.value || null;
//     };
//     } catch {
//     getToken = () => null;
//   }
// } else {
//   // Client-side (browser)
//   getToken = () => {
//     try {
//       // if you store in cookie
//       const match = document.cookie.match(/(^| )token=([^;]+)/);
//       return match ? match[2] : null;
//     } catch {
//       return null;
//     }
//   };
// }

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

// 🔹 Add token conditionally
// axiosInstance.interceptors.request.use(
//   async(config) => {
//     const token = await getToken();
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
