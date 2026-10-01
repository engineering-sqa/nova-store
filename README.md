# 🛍️ NovaStore - Dummy E-Commerce App for SuperQA & CI Testing

A full-featured, responsive dummy e-commerce web application engineered specifically for **SuperQA**, **Playwright**, **Cypress**, and **GitHub Actions** automated test suites.

Every interactive element, input field, and verification state is tagged with explicit, predictable `data-testid` attributes.

---

## ✨ Features

- **🔐 Mock Authentication System**:
  - Modal with tabbed Sign In & Sign Up
  - Form validation with error states (`data-testid="auth-error-msg"`)
  - 1-click test credentials buttons (`Demo Customer`, `Demo Admin`)
  - Persistent login session in `localStorage`
  - User profile menu with Orders link and Sign Out

- **📦 Rich Product Catalog**:
  - 12 realistic hardware & gadget items with high-resolution imagery, pricing, and tags
  - Real-time instant search input with clear button
  - Category filter pills (`All`, `Audio`, `Wearables`, `Gaming`, `Cameras`, `Accessories`, etc.)
  - Sort by: Featured, Price (Low to High), Price (High to Low), Top Rated
  - Price range slider ($50 – $1,000)
  - In-stock only filter checkbox
  - Dynamic product count indicator & Reset Filters button

- **🔍 Product Detail Modal**:
  - Full-screen pop-in with image display & in-stock indicator
  - Color variant selector pills
  - Quantity stepper (+, -, manual input)
  - Tabbed sections: Overview, Technical Specs table, Customer Reviews
  - "Write a Review" interactive form with star ratings
  - Direct "Add to Cart" and "Buy Now" (instant checkout trigger) buttons

- **🛒 Slide-Over Shopping Cart**:
  - Line items with thumbnail, selected variant, price, and quantity steppers
  - Remove line item & Clear Cart actions
  - Promo code input with instant validation:
    - `SUPERQA20` -> 20% discount
    - `FREESHIP` -> 100% Free Shipping
    - `WELCOME10` -> 10% discount
  - Financial calculations: Subtotal, Promo Discount, Shipping, 8% Tax, Grand Total
  - "Proceed to Checkout" action button

- **💳 5-Step Checkout Flow**:
  1. **Shipping Details**: Full Name, Email, Phone, Address, City, Postal Code, Country + **"Autofill QA Details"** one-click button
  2. **Delivery Option**: Standard Ground ($0/$12), Express Air (+$15), Priority Overnight (+$25)
  3. **Payment Method**: Credit/Debit Card with **"Autofill Test Card"** button, PayPal Express, and Cash on Delivery options
  4. **Review & Confirm**: Order summary breakdown and "Place Order Now" action
  5. **Order Confirmation**: Unique generated Order ID (`ORD-XXXXXX`), fulfillment status, and "View in My Orders" navigation

- **📜 Order History & Wishlist**:
  - Past orders with timeline status tags (`Processing`, `Delivered`), items breakdown, and "Buy Again" re-ordering
  - Wishlist management with "Move to Cart" and "Remove"

- **🛠️ SuperQA Floating Helper Bar**:
  - Collapsible floating toolkit at bottom-right (`data-testid="qa-toggle-btn"`)
  - Quick triggers for automated tests:
    - *Login QA Customer*
    - *Quick-Seed Cart (2 Items)*
    - *Apply 'SUPERQA20'*
    - *Jump Directly to Checkout*
    - *Reset State to Clean Factory Defaults*

- **🎨 Modern Aesthetics & Theme**:
  - Glassmorphic dark / light mode toggle (`data-testid="theme-toggle-btn"`)
  - Google Fonts (Outfit & Inter)
  - Micro-animations, responsive grid layout, and toast notification system

---

## 🔑 Pre-Configured Test Accounts

| Role | Email | Password |
|---|---|---|
| **Demo Customer** | `testuser@superqa.com` | `password123` |
| **Demo Admin** | `admin@superqa.com` | `adminpassword` |

*(Note: Any valid email format with a password of 6+ characters is also accepted for custom test cases).*

---

## 🎟️ Available Promo Codes

| Code | Effect |
|---|---|
| `SUPERQA20` | 20% discount on order subtotal |
| `FREESHIP` | Free standard shipping |
| `WELCOME10` | 10% discount on order subtotal |

---

## 📋 Standardized `data-testid` Dictionary

### Navigation & Header
- `data-testid="header-logo"` - Brand logo button (navigates to catalog)
- `data-testid="search-input"` - Instant search input
- `data-testid="search-clear-btn"` - Clear search query
- `data-testid="nav-products-btn"` - Shop / Catalog view link
- `data-testid="nav-wishlist-btn"` - Wishlist view link
- `data-testid="wishlist-badge-count"` - Wishlist items count badge
- `data-testid="nav-orders-btn"` - Orders history link
- `data-testid="nav-cart-btn"` - Open Shopping Cart drawer
- `data-testid="cart-badge-count"` - Cart total items count badge
- `data-testid="theme-toggle-btn"` - Dark / Light theme toggle
- `data-testid="nav-login-btn"` - Open Sign In / Register modal
- `data-testid="user-menu-btn"` - Logged-in user dropdown toggle
- `data-testid="user-logout-btn"` - Sign out button

