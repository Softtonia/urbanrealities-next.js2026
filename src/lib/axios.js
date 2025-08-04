import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "X-Client-ID": process.env.X_CLIENT_ID,
    "X-Client-Secret": process.env.X_CLIENT_SECRET,
    "Content-Type": "application/json",
    Origin: process.env.NEXT_PUBLIC_API_URL,
  },
  withCredentials: true,
});
axiosInstance.interceptors.request.use(config => {
  console.log("Request Headers:", config.headers); 
  return config;
});

export default axiosInstance;
