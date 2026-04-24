import axiosInstance from "./axiosInstance";

export const saveCoverLetter = async (data) => {
  return await axiosInstance.post("/cover-letter/save", data);
};

export const getCoverLetter = async (jobId) => {
  return await axiosInstance.get(`/cover-letter/${jobId}`);
};