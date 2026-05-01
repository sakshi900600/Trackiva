import * as platformService from "./platform.service.js";

export const getPlatformJobs = async (req, res, next) => {
  try {
    const { platformName } = req.params;

    const jobs = await platformService.getPlatformJobs(
      req.user._id,
      platformName
    );

    res.json({
      success: true,
      data: jobs,
    });
  } catch (err) {
    next(err);
  }
};