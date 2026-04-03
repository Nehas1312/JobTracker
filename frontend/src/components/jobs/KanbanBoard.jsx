import { useState } from "react";
import { STATUSES, STATUS_STYLES } from "../../utils/constants";
import JobCard from "./JobCard";

export default function KanbanBoard({ jobs, onEdit, onDelete, onStatusChange }) {
  const [dragId, setDragId]   = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const handleDrop = (col) => {
    if (dragId) onStatusChange(dragId, col);
    setDragId(null);
    setDragOver(null);
  };

  return (
    <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 8 }}>
      {STATUSES.map((col) => {
        const colJobs = jobs.filter((j) => j.status === col);
        const st = STATUS_STYLES[col];
        const isOver = dragOver === col;

        return (
          <div
            key={col}
            onDragOver={(e) => { e.preventDefault(); setDragOver(col); }}
            onDrop={() => handleDrop(col)}
            onDragLeave={() => setDragOver(null)}
            style={{
              flex: "0 0 230px",
              background: isOver ? "var(--bg-tertiary)" : "var(--bg-secondary)",
              border: `1px solid ${isOver ? st.dot : "var(--border)"}`,
              borderRadius: "var(--radius-lg)",
              transition: "all 0.2s",
              minHeight: 400,
            }}
          >
            {/* Column header */}
            <div
              style={{
                padding: "13px 16px 10px",
                borderBottom: "1px solid var(--border)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>{col}</span>
              </div>
              <span
                style={{
                  fontSize: 11, background: "var(--bg-primary)", color: "var(--text-muted)",
                  padding: "2px 8px", borderRadius: 20,
                }}
              >
                {colJobs.length}
              </span>
            </div>

            {/* Cards */}
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 10 }}>
              {colJobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDragStart={setDragId}
                />
              ))}
              {colJobs.length === 0 && (
                <div style={{ textAlign: "center", color: "var(--text-faint)", fontSize: 12, padding: "28px 0" }}>
                  Drop jobs here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
