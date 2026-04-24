import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  createManyJobs,
} from "./job.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createJob)
  .get(getJobs);

router.route("/:id")
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob);


// testing;

router.post("/bulk", createManyJobs);

export default router;