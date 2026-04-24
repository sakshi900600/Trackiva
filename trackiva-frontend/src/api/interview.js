import axiosInstance from "./axiosInstance";

// ✅ Create Q&A
export const createQA = async (data) => {
  const res = await axiosInstance.post("/interview", data);
  return res.data;
};

// ✅ Get all QAs (with filters)
export const getQAs = async (params = {}) => {
  const res = await axiosInstance.get("/interview", {
    params, // { category, search }
  });
  return res.data;
};

// ✅ Get single QA
export const getQAById = async (id) => {
  const res = await axiosInstance.get(`/interview/${id}`);
  return res.data;
};

// ✅ Update QA
export const updateQA = async (id, data) => {
  const res = await axiosInstance.put(`/interview/${id}`, data);
  return res.data;
};

// ✅ Delete QA
export const deleteQA = async (id) => {
  const res = await axiosInstance.delete(`/interview/${id}`);
  return res.data;
};