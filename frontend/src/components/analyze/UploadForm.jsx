import { useState, useRef } from "react";
import Button from "../ui/Button";

export default function UploadForm({ onAnalyze, loading }) {
  const [file, setFile]               = useState(null);
  const [jobDescription, setJobDesc]  = useState("");
  const [dragging, setDragging]       = useState(false);
  const [mode, setMode]               = useState("resume"); // resume | match
  const fileInputRef                  = useRef(null);

  const handleFileChange = (e) => {
    const picked = e.target.files[0];
    if (picked && picked.type === "application/pdf") {
      setFile(picked);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type === "application/pdf") {
      setFile(dropped);
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    if (mode === "match" && !jobDescription.trim()) return;
    onAnalyze(file, mode === "match" ? jobDescription : null);
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>

      {/* Mode toggle — resume only vs match with job description */}
      <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: 10, padding: 4, gap: 4, marginBottom: 24 }}>
        {[
          { key: "resume", label: "📄 ATS Score Only" },
          { key: "match",  label: "🎯 Match with Job Description" },
        ].map((m) => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            style={{
              flex: 1,
              background: mode === m.key ? "var(--bg-tertiary)" : "transparent",
              border: "none",
              borderRadius: 8,
              padding: "10px 16px",
              fontSize: 13,
              fontWeight: 500,
              color: mode === m.key ? "#A5B4FC" : "var(--text-muted)",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              transition: "all 0.15s",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* PDF drop zone */}
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? "#6366F1" : file ? "#10B981" : "var(--border)"}`,
          borderRadius: 14,
          padding: "40px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragging ? "rgba(99,102,241,0.05)" : file ? "rgba(16,185,129,0.05)" : "var(--bg-secondary)",
          transition: "all 0.2s",
          marginBottom: 20,
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {file ? (
          <>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
              {file.name}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
              {(file.size / 1024).toFixed(0)} KB — click to change
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: 6 }}>
              Drop your resume here
            </div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              or click to browse — PDF only, max 5MB
            </div>
          </>
        )}
      </div>

      {/* Job description textarea — only shown in match mode */}
      {mode === "match" && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDesc(e.target.value)}
            placeholder="Paste the full job description here — the more detail, the better the match analysis..."
            rows={6}
            style={{
              width: "100%",
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              padding: "12px 14px",
              color: "var(--text-primary)",
              fontSize: 13,
              outline: "none",
              resize: "vertical",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.6,
              boxSizing: "border-box",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6366F1")}
            onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading || !file || (mode === "match" && !jobDescription.trim())}
        style={{ width: "100%", padding: "13px", fontSize: 15 }}
      >
        {loading ? "Analyzing your resume..." : mode === "match" ? "Analyze & Match" : "Analyze Resume"}
      </Button>

      {loading && (
        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>
          Gemini AI is reading your resume — this takes about 10-15 seconds
        </p>
      )}
    </div>
  );
}
