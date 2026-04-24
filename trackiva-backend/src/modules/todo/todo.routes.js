import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "./todo.controller.js";

import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createTodo)
  .get(getTodos);

router.route("/:id")
  .put(updateTodo)
  .delete(deleteTodo);

export default router;