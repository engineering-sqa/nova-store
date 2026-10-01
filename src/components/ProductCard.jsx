import React from "react";
import { useStore } from "../context/StoreContext";
import { Star, ShoppingBag, Eye, Heart } from "lucide-react";

export const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useStore();
  const isWishlisted = isInWishlist(product.id);

  const getBadgeClass = (badge) => {
    switch (badge?.toLowerCase()) {
      case "bestseller": return "badge-bestseller";
      case "new": return "badge-new";
      case "sale": return "badge-sale";
      case "hot": return "badge-hot";
      case "featured": return "badge-featured";
      default: return "";
    }
  };

  return (
    <article className="product-card" data-testid={`product-card-${product.id}`}>
      {/* Thumbnail Container */}
      <div className="product-image-container">
        {product.badge && (
          <span className={`product-badge-tag ${getBadgeClass(product.badge)}`} data-testid={`product-badge-${product.id}`}>
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`wishlist-float-btn ${isWishlisted ? "active" : ""}`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          data-testid={`wishlist-btn-${product.id}`}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="product-image"
          onClick={() => setSelectedProduct(product)}
          style={{ cursor: "pointer" }}
          data-testid={`product-img-${product.id}`}
        />
      </div>

      {/* Card Body */}
      <div className="product-card-body">
        <span className="product-category-text">{product.category}</span>
        <h3
          className="product-card-title"
          onClick={() => setSelectedProduct(product)}
          title={product.title}
          data-testid={`product-title-${product.id}`}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <div className="product-rating-row" data-testid={`product-rating-${product.id}`}>
          <Star size={14} className="star-icon" />
          <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{product.rating}</span>
          <span style={{ color: "var(--text-muted)" }}>({product.reviewCount})</span>
        </div>

        {/* Price & Stock */}
        <div className="product-price-row">
          <span className="current-price" data-testid={`product-price-${product.id}`}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
          )}
          {!product.inStock && (
            <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "var(--color-danger)", fontWeight: 700 }} data-testid={`out-of-stock-${product.id}`}>
              Out of stock
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="product-card-actions">
          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="btn-add-cart"
            data-testid={`add-to-cart-btn-${product.id}`}
          >
            <ShoppingBag size={16} />
            <span>{product.inStock ? "Add to Cart" : "Sold Out"}</span>
          </button>

          <button
            onClick={() => setSelectedProduct(product)}
            className="btn-quick-view"
            title="Quick Details"
            data-testid={`quick-view-btn-${product.id}`}
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
    </article>
  );
};
