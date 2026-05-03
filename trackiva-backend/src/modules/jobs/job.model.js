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
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    platform: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["applied", "screening", "interview", "offer", "rejected"],
      default: "applied",
      lowercase: true,
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

    statusHistory: {
      type: [statusHistorySchema],
      default: [],
    },

    notes: {
      type: String,
      default: "",
    },

    links: {
      jobUrl: { type: String, default: "" },
      applicationUrl: { type: String, default: "" },
      companySite: { type: String, default: "" },
      referral: { type: String, default: "" },
      recruiterProfile: { type: String, default: "" },
    },

    location: {
      type: String,
      default: "",
    },

    salary: {
      expected: { type: Number, default: 0 },
      offered: { type: Number, default: 0 },
    },

    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);