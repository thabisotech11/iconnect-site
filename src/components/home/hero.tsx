"use client";

import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Watch, Headphones } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { TrustBadgeStrip } from "@/components/shared/trust-badges";
import { HealthRing } from "@/components/product/health-ring";

const floatCards = [
  { Icon: Smartphone, gradient: "linear-gradient(135deg, #2E6BFF 0%, #0A2FA8 100%)", top: "6%", left: "8%", size: 108, delay: 0 },
  { Icon: Watch, gradient: "linear-gradient(135deg, #FF6B6B 0%, #B7325C 100%)", top: "52%", left: "2%", size: 84, delay: 0.15 },
  { Icon: Headphones, gradient: "linear-gradient(135deg, #B8BEC8 0%, #5B6270 100%)", top: "68%", left: "58%", size: 92, delay: 0.3 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas pb-16 pt-14 sm:pb-24 sm:pt-20">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-[0.15] blur-3xl"
        style={{ background: "radial-gradient(circle, #007AFF 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <Container>
        <div className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="relative z-10 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-accent-deep"
            >
              Certified Pre-Owned · South Africa
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="text-balance text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[3.4rem]"
            >
              Premium Pre-Owned Devices You Can Trust.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-soft lg:mx-0"
            >
              Certified iPhones, Samsung Galaxy, iPads, MacBooks and more — professionally tested, cleaned and
              quality-checked, then backed by a 30-day warranty and delivered nationwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              <ButtonLink href="/shop" variant="primary" size="lg" className="w-full sm:w-auto">
                Shop Now
                <ArrowRight size={16} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/sell-your-device" variant="outline" size="lg" className="w-full sm:w-auto">
                Sell Your Device
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 hidden lg:block"
            >
              <TrustBadgeStrip className="!grid-cols-6 !gap-x-6" />
            </motion.div>
          </div>

          <div className="relative z-10 mx-auto hidden aspect-square w-full max-w-md lg:block">
            {floatCards.map(({ Icon, gradient, top, left, size, delay }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 + delay, ease: [0.16, 1, 0.3, 1] }}
                className="absolute flex items-center justify-center rounded-4xl shadow-elevated"
                style={{ top, left, width: size, height: size, backgroundImage: gradient }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Icon size={size * 0.4} className="text-white/90" strokeWidth={1.5} aria-hidden="true" />
                </motion.div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[8%] right-[4%] flex items-center gap-3 rounded-3xl border border-line bg-canvas/90 p-4 shadow-elevated backdrop-blur"
            >
              <HealthRing value={98} size={56} strokeWidth={5} label="98%" />
              <div className="pr-1">
                <p className="text-xs font-semibold text-ink">Avg. certified</p>
                <p className="text-xs text-ink-faint">battery health score</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 mt-10 lg:hidden">
          <TrustBadgeStrip />
        </div>
      </Container>
    </section>
  );
}
