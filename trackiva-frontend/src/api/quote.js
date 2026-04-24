import axiosInstance from "./axiosInstance.js";

// 📌 Get daily quote
export const getQuote = async () => {
  const res = await axiosInstance.get("/quote");
  return res.data.data;
};