import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resumeText: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      default: "",
    },
    atsScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    strengths: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    suggestions: {
      type: [String],
      default: [],
    },
    overallFeedback: {
      type: String,
      default: "",
    },
    // Only filled when user provides a job description
    matchScore: {
      type: Number,
      default: null,
    },
    matchedKeywords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Fetch history fast — newest first
analysisSchema.index({ user: 1, createdAt: -1 });

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;
