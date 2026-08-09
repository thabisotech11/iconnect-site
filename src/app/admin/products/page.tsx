"use client";

import { useMemo, useState } from "react";
import { Search, Pencil, Trash2, Plus, Info } from "lucide-react";
import { PRODUCTS } from "@/lib/mock-data";
import { formatZAR } from "@/lib/utils";
import { ProductImage } from "@/components/product/product-image";
import { ConditionBadge, StockBadge } from "@/components/ui/badge";
import { Input } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => PRODUCTS.filter((p) => `${p.name} ${p.category} ${p.brand}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">Products</h1>
          <p className="mt-1 text-sm text-ink-soft">{PRODUCTS.length} listings across 7 categories</p>
        </div>
        <Button variant="primary" size="md">
          <Plus size={16} aria-hidden="true" />
          Add product
        </Button>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-accent/20 bg-accent-soft p-4 text-sm text-accent-deep">
        <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
        This table reads from mock data for the demo. Connect Supabase (see README) to manage real inventory —
        the query shape in <code className="rounded bg-white/60 px-1 py-0.5 font-mono text-xs">src/lib/mock-data.ts</code> maps
        directly onto the <code className="rounded bg-white/60 px-1 py-0.5 font-mono text-xs">products</code> table.
      </div>

      <div className="mt-6 max-w-sm">
        <div className="relative">
          <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products…" className="pl-10" />
        </div>
      </div>

      <div className="card mt-5 overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line text-left text-xs text-ink-faint">
              <th className="p-4 font-medium">Product</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Condition</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0 hover:bg-surface/60">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <ProductImage category={p.category} gradient={p.gradient} name={p.name} size="sm" className="!h-10 !w-10 !rounded-xl" />
                    <span className="font-medium text-ink">{p.name}</span>
                  </div>
                </td>
                <td className="p-4 text-ink-soft">{p.category}</td>
                <td className="p-4">
                  <ConditionBadge condition={p.condition} />
                </td>
                <td className="p-4 font-medium text-ink">{formatZAR(p.price)}</td>
                <td className="p-4">
                  <StockBadge quantity={p.stockQuantity} />
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-1">
                    <button aria-label={`Edit ${p.name}`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-surface hover:text-ink">
                      <Pencil size={14} />
                    </button>
                    <button aria-label={`Delete ${p.name}`} className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
