import express from "express";
import { createReport, getUserReports } from "./report.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.post("/", createReport);
router.get("/", getUserReports);

export default router;