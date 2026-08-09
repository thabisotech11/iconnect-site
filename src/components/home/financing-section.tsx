import { CheckCircle2, ArrowRight } from "lucide-react";
import { FINANCING_PLANS } from "@/lib/mock-data";
import { Container, SectionHeading, Reveal } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { formatZAR } from "@/lib/utils";

const SAMPLE_PRICE = 17999;

export function FinancingSection() {
  return (
    <section className="section-y" aria-labelledby="financing-heading">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-3">Financing options</p>
            <h2 className="text-balance text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
              Get it today. Pay it off your way.
            </h2>
            <p className="mt-4 max-w-lg text-balance text-base leading-relaxed text-ink-soft sm:text-lg">
              Split any purchase into manageable instalments with instant online approval — no long forms, no
              waiting days for a decision.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "Instant approval, decided online in minutes",
                "3 and 6-month plans with zero interest",
                "No early settlement penalties",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink">
                  <CheckCircle2 size={18} className="shrink-0 text-positive" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/financing" variant="primary" size="lg" className="mt-8">
              Explore financing
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.1} className="card p-7 sm:p-9">
            <p className="text-sm font-medium text-ink-soft">Example: MacBook Air M2 13&Prime;</p>
            <p className="mt-1 text-3xl font-bold text-ink">{formatZAR(SAMPLE_PRICE)}</p>
            <div className="mt-6 space-y-3">
              {FINANCING_PLANS.map((plan) => {
                const monthly = Math.ceil(SAMPLE_PRICE / plan.months);
                return (
                  <div
                    key={plan.id}
                    className="flex items-center justify-between rounded-2xl border border-line px-5 py-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">{plan.label}</p>
                      <p className="text-xs text-ink-faint">{plan.interestFree ? "Interest-free" : "Low fixed rate"}</p>
                    </div>
                    <p className="text-base font-bold text-ink">
                      {formatZAR(monthly)}
                      <span className="text-xs font-normal text-ink-faint">/mo</span>
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-ink-faint">
              Illustrative example. Final terms are confirmed by our financing partner at checkout, subject to
              approval.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
