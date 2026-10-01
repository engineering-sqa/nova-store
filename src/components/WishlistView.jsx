import React from "react";
import { useStore } from "../context/StoreContext";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export const WishlistView = () => {
  const { wishlist, products, addToCart, toggleWishlist, setActiveView } = useStore();

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toggleWishlist(product.id);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }} data-testid="wishlist-view">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800 }}>
            My Wishlist ({wishlistedProducts.length})
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Saved items for future purchases and regression test coverage.
          </p>
        </div>

        <button
          onClick={() => setActiveView("catalog")}
          className="btn-secondary"
          data-testid="wishlist-back-shop-btn"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="products-grid" data-testid="wishlist-items-grid">
          {wishlistedProducts.map((product) => (
            <div
              key={product.id}
              className="product-card"
              data-testid={`wishlist-card-${product.id}`}
            >
              <div className="product-image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="wishlist-float-btn active"
                  title="Remove from wishlist"
                  data-testid={`wishlist-remove-btn-${product.id}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="product-card-body">
                <span className="product-category-text">{product.category}</span>
                <h3 className="product-card-title">{product.title}</h3>

                <div className="product-price-row">
                  <span className="current-price">${product.price.toFixed(2)}</span>
                </div>

                <div className="product-card-actions">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={!product.inStock}
                    className="btn-primary"
                    style={{ width: "100%", justifyContent: "center" }}
                    data-testid={`wishlist-move-cart-btn-${product.id}`}
                  >
                    <ShoppingBag size={16} />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "5rem 1rem",
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-lg)",
            border: "1px dashed var(--border-subtle)"
          }}
          data-testid="empty-wishlist-state"
        >
          <Heart size={50} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>Your wishlist is empty</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            Heart any gadget on the shop floor to save it here for fast testing.
          </p>
          <button
            onClick={() => setActiveView("catalog")}
            className="btn-primary"
            data-testid="empty-wishlist-shop-btn"
          >
            Explore Catalog
          </button>
        </div>
      )}
    </div>
  );
};
