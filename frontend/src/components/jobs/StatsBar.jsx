import { STATUSES, STATUS_STYLES, getStatCount } from "../../utils/constants";

export default function StatsBar({ stats, totalJobs, filterStatus, setFilterStatus }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
      {STATUSES.map((status) => {
        const count = getStatCount(stats, status);
        const st = STATUS_STYLES[status];
        const active = filterStatus === status;
        return (
          <div
            key={status}
            onClick={() => setFilterStatus(active ? "All" : status)}
            style={{
              flex: "1 1 100px",
              minWidth: 90,
              background: "var(--bg-secondary)",
              border: `1px solid ${active ? st.dot : "var(--border)"}`,
              borderRadius: "var(--radius-lg)",
              padding: "12px 16px",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display)", color: st.dot }}>
              {count}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{status}</div>
          </div>
        );
      })}

      <div
        style={{
          flex: "1 1 100px", minWidth: 90,
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
          padding: "12px 16px",
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
          {totalJobs}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>Total</div>
      </div>
    </div>
  );
}
