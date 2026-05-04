import express from "express";
import {
  createJob, getJobs, getJobById, updateJob, deleteJob,
  addNote, updateNote, deleteNote,
  addLink, updateLink, deleteLink,
  addContact, deleteContact,
  addReminder, updateReminder, deleteReminder,
} from "./job.controller.js";
import { protect } from "../../middleware/auth.middleware.js";

const router = express.Router();
router.use(protect);

router.route("/").post(createJob).get(getJobs);
router.route("/:id").get(getJobById).put(updateJob).delete(deleteJob);
router.post("/:id/notes", addNote);
router.put("/:id/notes/:noteId", updateNote);
router.delete("/:id/notes/:noteId", deleteNote);
router.post("/:id/links", addLink);
router.put("/:id/links/:linkId", updateLink);
router.delete("/:id/links/:linkId", deleteLink);
router.post("/:id/contacts", addContact);
router.delete("/:id/contacts/:contactId", deleteContact);
router.post("/:id/reminders", addReminder);
router.put("/:id/reminders/:reminderId", updateReminder);
router.delete("/:id/reminders/:reminderId", deleteReminder);

export default router;