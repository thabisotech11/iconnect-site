import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/section";
import { TrustBadgeStrip } from "@/components/shared/trust-badges";

// lucide-react no longer ships brand/logo glyphs, so these three are simple
// hand-drawn originals — not a reproduction of any platform's official mark.
function FacebookGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M13.5 9.2h1.3V7h-1.6c-1.5 0-2.4 1-2.4 2.5v1.2H9.5v2.2h1.3V17h2.2v-4.1h1.5l.3-2.2h-1.8v-1c0-.3.2-.5.5-.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
function InstagramGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.8" cy="7.2" r="1" fill="currentColor" />
    </svg>
  );
}
function XGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const FOOTER_LINKS = {
  Shop: [
    { href: "/shop?category=iPhone", label: "iPhone" },
    { href: "/shop?category=Samsung+Galaxy", label: "Samsung Galaxy" },
    { href: "/shop?category=iPad", label: "iPad" },
    { href: "/shop?category=Apple+Watch", label: "Apple Watch" },
    { href: "/shop?category=AirPods", label: "AirPods" },
    { href: "/shop?category=MacBook", label: "MacBook" },
  ],
  Services: [
    { href: "/trade-in", label: "Trade-In" },
    { href: "/sell-your-device", label: "Sell Your Device" },
    { href: "/repairs", label: "Repairs" },
    { href: "/financing", label: "Financing" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/faq", label: "FAQ" },
    { href: "/account", label: "My Account" },
  ],
};

const SOCIALS = [
  { icon: FacebookGlyph, label: "Facebook", href: "https://facebook.com" },
  { icon: InstagramGlyph, label: "Instagram", href: "https://instagram.com" },
  { icon: XGlyph, label: "X (Twitter)", href: "https://x.com" },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="border-b border-white/10 py-12">
        <Container>
          <TrustBadgeStrip dark />
        </Container>
      </div>

      <Container>
        <div className="grid gap-12 py-16 lg:grid-cols-[1.3fr_repeat(3,0.9fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{ background: "linear-gradient(135deg, #2E6BFF 0%, #0A2FA8 100%)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2C7 2 3 5.6 3 10c0 3.2 2 5.9 5 7.2V22l4.2-2.7c5-.3 8.8-4 8.8-8.5C21 6 17 2 12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-bold text-white">iConnect</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">Pre-Owned</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Certified pre-owned Apple &amp; Samsung devices, tested and warrantied, delivered nationwide across
              South Africa.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-white/40" aria-hidden="true" />
                <a href="tel:+27110000000" className="hover:text-white">
                  011 000 0000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-white/40" aria-hidden="true" />
                <a href="mailto:hello@iconnectpreowned.co.za" className="hover:text-white">
                  hello@iconnectpreowned.co.za
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-white/40" aria-hidden="true" />
                <span>Nationwide delivery from Johannesburg, Cape Town &amp; Durban hubs</span>
              </li>
            </ul>
            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
                >
                  <Icon width={16} height={16} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/50 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} iConnect Pre-Owned. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/faq" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-white">
              Terms of Service
            </Link>
            <span className="text-white/30">POPIA compliant</span>
          </div>
          <div className="flex items-center gap-2 text-white/40" aria-label="Accepted payment methods">
            <span className="rounded border border-white/15 px-2 py-1 font-mono text-[10px]">VISA</span>
            <span className="rounded border border-white/15 px-2 py-1 font-mono text-[10px]">MASTERCARD</span>
            <span className="rounded border border-white/15 px-2 py-1 font-mono text-[10px]">PAYFAST</span>
            <span className="rounded border border-white/15 px-2 py-1 font-mono text-[10px]">EFT</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
