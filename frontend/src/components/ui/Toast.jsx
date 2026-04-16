export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      right: 24,
      background: "var(--bg-card)",
      border: `1px solid ${isError ? "#F5C6C6" : "#C6EAD5"}`,
      borderLeft: `3px solid ${isError ? "var(--rejected)" : "var(--offer)"}`,
      color: "var(--text)",
      padding: "12px 18px",
      borderRadius: "var(--radius)",
      fontSize: 13,
      fontWeight: 500,
      zIndex: 999,
      boxShadow: "var(--shadow-md)",
      animation: "slideUp 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: 8,
    }}>
      <span style={{ fontSize: 15 }}>{isError ? "✕" : "✓"}</span>
      {toast.message}
    </div>
  );
}
