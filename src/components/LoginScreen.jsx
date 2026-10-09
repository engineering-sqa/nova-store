import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { TEST_ACCOUNTS } from "../data/products";
import { 
  ShoppingBag, 
  Lock, 
  Mail, 
  User, 
  ShieldAlert, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sun, 
  Moon, 
  Zap, 
  CheckCircle2, 
  ShieldCheck,
  Compass
} from "lucide-react";

export const LoginScreen = () => {
  const { login, signup, loginGuest, theme, setTheme } = useStore();

  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (activeTab === "login") {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.message);
        }
      } else {
        const res = await signup(name, email, password);
        if (!res.success) {
          setError(res.message);
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickCustomer = async () => {
    setError("");
    setEmail(TEST_ACCOUNTS.customer.email);
    setPassword(TEST_ACCOUNTS.customer.password);
    setIsLoading(true);
    try {
      await login(TEST_ACCOUNTS.customer.email, TEST_ACCOUNTS.customer.password);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdmin = async () => {
    setError("");
    setEmail(TEST_ACCOUNTS.admin.email);
    setPassword(TEST_ACCOUNTS.admin.password);
    setIsLoading(true);
    try {
      await login(TEST_ACCOUNTS.admin.email, TEST_ACCOUNTS.admin.password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-screen-wrapper" data-testid="login-screen">
      {/* Background ambient glowing gradients */}
      <div className="login-ambient-orb orb-1" aria-hidden="true" />
      <div className="login-ambient-orb orb-2" aria-hidden="true" />
      <div className="login-ambient-orb orb-3" aria-hidden="true" />

      {/* Top Bar Navigation */}
      <header className="login-header-bar">
        <div className="login-brand" data-testid="header-logo">
          <div className="brand-icon-box">
            <ShoppingBag size={20} />
          </div>
          <span className="brand-name">
            Nova<span className="text-gradient">Store</span>
          </span>
          <span className="brand-badge" data-testid="superqa-badge">SUPERQA TEST</span>
        </div>

        <div className="login-header-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-pill-btn"
            data-testid="theme-toggle-btn"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="login-main-container">
        <div className="login-layout-grid">
          {/* Left Column: Brand Showcase & QA Highlights */}
          <div className="login-hero-showcase">
            <div className="showcase-tag">
              <Sparkles size={14} />
              <span>Next-Gen E-Commerce Suite</span>
            </div>

            <h1 className="showcase-heading">
              Premium Gear. <br />
              <span className="text-gradient">Automated QA Ready.</span>
            </h1>

            <p className="showcase-description">
              Sign in to explore high-performance audio, wearables, gaming setups, and instant automated checkout flows engineered for SuperQA CI/CD test automation.
            </p>

            <div className="showcase-perks-list">
              <div className="showcase-perk-item">
                <div className="perk-icon-wrap">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="perk-title">12+ Real Hardware Devices</h4>
                  <p className="perk-sub">Dynamic inventory, ratings, specs & variant selection</p>
                </div>
              </div>

              <div className="showcase-perk-item">
                <div className="perk-icon-wrap">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <h4 className="perk-title">Automated Testing Ready</h4>
                  <p className="perk-sub">Standardized data-testid selectors & 1-click test accounts</p>
                </div>
              </div>

              <div className="showcase-perk-item">
                <div className="perk-icon-wrap">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h4 className="perk-title">End-to-End Cart & Checkout</h4>
                  <p className="perk-sub">Full multi-step checkout, promo codes, and order persistence</p>
                </div>
              </div>
            </div>

            <div className="showcase-footer-stats">
              <div className="stat-chip">
                <span className="stat-dot green" />
                <span>REST API Active</span>
              </div>
              <div className="stat-chip">
                <span className="stat-dot blue" />
                <span>SuperQA Verified</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentication Card */}
          <div className="login-card-container">
            <div 
              className="login-glass-card" 
              data-testid="auth-modal"
            >
              <div className="login-card-header">
                <h2 className="login-card-title">
                  {activeTab === "login" ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="login-card-subtitle">
                  {activeTab === "login"
                    ? "Enter your credentials to access the storefront"
                    : "Register to unlock fast checkout and order history"}
                </p>
              </div>

              {/* Tab Switcher */}
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
                <div className="login-error-alert" data-testid="auth-error-msg" role="alert">
                  <ShieldAlert size={17} />
                  <span>{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} data-testid="auth-form" className="login-form">
                {activeTab === "signup" && (
                  <div className="form-group">
                    <label className="form-label" htmlFor="signup-name">Full Name</label>
                    <div className="input-with-icon">
                      <User size={18} className="input-leading-icon" />
                      <input
                        id="signup-name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input login-input-field"
                        data-testid="signup-name-input"
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label" htmlFor="auth-email">Email Address</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="input-leading-icon" />
                    <input
                      id="auth-email"
                      type="email"
                      required
                      placeholder="Johndoe@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-input login-input-field"
                      data-testid="auth-email-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="auth-password">Password</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="input-leading-icon" />
                    <input
                      id="auth-password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-input login-input-field password-input"
                      data-testid="auth-password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="input-trailing-action"
                      data-testid="auth-show-password-toggle"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary login-submit-btn"
                  data-testid="auth-submit-btn"
                >
                  <span>{isLoading ? "Authenticating..." : activeTab === "login" ? "Sign In" : "Register & Start Shopping"}</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Guest Explore Option */}
              <div className="login-divider">
                <span>OR EXPLORE QUICKLY</span>
              </div>

              <button
                type="button"
                onClick={loginGuest}
                className="guest-login-btn"
                data-testid="guest-login-btn"
              >
                <Compass size={16} />
                <span>Continue as Guest</span>
              </button>

              {/* Quick Test Accounts Box for automated testing */}
              <div className="test-credentials-box" data-testid="quick-login-box">
                <div className="test-credentials-header">
                  <Sparkles size={14} />
                  <span>SuperQA Quick Fill Credentials</span>
                </div>
                <p className="test-credentials-hint">
                  Instant 1-click login for test suites and manual validation:
                </p>

                <div className="test-credentials-buttons">
                  <button
                    type="button"
                    onClick={handleQuickCustomer}
                    className="qa-action-btn quick-cred-btn"
                    data-testid="quick-login-customer-btn"
                  >
                    Demo Customer
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickAdmin}
                    className="qa-action-btn quick-cred-btn"
                    data-testid="quick-login-admin-btn"
                  >
                    Demo Admin
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Screen Footer */}
      <footer className="login-footer">
        <p>© 2026 NovaStore Inc. Dummy E-Commerce Platform for SuperQA Automated Testing.</p>
      </footer>
    </div>
  );
};
