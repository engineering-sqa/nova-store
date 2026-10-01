import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load initial database
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory state initialized from db.json or fallback
let dbData = null;

function getDb() {
  if (dbData) return dbData;
  try {
    const dbPath = path.resolve(__dirname, "../../db.json");
    if (fs.existsSync(dbPath)) {
      dbData = JSON.parse(fs.readFileSync(dbPath, "utf-8"));
      return dbData;
    }
  } catch (e) {
    console.warn("Could not load db.json, using memory default:", e);
  }

  dbData = {
    products: [],
    users: [
      { id: "usr-1", email: "testuser@superqa.com", password: "password123", name: "Alex QA Runner", role: "customer" },
      { id: "usr-2", email: "admin@superqa.com", password: "adminpassword", name: "Sarah SuperAdmin", role: "admin" }
    ],
    orders: [],
    coupons: [
      { id: "cp-1", code: "SUPERQA20", discountPercent: 20, description: "20% SuperQA Special Discount" },
      { id: "cp-2", code: "FREESHIP", freeShipping: true, description: "100% Free Shipping Voucher" },
      { id: "cp-3", code: "WELCOME10", discountPercent: 10, description: "10% Welcome Discount" }
    ],
    wishlist: [],
    cart: []
  };
  return dbData;
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

  // Parse path: Netlify rewrites /api/* to /.netlify/functions/api/:splat
  // Normalize path to strip function prefix
  let cleanPath = event.path.replace(/^\/\.netlify\/functions\/api/, "");
  cleanPath = cleanPath.replace(/^\/api/, "");
  if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;

  const db = getDb();
  const segments = cleanPath.split("/").filter(Boolean); // e.g. ['products', 'prod-1']
  const resource = segments[0]; // e.g. 'products'
  const id = segments[1]; // e.g. 'prod-1'

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

    // Fallback: Status info
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        status: "online",
        service: "NovaStore Serverless REST API",
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
