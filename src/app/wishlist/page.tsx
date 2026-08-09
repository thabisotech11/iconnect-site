"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/providers";
import { PRODUCTS } from "@/lib/mock-data";
import { Container } from "@/components/ui/section";
import { ProductGrid } from "@/components/product/product-grid";
import { ButtonLink } from "@/components/ui/button";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const products = PRODUCTS.filter((p) => ids.includes(p.id));

  return (
    <div className="section-y !pt-12">
      <Container>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Your wishlist</h1>
        <p className="mt-2 text-ink-soft">{products.length} saved device{products.length === 1 ? "" : "s"}</p>

        <div className="mt-10">
          {products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-line py-20 text-center">
              <Heart size={28} className="mx-auto text-ink-faint" aria-hidden="true" />
              <p className="mt-4 text-ink-soft">Nothing saved yet — tap the heart on any device to add it here.</p>
              <ButtonLink href="/shop" variant="primary" size="md" className="mt-6">
                Browse devices
              </ButtonLink>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </Container>
    </div>
  );
}
