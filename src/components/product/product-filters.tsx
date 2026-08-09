"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import type { ConditionGrade, DeviceCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Select } from "@/components/ui/form-fields";
import { IconButton, Button } from "@/components/ui/button";

export type SortOption = "featured" | "price-asc" | "price-desc" | "newest" | "rating";

export interface FilterState {
  categories: DeviceCategory[];
  conditions: ConditionGrade[];
  brands: ("Apple" | "Samsung")[];
  priceBucket: string | null;
  sort: SortOption;
}

export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  conditions: [],
  brands: [],
  priceBucket: null,
  sort: "featured",
};

const CONDITIONS: ConditionGrade[] = ["Pristine", "Excellent", "Good", "Fair"];
const BRANDS: ("Apple" | "Samsung")[] = ["Apple", "Samsung"];
const PRICE_BUCKETS = [
  { id: "under-5000", label: "Under R5,000", test: (p: number) => p < 5000 },
  { id: "5000-10000", label: "R5,000 – R10,000", test: (p: number) => p >= 5000 && p < 10000 },
  { id: "10000-20000", label: "R10,000 – R20,000", test: (p: number) => p >= 10000 && p < 20000 },
  { id: "over-20000", label: "R20,000+", test: (p: number) => p >= 20000 },
];

export function getPriceBucketTest(id: string | null) {
  return PRICE_BUCKETS.find((b) => b.id === id)?.test ?? (() => true);
}

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-2 text-sm text-ink-soft hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-line text-accent accent-accent focus-visible:outline-accent"
      />
      {label}
    </label>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-5 first:pt-0 last:border-0">
      <h3 className="mb-1 text-sm font-semibold text-ink">{title}</h3>
      {children}
    </div>
  );
}

export function FilterPanel({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const hasActive =
    filters.categories.length + filters.conditions.length + filters.brands.length + (filters.priceBucket ? 1 : 0) > 0;

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <span className="text-sm font-semibold text-ink">Filters</span>
        {hasActive && (
          <button onClick={() => onChange({ ...DEFAULT_FILTERS, sort: filters.sort })} className="text-xs font-medium text-accent hover:underline">
            Clear all
          </button>
        )}
      </div>

      <FilterGroup title="Category">
        {CATEGORIES.map((c) => (
          <CheckboxRow
            key={c}
            label={c}
            checked={filters.categories.includes(c)}
            onChange={() => onChange({ ...filters, categories: toggleValue(filters.categories, c) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Condition">
        {CONDITIONS.map((c) => (
          <CheckboxRow
            key={c}
            label={c}
            checked={filters.conditions.includes(c)}
            onChange={() => onChange({ ...filters, conditions: toggleValue(filters.conditions, c) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {BRANDS.map((b) => (
          <CheckboxRow
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => onChange({ ...filters, brands: toggleValue(filters.brands, b) })}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        {PRICE_BUCKETS.map((b) => (
          <label key={b.id} className="flex cursor-pointer items-center gap-3 py-2 text-sm text-ink-soft hover:text-ink">
            <input
              type="radio"
              name="price-bucket"
              checked={filters.priceBucket === b.id}
              onChange={() => onChange({ ...filters, priceBucket: filters.priceBucket === b.id ? null : b.id })}
              className="h-4 w-4 border-line text-accent accent-accent"
            />
            {b.label}
          </label>
        ))}
      </FilterGroup>
    </div>
  );
}

export function SortSelect({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  return (
    <Select
      aria-label="Sort products"
      value={value}
      onChange={(e) => onChange(e.target.value as SortOption)}
      className="w-auto min-w-[180px]"
    >
      <option value="featured">Sort: Featured</option>
      <option value="price-asc">Price: Low to High</option>
      <option value="price-desc">Price: High to Low</option>
      <option value="newest">Newest Arrivals</option>
      <option value="rating">Highest Rated</option>
    </Select>
  );
}

export function MobileFilterButton({
  filters,
  onChange,
  resultCount,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  resultCount: number;
}) {
  const [open, setOpen] = useState(false);
  const activeCount =
    filters.categories.length + filters.conditions.length + filters.brands.length + (filters.priceBucket ? 1 : 0);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-outline btn-sm lg:hidden">
        <SlidersHorizontal size={14} aria-hidden="true" />
        Filters
        {activeCount > 0 && <span className="ml-0.5 rounded-full bg-accent px-1.5 text-[11px] text-white">{activeCount}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Filter products"
              className="fixed inset-x-0 bottom-0 z-[90] flex max-h-[85vh] flex-col rounded-t-4xl bg-canvas p-6 shadow-elevated lg:hidden"
            >
              <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-bold text-ink">Filters</h2>
                <IconButton label="Close filters" onClick={() => setOpen(false)}>
                  <X size={20} />
                </IconButton>
              </div>
              <div className="flex-1 overflow-y-auto">
                <FilterPanel filters={filters} onChange={onChange} />
              </div>
              <Button variant="primary" size="lg" className="mt-4 w-full" onClick={() => setOpen(false)}>
                Show {resultCount} result{resultCount === 1 ? "" : "s"}
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
