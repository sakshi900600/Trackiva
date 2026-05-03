import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("📤 Request:", config.method?.toUpperCase(), config.url, "| Token:", token ? "✓" : "✗ MISSING");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("📥 Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("📥 Error response:", error.response?.status, error.config?.url, error.message);

    if (error.response?.status === 401) {
      console.warn("🔐 401 - redirecting to login");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(
      error.response?.data || {
        message: error.message || "Something went wrong",
      }
    );
  }
);

export default axiosInstance;