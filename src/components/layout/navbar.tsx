"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, Heart, ShoppingBag, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart, useWishlist } from "@/context/providers";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { IconButton } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/trade-in", label: "Trade-In" },
  { href: "/sell-your-device", label: "Sell Device" },
  { href: "/repairs", label: "Repairs" },
  { href: "/financing", label: "Financing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const ANNOUNCEMENTS = [
  "Nationwide delivery in 1–3 working days",
  "Every device backed by a 30-day warranty",
  "Trade in today for instant purchase credit",
  "Certified with a 60-point inspection",
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="bg-ink text-canvas">
        <div className="container-page flex h-9 items-center overflow-hidden">
          <div className="mask-fade-r flex w-full overflow-hidden">
            <div className="flex shrink-0 animate-marquee items-center gap-12 whitespace-nowrap pr-12 text-xs font-medium tracking-wide [animation-play-state:running] hover:[animation-play-state:paused]">
              {[...ANNOUNCEMENTS, ...ANNOUNCEMENTS].map((msg, i) => (
                <span key={i} className="flex items-center gap-12">
                  {msg}
                  <span className="h-1 w-1 rounded-full bg-canvas/40" aria-hidden="true" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled ? "glass border-b border-line shadow-soft" : "border-b border-transparent bg-canvas"
        )}
      >
        <Container>
          <div className="flex h-[68px] items-center justify-between gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="iConnect Pre-Owned home">
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
                <span className="text-[15px] font-bold tracking-tight text-ink">iConnect</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-faint">
                  Pre-Owned
                </span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors hover:bg-surface",
                          active ? "text-accent" : "text-ink-soft hover:text-ink"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <div className="hidden sm:block">
                <SearchTrigger open={searchOpen} setOpen={setSearchOpen} />
              </div>
              <ThemeToggle className="hidden sm:flex" />
              <Link
                href="/wishlist"
                aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
                className="relative flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface active:scale-95"
              >
                <Heart size={19} aria-hidden="true" />
                {wishlistCount > 0 && <CountDot count={wishlistCount} />}
              </Link>
              <IconButton label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`} onClick={openCart} className="relative">
                <ShoppingBag size={19} aria-hidden="true" />
                {itemCount > 0 && <CountDot count={itemCount} />}
              </IconButton>
              <IconButton
                label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="lg:hidden"
              >
                <Menu size={21} aria-hidden="true" />
              </IconButton>
            </div>
          </div>

          <div className="pb-3 sm:hidden">
            <SearchTrigger open={searchOpen} setOpen={setSearchOpen} fullWidth />
          </div>
        </Container>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}

function CountDot({ count }: { count: number }) {
  return (
    <span className="absolute right-1 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="container-page">{children}</div>;
}

function SearchTrigger({
  open,
  setOpen,
  fullWidth,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  fullWidth?: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  }

  if (!open && !fullWidth) {
    return (
      <IconButton label="Search products" onClick={() => setOpen(true)}>
        <Search size={19} aria-hidden="true" />
      </IconButton>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("relative", fullWidth ? "w-full" : "w-64")} role="search">
      <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search iPhone, Galaxy, MacBook…"
        aria-label="Search products"
        autoFocus={!fullWidth}
        className="input h-11 pl-10 pr-4 text-sm"
      />
      {!fullWidth && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close search"
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-ink-faint hover:bg-surface"
        >
          <X size={14} />
        </button>
      )}
    </form>
  );
}

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-y-0 right-0 z-[70] flex w-[85%] max-w-sm flex-col bg-canvas p-6 shadow-elevated lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-base font-bold text-ink">Menu</span>
              <IconButton label="Close menu" onClick={onClose}>
                <X size={20} />
              </IconButton>
            </div>
            <nav aria-label="Mobile" className="flex-1">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={pathname === link.href ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium",
                        pathname === link.href ? "bg-accent-soft text-accent-deep" : "text-ink hover:bg-surface"
                      )}
                    >
                      {link.label}
                      <ChevronRight size={16} className="text-ink-faint" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/faq"
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink hover:bg-surface"
                  >
                    FAQ
                    <ChevronRight size={16} className="text-ink-faint" aria-hidden="true" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink hover:bg-surface"
                  >
                    My Account
                    <ChevronRight size={16} className="text-ink-faint" aria-hidden="true" />
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
              <span className="text-sm font-medium text-ink-soft">Dark mode</span>
              <ThemeToggle />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
