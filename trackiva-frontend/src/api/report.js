import axiosInstance from "./axiosInstance";

export const submitReport = (data) => 
  axiosInstance.post("/reports", data);