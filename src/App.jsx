import React from "react";
import { StoreProvider, useStore } from "./context/StoreContext";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { ProductGrid } from "./components/ProductGrid";
import { ProductModal } from "./components/ProductModal";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { AuthModal } from "./components/AuthModal";
import { OrdersView } from "./components/OrdersView";
import { WishlistView } from "./components/WishlistView";
import { QATestBar } from "./components/QATestBar";
import { Toast } from "./components/Toast";
import { Footer } from "./components/Footer";

function MainContent() {
  const { activeView } = useStore();

  return (
    <div className="app-layout" data-testid="app-layout">
      <Header />
      <main id="main-content">
        {activeView === "catalog" && (
          <>
            <HeroBanner />
            <ProductGrid />
          </>
        )}
        {activeView === "orders" && <OrdersView />}
        {activeView === "wishlist" && <WishlistView />}
      </main>

      {/* Global Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <AuthModal />
      <QATestBar />
      <Toast />

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
