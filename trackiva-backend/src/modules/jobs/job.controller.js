import * as jobService from "./job.service.js";

export const createJob = async (req, res, next) => {
  try {
    const { role, company, platform } = req.body;
    if (!role || !company || !platform)
      return res
        .status(400)
        .json({
          success: false,
          message: "Role, company and platform are required",
        });
    const job = await jobService.createJob(req.body, req.user._id);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const getJobs = async (req, res, next) => {
  try {
    const result = await jobService.getJobs(req.query, req.user._id);
    res.json({ success: true, data: result.jobs, meta: result.meta });
  } catch (err) {
    next(err);
  }
};
export const getJobById = async (req, res, next) => {
  try {
    const job = await jobService.getJobById(req.params.id, req.user._id);
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const updateJob = async (req, res, next) => {
  try {
    const job = await jobService.updateJob(
      req.params.id,
      req.body,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const deleteJob = async (req, res, next) => {
  try {
    await jobService.deleteJob(req.params.id, req.user._id);
    res.json({ success: true, message: "Job deleted" });
  } catch (err) {
    next(err);
  }
};
// Notes
export const addNote = async (req, res, next) => {
  try {
    const job = await jobService.addNote(
      req.params.id,
      req.body.text,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const updateNote = async (req, res, next) => {
  try {
    const job = await jobService.updateNote(
      req.params.id,
      req.params.noteId,
      req.body.text,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const deleteNote = async (req, res, next) => {
  try {
    const job = await jobService.deleteNote(
      req.params.id,
      req.params.noteId,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
// Links
export const addLink = async (req, res, next) => {
  try {
    const job = await jobService.addLink(req.params.id, req.body, req.user._id);
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const updateLink = async (req, res, next) => {
  try {
    const job = await jobService.updateLink(
      req.params.id,
      req.params.linkId,
      req.body,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const deleteLink = async (req, res, next) => {
  try {
    const job = await jobService.deleteLink(
      req.params.id,
      req.params.linkId,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
// Contacts
export const addContact = async (req, res, next) => {
  try {
    const job = await jobService.addContact(
      req.params.id,
      req.body,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const deleteContact = async (req, res, next) => {
  try {
    const job = await jobService.deleteContact(
      req.params.id,
      req.params.contactId,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
// Reminders
export const addReminder = async (req, res, next) => {
  try {
    const job = await jobService.addReminder(
      req.params.id,
      req.body,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const updateReminder = async (req, res, next) => {
  try {
    const job = await jobService.updateReminder(
      req.params.id,
      req.params.reminderId,
      req.body,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
export const deleteReminder = async (req, res, next) => {
  try {
    const job = await jobService.deleteReminder(
      req.params.id,
      req.params.reminderId,
      req.user._id,
    );
    res.json({ success: true, data: job });
  } catch (err) {
    next(err);
  }
};
