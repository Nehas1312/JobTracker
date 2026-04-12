import fs from "fs";
import pdfParse from "pdf-parse/lib/pdf-parse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Analysis from "../../models/analysis.model.js";


// Read PDF from disk and pull out plain text
export const extractTextFromPDF = async (filePath) => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
};


// Prompt for resume-only analysis
const buildResumePrompt = (resumeText) => `
You are an expert ATS resume reviewer.
Analyze the resume below and reply ONLY with a valid JSON object. No extra text, no markdown.

Resume:
"""
${resumeText}
"""

JSON format:
{
  "atsScore": <number 0-100>,
  "strengths": [<3-5 strong points>],
  "missingKeywords": [<important missing keywords>],
  "suggestions": [<4-6 specific improvements>],
  "overallFeedback": "<2-3 sentence summary>"
}
`;


// Prompt for resume + job description match
const buildMatchPrompt = (resumeText, jobDescription) => `
You are an expert ATS resume reviewer.
Analyze how well the resume matches the job description. Reply ONLY with a valid JSON object. No extra text, no markdown.

Resume:
"""
${resumeText}
"""

Job Description:
"""
${jobDescription}
"""

JSON format:
{
  "atsScore": <resume quality score 0-100>,
  "matchScore": <how well resume matches this job 0-100>,
  "strengths": [<3-5 strong points>],
  "missingKeywords": [<keywords from job description missing in resume>],
  "matchedKeywords": [<keywords from job description found in resume>],
  "suggestions": [<4-6 specific suggestions to better match this job>],
  "overallFeedback": "<2-3 sentence summary>"
}
`;


// Send prompt to Gemini and parse JSON response
const askGemini = async (prompt) => {


  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing in environment variables");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const result = await model.generateContent(prompt);

  const text = result.response.text();

  // Gemini sometimes wraps JSON inside ```json ```
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {

    console.log("RAW GEMINI RESPONSE:");
    console.log(text);

    throw new Error("AI response was not valid JSON");
  }
};


// Resume-only analysis
export const analyzeResumeService = async (userId, resumeText) => {

  const ai = await askGemini(
    buildResumePrompt(resumeText)
  );

  const analysis = await Analysis.create({
    user: userId,
    resumeText,
    atsScore: ai.atsScore,
    strengths: ai.strengths,
    missingKeywords: ai.missingKeywords,
    suggestions: ai.suggestions,
    overallFeedback: ai.overallFeedback,
  });

  return analysis;
};


// Resume + Job Description match analysis
export const analyzeMatchService = async (userId, resumeText, jobDescription) => {

  const ai = await askGemini(
    buildMatchPrompt(resumeText, jobDescription)
  );

  const analysis = await Analysis.create({
    user: userId,
    resumeText,
    jobDescription,
    atsScore: ai.atsScore,
    matchScore: ai.matchScore,
    strengths: ai.strengths,
    missingKeywords: ai.missingKeywords,
    matchedKeywords: ai.matchedKeywords,
    suggestions: ai.suggestions,
    overallFeedback: ai.overallFeedback,
  });

  return analysis;
};


// Get past analyses
export const getHistoryService = async (userId) => {

  return await Analysis.find({ user: userId })
    .select("-resumeText -jobDescription")
    .sort({ createdAt: -1 });

};


// Get single analysis
export const getSingleAnalysisService = async (userId, analysisId) => {

  const analysis = await Analysis.findOne({
    _id: analysisId,
    user: userId
  });

  if (!analysis) {
    throw new Error("Analysis not found");
  }

  return analysis;

};