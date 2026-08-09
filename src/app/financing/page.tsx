import type { Metadata } from "next";
import { CheckCircle2, FileCheck, Clock3, CreditCard } from "lucide-react";
import { Container, SectionHeading, Reveal, StaggerGroup } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { FinancingCalculator } from "@/components/shared/financing-calculator";

export const metadata: Metadata = {
  title: "Financing",
  description:
    "Spread the cost of your certified pre-owned device with flexible, interest-free financing plans. Instant online approval.",
  alternates: { canonical: "/financing" },
};

const STEPS = [
  { icon: FileCheck, title: "Apply at checkout", description: "Add your device to cart and choose financing — takes under 2 minutes." },
  { icon: Clock3, title: "Instant decision", description: "Our financing partner gives you an answer online, no waiting days." },
  { icon: CreditCard, title: "Pay it off monthly", description: "Fixed instalments debit automatically until it's paid off." },
];

const ELIGIBILITY = [
  "18 years or older",
  "South African ID or valid passport",
  "Proof of income or active bank account",
  "No missed payment history with our financing partner",
];

export default function FinancingPage() {
  return (
    <div className="section-y !pt-12">
      <Container>
        <SectionHeading
          eyebrow="Financing"
          title="Own it today, pay it off your way"
          description="Flexible instalment plans on every certified device — approved online, no paperwork, no drama."
        />

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <Reveal key={step.title} className="card relative p-6">
              <span className="absolute right-5 top-5 text-3xl font-bold text-line">0{i + 1}</span>
              <step.icon size={20} className="text-accent" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{step.description}</p>
            </Reveal>
          ))}
        </StaggerGroup>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Try the calculator</h2>
            <p className="mt-2 text-sm text-ink-soft">Estimate your monthly payment on any device before you check out.</p>
            <div className="mt-6">
              <FinancingCalculator />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl font-semibold text-ink">Eligibility</h2>
            <ul className="mt-4 space-y-3">
              {ELIGIBILITY.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-soft">
                  <CheckCircle2 size={17} className="shrink-0 text-positive" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="card mt-8 p-6">
              <h3 className="text-sm font-semibold text-ink">Good to know</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Financing is provided by our South African financing partner and is subject to standard credit
                checks and approval. Terms shown on this site are illustrative — final rates and instalment
                amounts are confirmed by the financing partner at checkout.
              </p>
            </div>

            <ButtonLink href="/shop" variant="primary" size="lg" className="mt-8 w-full sm:w-auto">
              Shop devices now
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
