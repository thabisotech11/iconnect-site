"use client";

import { useRecentlyViewed } from "@/context/providers";
import { PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/product-card";
import { Container } from "@/components/ui/section";

export function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const { ids } = useRecentlyViewed();
  const products = ids
    .filter((id) => id !== excludeId)
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section className="section-y border-t border-line" aria-labelledby="recently-viewed-heading">
      <Container>
        <h2 id="recently-viewed-heading" className="mb-8 text-2xl font-semibold text-ink">
          Recently viewed
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
