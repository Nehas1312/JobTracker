import { STATUSES } from "../../utils/constants";
import Button from "../ui/Button";

export default function FilterBar({ search, setSearch, filterStatus, setFilterStatus, onAddJob }) {
  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20, alignItems: "center", flexWrap: "wrap" }}>
      {/* Search */}
      <div style={{ position: "relative", flex: "1 1 220px", maxWidth: 320 }}>
        <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", fontSize: 14 }}>
          🔍
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search company, role, location…"
          style={{
            width: "100%",
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "9px 12px 9px 34px",
            color: "var(--text-primary)",
            fontSize: 13,
            outline: "none",
          }}
        />
      </div>

      {/* Status filter */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          padding: "9px 12px",
          color: "var(--text-primary)",
          fontSize: 13,
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="All">All Statuses</option>
        {STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>

      <Button onClick={onAddJob} style={{ marginLeft: "auto" }}>
        + Add Job
      </Button>
    </div>
  );
}
