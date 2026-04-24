import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

// Load env vars
dotenv.config();

process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection:", err.message);
});

// Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});