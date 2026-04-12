import express from "express";
import multer from "multer";
import protect from "../../middleware/auth.middleware.js";
import { analyzeResume, analyzeMatch, getHistory, getAnalysis } from "./analyze.controller.js";

const router = express.Router();

const storage = multer.memoryStorage();

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
