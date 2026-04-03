import { formatDate } from "../../utils/constants";
import Button from "../ui/Button";

export default function JobCard({ job, onEdit, onDelete, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={() => onDragStart(job._id)}
      style={{
        background: "var(--bg-primary)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        padding: "12px 14px",
        cursor: "grab",
        transition: "border-color 0.2s",
        animation: "fadeUp 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#6366F1")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)", marginBottom: 2 }}>
        {job.company}
      </div>
      <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
        {job.role}
      </div>

      {job.location && (
        <div style={{ fontSize: 11, color: "var(--text-faint)", marginBottom: 3 }}>
          📍 {job.location}
        </div>
      )}
      {job.salary && (
        <div style={{ fontSize: 11, color: "var(--text-faint)", marginBottom: 6 }}>
          💰 {job.salary}
        </div>
      )}
      {job.appliedDate && (
        <div style={{ fontSize: 11, color: "var(--text-faint)" }}>
          Applied {formatDate(job.appliedDate)}
        </div>
      )}
      {job.notes && (
        <div
          style={{
            fontSize: 11, color: "var(--text-muted)", marginTop: 8,
            borderTop: "1px solid var(--border)", paddingTop: 8, lineHeight: 1.5,
          }}
        >
          {job.notes.slice(0, 70)}{job.notes.length > 70 ? "…" : ""}
        </div>
      )}

      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <Button variant="secondary" size="sm" onClick={() => onEdit(job)} style={{ flex: 1 }}>
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(job._id)}>
          ✕
        </Button>
      </div>
    </div>
  );
}
