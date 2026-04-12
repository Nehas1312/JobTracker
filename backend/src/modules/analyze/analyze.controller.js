import fs from "fs";
import {
  extractTextFromPDF,
  analyzeResumeService,
  analyzeMatchService,
  getHistoryService,
  getSingleAnalysisService,
} from "./analyze.service.js";

// Helper to delete uploaded file after we are done with it
const cleanupFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// @route  POST /api/analyze
// @access Private
export const analyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload a PDF file" });
  }

  try {
    const resumeText = await extractTextFromPDF(req.file.path);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Could not read text from this PDF. Make sure it is not a scanned image.",
      });
    }

    const analysis = await analyzeResumeService(req.user._id, resumeText);
    res.status(201).json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } finally {
    // Always delete the PDF — we never store resumes on the server
    cleanupFile(req.file?.path);
  }
};

// @route  POST /api/analyze/match
// @access Private
export const analyzeMatch = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "Please upload a PDF file" });
  }

  const { jobDescription } = req.body;

  if (!jobDescription || jobDescription.trim().length < 20) {
    return res.status(400).json({ success: false, message: "Please paste the job description" });
  }

  try {
    const resumeText = await extractTextFromPDF(req.file.path);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Could not read text from this PDF. Make sure it is not a scanned image.",
      });
    }

    const analysis = await analyzeMatchService(req.user._id, resumeText, jobDescription);
    res.status(201).json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  } finally {
    cleanupFile(req.file?.path);
  }
};

// @route  GET /api/analyze/history
// @access Private
export const getHistory = async (req, res) => {
  try {
    const history = await getHistoryService(req.user._id);
    res.json({ success: true, count: history.length, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/analyze/:id
// @access Private
export const getAnalysis = async (req, res) => {
  try {
    const analysis = await getSingleAnalysisService(req.user._id, req.params.id);
    res.json({ success: true, analysis });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
