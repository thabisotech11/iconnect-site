import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Container, SectionHeading, Reveal } from "@/components/ui/section";
import { ContactForm } from "@/components/shared/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with iConnect Pre-Owned — phone, email, WhatsApp or our contact form. We reply fast.",
  alternates: { canonical: "/contact" },
};

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "27712345678";

const CONTACT_METHODS = [
  { icon: Phone, title: "Call us", value: "011 000 0000", href: "tel:+27110000000" },
  { icon: Mail, title: "Email us", value: "hello@iconnectpreowned.co.za", href: "mailto:hello@iconnectpreowned.co.za" },
  { icon: MessageCircle, title: "WhatsApp", value: "Chat with our team", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { icon: MapPin, title: "Hubs", value: "Johannesburg · Cape Town · Durban", href: undefined },
];

export default function ContactPage() {
  return (
    <div className="section-y !pt-12">
      <Container>
        <SectionHeading eyebrow="Contact" title="We're here to help" description="Reach out about an order, a trade-in, a repair, or anything else." />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <ul className="space-y-4">
              {CONTACT_METHODS.map((method) => (
                <Reveal key={method.title} as="li">
                  <div className="card flex items-center gap-4 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
                      <method.icon size={18} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-ink-faint">{method.title}</p>
                      {method.href ? (
                        <a
                          href={method.href}
                          target={method.href.startsWith("http") ? "_blank" : undefined}
                          rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-semibold text-ink hover:text-accent"
                        >
                          {method.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-ink">{method.value}</p>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.1} className="card mt-4 flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-deep">
                <Clock size={18} aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-medium text-ink-faint">Support hours</p>
                <p className="text-sm font-semibold text-ink">Mon–Fri 8am–6pm · Sat 9am–2pm (SAST)</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
