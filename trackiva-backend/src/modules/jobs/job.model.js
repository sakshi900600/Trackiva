import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
  { status: { type: String, enum: ["applied","screening","interview","offer","rejected"], required: true }, date: { type: Date, default: Date.now } },
  { _id: false }
);

const noteSchema = new mongoose.Schema(
  { id: { type: String, required: true }, text: { type: String, required: true }, createdAt: { type: Date, default: Date.now }, updatedAt: { type: Date, default: Date.now } },
  { _id: false }
);

const contactSchema = new mongoose.Schema(
  { id: { type: String, required: true }, name: { type: String, required: true }, role: { type: String, default: "" }, link: { type: String, default: "" } },
  { _id: false }
);

const reminderSchema = new mongoose.Schema(
  { id: { type: String, required: true }, title: { type: String, required: true }, note: { type: String, default: "" }, date: { type: String, default: "" }, time: { type: String, default: "" }, completed: { type: Boolean, default: false }, emailSent: { type: Boolean, default: false } },
  { _id: false }
);

const linkSchema = new mongoose.Schema(
  { id: { type: String, required: true }, label: { type: String, required: true }, url: { type: String, required: true } },
  { _id: false }
);

const jobSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    platform: { type: String, required: true, trim: true },
    platformUrl: { type: String, default: "" },
    status: { type: String, enum: ["applied","screening","interview","offer","rejected"], default: "applied", lowercase: true },
    confidenceScore: { type: Number, min: 0, max: 100, default: 50 },
    appliedDate: { type: Date, default: Date.now },
    statusHistory: { type: [statusHistorySchema], default: [] },
    notes: { type: [noteSchema], default: [] },
    links: { type: [linkSchema], default: [] },
    location: { type: String, default: "" },
    salary: { expected: { type: Number, default: 0 }, offered: { type: Number, default: 0 } },
    tags: { type: [String], default: [] },
    contacts: { type: [contactSchema], default: [] },
    reminders: { type: [reminderSchema], default: [] },
    resume: { name: { type: String, default: "" }, url: { type: String, default: "" }, uploadedAt: { type: String, default: "" } },
    extras: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);