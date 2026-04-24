import CoverLetter from "./cover.model.js"; // Assuming model is in the same folder

export const saveOrUpdateLetter = async (userId, data) => {
  const { jobId, content, title } = data;
  return await CoverLetter.findOneAndUpdate(
    { user: userId, jobId: jobId },
    { content, title, lastModified: Date.now() },
    { new: true, upsert: true }
  );
};

export const getLetterByJob = async (userId, jobId) => {
  return await CoverLetter.findOne({ user: userId, jobId: jobId });
};