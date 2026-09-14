"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type SearchContextType = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  query: string;
  setQuery: (q: string) => void;
};

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const openSearch = useCallback(() => {
    setQuery("");
    setSearchOpen(true);
  }, []);

  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <SearchContext.Provider value={{ searchOpen, openSearch, closeSearch, query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within SearchProvider");
  return ctx;
}