import React, { useMemo } from "react";
import { useStore } from "../context/StoreContext";
import { CATEGORIES } from "../data/products";
import { ProductCard } from "./ProductCard";
import { Filter, SlidersHorizontal, RotateCcw } from "lucide-react";

export const ProductGrid = () => {
  const {
    products,
    searchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly
  } = useStore();

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== "All" && p.category !== selectedCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        if (!matchTitle && !matchCategory && !matchDesc) return false;
      }
      // Price range
      if (p.price > priceRange) return false;
      // In stock only
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // featured/default
    });
  }, [products, selectedCategory, searchQuery, sortBy, priceRange, inStockOnly]);

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setSortBy("featured");
    setPriceRange(1000);
    setInStockOnly(false);
  };

  return (
    <div className="container" data-testid="catalog-section">
      <div className="catalog-toolbar">
        {/* Category Filter Pills */}
        <div className="category-pills-row" data-testid="category-pills-list">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              data-testid={`category-pill-${cat.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sort Toolbar */}
        <div className="filter-controls-row">
          <div className="filter-left-group">
            {/* Sort Select */}
            <div className="filter-item">
              <SlidersHorizontal size={15} />
              <label htmlFor="sort-select" style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
                data-testid="sort-select"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Price Slider */}
            <div className="filter-item price-slider-wrap">
              <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Max Price:</span>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="price-slider"
                data-testid="price-filter-slider"
              />
              <span style={{ fontWeight: 700, fontSize: "0.85rem", color: "var(--text-primary)" }}>
                ${priceRange}
              </span>
            </div>

            {/* In-Stock Only Toggle */}
            <label className="checkbox-label" data-testid="instock-filter-label">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="checkbox-input"
                data-testid="instock-filter-checkbox"
              />
              <span style={{ fontSize: "0.85rem" }}>In Stock Only</span>
            </label>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span className="product-count-badge" data-testid="products-count-badge">
              Showing <strong>{filteredProducts.length}</strong> of {products.length} products
            </span>

            {(selectedCategory !== "All" || inStockOnly || priceRange < 1000 || sortBy !== "featured") && (
              <button
                onClick={handleResetFilters}
                className="nav-btn"
                style={{ fontSize: "0.8rem", padding: "0.3rem 0.6rem" }}
                data-testid="reset-filters-btn"
                title="Reset all filters"
              >
                <RotateCcw size={14} /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      {filteredProducts.length > 0 ? (
        <div className="products-grid" data-testid="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "5rem 1rem",
            background: "var(--bg-secondary)",
            borderRadius: "var(--radius-lg)",
            border: "1px dashed var(--border-subtle)",
            marginBottom: "4rem"
          }}
          data-testid="empty-products-state"
        >
          <Filter size={48} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>No matching products found</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            Try adjusting your search query, price slider, or category filters.
          </p>
          <button onClick={handleResetFilters} className="btn-primary" data-testid="empty-reset-btn">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
