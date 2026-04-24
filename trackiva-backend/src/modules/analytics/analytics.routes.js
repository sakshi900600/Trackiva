import express from "express";
import { getAnalytics } from "./analytics.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

// 🔥 Single endpoint for everything
router.get("/", getAnalytics);

export default router;