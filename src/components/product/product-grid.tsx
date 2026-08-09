import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/product-card";
import { Reveal, StaggerGroup } from "@/components/ui/section";

export function ProductGrid({ products, emptyMessage }: { products: Product[]; emptyMessage?: string }) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line py-20 text-center">
        <p className="text-ink-soft">{emptyMessage ?? "No products match your filters."}</p>
      </div>
    );
  }

  return (
    <StaggerGroup className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Reveal key={product.id} as="li" className="list-none">
          <ProductCard product={product} />
        </Reveal>
      ))}
    </StaggerGroup>
  );
}
