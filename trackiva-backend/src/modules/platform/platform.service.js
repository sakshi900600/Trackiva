import Job from "../jobs/job.model.js";

export const getPlatformJobs = async (userId, platformName) => {
  return await Job.find({
    userId,
    platform: { $regex: new RegExp(`^${platformName}$`, "i") }, 
  }).sort({ appliedDate: -1 });
};