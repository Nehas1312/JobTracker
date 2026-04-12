import { useNavigate } from "react-router-dom";

function scoreColor(score) {
  if (score >= 75) return "#10B981";
  if (score >= 50) return "#F59E0B";
  return "#EF4444";
}

export default function HistoryCard({ analysis }) {
  const navigate = useNavigate();

  const date = new Date(analysis.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      onClick={() => navigate(`/analyze/${analysis._id}`)}
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: "16px 20px",
        cursor: "pointer",
        transition: "border-color 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366F1")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      {/* Left — date and type */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
          {date}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
          {analysis.matchScore !== null && analysis.matchScore !== undefined
            ? "Resume + Job Match"
            : "ATS Score Only"}
        </div>
      </div>

      {/* Right — scores */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display)", color: scoreColor(analysis.atsScore) }}>
            {analysis.atsScore}
          </div>
          <div style={{ fontSize: 10, color: "var(--text-muted)" }}>ATS</div>
        </div>

        {analysis.matchScore !== null && analysis.matchScore !== undefined && (
          <>
            <div style={{ color: "var(--border)", fontSize: 18 }}>|</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display)", color: scoreColor(analysis.matchScore) }}>
                {analysis.matchScore}
              </div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>Match</div>
            </div>
          </>
        )}

        <div style={{ color: "var(--text-muted)", fontSize: 16, marginLeft: 4 }}>→</div>
      </div>
    </div>
  );
}
