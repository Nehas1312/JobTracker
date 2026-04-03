export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: isError ? "#7F1D1D" : "#064E3B",
        border: `1px solid ${isError ? "#EF4444" : "#10B981"}`,
        color: "#fff",
        padding: "11px 20px",
        borderRadius: 10,
        fontSize: 13,
        fontWeight: 500,
        zIndex: 999,
        animation: "fadeUp 0.2s ease",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <span>{isError ? "✕" : "✓"}</span>
      {toast.message}
    </div>
  );
}
