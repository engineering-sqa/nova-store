import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { 
  ShoppingBag, 
  Search, 
  X, 
  Heart, 
  User, 
  Package, 
  Sun, 
  Moon, 
  LogOut, 
  ChevronDown,
  Sparkles
} from "lucide-react";

export const Header = () => {
  const {
    cartItemCount,
    wishlist,
    user,
    logout,
    setIsCartOpen,
    setIsAuthOpen,
    activeView,
    setActiveView,
    searchQuery,
    setSearchQuery,
    theme,
    setTheme
  } = useStore();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="navbar" data-testid="header-container">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <button
            onClick={() => setActiveView("catalog")}
            className="brand-logo"
            style={{ background: "transparent", border: "none", textAlign: "left" }}
            data-testid="header-logo"
          >
            <div className="brand-icon-box">
              <ShoppingBag size={20} />
            </div>
            <span>Nova<span className="text-gradient">Store</span></span>
            <span className="brand-badge" data-testid="superqa-badge">SUPERQA TEST</span>
          </button>

          {/* Search Bar */}
          <div className="search-bar-container">
            <Search size={18} className="search-icon-left" />
            <input
              type="text"
              placeholder="Search gadgets, audio, laptops, drones..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== "catalog") setActiveView("catalog");
              }}
              className="search-input"
              data-testid="search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="search-clear-btn"
                data-testid="search-clear-btn"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Nav Actions */}
          <div className="nav-actions">
            {/* Catalog Link */}
            <button
              onClick={() => setActiveView("catalog")}
              className={`nav-btn ${activeView === "catalog" ? "active" : ""}`}
              data-testid="nav-products-btn"
            >
              Shop
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => setActiveView("wishlist")}
              className={`nav-btn ${activeView === "wishlist" ? "active" : ""}`}
              data-testid="nav-wishlist-btn"
              title="View Wishlist"
            >
              <Heart size={18} />
              <span>Wishlist</span>
              {wishlist.length > 0 && (
                <span className="icon-badge" data-testid="wishlist-badge-count">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Orders Link */}
            <button
              onClick={() => setActiveView("orders")}
              className={`nav-btn ${activeView === "orders" ? "active" : ""}`}
              data-testid="nav-orders-btn"
              title="My Orders"
            >
              <Package size={18} />
              <span>Orders</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="nav-btn"
              data-testid="nav-cart-btn"
              title="Open Shopping Cart"
            >
              <ShoppingBag size={18} />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="icon-badge" data-testid="cart-badge-count">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="nav-btn"
              data-testid="theme-toggle-btn"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth / User Menu */}
            {user ? (
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="user-badge-btn"
                  data-testid="user-menu-btn"
                >
                  <div className="user-avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontWeight: 600 }}>{user.name}</span>
                  <ChevronDown size={14} />
                </button>

                {isUserMenuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      width: "210px",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "var(--radius-md)",
                      boxShadow: "var(--shadow-lg)",
                      padding: "0.5rem",
                      zIndex: 200
                    }}
                    data-testid="user-menu-dropdown"
                  >
                    <div style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--border-subtle)" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Signed in as</div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis" }} data-testid="user-email-display">
                        {user.email}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveView("orders");
                        setIsUserMenuOpen(false);
                      }}
                      className="nav-btn"
                      style={{ width: "100%", justifyContent: "flex-start", marginTop: "4px" }}
                      data-testid="user-orders-menu-item"
                    >
                      <Package size={16} /> My Orders
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="nav-btn"
                      style={{ width: "100%", justifyContent: "flex-start", color: "var(--color-danger)" }}
                      data-testid="user-logout-btn"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="btn-primary"
                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                data-testid="nav-login-btn"
              >
                <User size={16} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
