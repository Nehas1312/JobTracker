const express = require("express");
const { body } = require("express-validator");
const { getJobs, getJob, createJob, updateJob, deleteJob } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes protected
router.use(protect);

const jobValidation = [
  body("company").trim().notEmpty().withMessage("Company is required"),
  body("role").trim().notEmpty().withMessage("Role is required"),
  body("status").optional().isIn(["Saved", "Applied", "Interview", "Offer", "Rejected"]),
];

router.route("/").get(getJobs).post(jobValidation, createJob);
router.route("/:id").get(getJob).put(updateJob).delete(deleteJob);

module.exports = router;
