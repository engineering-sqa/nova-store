import { INITIAL_PRODUCTS, TEST_ACCOUNTS, PROMO_CODES } from "../../src/data/products.js";

// In-memory persistent database for serverless container lifecycle
let inMemoryDb = null;

function getDb() {
  if (!inMemoryDb) {
    inMemoryDb = {
      products: JSON.parse(JSON.stringify(INITIAL_PRODUCTS)),
      users: [
        { id: "usr-1", ...TEST_ACCOUNTS.customer },
        { id: "usr-2", ...TEST_ACCOUNTS.admin }
      ],
      orders: [
        {
          id: "ORD-94821",
          date: "2026-09-28T14:30:00.000Z",
          items: [
            {
              id: "prod-1",
              title: "Apex ANC Wireless Headphones Pro",
              price: 249.99,
              quantity: 1,
              selectedColor: "Midnight Black",
              image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=80"
            }
          ],
          subtotal: 249.99,
          discount: 0,
          shippingFee: 0,
          tax: 20.00,
          total: 269.99,
          status: "Delivered",
          shippingAddress: {
            fullName: "Alex QA Runner",
            address: "100 Innovation Way",
            city: "San Francisco",
            postalCode: "94105",
            country: "United States"
          },
          paymentMethod: "Credit Card (•••• 4242)"
        }
      ],
      coupons: Object.values(PROMO_CODES).map((c, i) => ({ id: `cp-${i + 1}`, ...c })),
      wishlist: [
        { id: "w1", productId: "prod-1" },
        { id: "w2", productId: "prod-3" }
      ],
      cart: []
    };
  }
  return inMemoryDb;
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Content-Type": "application/json"
};

export const handler = async (event) => {
  const method = event.httpMethod;

  // Handle CORS preflight
  if (method === "OPTIONS") {
    return { statusCode: 204, headers };
  }

  // Normalize path
  let cleanPath = (event.path || "")
    .replace(/^\/\.netlify\/functions\/api/, "")
    .replace(/^\/api/, "");
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

  const db = getDb();
  const segments = cleanPath.split("/").filter(Boolean);
  const resource = segments[0];
  const id = segments[1];
  const queryParams = event.queryStringParameters || {};

  try {
    // 1. PRODUCTS
    if (resource === "products") {
      if (!id && method === "GET") {
        let list = [...(db.products || [])];
        if (queryParams.category && queryParams.category !== "All") {
          list = list.filter((p) => p.category === queryParams.category);
        }
        return { statusCode: 200, headers, body: JSON.stringify(list) };
      }

      if (id && method === "GET") {
        const item = (db.products || []).find((p) => p.id === id);
        if (!item) return { statusCode: 404, headers, body: JSON.stringify({ error: "Product not found" }) };
        return { statusCode: 200, headers, body: JSON.stringify(item) };
      }

      if (id && (method === "PATCH" || method === "PUT")) {
        const body = JSON.parse(event.body || "{}");
        const idx = (db.products || []).findIndex((p) => p.id === id);
        if (idx > -1) {
          db.products[idx] = { ...db.products[idx], ...body };
          return { statusCode: 200, headers, body: JSON.stringify(db.products[idx]) };
        }
        return { statusCode: 404, headers, body: JSON.stringify({ error: "Product not found" }) };
      }
    }

    // 2. USERS & AUTH
    if (resource === "users") {
      if (method === "GET") {
        let users = [...(db.users || [])];
        if (queryParams.email) {
          users = users.filter((u) => u.email.toLowerCase() === queryParams.email.toLowerCase());
        }
        return { statusCode: 200, headers, body: JSON.stringify(users) };
      }

      if (method === "POST") {
        const body = JSON.parse(event.body || "{}");
        const newUser = {
          id: "usr-" + Date.now(),
          name: body.name || "Customer",
          email: body.email,
          password: body.password,
          role: "customer"
        };
        db.users = [newUser, ...(db.users || [])];
        return { statusCode: 201, headers, body: JSON.stringify(newUser) };
      }
    }

    // 3. ORDERS
    if (resource === "orders") {
      if (method === "GET") {
        return { statusCode: 200, headers, body: JSON.stringify(db.orders || []) };
      }

      if (method === "POST") {
        const newOrder = JSON.parse(event.body || "{}");
        if (!newOrder.id) {
          newOrder.id = "ORD-" + Math.floor(100000 + Math.random() * 900000);
        }
        db.orders = [newOrder, ...(db.orders || [])];
        return { statusCode: 201, headers, body: JSON.stringify(newOrder) };
      }
    }

    // 4. COUPONS
    if (resource === "coupons") {
      if (method === "GET") {
        return { statusCode: 200, headers, body: JSON.stringify(db.coupons || []) };
      }
    }

    // 5. WISHLIST
    if (resource === "wishlist") {
      if (method === "GET") {
        return { statusCode: 200, headers, body: JSON.stringify(db.wishlist || []) };
      }
      if (method === "POST") {
        const item = JSON.parse(event.body || "{}");
        db.wishlist = [...(db.wishlist || []), item];
        return { statusCode: 201, headers, body: JSON.stringify(item) };
      }
    }

    // Default info
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "online",
        service: "NovaStore Netlify Serverless REST API",
        endpoints: ["/api/products", "/api/users", "/api/orders", "/api/coupons", "/api/wishlist"]
      })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
