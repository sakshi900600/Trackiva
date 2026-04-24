import axiosInstance from "./axiosInstance";

// Upload Resume
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const res = await axiosInstance.post("/resume", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// Get all resumes
export const getResumes = async () => {
  const res = await axiosInstance.get("/resume");
  return res.data;
};

// Rename resume
export const renameResume = async (id, name) => {
  const res = await axiosInstance.put(`/resume/${id}`, { name });
  return res.data;
};

// Delete resume
export const deleteResume = async (id) => {
  const res = await axiosInstance.delete(`/resume/${id}`);
  return res.data;
};

// Get jobs using resume
export const getResumeJobs = async (id) => {
  const res = await axiosInstance.get(`/resume/${id}/jobs`);
  return res.data;
};