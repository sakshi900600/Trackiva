import mongoose from "mongoose";

const coverLetterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }, 
  title: { type: String, default: "Untitled Cover Letter" },
  content: { type: String, required: true },
  lastModified: { type: Date, default: Date.now }
}, { timestamps: true });

const CoverLetter = mongoose.model("CoverLetter", coverLetterSchema);
export default CoverLetter;