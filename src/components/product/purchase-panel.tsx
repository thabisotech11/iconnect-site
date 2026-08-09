"use client";

import { useEffect, useState } from "react";
import { Heart, Minus, Plus, ShieldCheck, Truck, BadgeCheck } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatZAR, percentOff, cn } from "@/lib/utils";
import { useCart, useWishlist, useRecentlyViewed, toCartItem } from "@/context/providers";
import { ConditionBadge, StockBadge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";
import { Button } from "@/components/ui/button";

export function ProductViewTracker({ productId }: { productId: string }) {
  const { track } = useRecentlyViewed();
  useEffect(() => {
    track(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);
  return null;
}

export function PurchasePanel({ product }: { product: Product }) {
  const [storage, setStorage] = useState(product.selectedStorage ?? product.storageOptions?.[0]);
  const [color, setColor] = useState(product.selectedColor ?? product.colorOptions?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();
  const wishlist = useWishlist();
  const saved = wishlist.has(product.id);
  const discount = percentOff(product.price, product.compareAtPrice);

  function handleAddToCart() {
    addItem({ ...toCartItem(product), storage, color }, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div>
      <p className="text-sm font-semibold text-accent">{product.brand}</p>
      <h1 className="mt-1 text-3xl font-bold leading-tight text-ink sm:text-4xl">{product.name}</h1>
      <p className="mt-2 text-ink-soft">{product.tagline}</p>

      <div className="mt-4 flex items-center gap-3">
        <Rating value={product.rating} count={product.reviewCount} />
        <ConditionBadge condition={product.condition} />
      </div>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="text-3xl font-bold text-ink">{formatZAR(product.price)}</span>
        {product.compareAtPrice && (
          <>
            <span className="text-base text-ink-faint line-through">{formatZAR(product.compareAtPrice)}</span>
            <span className="text-sm font-semibold text-positive">Save {discount}%</span>
          </>
        )}
      </div>
      <p className="mt-1 text-xs text-ink-faint">Or from {formatZAR(Math.ceil(product.price / 6))}/mo with financing</p>

      <div className="mt-6">
        <StockBadge quantity={product.stockQuantity} />
      </div>

      {product.storageOptions && product.storageOptions.length > 1 && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-ink">Storage</p>
          <div className="flex flex-wrap gap-2">
            {product.storageOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setStorage(opt)}
                aria-pressed={storage === opt}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                  storage === opt ? "border-accent bg-accent-soft text-accent-deep" : "border-line text-ink-soft hover:border-ink"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colorOptions && product.colorOptions.length > 1 && (
        <div className="mt-6">
          <p className="mb-2 text-sm font-medium text-ink">Colour</p>
          <div className="flex flex-wrap gap-2">
            {product.colorOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setColor(opt)}
                aria-pressed={color === opt}
                className={cn(
                  "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                  color === opt ? "border-accent bg-accent-soft text-accent-deep" : "border-line text-ink-soft hover:border-ink"
                )}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-7 flex items-center gap-3">
        <div className="flex items-center rounded-full border border-line">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex h-12 w-11 items-center justify-center text-ink hover:text-accent"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
            aria-label="Increase quantity"
            className="flex h-12 w-11 items-center justify-center text-ink hover:text-accent"
          >
            <Plus size={14} />
          </button>
        </div>
        <Button
          variant="primary"
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
          disabled={product.stockQuantity <= 0}
        >
          {justAdded ? "Added ✓" : "Add to Cart"}
        </Button>
        <button
          onClick={() => wishlist.toggle(product.id)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line text-ink hover:border-ink"
        >
          <Heart size={18} className={saved ? "fill-red-500 text-red-500" : ""} aria-hidden="true" />
        </button>
      </div>

      <ul className="mt-8 space-y-3 border-t border-line pt-6">
        <li className="flex items-center gap-2.5 text-sm text-ink-soft">
          <ShieldCheck size={16} className="shrink-0 text-accent" aria-hidden="true" />
          {product.warrantyDays}-day warranty included
        </li>
        <li className="flex items-center gap-2.5 text-sm text-ink-soft">
          <Truck size={16} className="shrink-0 text-accent" aria-hidden="true" />
          Nationwide delivery, dispatched within 24 hours
        </li>
        <li className="flex items-center gap-2.5 text-sm text-ink-soft">
          <BadgeCheck size={16} className="shrink-0 text-accent" aria-hidden="true" />
          60-point certified &amp; data-wiped
        </li>
      </ul>
    </div>
  );
}
