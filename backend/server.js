require("dotenv").config({ path: __dirname + "/.env" });
console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "yes" : "no");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const rateLimit = require("express-rate-limit");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Global error handler to ensure JSON error responses (not HTML)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Server error" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
