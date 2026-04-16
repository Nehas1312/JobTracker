import { useState } from "react";
import { STATUSES } from "../../utils/constants";
import JobCard from "./JobCard";

const STATUS_CONFIG = {
  Saved:     { color: "var(--saved)",     label: "Saved" },
  Applied:   { color: "var(--applied)",   label: "Applied" },
  Interview: { color: "var(--interview)", label: "Interview" },
  Offer:     { color: "var(--offer)",     label: "Offer" },
  Rejected:  { color: "var(--rejected)",  label: "Rejected" },
};

export default function KanbanBoard({ jobs, onEdit, onDelete, onStatusChange }) {
  const [dragId,   setDragId]   = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const handleDrop = (col) => {
    if (dragId) onStatusChange(dragId, col);
    setDragId(null);
    setDragOver(null);
  };

  return (
    <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
      {STATUSES.map(col => {
        const colJobs = jobs.filter(j => j.status === col);
        const cfg     = STATUS_CONFIG[col];
        const isOver  = dragOver === col;

        return (
          <div
            key={col}
            onDragOver={e => { e.preventDefault(); setDragOver(col); }}
            onDrop={() => handleDrop(col)}
            onDragLeave={() => setDragOver(null)}
            style={{
              flex: "0 0 222px",
              background: isOver ? "#F9F6F2" : "var(--bg-raised)",
              border: `1px solid ${isOver ? cfg.color : "var(--border)"}`,
              borderRadius: "var(--radius-lg)",
              transition: "all 0.15s",
              minHeight: 420,
            }}
          >
            {/* Column header */}
            <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: cfg.color, display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--text-2)", letterSpacing: "0.03em" }}>
                  {col.toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: 11, background: "var(--bg-card)", color: "var(--text-3)", padding: "2px 7px", borderRadius: 20, border: "1px solid var(--border)", fontWeight: 600 }}>
                {colJobs.length}
              </span>
            </div>

            {/* Cards */}
            <div style={{ padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
              {colJobs.map(job => (
                <JobCard
                  key={job._id}
                  job={job}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDragStart={setDragId}
                />
              ))}
              {colJobs.length === 0 && (
                <div style={{ textAlign: "center", color: "var(--text-3)", fontSize: 12, padding: "32px 0", fontStyle: "italic" }}>
                  Drop here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
