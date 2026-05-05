import axiosInstance from "./axiosInstance";

export const login = (data) => axiosInstance.post("/auth/login", data);
export const register = (data) => axiosInstance.post("/auth/register", data);
export const googleAuth = (idToken) => axiosInstance.post("/auth/google", { idToken });
export const forgotPassword = (email) => axiosInstance.post("/auth/forgot-password", { email });
export const resetPassword = (token, password) =>
  axiosInstance.post(`/auth/reset-password/${token}`, { password });

export const getProfile = () => axiosInstance.get("/auth/profile");