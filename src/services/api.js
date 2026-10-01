import { INITIAL_PRODUCTS, TEST_ACCOUNTS, PROMO_CODES } from "../data/products";

const API_BASE = "/api";
const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

// Helper for safe fetch with timeout & fallback
async function request(endpoint, options = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return null;
    }

    return await response.json();
  } catch {
    // Return null on failure so caller can gracefully use fallback
    return null;
  }
}

export const api = {
  // Products
  async getProducts() {
    const data = await request("/products");
    return Array.isArray(data) && data.length > 0 ? data : INITIAL_PRODUCTS;
  },

  async getProductById(id) {
    const data = await request(`/products/${id}`);
    if (data) return data;
    return INITIAL_PRODUCTS.find((p) => p.id === id) || null;
  },

  async patchProductReviews(id, { reviews, rating, reviewCount }) {
    return await request(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ reviews, rating, reviewCount })
    });
  },

  // Orders
  async getOrders() {
    const data = await request("/orders");
    return Array.isArray(data) ? data : null;
  },

  async createOrder(orderData) {
    const res = await request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData)
    });
    return res || orderData;
  },

  // Users & Auth
  async login(email, password) {
    const users = await request(`/users?email=${encodeURIComponent(email)}`);
    if (Array.isArray(users) && users.length > 0) {
      const match = users.find((u) => u.password === password);
      if (match) return { success: true, user: match };
      return { success: false, message: "Invalid password" };
    }

    // Fallback: check static test accounts
    if (email.toLowerCase() === TEST_ACCOUNTS.admin.email.toLowerCase()) {
      if (password === TEST_ACCOUNTS.admin.password) {
        return { success: true, user: TEST_ACCOUNTS.admin };
      }
      return { success: false, message: "Invalid admin password" };
    }
    if (email.toLowerCase() === TEST_ACCOUNTS.customer.email.toLowerCase()) {
      return { success: true, user: TEST_ACCOUNTS.customer };
    }

    // Default customer
    return {
      success: true,
      user: { name: email.split("@")[0].replace(/[._]/g, " "), email, role: "customer" }
    };
  },

  async register(name, email, password) {
    const newUser = {
      id: "usr-" + Date.now(),
      name,
      email,
      password,
      role: "customer"
    };

    const res = await request("/users", {
      method: "POST",
      body: JSON.stringify(newUser)
    });

    return res || newUser;
  },

  // Coupons
  async getCoupons() {
    const data = await request("/coupons");
    if (Array.isArray(data) && data.length > 0) {
      return data.reduce((acc, c) => ({ ...acc, [c.code]: c }), {});
    }
    return PROMO_CODES;
  }
};
