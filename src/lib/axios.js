import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "X-Client-ID": process.env.X_CLIENT_ID,
    "X-Client-Secret": process.env.X_CLIENT_SECRET,
    Origin: process.env.NEXT_PUBLIC_API_URL,
  },
  withCredentials: true,
});

export default axiosInstance;
