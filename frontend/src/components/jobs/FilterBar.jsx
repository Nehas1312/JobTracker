import { STATUSES } from "../../utils/constants";

export default function FilterBar({ search, setSearch, filterStatus, setFilterStatus, onAddJob }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>

      {/* Search */}
      <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 300 }}>
        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-3)", fontSize: 13 }}>🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search company, role, location…"
          style={{
            width: "100%",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "9px 12px 9px 34px",
            color: "var(--text)",
            fontSize: 13,
            outline: "none",
          }}
          onFocus={e => e.target.style.borderColor = "var(--accent)"}
          onBlur={e => e.target.style.borderColor = "var(--border)"}
        />
      </div>

      {/* Status filter */}
      <select
        value={filterStatus}
        onChange={e => setFilterStatus(e.target.value)}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "9px 12px",
          color: "var(--text)",
          fontSize: 13,
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="All">All Statuses</option>
        {STATUSES.map(s => <option key={s}>{s}</option>)}
      </select>

      {/* Add job button */}
      <button
        onClick={onAddJob}
        style={{
          marginLeft: "auto",
          background: "var(--accent)",
          border: "none",
          borderRadius: "var(--radius)",
          padding: "9px 18px",
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          transition: "opacity 0.15s",
        }}
        onMouseEnter={e => e.target.style.opacity = "0.88"}
        onMouseLeave={e => e.target.style.opacity = "1"}
      >
        + Add Job
      </button>
    </div>
  );
}
