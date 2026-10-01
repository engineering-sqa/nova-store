import React from "react";
import { useStore } from "../context/StoreContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export const Toast = () => {
  const { toasts, removeToast } = useStore();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" data-testid="toast-container">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-item ${t.type}`}
          data-testid="toast-item"
        >
          {t.type === "success" && <CheckCircle2 size={16} color="var(--color-success)" />}
          {t.type === "error" && <AlertCircle size={16} color="var(--color-danger)" />}
          {t.type === "info" && <Info size={16} color="var(--accent-primary)" />}

          <span style={{ fontWeight: 500 }} data-testid="toast-message-text">{t.message}</span>

          <button
            onClick={() => removeToast(t.id)}
            style={{ background: "transparent", color: "var(--text-muted)", marginLeft: "auto", display: "flex" }}
            aria-label="Dismiss toast"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
