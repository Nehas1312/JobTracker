import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

export default function Navbar({ view, setView }) {
  const { user, logout } = useAuth();

  return (
    <nav
      style={{
        height: 64,
        borderBottom: "1px solid var(--border)",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--bg-primary)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 32, height: 32,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}
        >
          📋
        </div>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
          JobTracker
        </span>
      </div>

      {/* View Toggle + Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", background: "var(--bg-secondary)", borderRadius: 8, padding: 3, gap: 2 }}>
          {["kanban", "list"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                background: view === v ? "var(--bg-tertiary)" : "transparent",
                border: "none",
                borderRadius: 6,
                padding: "5px 12px",
                fontSize: 12,
                color: view === v ? "#A5B4FC" : "var(--text-muted)",
                cursor: "pointer",
                fontWeight: 500,
                fontFamily: "var(--font-sans)",
                transition: "all 0.15s",
              }}
            >
              {v === "kanban" ? "⬛ Kanban" : "☰ List"}
            </button>
          ))}
        </div>

        {user && (
          <span style={{ fontSize: 12, color: "var(--text-muted)", padding: "0 4px" }}>
            {user.name}
          </span>
        )}

        <Button variant="ghost" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
