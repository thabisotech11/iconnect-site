import type { Metadata } from "next";
import { Zap, ShieldCheck, Wallet } from "lucide-react";
import { Container, SectionHeading, Reveal } from "@/components/ui/section";
import { DeviceQuoteFlow } from "@/components/shared/device-quote-flow";

export const metadata: Metadata = {
  title: "Trade-In Your Device",
  description:
    "Trade in your iPhone, Samsung Galaxy, iPad, Apple Watch, AirPods or MacBook for instant credit toward your next certified device.",
  alternates: { canonical: "/trade-in" },
};

const PERKS = [
  { icon: Zap, title: "Instant online quote", description: "No waiting — see your value in under a minute." },
  { icon: Wallet, title: "5% trade-in bonus", description: "Trade-in credit values slightly higher than a cash sale." },
  { icon: ShieldCheck, title: "Honoured on inspection", description: "Your quote holds as long as the device matches your answers." },
];

export default function TradeInPage() {
  return (
    <div className="section-y !pt-12">
      <Container>
        <SectionHeading
          eyebrow="Trade-In"
          title="Trade in your old device, upgrade for less"
          description="Get an instant quote and apply it directly toward any certified device in our shop."
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
          <DeviceQuoteFlow goal="trade-in" />
        </div>
      </Container>
    </div>
  );
}
