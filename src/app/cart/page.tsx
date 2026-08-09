"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShieldCheck, Truck, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/providers";
import { formatZAR } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { Button, ButtonLink } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";

const FREE_SHIPPING_THRESHOLD = 1000;
const SHIPPING_FEE = 150;

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem, itemCount } = useCart();
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="section-y !pt-16 text-center">
        <Container>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-surface text-ink-faint">
            <ShoppingBag size={30} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-ink">Your cart is empty</h1>
          <p className="mx-auto mt-2 max-w-sm text-ink-soft">Browse certified iPhones, MacBooks and more to get started.</p>
          <ButtonLink href="/shop" variant="primary" size="lg" className="mt-7">
            Start shopping
          </ButtonLink>
        </Container>
      </div>
    );
  }

  return (
    <div className="section-y !pt-12">
      <Container>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Your cart ({itemCount})</h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-line border-y border-line">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-5 py-6">
                <Link href={`/product/${item.slug}`} className="shrink-0">
                  <ProductImage category={item.category} gradient={item.gradient} name={item.name} size="sm" className="!h-24 !w-24" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link href={`/product/${item.slug}`} className="font-semibold text-ink hover:text-accent">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm text-ink-faint">
                        {item.condition}
                        {item.storage ? ` · ${item.storage}` : ""}
                        {item.color ? ` · ${item.color}` : ""}
                      </p>
                    </div>
                    <p className="shrink-0 font-bold text-ink">{formatZAR(item.price * item.quantity)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center rounded-full border border-line">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="flex h-9 w-9 items-center justify-center text-ink hover:text-accent"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-7 text-center text-sm font-medium" aria-live="polite">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="flex h-9 w-9 items-center justify-center text-ink hover:text-accent"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="flex items-center gap-1.5 text-xs font-medium text-ink-faint hover:text-red-600"
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="h-fit rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-ink">Order summary</h2>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span className="font-medium text-ink">{formatZAR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Shipping</span>
                <span className="font-medium text-ink">{shipping === 0 ? "Free" : formatZAR(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-ink-faint">
                  Add {formatZAR(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                </p>
              )}
            </div>
            <div className="mt-4 flex justify-between border-t border-line pt-4">
              <span className="font-semibold text-ink">Total</span>
              <span className="text-xl font-bold text-ink">{formatZAR(total)}</span>
            </div>
            <ButtonLink href="/checkout" variant="primary" size="lg" className="mt-6 w-full">
              Checkout securely
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
            <ul className="mt-5 space-y-2">
              <li className="flex items-center gap-2 text-xs text-ink-faint">
                <ShieldCheck size={14} className="shrink-0" aria-hidden="true" />
                30-day warranty on every device
              </li>
              <li className="flex items-center gap-2 text-xs text-ink-faint">
                <Truck size={14} className="shrink-0" aria-hidden="true" />
                Tracked nationwide delivery
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
