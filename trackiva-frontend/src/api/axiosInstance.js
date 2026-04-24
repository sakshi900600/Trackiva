import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 🔥 prevent infinite loading
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔐 Unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    // 🔥 Better error forwarding
    return Promise.reject(
      error.response?.data || {
        message: error.message || "Something went wrong",
      }
    );
  }
);

export default axiosInstance;