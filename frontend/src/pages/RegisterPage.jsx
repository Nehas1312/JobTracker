import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";

export default function RegisterPage() {
  const [form, setForm]     = useState({ name: "", email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const { register }        = useAuth();
  const navigate            = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>

      {/* Left panel */}
      <div style={{ flex: 1, background: "var(--text)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 56px" }}>
        <span style={{ fontSize: 28, fontFamily: "var(--font-display)", color: "#fff", fontWeight: 700, letterSpacing: "-0.5px", marginBottom: 12, display: "block" }}>
          JobTrackr
        </span>
        <p style={{ fontSize: 22, fontFamily: "var(--font-display)", color: "#E8D5C4", lineHeight: 1.4, maxWidth: 340 }}>
          Start tracking your job hunt today.
        </p>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px" }}>
        <div style={{ width: "100%", maxWidth: 380, animation: "slideUp 0.3s ease" }}>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            Create account
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 28 }}>
            It's free and takes 30 seconds
          </p>

          {error && (
            <div style={{ background: "#FEF0EE", border: "1px solid #F5C6C6", borderLeft: "3px solid var(--rejected)", color: "var(--rejected)", borderRadius: "var(--radius)", padding: "10px 14px", fontSize: 12, marginBottom: 18 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Full Name" type="text" value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your Name" required />

            <Input label="Email" type="email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@email.com" required />

            <Input label="Password" type="password" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Min 6 characters" required />

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "var(--accent)", border: "none", borderRadius: "var(--radius)", padding: "12px", fontSize: 14, fontWeight: 700, color: "#fff", cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", opacity: loading ? 0.7 : 1, marginTop: 4 }}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-2)", marginTop: 20 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
