import express from "express";
import multer from "multer";

import {
  uploadResume,
  getResumes,
  renameResume,
  deleteResume,
  getResumeJobs,
} from "./resume.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

// 🔥 Multer storage (correct place)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"), false);
  },
});

router.use(protect);

router.post("/", upload.single("resume"), uploadResume);
router.get("/", getResumes);
router.put("/:id", renameResume);
router.delete("/:id", deleteResume);
router.get("/:id/jobs", getResumeJobs);

export default router;