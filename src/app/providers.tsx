"use client";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";
import { AuthProvider } from "@/context/AuthContext";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchOverlay from "@/components/search/SearchOverlay";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <SearchProvider>
          <AuthProvider>
            {children}
            <CartDrawer />
            <SearchOverlay />
          </AuthProvider>
        </SearchProvider>
      </WishlistProvider>
    </CartProvider>
  );
}