import Job from "./job.model.js";

const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export const createJob = async (data, userId) => {
  const status = data.status?.toLowerCase() || "applied";

  // Normalize links — always ensure every link has an id
  let links = [];
  if (Array.isArray(data.links)) {
    links = data.links
      .filter(l => l && l.url)
      .map(l => ({ id: l.id || uid(), label: l.label || "Link", url: l.url }));
  } else if (data.links && typeof data.links === "object") {
    const labelMap = {
      jobUrl: "Job Posting", applicationUrl: "Application",
      companySite: "Company Site", referral: "Referral",
      recruiterProfile: "Recruiter Profile",
    };
    links = Object.entries(data.links)
      .filter(([, v]) => v && typeof v === "string")
      .map(([k, v]) => ({ id: uid(), label: labelMap[k] || k, url: v }));
  }

  return await Job.create({
    ...data,
    userId,
    status,
    links,
    notes: [],
    contacts: [],
    reminders: [],
    appliedDate: data.appliedDate || new Date(),
    statusHistory: [{ status, date: new Date() }],
  });
};

export const getJobs = async (query, userId) => {
  let { status, platform, search, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = query;
  page = Number(page); limit = Number(limit);
  const filter = { userId };
  if (status) filter.status = { $in: status.split(",") };
  if (platform) filter.platform = { $regex: platform, $options: "i" };
  if (search) filter.$or = [{ company: { $regex: search, $options: "i" } }, { role: { $regex: search, $options: "i" } }];
  const skip = (page - 1) * limit;
  const jobs = await Job.find(filter).sort({ [sortBy]: order === "asc" ? 1 : -1 }).skip(skip).limit(limit);
  const total = await Job.countDocuments(filter);
  return { jobs, meta: { page, total, pages: Math.ceil(total / limit) } };
};

export const getJobById = async (id, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  return job;
};

export const updateJob = async (id, data, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  if (data.status && data.status !== job.status) {
    job.statusHistory.push({ status: data.status, date: new Date() });
  }
  // Never overwrite subdoc arrays via general update
  const { notes, contacts, reminders, statusHistory, links: _links, ...safeData } = data;
  Object.assign(job, safeData);
  await job.save();
  return job;
};

// ── Notes ──────────────────────────────────────────────────
export const addNote = async (id, text, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  job.notes.push({ id: uid(), text, createdAt: new Date(), updatedAt: new Date() });
  await job.save(); return job;
};
export const updateNote = async (id, noteId, text, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  const note = job.notes.find(n => n.id === noteId);
  if (!note) throw new Error("Note not found");
  note.text = text; note.updatedAt = new Date();
  await job.save(); return job;
};
export const deleteNote = async (id, noteId, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  job.notes = job.notes.filter(n => n.id !== noteId);
  await job.save(); return job;
};

// ── Links ──────────────────────────────────────────────────
export const addLink = async (id, linkData, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  job.links.push({ id: uid(), ...linkData });
  await job.save(); return job;
};
export const updateLink = async (id, linkId, linkData, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  const link = job.links.find(l => l.id === linkId);
  if (!link) throw new Error("Link not found");
  Object.assign(link, linkData);
  await job.save(); return job;
};
export const deleteLink = async (id, linkId, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  job.links = job.links.filter(l => l.id !== linkId);
  await job.save(); return job;
};

// ── Contacts ────────────────────────────────────────────────
export const addContact = async (id, contactData, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  job.contacts.push({ id: uid(), ...contactData });
  await job.save(); return job;
};
export const deleteContact = async (id, contactId, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  job.contacts = job.contacts.filter(c => c.id !== contactId);
  await job.save(); return job;
};

// ── Reminders ────────────────────────────────────────────────
export const addReminder = async (id, reminderData, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  job.reminders.push({ id: uid(), ...reminderData, completed: false, emailSent: false });
  await job.save(); return job;
};
export const updateReminder = async (id, reminderId, data, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  const reminder = job.reminders.find(r => r.id === reminderId);
  if (!reminder) throw new Error("Reminder not found");
  Object.assign(reminder, data);
  await job.save(); return job;
};
export const deleteReminder = async (id, reminderId, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  if (!job) throw new Error("Job not found");
  job.reminders = job.reminders.filter(r => r.id !== reminderId);
  await job.save(); return job;
};

export const deleteJob = async (id, userId) => {
  const job = await Job.findOneAndDelete({ _id: id, userId });
  if (!job) throw new Error("Job not found");
};