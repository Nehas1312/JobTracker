// Shows the big score circle — used for both ATS score and match score
function ScoreCircle({ score, label, color }) {
  // SVG circle math
  const radius      = 54;
  const circumference = 2 * Math.PI * radius;
  const filled      = (score / 100) * circumference;
  const empty       = circumference - filled;

  return (
    <div style={{ textAlign: "center" }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        {/* Background ring */}
        <circle cx="70" cy="70" r={radius} fill="none" stroke="var(--border)" strokeWidth="10" />
        {/* Score ring */}
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={`${filled} ${empty}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
        {/* Score number in the middle */}
        <text x="70" y="65" textAnchor="middle" fill="var(--color-text-primary, #F1F5F9)" fontSize="26" fontWeight="700" fontFamily="Syne, sans-serif">
          {score}
        </text>
        <text x="70" y="83" textAnchor="middle" fill="var(--color-text-secondary, #94A3B8)" fontSize="11" fontFamily="DM Sans, sans-serif">
          out of 100
        </text>
      </svg>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

// Pick color based on score range
function scoreColor(score) {
  if (score >= 75) return "#10B981"; // green
  if (score >= 50) return "#F59E0B"; // amber
  return "#EF4444";                  // red
}

export default function ScoreCard({ analysis }) {
  const hasMatch = analysis.matchScore !== null && analysis.matchScore !== undefined;

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: "32px 24px",
        marginBottom: 24,
      }}
    >
      {/* Score circles */}
      <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
        <ScoreCircle
          score={analysis.atsScore}
          label="ATS Score"
          color={scoreColor(analysis.atsScore)}
        />
        {hasMatch && (
          <ScoreCircle
            score={analysis.matchScore}
            label="Job Match Score"
            color={scoreColor(analysis.matchScore)}
          />
        )}
      </div>

      {/* Overall feedback */}
      {analysis.overallFeedback && (
        <div
          style={{
            marginTop: 28,
            padding: "16px 20px",
            background: "var(--bg-tertiary)",
            borderRadius: 10,
            borderLeft: "3px solid #6366F1",
          }}
        >
          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8 }}>
            Overall Feedback
          </div>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
            {analysis.overallFeedback}
          </p>
        </div>
      )}
    </div>
  );
}
