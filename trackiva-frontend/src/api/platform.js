import axiosInstance from "./axiosInstance";

// Get jobs by platform
export const getPlatformJobs = async (platformName) => {
  const res = await axiosInstance.get(`/platforms/${platformName}`);
  return res.data; // { success, data }
};