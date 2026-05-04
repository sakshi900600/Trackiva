import axiosInstance from "./axiosInstance";

export const createJob = async (data) => (await axiosInstance.post("/jobs", data)).data;
export const getJobs = async (params = {}) => (await axiosInstance.get("/jobs", { params: { search: params.search || "", status: params.status || "", page: params.page || 1, limit: params.limit || 10 } })).data;
export const getJobById = async (id) => (await axiosInstance.get(`/jobs/${id}`)).data;
export const updateJob = async (id, data) => (await axiosInstance.put(`/jobs/${id}`, data)).data;
export const deleteJob = async (id) => (await axiosInstance.delete(`/jobs/${id}`)).data;

// Notes
export const addNote = async (id, text) => (await axiosInstance.post(`/jobs/${id}/notes`, { text })).data;
export const updateNote = async (id, noteId, text) => (await axiosInstance.put(`/jobs/${id}/notes/${noteId}`, { text })).data;
export const deleteNote = async (id, noteId) => (await axiosInstance.delete(`/jobs/${id}/notes/${noteId}`)).data;

// Links
export const addLink = async (id, data) => (await axiosInstance.post(`/jobs/${id}/links`, data)).data;
export const updateLink = async (id, linkId, data) => (await axiosInstance.put(`/jobs/${id}/links/${linkId}`, data)).data;
export const deleteLink = async (id, linkId) => (await axiosInstance.delete(`/jobs/${id}/links/${linkId}`)).data;

// Contacts
export const addContact = async (id, data) => (await axiosInstance.post(`/jobs/${id}/contacts`, data)).data;
export const deleteContact = async (id, contactId) => (await axiosInstance.delete(`/jobs/${id}/contacts/${contactId}`)).data;

// Reminders
export const addReminder = async (id, data) => (await axiosInstance.post(`/jobs/${id}/reminders`, data)).data;
export const updateReminder = async (id, reminderId, data) => (await axiosInstance.put(`/jobs/${id}/reminders/${reminderId}`, data)).data;
export const deleteReminder = async (id, reminderId) => (await axiosInstance.delete(`/jobs/${id}/reminders/${reminderId}`)).data;