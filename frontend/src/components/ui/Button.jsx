const variants = {
  primary: {
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "#fff", border: "none",
  },
  secondary: {
    background: "#1E2433", color: "#9CA3AF", border: "none",
  },
  danger: {
    background: "#1E2433", color: "#F87171", border: "none",
  },
  ghost: {
    background: "transparent", color: "#6B7280", border: "none",
  },
};

export default function Button({ children, variant = "primary", onClick, disabled, style = {}, size = "md" }) {
  const padding = size === "sm" ? "5px 12px" : size === "lg" ? "12px 24px" : "8px 16px";
  const fontSize = size === "sm" ? 12 : size === "lg" ? 15 : 13;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variants[variant],
        padding,
        fontSize,
        fontWeight: 500,
        borderRadius: 8,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        transition: "opacity 0.15s",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.opacity = "0.85"; }}
      onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
    >
      {children}
    </button>
  );
}
