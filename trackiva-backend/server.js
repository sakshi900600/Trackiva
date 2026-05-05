import "./src/config/env.js"; // ← must be first
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

// dotenv.config() line removed from here

process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection:", err.message);
});

connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});