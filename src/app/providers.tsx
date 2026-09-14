"use client";

import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/search/SearchOverlay";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SearchProvider>
        <AuthProvider>
          {children}
          <CartDrawer />
          <SearchOverlay />
        </AuthProvider>
      </SearchProvider>
    </CartProvider>
  );
}