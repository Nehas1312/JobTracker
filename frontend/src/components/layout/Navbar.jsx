import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ view, setView }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();

  const onDashboard = location.pathname === "/";
  const onAnalyze   = location.pathname.startsWith("/analyze");

  return (
    <nav style={{
      height: 60,
      background: "var(--bg-card)",
      borderBottom: "1px solid var(--border)",
      padding: "0 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>

      {/* Logo */}
      <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{
          width: 30, height: 30,
          background: "var(--accent)",
          borderRadius: 8,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14,
        }}>
          📋
        </div>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "var(--text)",
          letterSpacing: "-0.3px",
        }}>
          JobTrackr
        </span>
      </div>

      {/* Center nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>

        {/* Kanban / List — only on dashboard */}
        {onDashboard && setView && (
          <div style={{ display: "flex", background: "var(--bg-raised)", borderRadius: 8, padding: 3, gap: 2, marginRight: 8 }}>
            {["kanban", "list"].map((v) => (
              <button key={v} onClick={() => setView(v)} style={{
                background: view === v ? "var(--bg-card)" : "transparent",
                border: "none",
                borderRadius: 6,
                padding: "5px 14px",
                fontSize: 12,
                fontWeight: 600,
                color: view === v ? "var(--text)" : "var(--text-3)",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                transition: "all 0.15s",
                boxShadow: view === v ? "var(--shadow)" : "none",
              }}>
                {v === "kanban" ? "Kanban" : "List"}
              </button>
            ))}
          </div>
        )}

        {/* Analyze link */}
        <button onClick={() => navigate("/analyze")} style={{
          background: onAnalyze ? "var(--accent-light)" : "transparent",
          border: onAnalyze ? "1px solid #F0C4B0" : "1px solid transparent",
          borderRadius: 8,
          padding: "6px 14px",
          fontSize: 13,
          fontWeight: 600,
          color: onAnalyze ? "var(--accent)" : "var(--text-2)",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          transition: "all 0.15s",
        }}>
          Analyze Resume
        </button>
      </div>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {user && (
          <span style={{ fontSize: 13, color: "var(--text-2)", fontWeight: 500 }}>
            {user.name}
          </span>
        )}
        <button onClick={logout} style={{
          background: "transparent",
          border: "1px solid var(--border-dark)",
          borderRadius: 8,
          padding: "6px 14px",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--text-2)",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          transition: "all 0.15s",
        }}
          onMouseEnter={e => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; }}
          onMouseLeave={e => { e.target.style.borderColor = "var(--border-dark)"; e.target.style.color = "var(--text-2)"; }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
