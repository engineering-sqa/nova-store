import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { TEST_ACCOUNTS } from "../data/products";
import { X, Lock, Mail, User, ShieldAlert, Sparkles, Eye, EyeOff } from "lucide-react";

export const AuthModal = () => {
  const { isAuthOpen, setIsAuthOpen, login, signup } = useStore();

  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (activeTab === "login") {
      const res = login(email, password);
      if (!res.success) {
        setError(res.message);
      }
    } else {
      const res = signup(name, email, password);
      if (!res.success) {
        setError(res.message);
      }
    }
  };

  const handleQuickCustomer = () => {
    setEmail(TEST_ACCOUNTS.customer.email);
    setPassword(TEST_ACCOUNTS.customer.password);
    login(TEST_ACCOUNTS.customer.email, TEST_ACCOUNTS.customer.password);
  };

  const handleQuickAdmin = () => {
    setEmail(TEST_ACCOUNTS.admin.email);
    setPassword(TEST_ACCOUNTS.admin.password);
    login(TEST_ACCOUNTS.admin.email, TEST_ACCOUNTS.admin.password);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsAuthOpen(false)} data-testid="auth-modal-overlay">
      <div
        className="modal-content auth-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        data-testid="auth-modal"
      >
        <button
          onClick={() => setIsAuthOpen(false)}
          className="modal-close-btn"
          data-testid="auth-close-btn"
          aria-label="Close authentication modal"
        >
          <X size={18} />
        </button>

        {/* Tab switchers */}
        <div className="auth-tabs" data-testid="auth-tabs">
          <button
            type="button"
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
            className={`auth-tab-btn ${activeTab === "login" ? "active" : ""}`}
            data-testid="auth-tab-login"
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("signup");
              setError("");
            }}
            className={`auth-tab-btn ${activeTab === "signup" ? "active" : ""}`}
            data-testid="auth-tab-signup"
          >
            Create Account
          </button>
        </div>

        {/* Error message banner */}
        {error && (
          <div
            style={{
              padding: "0.6rem 0.8rem",
              borderRadius: "var(--radius-sm)",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              color: "#f87171",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1rem"
            }}
            data-testid="auth-error-msg"
          >
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} data-testid="auth-form">
          {activeTab === "signup" && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  required
                  placeholder="Alex QA"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  style={{ width: "100%", paddingLeft: "2.3rem" }}
                  data-testid="signup-name-input"
                />
                <User size={16} style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                placeholder="testuser@superqa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.3rem" }}
                data-testid="auth-email-input"
              />
              <Mail size={16} style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                style={{ width: "100%", paddingLeft: "2.3rem", paddingRight: "2.3rem" }}
                data-testid="auth-password-input"
              />
              <Lock size={16} style={{ position: "absolute", left: "0.8rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: "absolute", right: "0.8rem", top: "50%", transform: "translateY(-50%)", background: "transparent", color: "var(--text-muted)" }}
                data-testid="auth-show-password-toggle"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "1rem", padding: "0.75rem" }}
            data-testid="auth-submit-btn"
          >
            {activeTab === "login" ? "Sign In" : "Register"}
          </button>
        </form>

        {/* Quick Test Accounts Box for automated testing */}
        <div className="test-credentials-box" data-testid="quick-login-box">
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontWeight: 700, color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
            <Sparkles size={14} />
            <span>SuperQA Quick Fill Credentials</span>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              type="button"
              onClick={handleQuickCustomer}
              className="qa-action-btn"
              style={{ marginBottom: 0, justifyContent: "center", fontSize: "0.75rem" }}
              data-testid="quick-login-customer-btn"
            >
              Demo Customer
            </button>
            <button
              type="button"
              onClick={handleQuickAdmin}
              className="qa-action-btn"
              style={{ marginBottom: 0, justifyContent: "center", fontSize: "0.75rem" }}
              data-testid="quick-login-admin-btn"
            >
              Demo Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
