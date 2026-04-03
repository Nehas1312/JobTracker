import { useState, useEffect } from "react";
import { STATUSES, EMPTY_FORM } from "../../utils/constants";
import Button from "../ui/Button";
import Input from "../ui/Input";

const FIELDS = [
  { key: "company",     label: "Company",      type: "text",   ph: "e.g. Google",           required: true },
  { key: "role",        label: "Role",         type: "text",   ph: "e.g. Frontend Engineer", required: true },
  { key: "location",    label: "Location",     type: "text",   ph: "e.g. Hyderabad" },
  { key: "salary",      label: "Salary / CTC", type: "text",   ph: "e.g. ₹18L" },
  { key: "appliedDate", label: "Applied Date", type: "date",   ph: "" },
  { key: "link",        label: "Job Link",     type: "url",    ph: "https://..." },
];

export default function JobModal({ isOpen, onClose, onSave, editJob }) {
  const [form, setForm]   = useState(EMPTY_FORM);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editJob) {
      // Format date for input[type=date]
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
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.75)",
        zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 28,
          width: "100%", maxWidth: 500,
          maxHeight: "90vh", overflowY: "auto",
          animation: "fadeUp 0.2s ease",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 800 }}>
            {editJob ? "Edit Job" : "Add New Job"}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: 20, cursor: "pointer" }}
          >
            ✕
          </button>
        </div>

        {error && (
          <div style={{ background: "#7F1D1D", border: "1px solid #EF4444", color: "#FCA5A5", borderRadius: 8, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        {/* Fields grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {FIELDS.map(({ key, label, type, ph, required }) => (
            <Input
              key={key}
              label={label}
              type={type}
              value={form[key] || ""}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={ph}
              required={required}
            />
          ))}

          {/* Status select */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              style={{
                background: "var(--bg-primary)", border: "1px solid var(--border)",
                borderRadius: 8, padding: "10px 12px",
                color: "var(--text-primary)", fontSize: 13, outline: "none",
              }}
            >
              {STATUSES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Notes
          </label>
          <textarea
            value={form.notes || ""}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            placeholder="Recruiter name, next steps, interview rounds…"
            rows={3}
            style={{
              background: "var(--bg-primary)", border: "1px solid var(--border)",
              borderRadius: 8, padding: "10px 12px",
              color: "var(--text-primary)", fontSize: 13,
              outline: "none", resize: "vertical", width: "100%",
              fontFamily: "var(--font-sans)",
            }}
          />
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <Button variant="secondary" onClick={onClose} style={{ flex: 1, padding: "12px" }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} style={{ flex: 2, padding: "12px", fontSize: 14 }}>
            {editJob ? "Save Changes" : "Add Job"}
          </Button>
        </div>
      </div>
    </div>
  );
}
