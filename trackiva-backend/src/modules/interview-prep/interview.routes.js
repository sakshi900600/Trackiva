import express from "express";
import {
  createQA,
  getQAs,
  getQAById,
  updateQA,
  deleteQA,
} from "./interview.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createQA)
  .get(getQAs);

router.route("/:id")
  .get(getQAById)
  .put(updateQA)
  .delete(deleteQA);

export default router;