import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["applied", "screening", "interview", "offer", "rejected"],
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: [true, "Company is required"],
      trim: true,
    },

    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },

    platform: {
      type: String,
      required: [true, "Platform is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["applied", "screening", "interview", "offer", "rejected"],
      default: "applied",
      lowercase: true,
      trim: true,
    },

    confidenceScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 50,
    },

    appliedDate: {
      type: Date,
      default: Date.now,
    },

    statusHistory: [statusHistorySchema],

    resumeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },

    notes: { type: String, trim: true },

    links: {
      jobUrl: String,
      applicationUrl: String,
      companySite: String,
      referral: String,
      recruiterProfile: String,
    },

    location: { type: String, trim: true },

    salary: {
      expected: Number,
      offered: Number,
    },

    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);