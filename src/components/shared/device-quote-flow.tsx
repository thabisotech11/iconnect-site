"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Smartphone, Tablet, Watch, Headphones, Laptop } from "lucide-react";
import type { DeviceCategory, TradeInGoal } from "@/lib/types";
import { TRADE_IN_CATALOG, TRADE_IN_CATEGORIES } from "@/lib/mock-data";
import { formatZAR, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea, FormRow } from "@/components/ui/form-fields";
import { HealthRing } from "@/components/product/health-ring";

const CATEGORY_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  iPhone: Smartphone,
  "Samsung Galaxy": Smartphone,
  iPad: Tablet,
  "Apple Watch": Watch,
  AirPods: Headphones,
  MacBook: Laptop,
};

interface QuestionOption {
  label: string;
  deduction: number; // 0 - 1
}

interface Question {
  key: string;
  title: string;
  options: QuestionOption[];
}

const QUESTIONS: Question[] = [
  {
    key: "screen",
    title: "How's the screen?",
    options: [
      { label: "Flawless — no scratches or cracks", deduction: 0 },
      { label: "Minor scratches, not visible when on", deduction: 0.08 },
      { label: "Visible scratches or a small crack", deduction: 0.35 },
    ],
  },
  {
    key: "function",
    title: "Does everything work properly?",
    options: [
      { label: "Yes — buttons, cameras, speakers, charging all work", deduction: 0 },
      { label: "One minor issue (e.g. camera or speaker fault)", deduction: 0.15 },
      { label: "Major issue — won't power on or charge", deduction: 0.5 },
    ],
  },
  {
    key: "battery",
    title: "What's the battery like?",
    options: [
      { label: "Great — lasts most of the day, 90%+ health", deduction: 0 },
      { label: "Okay — noticeably weaker, 80–89% health", deduction: 0.06 },
      { label: "Poor — drains fast or below 80% health", deduction: 0.15 },
    ],
  },
  {
    key: "accessories",
    title: "Do you have the original box and cable?",
    options: [
      { label: "Yes, complete", deduction: 0 },
      { label: "No, device only", deduction: 0.03 },
    ],
  },
];

type Step = "category" | "model" | number | "quote" | "contact" | "done";

