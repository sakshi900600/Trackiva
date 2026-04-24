import axiosInstance from "./axiosInstance";

// Create Job
export const createJob = async (data) => {
  const res = await axiosInstance.post("/jobs", data);
  return res.data;
};

// Get Jobs (with filters, search, pagination)
export const getJobs = async (params = {}) => {
  const res = await axiosInstance.get("/jobs", {
    params: {
      search: params.search || "",
      status: params.status || "",
      page: params.page || 1,
      limit: params.limit || 10,
    },
  });

  return res.data;
};

// Get Single Job
export const getJobById = async (id) => {
  const res = await axiosInstance.get(`/jobs/${id}`);
  return res.data;
};

// Update Job
export const updateJob = async (id, data) => {
  const res = await axiosInstance.put(`/jobs/${id}`, data);
  return res.data;
};

// Delete Job
export const deleteJob = async (id) => {
  const res = await axiosInstance.delete(`/jobs/${id}`);
  return res.data;
};