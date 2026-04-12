import express from "express";
import { body } from "express-validator";
import { getJobs, getJob, createJob, updateJob, deleteJob } from "./jobs.controller.js";
import protect from "../../middleware/auth.middleware.js";

const router = express.Router();

// All job routes require login
router.use(protect);

const jobValidation = [
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("role").trim().notEmpty().withMessage("Role is required"),
  body("status").optional().isIn(["Saved", "Applied", "Interview", "Offer", "Rejected"]),
];

router.route("/").get(getJobs).post(jobValidation, createJob);
router.route("/:id").get(getJob).put(updateJob).delete(deleteJob);

export default router;
