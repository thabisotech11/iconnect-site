import { CheckCircle2, ShieldCheck } from "lucide-react";
import { INSPECTION_POINTS } from "@/lib/mock-data";
import { Container, Reveal } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { HealthRing } from "@/components/product/health-ring";

export function WarrantySection() {
  return (
    <section className="section-y bg-surface" aria-labelledby="warranty-heading">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="order-2 lg:order-1">
            <div className="card relative overflow-hidden p-8 sm:p-10">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-10"
                style={{ background: "radial-gradient(circle, #007AFF 0%, transparent 70%)" }}
                aria-hidden="true"
              />
              <div className="relative flex items-center gap-4">
                <HealthRing value={100} size={72} strokeWidth={6} label="30" sublabel="days" />
                <div>
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                    <ShieldCheck size={16} className="text-accent" aria-hidden="true" />
                    Full warranty coverage
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">Every certified device, every order.</p>
                </div>
              </div>
              <ul className="relative mt-7 space-y-3">
                {INSPECTION_POINTS.slice(0, 6).map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm text-ink-soft">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-positive" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
            <p className="eyebrow mb-3">Device warranty</p>
            <h2 id="warranty-heading" className="text-balance text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl lg:text-[2.75rem]">
              Real protection, not just a promise
            </h2>
            <p className="mt-4 max-w-lg text-balance text-base leading-relaxed text-ink-soft sm:text-lg">
              Every device is covered by our 30-day warranty against any functional fault — batteries, charging,
              display, cameras and connectivity. If our 60-point certification missed something, we make it right
              with a free repair, replacement or full refund.
            </p>
            <p className="mt-4 max-w-lg text-sm text-ink-soft">
              Want longer peace of mind? Extended protection plans are available at checkout for up to 12 months.
            </p>
            <ButtonLink href="/faq" variant="outline" size="lg" className="mt-8">
              Read the full warranty terms
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
