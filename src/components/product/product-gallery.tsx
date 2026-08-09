"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { CATEGORY_META } from "@/lib/category-meta";
import { ProductImage } from "@/components/product/product-image";
import { HealthRing } from "@/components/product/health-ring";
import { cn } from "@/lib/utils";

export function ProductGallery({ product }: { product: Product }) {
  // Mock data ships one hero image per product; this maps a few subtle
  // presentation "angles" for demo purposes. Replace with real Cloudinary
  // photo URLs — see README "Images & Cloudinary".
  const angles = ["Front", "Back", "Detail"];
  const [active, setActive] = useState(0);
  const ring = CATEGORY_META[product.category].ring;

  return (
    <div>
      <div className="relative">
        <ProductImage category={product.category} gradient={product.gradient} name={product.name} size="lg" />
        {product.batteryHealth && (
          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-canvas/90 px-4 py-3 shadow-elevated backdrop-blur">
            <HealthRing value={product.batteryHealth} size={52} strokeWidth={5} color={ring} />
            <div>
              <p className="text-sm font-bold text-ink">{product.batteryHealth}% battery health</p>
              <p className="text-xs text-ink-faint">Verified at certification</p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {angles.map((angle, i) => (
          <button
            key={angle}
            onClick={() => setActive(i)}
            aria-label={`Show ${angle.toLowerCase()} view`}
            aria-pressed={active === i}
            className={cn(
              "flex flex-col items-center gap-2 rounded-2xl border p-3 text-xs font-medium transition-colors",
              active === i ? "border-accent text-accent-deep" : "border-line text-ink-faint hover:border-ink"
            )}
          >
            <ProductImage category={product.category} gradient={product.gradient} name={product.name} size="sm" className="!h-10 !w-10 !rounded-xl" />
            {angle}
          </button>
        ))}
      </div>
    </div>
  );
}
