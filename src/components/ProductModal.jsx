import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { X, Star, ShoppingBag, Zap, Heart, Check, MessageSquare } from "lucide-react";

export const ProductModal = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    addReview
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'specs' | 'reviews'
  
  // New review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewName, setReviewName] = useState("");

  if (!selectedProduct) return null;

  const currentColor = selectedColor || (selectedProduct.colors ? selectedProduct.colors[0] : "Default");
  const isWishlisted = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, currentColor);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, currentColor);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;
    addReview(selectedProduct.id, {
      rating: reviewRating,
      comment: reviewComment,
      userName: reviewName || "SuperQA Reviewer"
    });
    setReviewComment("");
    setReviewName("");
  };

  return (
    <div className="modal-overlay" onClick={() => setSelectedProduct(null)} data-testid="product-detail-modal">
      <div
        className="modal-content product-modal-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: 0 }}
      >
        <button
          onClick={() => setSelectedProduct(null)}
          className="modal-close-btn"
          data-testid="modal-close-btn"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="product-detail-grid">
          {/* Left Column: Image & Quick Badges */}
          <div>
            <div className="product-detail-img-box">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                data-testid="modal-product-img"
              />
            </div>

            {/* Quick stock status pill */}
            <div style={{ marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: selectedProduct.inStock ? "var(--color-success)" : "var(--color-danger)"
                }}
                data-testid="modal-stock-status"
              >
                ● {selectedProduct.inStock ? `In Stock (${selectedProduct.stockCount} units available)` : "Currently Unavailable"}
              </span>

              <button
                onClick={() => toggleWishlist(selectedProduct.id)}
                className="nav-btn"
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                data-testid="modal-wishlist-toggle"
              >
                <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} color={isWishlisted ? "var(--color-danger)" : "currentColor"} />
                <span>{isWishlisted ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Information & Options */}
          <div>
            <span className="product-category-text">{selectedProduct.category}</span>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.6rem",
                fontWeight: 800,
                marginTop: "0.25rem",
                marginBottom: "0.5rem",
                lineHeight: 1.25
              }}
              data-testid="modal-product-title"
            >
              {selectedProduct.title}
            </h2>

            {/* Rating */}
            <div className="product-rating-row" style={{ marginBottom: "1rem" }} data-testid="modal-product-rating">
              <div style={{ display: "flex", gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={15}
                    className="star-icon"
                    fill={s <= Math.round(selectedProduct.rating) ? "#fbbf24" : "none"}
                  />
                ))}
              </div>
              <span style={{ fontWeight: 700, marginLeft: "4px" }}>{selectedProduct.rating}</span>
              <span style={{ color: "var(--text-muted)" }}>({selectedProduct.reviewCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  color: "var(--accent-primary)"
                }}
                data-testid="modal-product-price"
              >
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="original-price" style={{ fontSize: "1.1rem" }}>
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Tabs Navigation */}
            <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--border-subtle)", marginBottom: "1.2rem" }}>
              <button
                onClick={() => setActiveTab("overview")}
                className={`auth-tab-btn ${activeTab === "overview" ? "active" : ""}`}
                style={{ padding: "0.5rem 0", flex: "none" }}
                data-testid="tab-overview"
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("specs")}
                className={`auth-tab-btn ${activeTab === "specs" ? "active" : ""}`}
                style={{ padding: "0.5rem 0", flex: "none" }}
                data-testid="tab-specs"
              >
                Technical Specs
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`auth-tab-btn ${activeTab === "reviews" ? "active" : ""}`}
                style={{ padding: "0.5rem 0", flex: "none" }}
                data-testid="tab-reviews"
              >
                Reviews ({selectedProduct.reviews?.length || 0})
              </button>
            </div>

            {/* Tab: Overview */}
            {activeTab === "overview" && (
              <div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }} data-testid="modal-product-desc">
                  {selectedProduct.description}
                </p>

                {/* Color Variants */}
                {selectedProduct.colors && (
                  <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.5rem", color: "var(--text-muted)" }}>
                      COLOR: <span style={{ color: "var(--text-primary)" }}>{currentColor}</span>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {selectedProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`detail-color-pill ${currentColor === color ? "active" : ""}`}
                          data-testid={`color-option-${color.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <div className="qty-stepper" data-testid="qty-stepper">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="qty-step-btn"
                      data-testid="qty-minus-btn"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={selectedProduct.stockCount || 99}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="qty-input"
                      data-testid="modal-qty-input"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="qty-step-btn"
                      data-testid="qty-plus-btn"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedProduct.inStock}
                    className="btn-primary"
                    style={{ flex: 1 }}
                    data-testid="modal-add-to-cart-btn"
                  >
                    <ShoppingBag size={18} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={!selectedProduct.inStock}
                    className="btn-secondary"
                    data-testid="modal-buy-now-btn"
                  >
                    <Zap size={18} />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab: Specs */}
            {activeTab === "specs" && (
              <div style={{ fontSize: "0.85rem", marginBottom: "1.5rem" }} data-testid="specs-table-container">
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <tbody>
                    {selectedProduct.specs && Object.entries(selectedProduct.specs).map(([k, v]) => (
                      <tr key={k} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                        <td style={{ padding: "0.6rem 0", color: "var(--text-muted)", fontWeight: 500, width: "40%" }}>{k}</td>
                        <td style={{ padding: "0.6rem 0", color: "var(--text-primary)", fontWeight: 600 }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === "reviews" && (
              <div data-testid="reviews-tab-content">
                {/* Existing reviews */}
                <div style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {selectedProduct.reviews && selectedProduct.reviews.map((rev) => (
                    <div key={rev.id} style={{ background: "var(--bg-tertiary)", padding: "0.75rem", borderRadius: "var(--radius-sm)" }} data-testid={`review-card-${rev.id}`}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem", fontSize: "0.8rem" }}>
                        <strong style={{ color: "var(--text-primary)" }}>{rev.user}</strong>
                        <span style={{ color: "var(--text-muted)" }}>{rev.date}</span>
                      </div>
                      <div style={{ display: "flex", gap: "2px", marginBottom: "0.25rem" }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={12} fill={star <= rev.rating ? "#fbbf24" : "none"} color="#fbbf24" />
                        ))}
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{rev.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Add Review Form */}
                <form onSubmit={handleReviewSubmit} style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "0.75rem" }}>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.5rem" }}>Add a Review</div>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="Your Name (optional)"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="form-input"
                      style={{ flex: 1, padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                      data-testid="review-author-input"
                    />
                    <select
                      value={reviewRating}
                      onChange={(e) => setReviewRating(Number(e.target.value))}
                      className="filter-select"
                      data-testid="review-rating-select"
                    >
                      <option value="5">5 Stars - Excellent</option>
                      <option value="4">4 Stars - Great</option>
                      <option value="3">3 Stars - Average</option>
                      <option value="2">2 Stars - Poor</option>
                      <option value="1">1 Star - Terrible</option>
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <input
                      type="text"
                      placeholder="Share your testing impressions or review comments..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      required
                      className="form-input"
                      style={{ flex: 1, padding: "0.4rem 0.6rem", fontSize: "0.8rem" }}
                      data-testid="review-comment-input"
                    />
                    <button type="submit" className="btn-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }} data-testid="submit-review-btn">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
