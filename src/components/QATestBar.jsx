import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { 
  Terminal, 
  RotateCcw, 
  UserCheck, 
  ShoppingCart, 
  CreditCard, 
  Tag, 
  ChevronUp, 
  ChevronDown,
  Bug
} from "lucide-react";

export const QATestBar = () => {
  const {
    qaSeedCart,
    qaLoginCustomer,
    qaResetAll,
    applyCoupon,
    setIsCheckoutOpen,
    cartItemCount,
    user,
    orders
  } = useStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="qa-helper-bar" data-testid="qa-helper-container">
      {isOpen && (
        <div className="qa-expanded-panel" data-testid="qa-panel-dropdown">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "0.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.85rem", color: "#38bdf8" }}>
              <Bug size={16} /> SuperQA Action Toolkit
            </div>
            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>CI / E2E Ready</span>
          </div>

          <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.75rem", background: "var(--bg-tertiary)", padding: "0.4rem 0.6rem", borderRadius: "var(--radius-sm)" }} data-testid="qa-state-summary">
            <div>User: <strong>{user ? user.email : "Guest"}</strong></div>
            <div>Cart Count: <strong>{cartItemCount}</strong> | Orders: <strong>{orders.length}</strong></div>
          </div>

          <button
            onClick={qaLoginCustomer}
            className="qa-action-btn"
            data-testid="qa-btn-login-customer"
          >
            <UserCheck size={14} /> Login QA Customer
          </button>

          <button
            onClick={qaSeedCart}
            className="qa-action-btn"
            data-testid="qa-btn-seed-cart"
          >
            <ShoppingCart size={14} /> Quick-Seed Cart (2 Items)
          </button>

          <button
            onClick={() => applyCoupon("SUPERQA20")}
            className="qa-action-btn"
            data-testid="qa-btn-apply-coupon"
          >
            <Tag size={14} /> Apply 'SUPERQA20' (20% Off)
          </button>

          <button
            onClick={() => {
              if (cartItemCount === 0) qaSeedCart();
              setIsCheckoutOpen(true);
            }}
            className="qa-action-btn"
            data-testid="qa-btn-open-checkout"
          >
            <CreditCard size={14} /> Jump Directly to Checkout
          </button>

          <button
            onClick={qaResetAll}
            className="qa-action-btn"
            style={{ color: "var(--color-danger)", marginTop: "0.5rem" }}
            data-testid="qa-btn-reset-state"
          >
            <RotateCcw size={14} /> Reset State to Clean Defaults
          </button>
        </div>
      )}

      {/* Pill Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="qa-toggle-pill"
        data-testid="qa-toggle-btn"
        title="SuperQA E2E Automation Helper"
      >
        <Terminal size={16} />
        <span>SuperQA Helper</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>
    </div>
  );
};
