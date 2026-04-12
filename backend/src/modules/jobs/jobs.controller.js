import { validationResult } from "express-validator";
import {
  getAllJobs,
  getSingleJob,
  createNewJob,
  updateExistingJob,
  deleteExistingJob,
} from "./jobs.service.js";

// @route  GET /api/jobs
// @access Private
export const getJobs = async (req, res) => {
  try {
    const { jobs, stats } = await getAllJobs(req.user._id, req.query);
    res.json({ success: true, count: jobs.length, stats, jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  GET /api/jobs/:id
// @access Private
export const getJob = async (req, res) => {
  try {
    const job = await getSingleJob(req.user._id, req.params.id);
    res.json({ success: true, job });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @route  POST /api/jobs
// @access Private
export const createJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const job = await createNewJob(req.user._id, req.body);
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route  PUT /api/jobs/:id
// @access Private
export const updateJob = async (req, res) => {
  try {
    const job = await updateExistingJob(req.user._id, req.params.id, req.body);
    res.json({ success: true, job });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

// @route  DELETE /api/jobs/:id
// @access Private
export const deleteJob = async (req, res) => {
  try {
    await deleteExistingJob(req.user._id, req.params.id);
    res.json({ success: true, message: "Job deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};
