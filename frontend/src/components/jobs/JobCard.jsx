import { formatDate } from "../../utils/constants";

const STATUS_DOT = {
  Saved:     "var(--saved)",
  Applied:   "var(--applied)",
  Interview: "var(--interview)",
  Offer:     "var(--offer)",
  Rejected:  "var(--rejected)",
};

export default function JobCard({ job, onEdit, onDelete, onDragStart }) {
  const dot = STATUS_DOT[job.status];

  return (
    <div
      draggable
      onDragStart={() => onDragStart(job._id)}
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: "14px 16px",
        cursor: "grab",
        transition: "box-shadow 0.15s, border-color 0.15s",
        boxShadow: "var(--shadow)",
        animation: "slideUp 0.2s ease",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--border-dark)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.borderColor = "var(--border)"; }}
    >
      {/* Company + status dot */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", lineHeight: 1.3 }}>
          {job.company}
        </div>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot, display: "inline-block", marginTop: 4, flexShrink: 0 }} />
      </div>

      {/* Role */}
      <div style={{ fontSize: 12, color: "var(--text-2)", marginBottom: 10 }}>
        {job.role}
      </div>

      {/* Meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 10 }}>
        {job.location && <span style={{ fontSize: 11, color: "var(--text-3)" }}>📍 {job.location}</span>}
        {job.salary   && <span style={{ fontSize: 11, color: "var(--text-3)" }}>💰 {job.salary}</span>}
        {job.appliedDate && <span style={{ fontSize: 11, color: "var(--text-3)" }}>🗓 {formatDate(job.appliedDate)}</span>}
      </div>

      {/* Notes preview */}
      {job.notes && (
        <div style={{ fontSize: 11, color: "var(--text-3)", borderTop: "1px solid var(--border)", paddingTop: 8, marginBottom: 10, lineHeight: 1.5 }}>
          {job.notes.slice(0, 65)}{job.notes.length > 65 ? "…" : ""}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: 6 }}>
        <button
          onClick={() => onEdit(job)}
          style={{ flex: 1, background: "var(--bg-raised)", border: "none", borderRadius: 8, padding: "5px 0", fontSize: 11, fontWeight: 600, color: "var(--text-2)", cursor: "pointer", fontFamily: "var(--font-body)" }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(job._id)}
          style={{ background: "var(--bg-raised)", border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600, color: "var(--rejected)", cursor: "pointer", fontFamily: "var(--font-body)" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
