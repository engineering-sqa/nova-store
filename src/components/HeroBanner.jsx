import React from "react";
import { useStore } from "../context/StoreContext";
import { Zap, ShieldCheck, Truck, RotateCcw, ArrowRight, Tag } from "lucide-react";

export const HeroBanner = () => {
  const { applyCoupon, setSelectedCategory } = useStore();

  const handleCopyCoupon = () => {
    applyCoupon("SUPERQA20");
  };

  return (
    <section className="hero-section" data-testid="hero-section">
      <div className="hero-gradient-orb"></div>
      <div className="container">
        <div className="hero-card">
          {/* Left Column: Hero Content */}
          <div>
            <div className="hero-tag" data-testid="hero-tag">
              <Zap size={14} /> Next-Gen Hardware & Wearables
            </div>
            <h1 className="hero-title">
              Engineered for Speed. <br />
              <span className="text-gradient">Ready for Testing.</span>
            </h1>
            <p className="hero-desc">
              Explore high-performance dummy tech catalog designed for end-to-end GitHub Action test runners, Playwright automation, and SuperQA verification.
            </p>

            <div className="hero-cta-group">
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  window.scrollTo({ top: 480, behavior: "smooth" });
                }}
                className="btn-primary"
                data-testid="hero-shop-now-btn"
              >
                <span>Browse Catalog</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={handleCopyCoupon}
                className="hero-promo-badge"
                title="Click to apply promo code"
                data-testid="hero-promo-btn"
              >
                <Tag size={15} />
                <span>Use code <strong>SUPERQA20</strong> for 20% OFF</span>
              </button>
            </div>
          </div>

          {/* Right Column: Key Feature Matrix */}
          <div className="hero-feature-grid">
            <div className="feature-box">
              <div className="feature-icon-wrapper">
                <Truck size={22} />
              </div>
              <div className="feature-title">Fast Global Shipping</div>
              <div className="feature-desc">Free delivery on all dummy orders over $100</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={22} />
              </div>
              <div className="feature-title">2-Year Warranty</div>
              <div className="feature-desc">100% simulated replacement guarantee</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper">
                <RotateCcw size={22} />
              </div>
              <div className="feature-title">30-Day Trial</div>
              <div className="feature-desc">Hassle-free mock returns & refunds</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon-wrapper">
                <Zap size={22} />
              </div>
              <div className="feature-title">Instant Checkout</div>
              <div className="feature-desc">One-click test fill & multi-step flow</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
