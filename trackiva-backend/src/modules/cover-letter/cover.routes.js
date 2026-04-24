import express from "express";
import * as coverController from "./cover.controller.js"; // Note the single dot './'
import { protect } from "../../middleware/auth.middleware.js"; // Adjusted path to go up two levels

const router = express.Router();

router.post("/save", protect, coverController.handleSave);
router.get("/:jobId", protect, coverController.getLetter);

export default router;