// import Resume from "./resume.model.js";
// import Job from "../jobs/job.model.js";
// import cloudinary from "../../config/cloudinary.js";

// // Upload Resume
// export const uploadResume = async (file, userId) => {
//   const result = await cloudinary.uploader.upload(file.path, {
//     resource_type: "raw",
//     folder: "trackiva/resumes",
//   });

//   return await Resume.create({
//     userId,
//     name: file.originalname,
//     fileUrl: result.secure_url,
//     public_id: result.public_id,
//   });
// };

// // Get all resumes
// export const getResumes = async (userId) => {
//   return await Resume.find({ userId }).sort({ createdAt: -1 });
// };

// // Rename resume
// export const renameResume = async (id, name, userId) => {
//   const resume = await Resume.findOneAndUpdate(
//     { _id: id, userId },
//     { name },
//     { new: true }
//   );

//   if (!resume) throw new Error("Resume not found");

//   return resume;
// };

// // Delete resume
// export const deleteResume = async (id, userId) => {
//   const resume = await Resume.findOne({ _id: id, userId });

//   if (!resume) throw new Error("Resume not found");

//   await cloudinary.uploader.destroy(resume.public_id, {
//     resource_type: "raw",
//   });

//   await resume.deleteOne();
// };

// // Get jobs using this resume
// export const getResumeJobs = async (id, userId) => {
//   return await Job.find({ resumeId: id, userId }).select(
//     "company role status"
//   );
// };











// ==============================================================
// Testing for now without cloudary apis

import Resume from "./resume.model.js";
import Job from "../jobs/job.model.js";
import fs from "fs/promises";

// Upload Resume
export const uploadResume = async (file, userId) => {
  const fileName = file.filename;

  const localUrl = `/uploads/${fileName}`;

  return await Resume.create({
    userId,
    name: file.originalname,
    fileUrl: localUrl,
    public_id: fileName,
  });
};

// Get all resumes
export const getResumes = async (userId) => {
  return await Resume.find({ userId }).sort({ createdAt: -1 });
};

// Rename resume
export const renameResume = async (id, name, userId) => {
  const resume = await Resume.findOneAndUpdate(
    { _id: id, userId },
    { name },
    { new: true }
  );

  if (!resume) throw new Error("Resume not found");

  return resume;
};

// Delete resume
export const deleteResume = async (id, userId) => {
  const resume = await Resume.findOne({ _id: id, userId });

  if (!resume) throw new Error("Resume not found");

  try {
    await fs.unlink(`uploads/${resume.public_id}`);
  } catch {
    console.log("File not found locally");
  }

  await resume.deleteOne();
};

// Get jobs using this resume
export const getResumeJobs = async (id, userId) => {
  return await Job.find({ resumeId: id, userId }).select(
    "company role status"
  );
};