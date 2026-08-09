"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/providers";
import { formatZAR } from "@/lib/utils";
import { Button, ButtonLink, IconButton } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";

export function CartDrawer() {
  const { items, isOpen, closeCart, subtotal, updateQuantity, removeItem, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-canvas shadow-elevated"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="text-lg font-bold text-ink">Your cart {itemCount > 0 && `(${itemCount})`}</h2>
              <IconButton label="Close cart" onClick={closeCart}>
                <X size={20} />
              </IconButton>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-ink-faint">
                  <ShoppingBag size={26} aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-ink">Your cart is empty</p>
                  <p className="mt-1 text-sm text-ink-soft">Certified devices are waiting for you.</p>
                </div>
                <ButtonLink href="/shop" variant="primary" size="md" onClick={closeCart}>
                  Start shopping
                </ButtonLink>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6 py-4">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-4 border-b border-line py-5 first:pt-0">
                      <Link href={`/product/${item.slug}`} onClick={closeCart} className="shrink-0">
                        <ProductImage category={item.category} gradient={item.gradient} name={item.name} size="sm" />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/product/${item.slug}`} onClick={closeCart} className="text-sm font-semibold text-ink hover:text-accent">
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.productId)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="shrink-0 text-ink-faint hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-ink-faint">
                          {item.condition}
                          {item.storage ? ` · ${item.storage}` : ""}
                          {item.color ? ` · ${item.color}` : ""}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              aria-label={`Decrease quantity of ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center text-ink hover:text-accent"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              aria-label={`Increase quantity of ${item.name}`}
                              className="flex h-8 w-8 items-center justify-center text-ink hover:text-accent"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-ink">{formatZAR(item.price * item.quantity)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-line px-6 py-5">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-ink-soft">Subtotal</span>
                    <span className="text-base font-bold text-ink">{formatZAR(subtotal)}</span>
                  </div>
                  <p className="mb-4 text-xs text-ink-faint">Shipping and any financing plan are calculated at checkout.</p>
                  <ButtonLink href="/checkout" variant="primary" size="lg" className="w-full" onClick={closeCart}>
                    Checkout securely
                  </ButtonLink>
                  <Button variant="ghost" size="md" className="mt-2 w-full" onClick={closeCart}>
                    Continue shopping
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
