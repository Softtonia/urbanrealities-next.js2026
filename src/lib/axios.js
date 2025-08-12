// lib/axiosInstance.ts or app/api/_utils/axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.LARAVEL_API_BASE_URL, // secure API base URL
  headers: {
    "X-Client-ID": process.env.X_CLIENT_ID,
    "X-Client-Secret": process.env.X_CLIENT_SECRET,
    "Content-Type": "application/json",
    "Origin": process.env.NEXT_PUBLIC_API_URL, // optional
  },
  withCredentials: true, // optional if cookies needed
});
// for token verifying
/* This code block is setting up an interceptor for the Axios instance. Interceptors in Axios are
functions that are called for every request before it is sent. In this specific interceptor: */
// axiosInstance.interceptors.request.use(
//   (config) => {
//       const sessionData = sessionStorage.getItem('token');
//       console.log(sessionData)
//       if (sessionData) {
//           try {
//             console.log(sessionData)
//               const parsed = JSON.parse(sessionData);
//               if (parsed?.token) {
//                   config.headers['Authorization'] = `Bearer ${parsed.token}`;
//               }
//           } catch (err) {
//               console.error('Invalid session auth format', err);
//           }
//       }
//       return config;
//   },
//   (error) => Promise.reject(error)
// );

export default axiosInstance;
