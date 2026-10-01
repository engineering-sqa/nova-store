import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_PRODUCTS, TEST_ACCOUNTS, PROMO_CODES } from "../data/products";

const StoreContext = createContext(null);

const STORAGE_KEYS = {
  CART: "superqa_cart",
  WISHLIST: "superqa_wishlist",
  USER: "superqa_user",
  ORDERS: "superqa_orders",
  THEME: "superqa_theme",
  COUPON: "superqa_coupon",
};

export const StoreProvider = ({ children }) => {
  // Products
  const [products, setProducts] = useState(INITIAL_PRODUCTS);

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ["prod-1", "prod-3"];
    } catch {
      return ["prod-1", "prod-3"];
    }
  });

  // User Auth
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
      // Default demo order
      return [
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
      ];
    } catch {
      return [];
    }
  });

  // Promo Code
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPON);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Theme
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
    } catch {
      return "dark";
    }
  });

  // UI States
  const [activeView, setActiveView] = useState("catalog"); // 'catalog' | 'orders' | 'wishlist'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured"); // 'featured' | 'price-asc' | 'price-desc' | 'rating'
  const [priceRange, setPriceRange] = useState(1000);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(STORAGE_KEYS.COUPON);
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedCoupon]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Toast helper
  const addToast = (message, type = "info") => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedColor = null) => {
    setCart((prev) => {
      const color = selectedColor || (product.colors && product.colors[0]) || "Default";
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            ...product,
            quantity,
            selectedColor: color
          }
        ];
      }
    });
    addToast(`Added "${product.title}" to cart!`, "success");
  };

  const updateCartQuantity = (productId, selectedColor, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === productId && (!selectedColor || item.selectedColor === selectedColor)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId, selectedColor) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.id === productId && (!selectedColor || item.selectedColor === selectedColor))
      )
    );
    addToast("Item removed from cart", "info");
  };

  const clearCart = () => {
    setCart([]);
    addToast("Shopping cart cleared", "info");
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast("Removed from wishlist", "info");
        return prev.filter((id) => id !== productId);
      } else {
        addToast("Added to wishlist!", "success");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Authentication
  const login = (email, password) => {
    // Check against test accounts or accept any valid credentials
    if (!email || !password) {
      return { success: false, message: "Please enter email and password" };
    }

    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" };
    }

    let authenticatedUser;
    if (email.toLowerCase() === TEST_ACCOUNTS.admin.email.toLowerCase()) {
      if (password === TEST_ACCOUNTS.admin.password) {
        authenticatedUser = { ...TEST_ACCOUNTS.admin };
      } else {
        return { success: false, message: "Invalid admin password" };
      }
    } else if (email.toLowerCase() === TEST_ACCOUNTS.customer.email.toLowerCase()) {
      authenticatedUser = { ...TEST_ACCOUNTS.customer };
    } else {
      authenticatedUser = {
        name: email.split("@")[0].replace(/[._]/g, " "),
        email,
        role: "customer"
      };
    }

    setUser(authenticatedUser);
    setIsAuthOpen(false);
    addToast(`Welcome back, ${authenticatedUser.name}!`, "success");
    return { success: true };
  };

  const signup = (name, email, password) => {
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required" };
    }
    if (password.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" };
    }

    const newUser = { name, email, role: "customer" };
    setUser(newUser);
    setIsAuthOpen(false);
    addToast(`Account created! Welcome, ${name}!`, "success");
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    addToast("Logged out successfully", "info");
  };

  // Promo code
  const applyCoupon = (codeStr) => {
    const cleanCode = (codeStr || "").trim().toUpperCase();
    if (!cleanCode) {
      return { success: false, message: "Enter a coupon code" };
    }
    const coupon = PROMO_CODES[cleanCode];
    if (coupon) {
      setAppliedCoupon(coupon);
      addToast(`Promo code "${cleanCode}" applied!`, "success");
      return { success: true, message: coupon.description };
    } else {
      return { success: false, message: "Invalid promo code. Try 'SUPERQA20' or 'FREESHIP'" };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast("Coupon removed", "info");
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let promoDiscount = 0;
  if (appliedCoupon && appliedCoupon.discountPercent) {
    promoDiscount = (cartSubtotal * appliedCoupon.discountPercent) / 100;
  }

  const rawShipping = cartSubtotal === 0 || cartSubtotal >= 100 ? 0 : 12;
  const shippingFee = (appliedCoupon && appliedCoupon.freeShipping) ? 0 : rawShipping;
  const tax = cartSubtotal > 0 ? (cartSubtotal - promoDiscount) * 0.08 : 0;
  const cartTotal = Math.max(0, cartSubtotal - promoDiscount + shippingFee + tax);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Orders
  const placeOrder = (orderData) => {
    const newOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: promoDiscount,
      shippingFee,
      tax,
      total: cartTotal,
      status: "Processing",
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    addToast(`Order #${newOrderId} placed successfully!`, "success");
    return newOrder;
  };

  // Product reviews
  const addReview = (productId, reviewData) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedReviews = [
            {
              id: "rev-" + Date.now(),
              user: user ? user.name : reviewData.userName || "Verified Buyer",
              rating: Number(reviewData.rating) || 5,
              comment: reviewData.comment,
              date: new Date().toISOString().split("T")[0]
            },
            ...(p.reviews || [])
          ];
          const newAvgRating = (
            updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          ).toFixed(1);

          return {
            ...p,
            reviews: updatedReviews,
            reviewCount: updatedReviews.length,
            rating: Number(newAvgRating)
          };
        }
        return p;
      })
    );
    addToast("Review submitted successfully!", "success");
  };

  // Quick QA helper triggers
  const qaSeedCart = () => {
    const item1 = products[0];
    const item2 = products[1];
    setCart([
      { ...item1, quantity: 1, selectedColor: item1.colors[0] },
      { ...item2, quantity: 2, selectedColor: item2.colors[0] }
    ]);
    addToast("QA: Pre-seeded cart with 2 products (3 items total)", "info");
  };

  const qaLoginCustomer = () => {
    setUser({ ...TEST_ACCOUNTS.customer });
    addToast("QA: Logged in as demo customer", "info");
  };

  const qaResetAll = () => {
    localStorage.clear();
    setProducts(INITIAL_PRODUCTS);
    setCart([]);
    setWishlist([]);
    setUser(null);
    setOrders([]);
    setAppliedCoupon(null);
    setActiveView("catalog");
    setIsCartOpen(false);
    setIsAuthOpen(false);
    setIsCheckoutOpen(false);
    setSelectedProduct(null);
    addToast("QA: State & Storage completely reset to factory defaults", "info");
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        cartItemCount,
        cartSubtotal,
        promoDiscount,
        shippingFee,
        tax,
        cartTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        login,
        signup,
        logout,
        orders,
        placeOrder,
        addReview,
        activeView,
        setActiveView,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        inStockOnly,
        setInStockOnly,
        theme,
        setTheme,
        toasts,
        addToast,
        removeToast,
        qaSeedCart,
        qaLoginCustomer,
        qaResetAll,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
