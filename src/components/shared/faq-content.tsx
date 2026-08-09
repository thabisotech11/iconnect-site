"use client";

import { useMemo, useState } from "react";
import { FAQS } from "@/lib/mock-data";
import { Accordion } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];

export function FaqContent() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(() => (active === "All" ? FAQS : FAQS.filter((f) => f.category === active)), [active]);

  return (
    <>
      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            aria-pressed={active === cat}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === cat ? "border-accent bg-accent-soft text-accent-deep" : "border-line text-ink-soft hover:border-ink"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <Accordion items={filtered.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))} />
      </div>
    </>
  );
}
