import Report from "./report.model.js";

export const createReport = async (data, userId) => {
  const report = await Report.create({
    ...data,
    userId,
  });
  return report;
};

export const getUserReports = async (userId) => {
  return await Report.find({ userId }).sort({ createdAt: -1 });
};