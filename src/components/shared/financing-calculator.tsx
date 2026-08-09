"use client";

import { useMemo, useState } from "react";
import { FINANCING_PLANS } from "@/lib/mock-data";
import { formatZAR, cn } from "@/lib/utils";
import { Label } from "@/components/ui/form-fields";

export function FinancingCalculator() {
  const [price, setPrice] = useState(17999);
  const [planId, setPlanId] = useState(FINANCING_PLANS[1].id);
  const plan = FINANCING_PLANS.find((p) => p.id === planId) ?? FINANCING_PLANS[0];
  const monthly = useMemo(() => Math.ceil(price / plan.months), [price, plan]);

  return (
    <div className="card p-7 sm:p-9">
      <Label htmlFor="calc-price">Device price</Label>
      <div className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-ink-faint">R</span>
        <input
          id="calc-price"
          type="number"
          min={500}
          step={100}
          value={price}
          onChange={(e) => setPrice(Math.max(0, Number(e.target.value)))}
          className="input pl-8"
        />
      </div>
      <input
        type="range"
        min={500}
        max={35000}
        step={100}
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-accent"
        aria-label="Device price slider"
      />

      <p className="mb-3 mt-7 text-sm font-medium text-ink">Choose a plan</p>
      <div className="grid grid-cols-2 gap-2.5">
        {FINANCING_PLANS.map((p) => (
          <button
            key={p.id}
            onClick={() => setPlanId(p.id)}
            aria-pressed={planId === p.id}
            className={cn(
              "rounded-xl border px-4 py-3 text-left transition-colors",
              planId === p.id ? "border-accent bg-accent-soft" : "border-line hover:border-ink"
            )}
          >
            <span className="block text-sm font-semibold text-ink">{p.months} months</span>
            <span className="block text-xs text-ink-faint">{p.interestFree ? "Interest-free" : "Low rate"}</span>
          </button>
        ))}
      </div>

      <div className="mt-7 rounded-2xl bg-surface p-5 text-center">
        <p className="text-xs font-medium text-ink-soft">Estimated monthly payment</p>
        <p className="mt-1 text-3xl font-bold text-ink">
          {formatZAR(monthly)}
          <span className="text-sm font-normal text-ink-faint">/mo</span>
        </p>
        <p className="mt-1 text-xs text-ink-faint">over {plan.months} months</p>
      </div>
    </div>
  );
}
