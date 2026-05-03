import * as jobService from "./job.service.js";

// CREATE JOB
export const createJob = async (req, res, next) => {
  try {
    const { role, company, platform } = req.body;

    if (!role || !company || !platform) {
      return res.status(400).json({
        success: false,
        message: "Role, company and platform are required",
      });
    }

    const job = await jobService.createJob(req.body, req.user._id);

    res.status(201).json({
      success: true,
      message: "Job created",
      data: job,
    });
  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    next(err);
  }
};

// GET ALL JOBS
export const getJobs = async (req, res, next) => {
  try {
    const result = await jobService.getJobs(req.query, req.user._id);

    res.json({
      success: true,
      message: "Jobs fetched",
      data: result.jobs,
      meta: result.meta,
    });
  } catch (err) {
    console.error("GET JOBS ERROR:", err);
    next(err);
  }
};

// GET SINGLE JOB
export const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(
      req.params.id,
      req.user._id
    );

    res.json({
      success: true,
      data: job,
    });
  } catch (err) {
    console.error("GET JOB ERROR:", err);
    next(err);
  }
};

// UPDATE JOB
export const updateJob = async (req, res, next) => {
  try {
    const job = await jobService.updateJob(
      req.params.id,
      req.body,
      req.user._id
    );

    res.json({
      success: true,
      message: "Job updated",
      data: job,
    });
  } catch (err) {
    console.error("UPDATE JOB ERROR:", err);
    next(err);
  }
};

// DELETE JOB
export const deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id, req.user._id);

    res.json({
      success: true,
      message: "Job deleted",
    });
  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    next(err);
  }
};