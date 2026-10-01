import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { X, Trash2, ArrowRight, ShoppingBag, Tag, Check, AlertCircle } from "lucide-react";

export const CartDrawer = () => {
  const {
    cart,
    cartItemCount,
    cartSubtotal,
    promoDiscount,
    shippingFee,
    tax,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    setActiveView
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-drawer-backdrop" onClick={() => setIsCartOpen(false)} data-testid="cart-drawer-overlay">
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()} data-testid="cart-drawer">
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ShoppingBag size={20} className="text-gradient" />
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 700 }}>
              Shopping Cart
            </h3>
            <span
              style={{
                fontSize: "0.75rem",
                padding: "2px 8px",
                borderRadius: "var(--radius-full)",
                background: "var(--bg-tertiary)",
                color: "var(--text-secondary)",
                fontWeight: 600
              }}
              data-testid="cart-items-badge"
            >
              {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="nav-btn"
                style={{ fontSize: "0.75rem", padding: "0.3rem 0.5rem", color: "var(--color-danger)" }}
                title="Empty shopping cart"
                data-testid="cart-clear-btn"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              className="modal-close-btn"
              style={{ position: "static" }}
              data-testid="cart-close-btn"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Drawer Items Body */}
        <div className="cart-drawer-body" data-testid="cart-items-container">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.selectedColor}`}
                className="cart-item-card"
                data-testid={`cart-item-${item.id}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-thumb"
                  data-testid={`cart-item-thumb-${item.id}`}
                />

                <div className="cart-item-info">
                  <div className="cart-item-title" data-testid={`cart-item-title-${item.id}`}>
                    {item.title}
                  </div>
                  {item.selectedColor && (
                    <div className="cart-item-color" data-testid={`cart-item-variant-${item.id}`}>
                      Color: {item.selectedColor}
                    </div>
                  )}
                  <div className="cart-item-price" data-testid={`cart-item-price-${item.id}`}>
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedColor)}
                    style={{ background: "transparent", color: "var(--text-muted)", padding: "4px" }}
                    title="Remove item"
                    data-testid={`cart-remove-item-${item.id}`}
                  >
                    <Trash2 size={16} />
                  </button>

                  <div className="qty-stepper" style={{ transform: "scale(0.85)" }}>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.selectedColor, item.quantity - 1)}
                      className="qty-step-btn"
                      data-testid={`cart-qty-minus-${item.id}`}
                    >
                      -
                    </button>
                    <span
                      style={{ padding: "0 8px", fontSize: "0.85rem", fontWeight: 700 }}
                      data-testid={`cart-item-qty-${item.id}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.selectedColor, item.quantity + 1)}
                      className="qty-step-btn"
                      data-testid={`cart-qty-plus-${item.id}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 1rem",
                color: "var(--text-secondary)"
              }}
              data-testid="cart-empty-state"
            >
              <ShoppingBag size={54} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
              <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                Your cart is empty
              </h4>
              <p style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                Looks like you haven't added any gear to your cart yet.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView("catalog");
                }}
                className="btn-primary"
                data-testid="cart-empty-shop-btn"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Drawer Footer (Summary & Checkout) */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <Tag size={15} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. SUPERQA20)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: "2.2rem", width: "100%", textTransform: "uppercase" }}
                    data-testid="cart-coupon-input"
                  />
                </div>
                <button type="submit" className="btn-secondary" style={{ padding: "0 1rem" }} data-testid="cart-coupon-apply-btn">
                  Apply
                </button>
              </div>

              {couponError && (
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-danger)", fontSize: "0.75rem", marginTop: "0.4rem" }} data-testid="cart-coupon-error">
                  <AlertCircle size={12} />
                  <span>{couponError}</span>
                </div>
              )}

              {appliedCoupon && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.4rem 0.75rem",
                    borderRadius: "var(--radius-sm)",
                    background: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    marginTop: "0.5rem"
                  }}
                  data-testid="applied-coupon-pill"
                >
                  <span style={{ fontSize: "0.8rem", color: "#34d399", fontWeight: 600 }}>
                    ✓ Code {appliedCoupon.code} applied ({appliedCoupon.description})
                  </span>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    style={{ background: "transparent", color: "#34d399" }}
                    data-testid="remove-coupon-btn"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="order-calc-row">
              <span>Subtotal</span>
              <span data-testid="cart-subtotal-val">${cartSubtotal.toFixed(2)}</span>
            </div>

            {promoDiscount > 0 && (
              <div className="order-calc-row" style={{ color: "var(--color-success)" }}>
                <span>Promo Discount</span>
                <span data-testid="cart-discount-val">-${promoDiscount.toFixed(2)}</span>
              </div>
            )}

            <div className="order-calc-row">
              <span>Estimated Shipping</span>
              <span data-testid="cart-shipping-val">
                {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>

            <div className="order-calc-row">
              <span>Estimated Tax (8%)</span>
              <span data-testid="cart-tax-val">${tax.toFixed(2)}</span>
            </div>

            <div className="order-calc-total">
              <span>Estimated Total</span>
              <span className="text-gradient" data-testid="cart-total-val">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleProceedToCheckout}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "1.25rem", padding: "0.85rem" }}
              data-testid="cart-proceed-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
