"use client";

import { Scale, X } from "lucide-react";
import { useCompare } from "@/context/providers";
import { PRODUCTS } from "@/lib/mock-data";
import { formatZAR } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";
import { ConditionBadge } from "@/components/ui/badge";
import { Rating } from "@/components/ui/rating";

export default function ComparePage() {
  const { ids, toggle } = useCompare();
  const products = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const allSpecLabels = Array.from(new Set(products.flatMap((p) => p.specs.map((s) => s.label))));

  if (products.length === 0) {
    return (
      <div className="section-y !pt-16 text-center">
        <Container>
          <Scale size={28} className="mx-auto text-ink-faint" aria-hidden="true" />
          <h1 className="mt-4 text-2xl font-bold text-ink">Nothing to compare yet</h1>
          <p className="mx-auto mt-2 max-w-sm text-ink-soft">
            Tap the scale icon on any product card to add it here — compare up to 3 devices side by side.
          </p>
          <ButtonLink href="/shop" variant="primary" size="lg" className="mt-7">
            Browse devices
          </ButtonLink>
        </Container>
      </div>
    );
  }

  return (
    <div className="section-y !pt-12">
      <Container>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Compare devices</h1>
        <p className="mt-2 text-ink-soft">{products.length} of 3 devices selected</p>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="w-40" />
                {products.map((p) => (
                  <th key={p.id} className="p-4 text-left align-top">
                    <button
                      onClick={() => toggle(p.id)}
                      aria-label={`Remove ${p.name} from comparison`}
                      className="mb-3 flex items-center gap-1 text-xs font-medium text-ink-faint hover:text-red-600"
                    >
                      <X size={13} /> Remove
                    </button>
                    <ProductImage category={p.category} gradient={p.gradient} name={p.name} size="sm" className="!h-20 !w-20" />
                    <p className="mt-3 text-sm font-semibold text-ink">{p.name}</p>
                    <p className="mt-2 text-lg font-bold text-ink">{formatZAR(p.price)}</p>
                    <ButtonLink href={`/product/${p.slug}`} variant="outline" size="sm" className="mt-3">
                      View
                    </ButtonLink>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-line">
                <td className="p-4 text-sm font-medium text-ink-soft">Condition</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4">
                    <ConditionBadge condition={p.condition} />
                  </td>
                ))}
              </tr>
              <tr className="border-t border-line bg-surface/60">
                <td className="p-4 text-sm font-medium text-ink-soft">Rating</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4">
                    <Rating value={p.rating} count={p.reviewCount} />
                  </td>
                ))}
              </tr>
              <tr className="border-t border-line">
                <td className="p-4 text-sm font-medium text-ink-soft">Battery health</td>
                {products.map((p) => (
                  <td key={p.id} className="p-4 text-sm text-ink">
                    {p.batteryHealth ? `${p.batteryHealth}%` : "—"}
                  </td>
                ))}
              </tr>
              {allSpecLabels.map((label, i) => (
                <tr key={label} className={`border-t border-line ${i % 2 === 0 ? "bg-surface/60" : ""}`}>
                  <td className="p-4 text-sm font-medium text-ink-soft">{label}</td>
                  {products.map((p) => (
                    <td key={p.id} className="p-4 text-sm text-ink">
                      {p.specs.find((s) => s.label === label)?.value ?? "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
