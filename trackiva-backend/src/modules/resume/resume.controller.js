import * as resumeService from "./resume.service.js";

export const uploadResume = async (req, res, next) => {
  try {
    const resume = await resumeService.uploadResume(
      req.file,
      req.user._id
    );

    res.status(201).json({
      success: true,
      message: "Resume uploaded",
      data: resume,
    });
  } catch (err) {
    next(err);
  }
};

export const getResumes = async (req, res, next) => {
  try {
    const resumes = await resumeService.getResumes(
      req.user._id
    );

    res.json({
      success: true,
      data: resumes,
    });
  } catch (err) {
    next(err);
  }
};

export const renameResume = async (req, res, next) => {
  try {
    const resume = await resumeService.renameResume(
      req.params.id,
      req.body.name,
      req.user._id
    );

    res.json({
      success: true,
      message: "Renamed successfully",
      data: resume,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteResume = async (req, res, next) => {
  try {
    await resumeService.deleteResume(
      req.params.id,
      req.user._id
    );

    res.json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const getResumeJobs = async (req, res, next) => {
  try {
    const jobs = await resumeService.getResumeJobs(
      req.params.id,
      req.user._id
    );

    res.json({
      success: true,
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};