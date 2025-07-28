import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
    headers: {
        'X-Client-ID': process.env.NEXT_PUBLIC_X_CLIENT_ID,
        'X-Client-Secret': process.env.NEXT_PUBLIC_X_CLIENT_SECRET,
        // 'Origin':process.env.NEXT_PUBLIC_API_URL
    },
    withCredentials: true,
});
console.log("Client ID:", process.env.NEXT_PUBLIC_X_CLIENT_ID);
console.log("Client Secret:", process.env.NEXT_PUBLIC_X_CLIENT_SECRET);


// for token verifying
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const sessionData = sessionStorage.getItem('auth');
//         if (sessionData) {
//             try {
//                 const parsed = JSON.parse(sessionData);
//                 if (parsed?.token) {
//                     config.headers['Authorization'] = `Bearer ${parsed.token}`;
//                 }
//             } catch (err) {
//                 console.error('Invalid session auth format', err);
//             }
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );


// for global error handling
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             alert('Unauthorized. Please log in.');
//         }
//         return Promise.reject(error);
//     }
// );


export default axiosInstance;
