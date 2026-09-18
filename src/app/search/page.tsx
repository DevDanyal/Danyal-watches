import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "@/components/search/SearchResults";

export const metadata: Metadata = {
  title: "Search | Danyal Watches",
  description: "Search for watches across the Danyal catalogue.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchResults />
    </Suspense>
  );
}