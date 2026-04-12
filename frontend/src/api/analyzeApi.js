import api from "./axios";

// Resume only — no job description
export const analyzeResume = (file) => {
  const formData = new FormData();
  formData.append("resume", file);
  return api.post("/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Resume + job description
export const analyzeMatch = (file, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);
  return api.post("/analyze/match", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Get all past analyses
export const getHistory = () => api.get("/analyze/history");

// Get one full analysis
export const getAnalysis = (id) => api.get(`/analyze/${id}`);
