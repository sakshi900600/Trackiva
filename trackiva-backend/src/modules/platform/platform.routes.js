import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { getPlatformJobs } from "./platform.controller.js";

const router = express.Router();

router.use(protect);

// GET jobs by platform
router.get("/:platformName", getPlatformJobs);

export default router;