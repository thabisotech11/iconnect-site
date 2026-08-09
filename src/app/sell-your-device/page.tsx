import type { Metadata } from "next";
import { Clock, Banknote, ShieldCheck } from "lucide-react";
import { Container, SectionHeading, Reveal } from "@/components/ui/section";
import { DeviceQuoteFlow } from "@/components/shared/device-quote-flow";

export const metadata: Metadata = {
  title: "Sell Your Device for Cash",
  description:
    "Sell your iPhone, Samsung Galaxy, iPad, Apple Watch, AirPods or MacBook for cash. Instant quote, free courier, paid within 24 hours.",
  alternates: { canonical: "/sell-your-device" },
};

const PERKS = [
  { icon: Clock, title: "Paid within 24 hours", description: "Cash lands the day after we receive your device." },
  { icon: Banknote, title: "Fair market pricing", description: "Quotes based on real resale value, not lowball offers." },
  { icon: ShieldCheck, title: "Free, secure shipping", description: "Prepaid, trackable courier bag included." },
];

export default function SellYourDevicePage() {
  return (
    <div className="section-y !pt-12">
      <Container>
        <SectionHeading
          eyebrow="Sell Your Device"
          title="Turn your old device into cash"
          description="Get an instant quote, ship it for free, and get paid directly into your bank account."
          align="center"
          className="mx-auto"
        />

        <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-4 sm:mt-14">
          {PERKS.map((perk) => (
            <Reveal key={perk.title} className="text-center">
              <perk.icon size={20} className="mx-auto text-accent" aria-hidden="true" />
              <p className="mt-2 text-xs font-semibold text-ink sm:text-sm">{perk.title}</p>
              <p className="mt-1 hidden text-xs text-ink-faint sm:block">{perk.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <DeviceQuoteFlow goal="sell" />
        </div>
      </Container>
    </div>
  );
}
