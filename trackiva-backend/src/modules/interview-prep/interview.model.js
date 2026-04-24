import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    answer: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: ["hr", "behavioral", "technical", "other"],
      default: "other",
    },

    relatedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],

    // Optional: track improvements
    lastUpdated: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);