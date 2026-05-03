import Job from "./job.model.js";

// CREATE JOB
export const createJob = async (data, userId) => {
  const status = data.status?.toLowerCase() || "applied";

  return await Job.create({
    ...data,
    userId,
    status,
    appliedDate: data.appliedDate || new Date(),
    statusHistory: [
      {
        status,
        date: new Date(),
      },
    ],
  });
};

// GET JOBS
export const getJobs = async (query, userId) => {
  let {
    status,
    platform,
    search,
    sortBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = query;

  // 🔥 FIX: convert to numbers
  page = Number(page);
  limit = Number(limit);

  const filter = { userId };

  if (status) {
    filter.status = { $in: status.split(",") };
  }

  if (platform) {
    filter.platform = { $regex: platform, $options: "i" };
  }

  if (search) {
    filter.$or = [
      { company: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const jobs = await Job.find(filter)
    .sort({ [sortBy]: order === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(limit);

  const total = await Job.countDocuments(filter);

  return {
    jobs,
    meta: {
      page,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

// GET SINGLE JOB
export const getJobById = async (id, userId) => {
  const job = await Job.findOne({ _id: id, userId });

  if (!job) throw new Error("Job not found");

  return job;
};

// UPDATE JOB
export const updateJob = async (id, data, userId) => {
  const job = await Job.findOne({ _id: id, userId });

  if (!job) throw new Error("Job not found");

  if (data.status && data.status !== job.status) {
    job.statusHistory.push({
      status: data.status,
      date: new Date(),
    });
  }

  Object.assign(job, data);

  await job.save();

  return job;
};

// DELETE JOB
export const deleteJob = async (id, userId) => {
  const job = await Job.findOneAndDelete({ _id: id, userId });

  if (!job) throw new Error("Job not found");
};