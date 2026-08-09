"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/mock-data";
import { Container, SectionHeading } from "@/components/ui/section";
import { Rating } from "@/components/ui/rating";
import { IconButton } from "@/components/ui/button";
import { initials } from "@/lib/utils";

export function Testimonials() {
  const scrollerRef = useRef<HTMLUListElement>(null);

  function scrollByCard(dir: 1 | -1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("li");
    const amount = (card?.clientWidth ?? 320) + 20;
    el.scrollBy({ left: amount * dir, behavior: "smooth" });
  }

  return (
    <section className="section-y" aria-labelledby="testimonials-heading">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Customer reviews"
            title="Trusted by thousands of South Africans"
            description="4.8 average rating across more than 1,200 verified orders."
          />
          <div className="hidden shrink-0 gap-2 sm:flex">
            <IconButton label="Previous testimonials" onClick={() => scrollByCard(-1)} className="border border-line">
              <ChevronLeft size={18} />
            </IconButton>
            <IconButton label="Next testimonials" onClick={() => scrollByCard(1)} className="border border-line">
              <ChevronRight size={18} />
            </IconButton>
          </div>
        </div>

        <ul
          ref={scrollerRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t) => (
            <li
              key={t.id}
              className="card flex w-[85%] shrink-0 snap-start flex-col p-7 sm:w-[360px]"
            >
              <Quote size={26} className="text-accent" aria-hidden="true" />
              <Rating value={t.rating} showValue={false} className="mt-4" />
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-xs font-bold text-ink-soft">
                  {initials(t.author)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.author}</p>
                  <p className="text-xs text-ink-faint">
                    {t.location} · {t.device}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
