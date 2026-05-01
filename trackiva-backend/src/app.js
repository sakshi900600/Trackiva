import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./modules/auth/auth.routes.js";
import jobRoutes from "./modules/jobs/job.routes.js";
import resumeRoutes from "./modules/resume/resume.routes.js";
import interviewRoutes from "./modules/interview-prep/interview.routes.js";
import todoRoutes from "./modules/todo/todo.routes.js";
import quoteRoutes from "./modules/quote/quote.routes.js";
import analyticsRoutes from "./modules/analytics/analytics.routes.js";
import reportRoutes from "./modules/report/report.routes.js";
import coverRoutes from  "./modules/cover-letter/cover.routes.js";
import platformRoutes from "./modules/platform/platform.routes.js";


import { errorHandler } from "./middleware/error.middleware.js";

// for file upload in local , after deployment it will be stored on cloud
import path from "path";


const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger (dev only)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Health check
app.get("/", (req, res) => {
  res.send("Trackiva API running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/todo", todoRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/cover-letter", coverRoutes);
app.use("/uploads", express.static(path.resolve("uploads")));
app.use("/api/platforms", platformRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error middleware (must be last)
app.use(errorHandler);

export default app;