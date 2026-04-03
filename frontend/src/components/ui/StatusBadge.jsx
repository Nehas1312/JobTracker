import { STATUS_STYLES } from "../../utils/constants";

export default function StatusBadge({ status }) {
  const st = STATUS_STYLES[status] || {};
  return (
    <span
      style={{
        background: st.bg,
        color: st.text,
        border: `1px solid ${st.border}`,
        borderRadius: 20,
        padding: "3px 10px",
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}
