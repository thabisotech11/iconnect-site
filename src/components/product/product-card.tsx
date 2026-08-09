"use client";

import Link from "next/link";
import { Heart, Scale, BatteryMedium } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatZAR, percentOff, cn } from "@/lib/utils";
import { useCart, useWishlist, useCompare, toCartItem } from "@/context/providers";
import { ConditionBadge, Badge, StockBadge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { ProductImage } from "@/components/product/product-image";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const compare = useCompare();
  const saved = wishlist.has(product.id);
  const comparing = compare.has(product.id);
  const discount = percentOff(product.price, product.compareAtPrice);

  return (
    <div className={cn("group relative flex h-full flex-col", className)}>
      <div className="relative">
        <Link href={`/product/${product.slug}`} className="block" tabIndex={-1}>
          <ProductImage
            category={product.category}
            gradient={product.gradient}
            name={product.name}
            className="transition-transform duration-500 ease-premium group-hover:scale-[1.03]"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          <ConditionBadge condition={product.condition} className="bg-canvas/90 shadow-soft backdrop-blur" />
          {discount > 0 && (
            <Badge tone="dark" className="shadow-soft">
              Save {discount}%
            </Badge>
          )}
        </div>

        <button
          onClick={() => wishlist.toggle(product.id)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-canvas/90 text-ink shadow-soft backdrop-blur transition-transform hover:scale-105 active:scale-95"
        >
          <Heart size={16} className={saved ? "fill-red-500 text-red-500" : ""} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <Link href={`/product/${product.slug}`} className="group/link">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">{product.category}</p>
          <h3 className="mt-0.5 text-[15px] font-semibold leading-snug text-ink group-hover/link:text-accent">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-2 text-xs text-ink-faint">
          {product.selectedStorage && <span>{product.selectedStorage}</span>}
          {product.batteryHealth && (
            <span className="flex items-center gap-1">
              <BatteryMedium size={13} aria-hidden="true" />
              {product.batteryHealth}%
            </span>
          )}
        </div>

        <div className="mt-2">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-lg font-bold text-ink">{formatZAR(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-ink-faint line-through">{formatZAR(product.compareAtPrice)}</span>
          )}
        </div>

        <div className="mt-1">
          <StockBadge quantity={product.stockQuantity} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => addItem(toCartItem(product))}
            disabled={product.stockQuantity <= 0}
            className="btn-primary btn-sm flex-1"
          >
            Add to cart
          </button>
          <button
            onClick={() => compare.toggle(product.id)}
            disabled={!comparing && compare.count >= compare.limit}
            aria-pressed={comparing}
            aria-label={comparing ? `Remove ${product.name} from comparison` : `Add ${product.name} to comparison`}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors disabled:opacity-30",
              comparing ? "border-accent bg-accent-soft text-accent-deep" : "border-line text-ink-soft hover:border-ink"
            )}
          >
            <Scale size={15} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="aspect-square w-full animate-pulse rounded-3xl bg-surface" />
      <div className="mt-4 h-3 w-1/3 animate-pulse rounded bg-surface" />
      <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-surface" />
      <div className="mt-3 h-5 w-1/2 animate-pulse rounded bg-surface" />
    </div>
  );
}
