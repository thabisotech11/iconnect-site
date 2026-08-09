"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Scale } from "lucide-react";
import { useCompare } from "@/context/providers";
import { PRODUCTS } from "@/lib/mock-data";
import { ButtonLink } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";

export function CompareBar() {
  const { ids, toggle, clear, count } = useCompare();
  const products = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 shadow-elevated backdrop-blur-xl"
        >
          <div className="container-page flex flex-wrap items-center gap-4 py-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <Scale size={16} className="text-accent" aria-hidden="true" />
              Compare ({count}/3)
            </div>
            <div className="flex flex-1 items-center gap-3 overflow-x-auto">
              {products.map(
                (p) =>
                  p && (
                    <div key={p.id} className="relative flex shrink-0 items-center gap-2 rounded-full border border-line py-1 pl-1 pr-3">
                      <ProductImage category={p.category} gradient={p.gradient} name={p.name} size="sm" className="!h-8 !w-8 !rounded-full" />
                      <span className="max-w-[120px] truncate text-xs font-medium text-ink">{p.name}</span>
                      <button onClick={() => toggle(p.id)} aria-label={`Remove ${p.name} from comparison`} className="text-ink-faint hover:text-red-600">
                        <X size={13} />
                      </button>
                    </div>
                  )
              )}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button onClick={clear} className="text-xs font-medium text-ink-soft hover:text-ink">
                Clear
              </button>
              <ButtonLink href="/compare" variant="primary" size="sm">
                Compare
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
