import type { Metadata } from "next";
import { Wrench, Clock, ShieldCheck, Zap } from "lucide-react";
import { REPAIR_SERVICES } from "@/lib/mock-data";
import { formatZAR } from "@/lib/utils";
import { Container, SectionHeading, Reveal, StaggerGroup } from "@/components/ui/section";
import { RepairBookingForm } from "@/components/shared/repair-booking-form";

export const metadata: Metadata = {
  title: "Device Repairs",
  description:
    "Book a repair for your iPhone, Samsung Galaxy, iPad, Apple Watch, AirPods or MacBook. Transparent pricing, fast turnaround, genuine parts.",
  alternates: { canonical: "/repairs" },
};

const HIGHLIGHTS = [
  { icon: Clock, title: "Fast turnaround", description: "Most repairs completed same-day or within 48 hours." },
  { icon: ShieldCheck, title: "90-day repair warranty", description: "Every repair is covered against the same fault recurring." },
  { icon: Zap, title: "Genuine & OEM-grade parts", description: "No knock-offs — parts tested to original specification." },
];

export default function RepairsPage() {
  const grouped = REPAIR_SERVICES.reduce<Record<string, typeof REPAIR_SERVICES>>((acc, service) => {
    acc[service.device] = acc[service.device] ? [...acc[service.device], service] : [service];
    return acc;
  }, {});

  return (
    <div className="section-y !pt-12">
      <Container>
        <SectionHeading
          eyebrow="Repairs"
          title="Expert repairs for the device you already own"
          description="Cracked screen, tired battery, or a charging port that's given up? Our technicians fix it — whether or not you bought it from us."
        />

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <Reveal key={h.title} className="card p-6">
              <h.icon size={20} className="text-accent" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-ink">{h.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{h.description}</p>
            </Reveal>
          ))}
        </StaggerGroup>

        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex items-center gap-2">
              <Wrench size={18} className="text-accent" aria-hidden="true" />
              <h2 className="text-2xl font-semibold text-ink">Pricing guide</h2>
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              Final pricing is confirmed after diagnosis — most repairs match the &ldquo;from&rdquo; price shown.
            </p>

            <div className="mt-8 space-y-10">
              {Object.entries(grouped).map(([device, services]) => (
                <div key={device}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-faint">{device}</h3>
                  <div className="mt-3 divide-y divide-line border-y border-line">
                    {services.map((service) => (
                      <div key={service.id} className="flex items-center justify-between gap-4 py-4">
                        <div>
                          <p className="text-sm font-medium text-ink">{service.issue}</p>
                          <p className="text-xs text-ink-faint">Turnaround: {service.turnaround}</p>
                        </div>
                        <p className="shrink-0 text-sm font-semibold text-ink">From {formatZAR(service.priceFrom)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-fit">
            <RepairBookingForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
