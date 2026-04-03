import { STATUSES, STATUS_STYLES, formatDate } from "../../utils/constants";
import Button from "../ui/Button";

export default function JobListView({ jobs, onEdit, onDelete, onStatusChange }) {
  if (jobs.length === 0) {
    return (
      <div
        style={{
          background: "var(--bg-secondary)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)", padding: "60px 20px",
          textAlign: "center", color: "var(--text-muted)",
        }}
      >
        No jobs found. Add one above!
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)" }}>
            {["Company", "Role", "Status", "Location", "Salary", "Applied", "Actions"].map((h) => (
              <th
                key={h}
                style={{
                  padding: "12px 16px", textAlign: "left",
                  fontSize: 11, color: "var(--text-muted)",
                  fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => {
            const st = STATUS_STYLES[job.status];
            return (
              <tr
                key={job._id}
                style={{ borderBottom: "1px solid var(--bg-tertiary)", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-tertiary)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "13px 16px", fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>
                  {job.company}
                </td>
                <td style={{ padding: "13px 16px", fontSize: 13, color: "var(--text-secondary)" }}>
                  {job.role}
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <select
                    value={job.status}
                    onChange={(e) => onStatusChange(job._id, e.target.value)}
                    style={{
                      background: st.bg, color: st.text,
                      border: `1px solid ${st.border}`,
                      borderRadius: 20, padding: "3px 10px",
                      fontSize: 12, fontWeight: 600, cursor: "pointer", outline: "none",
                    }}
                  >
                    {STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: "13px 16px", fontSize: 12, color: "var(--text-muted)" }}>
                  {job.location || "—"}
                </td>
                <td style={{ padding: "13px 16px", fontSize: 12, color: "var(--text-muted)" }}>
                  {job.salary || "—"}
                </td>
                <td style={{ padding: "13px 16px", fontSize: 12, color: "var(--text-muted)" }}>
                  {formatDate(job.appliedDate) || "—"}
                </td>
                <td style={{ padding: "13px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <Button variant="secondary" size="sm" onClick={() => onEdit(job)}>Edit</Button>
                    <Button variant="danger" size="sm" onClick={() => onDelete(job._id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
