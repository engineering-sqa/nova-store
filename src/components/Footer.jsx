import React from "react";
import { ShoppingBag, ShieldCheck, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      style={{
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "3rem 0 2rem",
        marginTop: "4rem"
      }}
      data-testid="footer-container"
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            paddingBottom: "2rem",
            borderBottom: "1px solid var(--border-subtle)"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="brand-icon-box">
              <ShoppingBag size={20} />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 800 }}>
                Nova<span className="text-gradient">Store</span>
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Full-Featured E-Commerce Test Application
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <span data-testid="footer-feat-auth">✓ Mock Authentication</span>
            <span data-testid="footer-feat-cart">✓ Local Storage Cart</span>
            <span data-testid="footer-feat-checkout">✓ 5-Step Checkout</span>
            <span data-testid="footer-feat-superqa">✓ SuperQA & CI Optimized</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            paddingTop: "1.5rem",
            fontSize: "0.8rem",
            color: "var(--text-muted)"
          }}
        >
          <div>
            Built for <strong>SuperQA GitHub Action Test Automation</strong>. All data-testid selectors standardized.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>Powered by React & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
