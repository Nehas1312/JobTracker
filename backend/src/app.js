import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import jobsRoutes from "./modules/jobs/jobs.routes.js";
import analyzeRoutes from "./modules/analyze/analyze.routes.js";

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/auth",    authRoutes);
app.use("/api/jobs",    jobsRoutes);
app.use("/api/analyze", analyzeRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "JobTrackr API is running" });
});
  
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

export default app;
