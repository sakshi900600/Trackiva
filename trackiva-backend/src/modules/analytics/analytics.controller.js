import * as analyticsService from "./analytics.service.js";

export const getAnalytics = async (req, res, next) => {
  try {
    const data = await analyticsService.getAnalytics(
      req.user._id,
      req.query.range
    );

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};