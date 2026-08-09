import type { Metadata } from "next";
import { TEAM, INSPECTION_POINTS } from "@/lib/mock-data";
import { Container, SectionHeading, Reveal, StaggerGroup } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { TrustBadgeStrip } from "@/components/shared/trust-badges";
import { initials } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "iConnect Pre-Owned is South Africa's certified pre-owned tech specialist — honest grading, real diagnostics, nationwide delivery.",
  alternates: { canonical: "/about" },
};

const STATS = [
  { value: "60,000+", label: "Devices certified" },
  { value: "4.8/5", label: "Average customer rating" },
  { value: "9", label: "Provinces delivered to" },
  { value: "2019", label: "Founded" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="section-y !pb-16">
        <Container>
          <SectionHeading
            eyebrow="About iConnect Pre-Owned"
            title="Great tech shouldn't cost like it's brand new"
            description="We started iConnect Pre-Owned in 2019 with one belief: South Africans deserve a genuinely transparent way to buy, sell and repair the devices they rely on every day."
          />

          <StaggerGroup className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((stat) => (
              <Reveal key={stat.label} className="text-center sm:text-left">
                <p className="text-3xl font-bold text-ink sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-ink-soft">{stat.label}</p>
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="section-y bg-surface">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <p className="eyebrow mb-3">Our story</p>
              <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
                Built by people who were tired of guessing what &ldquo;good condition&rdquo; meant
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink-soft">
                <p>
                  Our founder spent years in mobile retail watching customers get burned by vague listings and
                  &ldquo;refurbished&rdquo; devices with no real testing behind them. iConnect Pre-Owned was built
                  to fix that — every device graded against a written checklist, every battery health percentage
                  published honestly, every sale backed by a warranty that actually gets honoured.
                </p>
                <p>
                  Today our certification team inspects thousands of devices a month across our Johannesburg, Cape
                  Town and Durban hubs, before they're shipped nationwide with full tracking and insurance.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="card p-8">
              <h3 className="text-sm font-semibold text-ink">Our 60-point certification covers</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {INSPECTION_POINTS.map((point) => (
                  <li key={point} className="text-sm text-ink-soft">
                    · {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionHeading eyebrow="Meet the team" title="The people behind every certification" align="center" className="mx-auto" />
          <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((member) => (
              <Reveal key={member.name} className="card p-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-lg font-bold text-accent-deep">
                  {initials(member.name)}
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">{member.name}</p>
                <p className="text-xs font-medium text-accent">{member.role}</p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{member.bio}</p>
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>

      <section className="section-y bg-ink">
        <Container>
          <TrustBadgeStrip dark />
          <div className="mt-14 text-center">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">Ready to see it for yourself?</h2>
            <ButtonLink href="/shop" variant="primary" size="lg" className="mt-6">
              Browse certified devices
            </ButtonLink>
          </div>
        </Container>
      </section>
    </div>
  );
}
