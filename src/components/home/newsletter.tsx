"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import { Container, Reveal } from "@/components/ui/section";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section-y" aria-labelledby="newsletter-heading">
      <Container>
        <Reveal
          className="relative overflow-hidden rounded-4xl px-6 py-16 text-center sm:px-16 sm:py-20"
          style={{ background: "linear-gradient(135deg, #0A2FA8 0%, #050B24 100%)" }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #2E6BFF 0%, transparent 70%)" }}
            aria-hidden="true"
          />
          <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Mail size={22} aria-hidden="true" />
          </div>
          <h2 id="newsletter-heading" className="relative mt-6 text-balance text-3xl font-semibold text-white sm:text-4xl">
            Be first to new stock and drops
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-balance text-white/70">
            Certified devices move fast. Join the list for early access, price drops and trade-in bonuses.
          </p>

          <form onSubmit={onSubmit} className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" noValidate>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              className="h-13 w-full flex-1 rounded-full border border-white/15 bg-white/10 px-5 py-3.5 text-[15px] text-white placeholder:text-white/50 focus-visible:outline-white"
            />
            <Button type="submit" variant="primary" size="lg" disabled={status === "loading"} className="shrink-0">
              {status === "loading" ? "Joining…" : "Subscribe"}
            </Button>
          </form>

          <div className="relative mt-4 h-5" aria-live="polite">
            {status === "success" && (
              <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-positive">
                <CheckCircle2 size={15} aria-hidden="true" /> You&rsquo;re on the list — check your inbox to confirm.
              </p>
            )}
            {status === "error" && <p className="text-sm font-medium text-red-400">Please enter a valid email address.</p>}
          </div>

          <p className="relative mt-2 text-xs text-white/40">No spam. Unsubscribe anytime.</p>
        </Reveal>
      </Container>
    </section>
  );
}
