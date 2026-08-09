import { Smartphone, Calculator, PackageCheck, Wallet, ArrowRight } from "lucide-react";
import { Container, SectionHeading, Reveal, StaggerGroup } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

const STEPS = [
  {
    icon: Smartphone,
    title: "Tell us about your device",
    description: "Select the model, storage and condition — takes under a minute.",
  },
  {
    icon: Calculator,
    title: "Get an instant quote",
    description: "See a real, honest valuation immediately. No haggling, no hidden deductions.",
  },
  {
    icon: PackageCheck,
    title: "Ship or drop off, free",
    description: "Use our free prepaid courier bag or drop off at a partner point near you.",
  },
  {
    icon: Wallet,
    title: "Get paid fast",
    description: "Take purchase credit instantly, or cash out via same-week bank transfer.",
  },
];

export function TradeInProcess() {
  return (
    <section className="section-y bg-ink" aria-labelledby="trade-in-heading">
      <Container>
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Trade-in process"
            title="Turn your old device into your next one"
            description="Whether you're upgrading or just cashing out, the whole process happens in four simple steps."
            light
          />
          <Reveal delay={0.1} className="shrink-0">
            <ButtonLink href="/trade-in" variant="primary" size="lg">
              Start your trade-in
              <ArrowRight size={16} aria-hidden="true" />
            </ButtonLink>
          </Reveal>
        </div>

        <StaggerGroup className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-white/10 lg:block" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.05} className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                <step.icon size={22} aria-hidden="true" />
              </div>
              <span className="absolute right-0 top-0 text-4xl font-bold text-white/10">0{i + 1}</span>
              <h3 className="mt-5 text-[17px] font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.description}</p>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
