import { STATUSES, formatDate } from "../../utils/constants";

const STATUS_STYLE = {
  Saved:     { color: "var(--saved)",     bg: "#FEF9EC" },
  Applied:   { color: "var(--applied)",   bg: "#EBF4FC" },
  Interview: { color: "var(--interview)", bg: "#F3EEFA" },
  Offer:     { color: "var(--offer)",     bg: "#EAFAF2" },
  Rejected:  { color: "var(--rejected)",  bg: "#FEF0EE" },
};

export default function JobListView({ jobs, onEdit, onDelete, onStatusChange }) {
  if (jobs.length === 0) {
    return (
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "60px 20px", textAlign: "center", color: "var(--text-3)", fontStyle: "italic" }}>
        No jobs found.
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", overflow: "hidden", boxShadow: "var(--shadow)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg-raised)" }}>
            {["Company", "Role", "Status", "Location", "Salary", "Applied", "Actions"].map(h => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, fontWeight: 700, color: "var(--text-3)", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, i) => {
            const st = STATUS_STYLE[job.status];
            return (
              <tr
                key={job._id}
                style={{ borderBottom: i < jobs.length - 1 ? "1px solid var(--border)" : "none", transition: "background 0.12s" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <td style={{ padding: "12px 16px", fontWeight: 700, fontSize: 13, color: "var(--text)" }}>{job.company}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-2)" }}>{job.role}</td>
                <td style={{ padding: "12px 16px" }}>
                  <select
                    value={job.status}
                    onChange={e => onStatusChange(job._id, e.target.value)}
                    style={{ background: st.bg, color: st.color, border: "none", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, cursor: "pointer", outline: "none" }}
                  >
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-3)" }}>{job.location || "—"}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-3)" }}>{job.salary || "—"}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-3)" }}>{formatDate(job.appliedDate) || "—"}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => onEdit(job)} style={{ background: "var(--bg-raised)", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: "var(--text-2)", cursor: "pointer", fontFamily: "var(--font-body)" }}>Edit</button>
                    <button onClick={() => onDelete(job._id)} style={{ background: "var(--bg-raised)", border: "none", borderRadius: 6, padding: "4px 12px", fontSize: 11, fontWeight: 600, color: "var(--rejected)", cursor: "pointer", fontFamily: "var(--font-body)" }}>Delete</button>
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
