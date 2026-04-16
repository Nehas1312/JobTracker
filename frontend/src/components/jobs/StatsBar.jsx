import { STATUSES, getStatCount } from "../../utils/constants";

const STATUS_CONFIG = {
  Saved:     { color: "var(--saved)",     bg: "#FEF9EC" },
  Applied:   { color: "var(--applied)",   bg: "#EBF4FC" },
  Interview: { color: "var(--interview)", bg: "#F3EEFA" },
  Offer:     { color: "var(--offer)",     bg: "#EAFAF2" },
  Rejected:  { color: "var(--rejected)",  bg: "#FEF0EE" },
};

export default function StatsBar({ stats, totalJobs, filterStatus, setFilterStatus }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
      {STATUSES.map(status => {
        const count  = getStatCount(stats, status);
        const cfg    = STATUS_CONFIG[status];
        const active = filterStatus === status;

        return (
          <div
            key={status}
            onClick={() => setFilterStatus(active ? "All" : status)}
            style={{
              flex: "1 1 100px",
              minWidth: 90,
              background: active ? cfg.bg : "var(--bg-card)",
              border: `1px solid ${active ? cfg.color + "60" : "var(--border)"}`,
              borderRadius: "var(--radius-lg)",
              padding: "14px 16px",
              cursor: "pointer",
              transition: "all 0.15s",
              boxShadow: active ? "var(--shadow)" : "none",
            }}
            onMouseEnter={e => { if (!active) e.currentTarget.style.borderColor = cfg.color + "60"; }}
            onMouseLeave={e => { if (!active) e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display)", color: cfg.color }}>
              {count}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2, fontWeight: 600 }}>
              {status}
            </div>
          </div>
        );
      })}

      {/* Total */}
      <div style={{ flex: "1 1 100px", minWidth: 90, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "14px 16px" }}>
        <div style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--text)" }}>
          {totalJobs}
        </div>
        <div style={{ fontSize: 11, color: "var(--text-2)", marginTop: 2, fontWeight: 600 }}>Total</div>
      </div>
    </div>
  );
}
