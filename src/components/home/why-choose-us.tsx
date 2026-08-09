import { ShieldCheck, Gauge, CalendarCheck, ArrowLeftRight, Truck, CreditCard } from "lucide-react";
import { Container, SectionHeading, Reveal, StaggerGroup } from "@/components/ui/section";

const REASONS = [
  {
    icon: ShieldCheck,
    title: "60-point certification",
    description: "Every device passes battery, screen, camera, buttons and connectivity checks before it's listed.",
  },
  {
    icon: Gauge,
    title: "Real battery health data",
    description: "We publish the exact battery health percentage on every listing — not a vague 'good condition.'",
  },
  {
    icon: CalendarCheck,
    title: "30-day warranty, no fine print",
    description: "Full cover for any functional fault. If something's wrong, we repair, replace or refund it.",
  },
  {
    icon: ArrowLeftRight,
    title: "Trade in or sell in minutes",
    description: "Get an instant, honest quote for your current device — credit it toward an upgrade or take cash.",
  },
  {
    icon: Truck,
    title: "Nationwide, tracked delivery",
    description: "Insured courier delivery to all nine provinces, with live tracking from dispatch to your door.",
  },
  {
    icon: CreditCard,
    title: "Flexible financing",
    description: "Split your purchase into interest-free instalments, approved online in minutes.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-y bg-surface" aria-labelledby="why-heading">
      <Container>
        <SectionHeading
          eyebrow="Why iConnect"
          title="Buying pre-owned shouldn't feel like a gamble"
          description="We built the process we'd want as customers — transparent grading, real diagnostics, and a warranty that actually means something."
          align="center"
          className="mx-auto"
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map(({ icon: Icon, title, description }) => (
            <Reveal key={title} className="card p-7 transition-shadow hover:shadow-card">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-deep">
                <Icon size={22} aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-[17px] font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
