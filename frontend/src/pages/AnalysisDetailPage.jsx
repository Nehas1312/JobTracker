import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnalysis } from "../api/analyzeApi";
import Navbar from "../components/layout/Navbar";
import ScoreCard from "../components/analyze/ScoreCard";
import ResultSection from "../components/analyze/ResultSection";

export default function AnalysisDetailPage() {
  const { id }              = useParams();
  const navigate            = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    getAnalysis(id)
      .then(({ data }) => setAnalysis(data.analysis))
      .catch(() => setError("Analysis not found"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-muted)" }}>
          Loading...
        </div>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div style={{ minHeight: "100vh" }}>
        <Navbar />
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: 16 }}>Analysis not found.</p>
          <button
            onClick={() => navigate("/analyze")}
            style={{ color: "#A5B4FC", background: "none", border: "none", cursor: "pointer", fontSize: 14 }}
          >
            ← Back to Analyzer
          </button>
        </div>
      </div>
    );
  }

  const date = new Date(analysis.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "32px 32px", maxWidth: 900, margin: "0 auto" }}>

        {/* Back link */}
        <button
          onClick={() => navigate("/analyze")}
          style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", fontSize: 13, marginBottom: 20, padding: 0 }}
        >
          ← Back to Analyzer
        </button>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>
            Analysis Results
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
            {date} — {analysis.matchScore !== null && analysis.matchScore !== undefined ? "Resume + Job Match" : "ATS Score Only"}
          </p>
        </div>

        <ScoreCard analysis={analysis} />
        <ResultSection analysis={analysis} />
      </div>
    </div>
  );
}
