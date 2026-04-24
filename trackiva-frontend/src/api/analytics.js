import axiosInstance from "./axiosInstance";

export const getAnalytics = async (range = "all") => {
  const res = await axiosInstance.get("/analytics", {
    params: { range },
  });
  return res.data;
};