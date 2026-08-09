"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { getNewArrivals } from "@/lib/mock-data";
import { Container, SectionHeading } from "@/components/ui/section";
import { ProductCard } from "@/components/product/product-card";
import { IconButton, ButtonLink } from "@/components/ui/button";

export function LatestArrivals() {
  const products = getNewArrivals();
  const scrollerRef = useRef<HTMLUListElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = (card?.clientWidth ?? 260) + 24;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  }

  return (
    <section className="section-y bg-surface" aria-labelledby="arrivals-heading">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Just landed" title="Latest arrivals" description="New certified stock, updated weekly." />
          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden gap-2 sm:flex">
              <IconButton label="Previous arrivals" onClick={() => scrollByCard(-1)} className="border border-line bg-canvas">
                <ChevronLeft size={18} />
              </IconButton>
              <IconButton label="Next arrivals" onClick={() => scrollByCard(1)} className="border border-line bg-canvas">
                <ChevronRight size={18} />
              </IconButton>
            </div>
            <ButtonLink href="/shop?sort=newest" variant="ghost" size="md">
              View all
              <ArrowRight size={15} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>

        <ul
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => (
            <li key={product.id} className="w-[68%] shrink-0 snap-start sm:w-[42%] lg:w-[23%]">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
