"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { DeviceCategory } from "@/lib/types";
import { PRODUCTS } from "@/lib/mock-data";
import { Container } from "@/components/ui/section";
import { ProductGrid } from "@/components/product/product-grid";
import {
  FilterPanel,
  MobileFilterButton,
  SortSelect,
  DEFAULT_FILTERS,
  getPriceBucketTest,
  type FilterState,
  type SortOption,
} from "@/components/product/product-filters";

function ShopContent() {
  const searchParams = useSearchParams();
  const queryFromUrl = searchParams.get("q") ?? "";
  const categoryFromUrl = searchParams.get("category") as DeviceCategory | null;
  const sortFromUrl = (searchParams.get("sort") as SortOption | null) ?? "featured";

  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    sort: sortFromUrl,
  });
  const [query, setQuery] = useState(queryFromUrl);

  const results = useMemo(() => {
    const priceTest = getPriceBucketTest(filters.priceBucket);
    let list = PRODUCTS.filter((p) => {
      if (query && !`${p.name} ${p.category} ${p.brand}`.toLowerCase().includes(query.toLowerCase())) return false;
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.conditions.length && !filters.conditions.includes(p.condition)) return false;
      if (filters.brands.length && !filters.brands.includes(p.brand)) return false;
      if (!priceTest(p.price)) return false;
      return true;
    });

    switch (filters.sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return list;
  }, [query, filters]);

  return (
    <div className="section-y !pt-10">
      <Container>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Shop certified devices</h1>
            <p className="mt-2 text-ink-soft">{results.length} device{results.length === 1 ? "" : "s"} available</p>
          </div>
          <div className="relative w-full sm:w-72">
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by model…"
              className="input"
            />
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4 border-y border-line py-4">
          <MobileFilterButton filters={filters} onChange={setFilters} resultCount={results.length} />
          <div className="ml-auto">
            <SortSelect value={filters.sort} onChange={(sort) => setFilters({ ...filters, sort })} />
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          <aside className="hidden lg:block">
            <FilterPanel filters={filters} onChange={setFilters} />
          </aside>
          <ProductGrid products={results} emptyMessage="No devices match your search — try adjusting your filters." />
        </div>
      </Container>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
