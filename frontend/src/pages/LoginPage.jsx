import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Input from "../components/ui/Input";

export default function LoginPage() {
  const [form, setForm]     = useState({ email: "", password: "" });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const { login }           = useAuth();
  const navigate            = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "var(--bg)" }}>

      {/* Left panel — branding */}
      <div style={{ flex: 1, background: "var(--text)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px 56px", display: window.innerWidth < 768 ? "none" : "flex" }}>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 28, fontFamily: "var(--font-display)", color: "#fff", fontWeight: 700, letterSpacing: "-0.5px" }}>
            JobTrackr
          </span>
        </div>
        <p style={{ fontSize: 22, fontFamily: "var(--font-display)", color: "#E8D5C4", lineHeight: 1.4, maxWidth: 340, marginBottom: 40 }}>
          Your job hunt, organised and in control.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {["Track every application in one place", "Kanban board with drag and drop", "AI-powered resume analyzer"].map(f => (
            <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: "#B8A89A" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 32px" }}>
        <div style={{ width: "100%", maxWidth: 380, animation: "slideUp 0.3s ease" }}>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 13, color: "var(--text-2)", marginBottom: 28 }}>
            Sign in to your account to continue
          </p>

          {error && (
            <div style={{ background: "#FEF0EE", border: "1px solid #F5C6C6", borderLeft: "3px solid var(--rejected)", color: "var(--rejected)", borderRadius: "var(--radius)", padding: "10px 14px", fontSize: 12, marginBottom: 18 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Input label="Email" type="email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="you@email.com" required />

            <Input label="Password" type="password" value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="••••••••" required />

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: "var(--accent)", border: "none", borderRadius: "var(--radius)", padding: "12px", fontSize: 14, fontWeight: 700, color: "#fff", cursor: loading ? "not-allowed" : "pointer", fontFamily: "var(--font-body)", opacity: loading ? 0.7 : 1, marginTop: 4, transition: "opacity 0.15s" }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 13, color: "var(--text-2)", marginTop: 20 }}>
            No account?{" "}
            <Link to="/register" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 700 }}>
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
