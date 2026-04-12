import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

export default function Navbar({ view, setView }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();

  const onDashboard = location.pathname === "/";
  const onAnalyze   = location.pathname.startsWith("/analyze");

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
      <div
        onClick={() => navigate("/")}
        style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
      >
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
          JobTrackr
        </span>
        <span
          style={{
            fontSize: 10, background: "var(--bg-tertiary)", color: "var(--text-muted)",
            padding: "2px 8px", borderRadius: 20, fontWeight: 500,
          }}
        >
          MERN Stack
        </span>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

        {/* Kanban / List toggle — only show on dashboard */}
        {onDashboard && setView && (
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
        )}

        {/* Analyze nav link */}
        <button
          onClick={() => navigate("/analyze")}
          style={{
            background: onAnalyze ? "var(--bg-tertiary)" : "transparent",
            border: "none",
            borderRadius: 8,
            padding: "6px 14px",
            fontSize: 13,
            fontWeight: 500,
            color: onAnalyze ? "#A5B4FC" : "var(--text-muted)",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            transition: "all 0.15s",
          }}
        >
          🔍 Analyze Resume
        </button>

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
