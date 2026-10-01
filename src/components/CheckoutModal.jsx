import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { 
  X, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  Sparkles,
  ShoppingBag,
  Clock,
  CheckCircle2
} from "lucide-react";

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    promoDiscount,
    shippingFee: baseShippingFee,
    tax,
    cartTotal,
    appliedCoupon,
    user,
    placeOrder,
    setActiveView
  } = useStore();

  // Stepper: 1: Shipping, 2: Method, 3: Payment, 4: Review, 5: Confirmed
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Form State: Shipping
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user ? user.name : "Alex QA Runner",
    email: user ? user.email : "alex.qa@superqa.com",
    phone: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace",
    city: "Springfield",
    postalCode: "97477",
    country: "United States"
  });

  // Form State: Delivery Option
  const [deliveryMethod, setDeliveryMethod] = useState("standard"); // standard ($0 or base), express ($15), overnight ($25)

  // Form State: Payment
  const [paymentType, setPaymentType] = useState("card"); // 'card' | 'paypal' | 'cod'
  const [cardInfo, setCardInfo] = useState({
    number: "4242 •••• •••• 4242",
    name: "Alex QA Runner",
    expiry: "12/28",
    cvv: "888"
  });

  // Dynamic shipping adjustment based on method
  let extraShipping = 0;
  if (deliveryMethod === "express") extraShipping = 15;
  if (deliveryMethod === "overnight") extraShipping = 25;
  const activeShippingFee = baseShippingFee + extraShipping;
  const finalTotal = Math.max(0, cartSubtotal - promoDiscount + activeShippingFee + tax);

  // QA Autofill Helpers
  const handleAutofillShipping = () => {
    setShippingInfo({
      fullName: "Alex QA Automation",
      email: "testrunner@superqa.com",
      phone: "+1 (800) 555-0199",
      address: "100 Infinite Loop, Suite 400",
      city: "Cupertino",
      postalCode: "95014",
      country: "United States"
    });
  };

  const handleAutofillCard = () => {
    setCardInfo({
      number: "4000 1234 5678 9010",
      name: "Alex QA Automation",
      expiry: "09/29",
      cvv: "321"
    });
  };

  const handleNextFromShipping = (e) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.email || !shippingInfo.address) {
      alert("Please fill in the required shipping details");
      return;
    }
    setCurrentStep(2);
  };

  const handleNextFromMethod = () => {
    setCurrentStep(3);
  };

  const handleNextFromPayment = (e) => {
    e.preventDefault();
    setCurrentStep(4);
  };

  const handlePlaceOrder = () => {
    const orderPayload = {
      shippingAddress: shippingInfo,
      deliveryMethod,
      shippingFee: activeShippingFee,
      total: finalTotal,
      paymentMethod:
        paymentType === "card"
          ? `Credit Card ending in ${cardInfo.number.slice(-4)}`
          : paymentType === "paypal"
          ? "PayPal Express"
          : "Cash on Delivery"
    };

    const newOrder = placeOrder(orderPayload);
    setConfirmedOrder(newOrder);
    setCurrentStep(5);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCurrentStep(1);
    setConfirmedOrder(null);
  };

  const handleFinishToOrders = () => {
    handleClose();
    setActiveView("orders");
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose} data-testid="checkout-modal-overlay">
      <div
        className="modal-content checkout-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0 }}
        data-testid="checkout-modal"
      >
        <button
          onClick={handleClose}
          className="modal-close-btn"
          data-testid="checkout-close-btn"
          aria-label="Close checkout"
        >
          <X size={20} />
        </button>

        {/* Stepper Navigation */}
        <div className="stepper-nav" data-testid="checkout-stepper">
          {[
            { step: 1, label: "Shipping" },
            { step: 2, label: "Delivery" },
            { step: 3, label: "Payment" },
            { step: 4, label: "Review" },
            { step: 5, label: "Success" }
          ].map((s) => (
            <div
              key={s.step}
              className={`step-indicator ${
                currentStep === s.step ? "active" : currentStep > s.step ? "completed" : ""
              }`}
              data-testid={`step-indicator-${s.step}`}
            >
              <div className="step-number">
                {currentStep > s.step ? <Check size={14} /> : s.step}
              </div>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Shipping Info */}
        {currentStep === 1 && (
          <form onSubmit={handleNextFromShipping} className="checkout-step-body" data-testid="checkout-step-1">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700 }}>
                1. Shipping Address & Contact
              </h3>
              <button
                type="button"
                onClick={handleAutofillShipping}
                className="nav-btn"
                style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem", background: "var(--bg-tertiary)" }}
                data-testid="autofill-shipping-btn"
              >
                <Sparkles size={14} /> Autofill QA Details
              </button>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  className="form-input"
                  data-testid="shipping-name-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  required
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  className="form-input"
                  data-testid="shipping-email-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                className="form-input"
                data-testid="shipping-phone-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Street Address *</label>
              <input
                type="text"
                required
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                className="form-input"
                data-testid="shipping-address-input"
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="form-input"
                  data-testid="shipping-city-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Postal / ZIP Code *</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.postalCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                  className="form-input"
                  data-testid="shipping-postal-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Country *</label>
              <select
                value={shippingInfo.country}
                onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                className="form-input"
                data-testid="shipping-country-select"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="Australia">Australia</option>
                <option value="Japan">Japan</option>
                <option value="India">India</option>
              </select>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button type="submit" className="btn-primary" data-testid="step1-continue-btn">
                <span>Continue to Delivery</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Delivery Method */}
        {currentStep === 2 && (
          <div className="checkout-step-body" data-testid="checkout-step-2">
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.2rem" }}>
              2. Choose Delivery Method
            </h3>

            {/* Standard Option */}
            <div
              className={`shipping-option-card ${deliveryMethod === "standard" ? "selected" : ""}`}
              onClick={() => setDeliveryMethod("standard")}
              data-testid="delivery-option-standard"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Truck size={22} className="text-gradient" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Standard Ground Shipping</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Delivers in 3 - 5 business days</div>
                </div>
              </div>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>
                {baseShippingFee === 0 ? "FREE" : `$${baseShippingFee.toFixed(2)}`}
              </div>
            </div>

            {/* Express Option */}
            <div
              className={`shipping-option-card ${deliveryMethod === "express" ? "selected" : ""}`}
              onClick={() => setDeliveryMethod("express")}
              data-testid="delivery-option-express"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Truck size={22} color="#06b6d4" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Express Air Delivery</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Delivers in 1 - 2 business days</div>
                </div>
              </div>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>
                ${(baseShippingFee + 15).toFixed(2)}
              </div>
            </div>

            {/* Priority Overnight Option */}
            <div
              className={`shipping-option-card ${deliveryMethod === "overnight" ? "selected" : ""}`}
              onClick={() => setDeliveryMethod("overnight")}
              data-testid="delivery-option-overnight"
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Clock size={22} color="#ec4899" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Priority Overnight</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Guaranteed delivery tomorrow morning</div>
                </div>
              </div>
              <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>
                ${(baseShippingFee + 25).toFixed(2)}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn-secondary"
                data-testid="step2-back-btn"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                type="button"
                onClick={handleNextFromMethod}
                className="btn-primary"
                data-testid="step2-continue-btn"
              >
                <span>Continue to Payment</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Payment Options */}
        {currentStep === 3 && (
          <form onSubmit={handleNextFromPayment} className="checkout-step-body" data-testid="checkout-step-3">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700 }}>
                3. Payment Details
              </h3>
              {paymentType === "card" && (
                <button
                  type="button"
                  onClick={handleAutofillCard}
                  className="nav-btn"
                  style={{ fontSize: "0.75rem", padding: "0.3rem 0.6rem", background: "var(--bg-tertiary)" }}
                  data-testid="autofill-card-btn"
                >
                  <Sparkles size={14} /> Autofill Test Card
                </button>
              )}
            </div>

            {/* Payment Method Selector Pills */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <button
                type="button"
                onClick={() => setPaymentType("card")}
                className={`detail-color-pill ${paymentType === "card" ? "active" : ""}`}
                style={{ flex: 1, padding: "0.6rem" }}
                data-testid="payment-tab-card"
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentType("paypal")}
                className={`detail-color-pill ${paymentType === "paypal" ? "active" : ""}`}
                style={{ flex: 1, padding: "0.6rem" }}
                data-testid="payment-tab-paypal"
              >
                PayPal Express
              </button>
              <button
                type="button"
                onClick={() => setPaymentType("cod")}
                className={`detail-color-pill ${paymentType === "cod" ? "active" : ""}`}
                style={{ flex: 1, padding: "0.6rem" }}
                data-testid="payment-tab-cod"
              >
                Cash on Delivery
              </button>
            </div>

            {paymentType === "card" && (
              <div data-testid="card-payment-form">
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      required
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                      className="form-input"
                      style={{ width: "100%" }}
                      data-testid="card-number-input"
                    />
                    <CreditCard size={18} style={{ position: "absolute", right: "0.85rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Name on Card</label>
                  <input
                    type="text"
                    required
                    value={cardInfo.name}
                    onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                    className="form-input"
                    data-testid="card-name-input"
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      required
                      placeholder="12/28"
                      value={cardInfo.expiry}
                      onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                      className="form-input"
                      data-testid="card-expiry-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV / Security Code</label>
                    <input
                      type="password"
                      maxLength="4"
                      required
                      placeholder="•••"
                      value={cardInfo.cvv}
                      onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                      className="form-input"
                      data-testid="card-cvv-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentType === "paypal" && (
              <div style={{ padding: "2rem", textAlign: "center", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }} data-testid="paypal-mock-box">
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  Mock PayPal Checkout will auto-authorize in sandbox mode upon review.
                </p>
                <div style={{ fontWeight: 700, color: "#38bdf8" }}>PayPal Account: testbuyer@superqa.com</div>
              </div>
            )}

            {paymentType === "cod" && (
              <div style={{ padding: "1.5rem", background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)" }} data-testid="cod-mock-box">
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  Pay cash or card upon delivery. No upfront payment required for this dummy order.
                </p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn-secondary"
                data-testid="step3-back-btn"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                type="submit"
                className="btn-primary"
                data-testid="step3-continue-btn"
              >
                <span>Review Order</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Step 4: Final Review & Order Placement */}
        {currentStep === 4 && (
          <div className="checkout-step-body" data-testid="checkout-step-4">
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.2rem" }}>
              4. Review & Confirm Order
            </h3>

            {/* Details recap card */}
            <div style={{ background: "var(--bg-tertiary)", borderRadius: "var(--radius-md)", padding: "1.2rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", fontSize: "0.85rem" }}>
                <div>
                  <div style={{ color: "var(--text-muted)", marginBottom: "0.2rem" }}>Ship to:</div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)" }} data-testid="review-shipping-name">{shippingInfo.fullName}</div>
                  <div style={{ color: "var(--text-secondary)" }} data-testid="review-shipping-address">{shippingInfo.address}, {shippingInfo.city} {shippingInfo.postalCode}</div>
                </div>

                <div>
                  <div style={{ color: "var(--text-muted)", marginBottom: "0.2rem" }}>Payment & Delivery:</div>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)" }} data-testid="review-payment-summary">
                    {paymentType === "card" ? `Card ending in ${cardInfo.number.slice(-4)}` : paymentType.toUpperCase()}
                  </div>
                  <div style={{ color: "var(--text-secondary)" }} data-testid="review-delivery-summary">
                    {deliveryMethod === "standard" ? "Standard Ground (3-5d)" : deliveryMethod === "express" ? "Express Air (1-2d)" : "Overnight"}
                  </div>
                </div>
              </div>
            </div>

            {/* Line items preview */}
            <div style={{ maxHeight: "160px", overflowY: "auto", marginBottom: "1.5rem" }} data-testid="review-items-list">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedColor}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid var(--border-subtle)", fontSize: "0.85rem" }}>
                  <div>
                    <span style={{ fontWeight: 600 }}>{item.quantity}x</span> {item.title} ({item.selectedColor})
                  </div>
                  <div style={{ fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div style={{ background: "rgba(99, 102, 241, 0.08)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem" }}>
              <div className="order-calc-row">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              {promoDiscount > 0 && (
                <div className="order-calc-row" style={{ color: "var(--color-success)" }}>
                  <span>Coupon Discount</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="order-calc-row">
                <span>Shipping Fee</span>
                <span>{activeShippingFee === 0 ? "FREE" : `$${activeShippingFee.toFixed(2)}`}</span>
              </div>
              <div className="order-calc-row">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="order-calc-total" style={{ marginTop: "0.5rem" }}>
                <span>Grand Total</span>
                <span className="text-gradient" data-testid="review-grand-total">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-secondary"
                data-testid="step4-back-btn"
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="btn-primary"
                style={{ padding: "0.8rem 1.8rem" }}
                data-testid="place-order-submit-btn"
              >
                <ShieldCheck size={18} />
                <span>Place Order Now</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Success & Order Confirmation */}
        {currentStep === 5 && confirmedOrder && (
          <div className="checkout-step-body" style={{ textAlign: "center", padding: "3rem 2rem" }} data-testid="order-confirmation-screen">
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16, 185, 129, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", color: "var(--color-success)" }}>
              <CheckCircle2 size={40} />
            </div>

            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              Thank You! Order Confirmed
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
              Your order has been recorded into test store state and simulated for fulfillment.
            </p>

            <div style={{ display: "inline-block", background: "var(--bg-tertiary)", padding: "0.6rem 1.25rem", borderRadius: "var(--radius-full)", marginBottom: "2rem" }}>
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Order ID: </span>
              <strong style={{ color: "var(--accent-primary)", fontSize: "1.05rem" }} data-testid="order-confirmation-id">
                {confirmedOrder.id}
              </strong>
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
              <button
                onClick={handleFinishToOrders}
                className="btn-primary"
                data-testid="confirmation-view-orders-btn"
              >
                <span>View in My Orders</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleClose}
                className="btn-secondary"
                data-testid="confirmation-continue-shopping-btn"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
