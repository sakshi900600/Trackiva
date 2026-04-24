import * as reportService from "./report.service.js";

export const createReport = async (req, res, next) => {
  try {
    const report = await reportService.createReport(req.body, req.user._id);
    
    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      data: report,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserReports = async (req, res, next) => {
  try {
    const reports = await reportService.getUserReports(req.user._id);
    
    res.json({
      success: true,
      data: reports,
    });
  } catch (err) {
    next(err);
  }
};