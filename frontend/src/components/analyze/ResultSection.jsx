// One section card — used for strengths, keywords, suggestions etc.
function Section({ title, icon, items, color, pill }) {
  if (!items || items.length === 0) return null;

  return (
    <div
      style={{
        background: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "20px 22px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <span style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{title}</span>
        <span style={{ fontSize: 11, background: "var(--bg-tertiary)", color: "var(--text-muted)", padding: "2px 8px", borderRadius: 20, marginLeft: "auto" }}>
          {items.length}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={
              pill
                ? {
                    display: "inline-flex",
                    alignItems: "center",
                    background: `${color}18`,
                    border: `1px solid ${color}40`,
                    borderRadius: 20,
                    padding: "4px 12px",
                    fontSize: 12,
                    color,
                    fontWeight: 500,
                    width: "fit-content",
                  }
                : {
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    fontSize: 13,
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }
            }
          >
            {!pill && (
              <span style={{ color, fontSize: 16, marginTop: 1, flexShrink: 0 }}>•</span>
            )}
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResultSection({ analysis }) {
  const hasMatch = analysis.matchScore !== null && analysis.matchScore !== undefined;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

      <Section
        title="Strengths"
        icon="💪"
        items={analysis.strengths}
        color="#10B981"
      />

      <Section
        title="Missing Keywords"
        icon="🔍"
        items={analysis.missingKeywords}
        color="#EF4444"
        pill
      />

      {hasMatch && analysis.matchedKeywords?.length > 0 && (
        <Section
          title="Matched Keywords"
          icon="✅"
          items={analysis.matchedKeywords}
          color="#10B981"
          pill
        />
      )}

      <Section
        title="Suggestions to Improve"
        icon="💡"
        items={analysis.suggestions}
        color="#6366F1"
        style={{ gridColumn: hasMatch ? "auto" : "1 / -1" }}
      />

    </div>
  );
}
