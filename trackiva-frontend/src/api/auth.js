import axiosInstance from "./axiosInstance";

export const register = (userData) => 
  axiosInstance.post("/auth/register", userData);

export const login = (credentials) => 
  axiosInstance.post("/auth/login", credentials);

export const getProfile = () => 
  axiosInstance.get("/auth/profile");