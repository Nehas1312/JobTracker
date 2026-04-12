import { useState, useEffect } from "react";
import { analyzeResume, analyzeMatch, getHistory } from "../api/analyzeApi";
import { useToast } from "../hooks/useToast";
import Navbar from "../components/layout/Navbar";
import UploadForm from "../components/analyze/UploadForm";
import ScoreCard from "../components/analyze/ScoreCard";
import ResultSection from "../components/analyze/ResultSection";
import HistoryCard from "../components/analyze/HistoryCard";
import Toast from "../components/ui/Toast";

export default function AnalyzePage() {
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState(null);
  const [history, setHistory]     = useState([]);
  const [tab, setTab]             = useState("analyze"); // analyze | history
  const { toast, showToast }      = useToast();

  // Load past analyses when the page opens
  useEffect(() => {
    getHistory()
      .then(({ data }) => setHistory(data.history))
      .catch(() => {}); // silently fail — history is not critical
  }, []);

  const handleAnalyze = async (file, jobDescription) => {
    setLoading(true);
    setResult(null);

    try {
      let res;

      if (jobDescription) {
        res = await analyzeMatch(file, jobDescription);
      } else {
        res = await analyzeResume(file);
      }

      setResult(res.data.analysis);

      // Add new result to top of history list without refetching
      setHistory((prev) => [res.data.analysis, ...prev]);

      showToast("Analysis complete!");
    } catch (error) {
      showToast(error.response?.data?.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* Navbar without view toggle — not needed on this page */}
      <Navbar />

      <div style={{ padding: "32px 32px", maxWidth: 900, margin: "0 auto" }}>

        {/* Page header */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800, marginBottom: 6 }}>
            Resume Analyzer
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
            Upload your resume and get an ATS score, missing keywords, and specific suggestions to improve it.
          </p>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 4, background: "var(--bg-secondary)", borderRadius: 10, padding: 4, marginBottom: 28, width: "fit-content" }}>
          {[
            { key: "analyze", label: "Analyze" },
            { key: "history", label: `History (${history.length})` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                background: tab === t.key ? "var(--bg-tertiary)" : "transparent",
                border: "none",
                borderRadius: 8,
                padding: "8px 20px",
                fontSize: 13,
                fontWeight: 500,
                color: tab === t.key ? "#A5B4FC" : "var(--text-muted)",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Analyze tab */}
        {tab === "analyze" && (
          <>
            <UploadForm onAnalyze={handleAnalyze} loading={loading} />

            {/* Results appear below the form after analysis */}
            {result && (
              <div style={{ marginTop: 36, animation: "fadeUp 0.3s ease" }}>
                <div style={{ borderTop: "1px solid var(--border)", marginBottom: 28 }} />
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, marginBottom: 20 }}>
                  Your Results
                </h2>
                <ScoreCard analysis={result} />
                <ResultSection analysis={result} />
              </div>
            )}
          </>
        )}

        {/* History tab */}
        {tab === "history" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {history.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-muted)", fontSize: 14 }}>
                No analyses yet. Upload your resume to get started.
              </div>
            ) : (
              history.map((h) => <HistoryCard key={h._id} analysis={h} />)
            )}
          </div>
        )}
      </div>

      <Toast toast={toast} />
    </div>
  );
}
