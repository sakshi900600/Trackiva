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
  const {
    status,
    platform,
    search,
    sortBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = query;

  const filter = { userId };

  if (status) {
    const statusArray = status.split(",").map(s => s.toLowerCase());
    filter.status = { $in: statusArray };
  }

  if (platform) {
    filter.platform = { $regex: `^${platform}$`, $options: "i" };
  }

  if (search) {
    filter.$or = [
      { company: { $regex: search, $options: "i" } },
      { role: { $regex: search, $options: "i" } },
    ];
  }

  const sortOptions = {};
  const allowedSortFields = [
    "role",
    "status",
    "platform",
    "createdAt",
    "appliedDate",
  ];

  sortOptions[
    allowedSortFields.includes(sortBy) ? sortBy : "createdAt"
  ] = order === "asc" ? 1 : -1;

  const skip = (page - 1) * limit;

  const [jobs, total] = await Promise.all([
    Job.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit))
      .populate("resumeId", "name"),

    Job.countDocuments(filter),
  ]);

  return {
    jobs,
    meta: {
      page: Number(page),
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

// GET SINGLE JOB
export const getJobById = async (id, userId) => {
  const job = await Job.findOne({ _id: id, userId }).populate(
    "resumeId",
    "name"
  );

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  return job;
};

// UPDATE JOB
export const updateJob = async (id, data, userId) => {
  const job = await Job.findOne({ _id: id, userId });

  if (!job) {
    const error = new Error("Job not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }

  if (data.status) {
    data.status = data.status.toLowerCase();
  }

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

  if (!job) {
    const error = new Error("Job not found or unauthorized");
    error.statusCode = 404;
    throw error;
  }
};



// testing:
// job.service.js

export const createManyJobs = async (jobs, userId) => {
  const formattedJobs = jobs.map((data) => {
    const status = data.status?.toLowerCase() || "applied";

    return {
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
    };
  });

  return await Job.insertMany(formattedJobs);
};