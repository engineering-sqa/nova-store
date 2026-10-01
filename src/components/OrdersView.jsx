import React from "react";
import { useStore } from "../context/StoreContext";
import { Package, Calendar, MapPin, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";

export const OrdersView = () => {
  const { orders, addToCart, setActiveView, setIsCartOpen } = useStore();

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      addToCart(item, item.quantity, item.selectedColor);
    });
    setIsCartOpen(true);
  };

  return (
    <div className="container" style={{ padding: "3rem 1.5rem" }} data-testid="orders-view">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 800 }}>
            Order History
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Review past orders, simulation fulfillment statuses, and tracking timelines.
          </p>
        </div>

        <button
          onClick={() => setActiveView("catalog")}
          className="btn-secondary"
          data-testid="orders-back-shop-btn"
        >
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {orders.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} data-testid="orders-list">
          {orders.map((order) => (
            <div
              key={order.id}
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden"
              }}
              data-testid={`order-card-${order.id}`}
            >
              {/* Card Header */}
              <div
                style={{
                  background: "var(--bg-tertiary)",
                  padding: "1rem 1.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                  borderBottom: "1px solid var(--border-subtle)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>ORDER ID</div>
                    <div style={{ fontWeight: 700, color: "var(--accent-primary)" }} data-testid={`order-id-label-${order.id}`}>
                      {order.id}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>DATE PLACED</div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>TOTAL AMOUNT</div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }} data-testid={`order-total-${order.id}`}>
                      ${order.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      background:
                        order.status === "Delivered"
                          ? "rgba(16, 185, 129, 0.15)"
                          : "rgba(59, 130, 246, 0.15)",
                      color:
                        order.status === "Delivered"
                          ? "var(--color-success)"
                          : "var(--color-info)"
                    }}
                    data-testid={`order-status-${order.id}`}
                  >
                    ● {order.status}
                  </span>

                  <button
                    onClick={() => handleReorder(order)}
                    className="nav-btn"
                    style={{ fontSize: "0.8rem", padding: "0.4rem 0.8rem" }}
                    data-testid={`reorder-btn-${order.id}`}
                  >
                    <ShoppingBag size={14} /> Buy Again
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div style={{ padding: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        paddingBottom: "1rem",
                        borderBottom: idx === order.items.length - 1 ? "none" : "1px solid var(--border-subtle)"
                      }}
                      data-testid={`order-item-${order.id}-${item.id}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{ width: "56px", height: "56px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          Qty: {item.quantity} {item.selectedColor ? `• Color: ${item.selectedColor}` : ""}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
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
          data-testid="no-orders-state"
        >
          <Package size={50} style={{ color: "var(--text-muted)", marginBottom: "1rem" }} />
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>No orders placed yet</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
            When you complete a checkout run, your test orders will appear right here.
          </p>
          <button
            onClick={() => setActiveView("catalog")}
            className="btn-primary"
            data-testid="no-orders-browse-btn"
          >
            Browse Catalog
          </button>
        </div>
      )}
    </div>
  );
};
