import Interview from "./interview.model.js";

// Create Q&A
export const createQA = async (data, userId) => {
  return await Interview.create({ ...data, userId });
};

// Get all (filter + search)
export const getQAs = async (query, userId) => {
  const { category, search } = query;

  const filter = { userId };

  if (category) filter.category = category;

  if (search) {
    filter.question = { $regex: search, $options: "i" };
  }

  return await Interview.find(filter)
    .sort({ updatedAt: -1 })
    .populate("relatedJobs", "company role status");
};

// Get single
export const getQAById = async (id, userId) => {
  const qa = await Interview.findOne({ _id: id, userId });

  if (!qa) throw new Error("Not found");

  return qa;
};

// Update
export const updateQA = async (id, data, userId) => {
  const qa = await Interview.findOneAndUpdate(
    { _id: id, userId },
    { ...data, lastUpdated: new Date() },
    { new: true, runValidators: true }
  );

  if (!qa) throw new Error("Not found");

  return qa;
};

// Delete
export const deleteQA = async (id, userId) => {
  const qa = await Interview.findOneAndDelete({ _id: id, userId });

  if (!qa) throw new Error("Not found");
};