import express from "express";
import multer from "multer";
import path from "path";
import protect from "../../middleware/auth.middleware.js";
import { analyzeResume, analyzeMatch, getHistory, getAnalysis } from "./analyze.controller.js";

const router = express.Router();

// Save uploaded PDF to /uploads with a unique name so files never clash
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, unique);
  },
});

// Reject anything that is not a PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// All routes require login
router.use(protect);

router.post("/",       upload.single("resume"), analyzeResume);
router.post("/match",  upload.single("resume"), analyzeMatch);
router.get("/history", getHistory);
router.get("/:id",     getAnalysis);

export default router;
