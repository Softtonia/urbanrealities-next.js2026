import axios from "axios";

const api = axios.create();

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // localStorage.removeItem("token");
            // localStorage.removeItem("userId");
            // window.location.href = "/auth/login";
            console.error("401 error caught by interceptor, but automatic logout is disabled for debugging.");
        }
        return Promise.reject(error);
    }
);

export default api;
