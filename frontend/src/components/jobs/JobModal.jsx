import { useState, useEffect } from "react";
import { STATUSES, EMPTY_FORM } from "../../utils/constants";
import Input from "../ui/Input";

const FIELDS = [
  { key: "company",     label: "Company",      type: "text",  ph: "e.g. Google",            required: true },
  { key: "role",        label: "Role",         type: "text",  ph: "e.g. Frontend Engineer",  required: true },
  { key: "location",    label: "Location",     type: "text",  ph: "e.g. Hyderabad" },
  { key: "salary",      label: "Salary / CTC", type: "text",  ph: "e.g. ₹18L" },
  { key: "appliedDate", label: "Applied Date", type: "date",  ph: "" },
  { key: "link",        label: "Job Link",     type: "url",   ph: "https://..." },
];

export default function JobModal({ isOpen, onClose, onSave, editJob }) {
  const [form, setForm]   = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editJob) {
      const appliedDate = editJob.appliedDate
        ? new Date(editJob.appliedDate).toISOString().split("T")[0]
        : "";
      setForm({ ...editJob, appliedDate });
    } else {
      setForm(EMPTY_FORM);
    }
    setError("");
  }, [editJob, isOpen]);

  const handleSubmit = async () => {
    if (!form.company.trim() || !form.role.trim()) {
      setError("Company and Role are required.");
      return;
    }
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(26,22,18,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn 0.15s ease" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ background: "var(--bg-card)", borderRadius: "var(--radius-lg)", padding: 28, width: "100%", maxWidth: 500, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", animation: "slideUp 0.2s ease" }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--text)" }}>
            {editJob ? "Edit Job" : "Add New Job"}
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--text-3)", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>

        {error && (
          <div style={{ background: "#FEF0EE", border: "1px solid #F5C6C6", borderLeft: "3px solid var(--rejected)", color: "var(--rejected)", borderRadius: "var(--radius)", padding: "10px 14px", fontSize: 12, marginBottom: 16 }}>
            {error}
          </div>
        )}

        {/* Fields */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {FIELDS.map(({ key, label, type, ph, required }) => (
            <Input
              key={key}
              label={label}
              type={type}
              value={form[key] || ""}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={ph}
              required={required}
            />
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Status</label>
            <select
              value={form.status}
              onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
              style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "9px 12px", color: "var(--text)", fontSize: 13, outline: "none" }}
            >
              {STATUSES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 5 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--text-2)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Notes</label>
          <textarea
            value={form.notes || ""}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Recruiter name, next steps, interview rounds…"
            rows={3}
            style={{ background: "var(--bg-input)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "9px 12px", color: "var(--text)", fontSize: 13, outline: "none", resize: "vertical", width: "100%", fontFamily: "var(--font-body)", lineHeight: 1.6 }}
            onFocus={e => e.target.style.borderColor = "var(--accent)"}
            onBlur={e => e.target.style.borderColor = "var(--border)"}
          />
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
          <button onClick={onClose} style={{ flex: 1, background: "var(--bg-raised)", border: "none", borderRadius: "var(--radius)", padding: "11px", fontSize: 13, fontWeight: 600, color: "var(--text-2)", cursor: "pointer", fontFamily: "var(--font-body)" }}>
            Cancel
          </button>
          <button onClick={handleSubmit} style={{ flex: 2, background: "var(--accent)", border: "none", borderRadius: "var(--radius)", padding: "11px", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer", fontFamily: "var(--font-body)", transition: "opacity 0.15s" }}
            onMouseEnter={e => e.target.style.opacity = "0.88"}
            onMouseLeave={e => e.target.style.opacity = "1"}
          >
            {editJob ? "Save Changes" : "Add Job"}
          </button>
        </div>
      </div>
    </div>
  );
}