export function DeviceQuoteFlow({ goal }: { goal: TradeInGoal }) {
  const [step, setStep] = useState<Step>("category");
  const [category, setCategory] = useState<DeviceCategory | null>(null);
  const [model, setModel] = useState<{ model: string; baseValue: number } | null>(null);
  const [answers, setAnswers] = useState<Record<string, QuestionOption>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const totalDeduction = useMemo(
    () => Object.values(answers).reduce((sum, a) => sum + a.deduction, 0),
    [answers]
  );

  const estimatedValue = useMemo(() => {
    if (!model) return 0;
    const raw = model.baseValue * (1 - Math.min(totalDeduction, 0.85));
    const multiplier = goal === "trade-in" ? 1.05 : 1;
    return Math.max(300, Math.round((raw * multiplier) / 50) * 50);
  }, [model, totalDeduction, goal]);

  const stepOrder: Step[] = ["category", "model", 0, 1, 2, 3, "quote", "contact", "done"];
  const currentIndex = stepOrder.indexOf(step);
  const progress = Math.round(((currentIndex + 1) / (stepOrder.length - 1)) * 100);

  function goBack() {
    const idx = stepOrder.indexOf(step);
    if (idx > 0) setStep(stepOrder[idx - 1]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(goal === "trade-in" ? "/api/trade-in" : "/api/sell-device", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, model: model?.model, estimatedValue, answers, contact }),
      });
    } catch {
      // Non-fatal for this demo flow — the quote is still shown to the user.
    } finally {
      setSubmitting(false);
      setStep("done");
    }
  }

  return (
    <div className="card mx-auto max-w-xl p-6 sm:p-10">
      {step !== "done" && (
        <div className="mb-8">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface">
            <motion.div
              className="h-full rounded-full bg-accent"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          {currentIndex > 0 && (
            <button onClick={goBack} className="mt-4 flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink">
              <ArrowLeft size={14} aria-hidden="true" />
              Back
            </button>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={String(step)}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {step === "category" && (
            <div>
              <h2 className="text-xl font-bold text-ink">What device do you have?</h2>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {TRADE_IN_CATEGORIES.map((c) => {
                  const Icon = CATEGORY_ICON[c];
                  return (
                    <button
                      key={c}
                      onClick={() => {
                        setCategory(c);
                        setStep("model");
                      }}
                      className="flex flex-col items-center gap-2.5 rounded-2xl border border-line px-4 py-6 text-center transition-colors hover:border-accent hover:bg-accent-soft"
                    >
                      <Icon size={24} className="text-ink-soft" />
                      <span className="text-sm font-medium text-ink">{c}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === "model" && category && (
            <div>
              <h2 className="text-xl font-bold text-ink">Which {category} model?</h2>
              <div className="mt-6 space-y-2">
                {(TRADE_IN_CATALOG[category] ?? []).map((m) => (
                  <button
                    key={m.model}
                    onClick={() => {
                      setModel(m);
                      setStep(0);
                    }}
                    className="flex w-full items-center justify-between rounded-2xl border border-line px-5 py-4 text-left transition-colors hover:border-accent hover:bg-accent-soft"
                  >
                    <span className="text-sm font-medium text-ink">{m.model}</span>
                    <span className="text-xs text-ink-faint">Up to {formatZAR(m.baseValue)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {typeof step === "number" && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                Question {step + 1} of {QUESTIONS.length}
              </p>
              <h2 className="mt-2 text-xl font-bold text-ink">{QUESTIONS[step].title}</h2>
              <div className="mt-6 space-y-2">
                {QUESTIONS[step].options.map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => {
                      setAnswers((prev) => ({ ...prev, [QUESTIONS[step as number].key]: opt }));
                      const next = (step as number) + 1;
                      setStep(next < QUESTIONS.length ? next : "quote");
                    }}
                    className="w-full rounded-2xl border border-line px-5 py-4 text-left text-sm font-medium text-ink transition-colors hover:border-accent hover:bg-accent-soft"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "quote" && model && (
            <div className="text-center">
              <HealthRing value={Math.round((1 - Math.min(totalDeduction, 0.85)) * 100)} size={100} label={`${Math.round((1 - Math.min(totalDeduction, 0.85)) * 100)}%`} sublabel="condition score" className="mx-auto" />
              <p className="mt-5 text-sm font-medium text-ink-soft">Your estimated {goal === "trade-in" ? "trade-in credit" : "cash offer"}</p>
              <p className="mt-1 text-4xl font-bold text-ink">{formatZAR(estimatedValue)}</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-ink-faint">
                For your {model.model}. This quote is honoured as long as the device matches what you told us —
                final confirmation happens after inspection.
              </p>
              <Button variant="primary" size="lg" className="mt-8 w-full" onClick={() => setStep("contact")}>
                {goal === "trade-in" ? "Lock in my trade-in credit" : "Get paid for my device"}
              </Button>
            </div>
          )}

          {step === "contact" && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-bold text-ink">Almost done</h2>
              <p className="mt-1 text-sm text-ink-soft">We'll send your free courier bag or drop-off details.</p>
              <div className="mt-6">
                <FormRow>
                  <Label htmlFor="qf-name">Full name</Label>
                  <Input id="qf-name" required value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                </FormRow>
                <FormRow>
                  <Label htmlFor="qf-email">Email</Label>
                  <Input id="qf-email" type="email" required value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                </FormRow>
                <FormRow>
                  <Label htmlFor="qf-phone">Phone number</Label>
                  <Input id="qf-phone" type="tel" required placeholder="082 000 0000" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                </FormRow>
                <FormRow className="mb-0">
                  <Label htmlFor="qf-notes" optional>
                    Anything else we should know
                  </Label>
                  <Textarea id="qf-notes" rows={3} value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} />
                </FormRow>
              </div>
              <Button type="submit" variant="primary" size="lg" className="mt-6 w-full" disabled={submitting}>
                {submitting ? "Submitting…" : `Confirm my ${formatZAR(estimatedValue)} quote`}
              </Button>
            </form>
          )}

          {step === "done" && (
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-positive/10 text-positive">
                <CheckCircle2 size={32} aria-hidden="true" />
              </div>
              <h2 className="mt-5 text-2xl font-bold text-ink">Quote confirmed</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink-soft">
                We've emailed {contact.email || "you"} your prepaid courier details for your {model?.model}. Your{" "}
                {formatZAR(estimatedValue)} {goal === "trade-in" ? "credit" : "payout"} is reserved for 14 days.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