### Catalog & Filters
- `data-testid="category-pill-all"`, `category-pill-audio`, etc. - Category buttons
- `data-testid="sort-select"` - Sorting dropdown
- `data-testid="price-filter-slider"` - Max price range slider
- `data-testid="instock-filter-checkbox"` - In-stock filter checkbox
- `data-testid="products-count-badge"` - Filtered count text
- `data-testid="reset-filters-btn"` - Reset all catalog filters

### Product Cards
- `data-testid="product-card-{id}"` - Card container (e.g. `product-card-prod-1`)
- `data-testid="product-title-{id}"` - Product title
- `data-testid="product-price-{id}"` - Price display
- `data-testid="wishlist-btn-{id}"` - Wishlist toggle button
- `data-testid="add-to-cart-btn-{id}"` - Add to cart button
- `data-testid="quick-view-btn-{id}"` - Open product details modal

### Product Detail Modal
- `data-testid="product-detail-modal"` - Modal dialog container
- `data-testid="modal-close-btn"` - Close modal
- `data-testid="modal-product-title"` - Title in modal
- `data-testid="modal-product-price"` - Price in modal
- `data-testid="color-option-{color}"` - Color variant pill
- `data-testid="modal-qty-input"` - Quantity input
- `data-testid="qty-plus-btn"` - Increment quantity
- `data-testid="qty-minus-btn"` - Decrement quantity
- `data-testid="modal-add-to-cart-btn"` - Add to cart
- `data-testid="modal-buy-now-btn"` - Buy now (jump directly to checkout)
- `data-testid="tab-overview"`, `tab-specs"`, `tab-reviews"` - Tab navigation
- `data-testid="review-rating-select"` - Star rating selector
- `data-testid="review-comment-input"` - Review comment input
- `data-testid="submit-review-btn"` - Submit review button

### Cart Drawer
- `data-testid="cart-drawer"` - Slide-over drawer container
- `data-testid="cart-close-btn"` - Close cart
- `data-testid="cart-item-{id}"` - Cart line item
- `data-testid="cart-qty-plus-{id}"` - Increase item quantity
- `data-testid="cart-qty-minus-{id}"` - Decrease item quantity
- `data-testid="cart-remove-item-{id}"` - Remove single item
- `data-testid="cart-clear-btn"` - Clear all cart items
- `data-testid="cart-coupon-input"` - Promo code input
- `data-testid="cart-coupon-apply-btn"` - Apply promo code button
- `data-testid="cart-subtotal-val"` - Subtotal price text
- `data-testid="cart-discount-val"` - Discount price text
- `data-testid="cart-shipping-val"` - Shipping fee text
- `data-testid="cart-tax-val"` - Tax text
- `data-testid="cart-total-val"` - Grand total text
- `data-testid="cart-proceed-checkout-btn"` - Proceed to checkout button

### Checkout Flow
- `data-testid="checkout-modal"` - Multi-step checkout modal
- `data-testid="checkout-close-btn"` - Close checkout modal
- `data-testid="autofill-shipping-btn"` - 1-Click QA demo shipping details
- `data-testid="shipping-name-input"` - Full Name input
- `data-testid="shipping-email-input"` - Email input
- `data-testid="shipping-address-input"` - Address input
- `data-testid="shipping-city-input"` - City input
- `data-testid="shipping-postal-input"` - Postal code input
- `data-testid="shipping-country-select"` - Country dropdown
- `data-testid="step1-continue-btn"` - Continue to Delivery
- `data-testid="delivery-option-standard"` - Standard shipping
- `data-testid="delivery-option-express"` - Express Air delivery
- `data-testid="delivery-option-overnight"` - Priority overnight delivery
- `data-testid="step2-continue-btn"` - Continue to Payment
- `data-testid="autofill-card-btn"` - 1-Click QA test card fill
- `data-testid="payment-tab-card"` - Credit Card tab
- `data-testid="payment-tab-paypal"` - PayPal tab
- `data-testid="payment-tab-cod"` - Cash on Delivery tab
- `data-testid="card-number-input"` - Card number input
- `data-testid="card-name-input"` - Name on card input
- `data-testid="card-expiry-input"` - Card expiry (MM/YY)
- `data-testid="card-cvv-input"` - Card CVV
- `data-testid="step3-continue-btn"` - Continue to Review
- `data-testid="place-order-submit-btn"` - Place order button
- `data-testid="order-confirmation-screen"` - Order success confirmation screen
- `data-testid="order-confirmation-id"` - Generated unique Order ID
- `data-testid="confirmation-view-orders-btn"` - Navigate to Orders view

### SuperQA Helper Bar
- `data-testid="qa-toggle-btn"` - Toggle floating helper
- `data-testid="qa-btn-login-customer"` - Instant customer login
- `data-testid="qa-btn-seed-cart"` - Seed 2 products into cart
- `data-testid="qa-btn-apply-coupon"` - Quick apply SUPERQA20
- `data-testid="qa-btn-open-checkout"` - Direct checkout jump
- `data-testid="qa-btn-reset-state"` - Factory reset localStorage

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The server will start at `http://localhost:5173`.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```

---

## 🤖 GitHub Actions CI/CD Integration

The repository includes a ready-to-run GitHub Actions workflow at [`.github/workflows/superqa-test.yml`](.github/workflows/superqa-test.yml):

```yaml
name: SuperQA E2E Automated Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - run: npm run preview -- --port 5173 &
      - run: npx wait-on http://localhost:5173 --timeout 15000
      # Run SuperQA runner / Playwright / Cypress against http://localhost:5173
```
