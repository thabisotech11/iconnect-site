"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import type { DeviceCategory } from "@/lib/types";
import { CATEGORIES } from "@/lib/mock-data";
import { Input, Label, Textarea, Select, FormRow } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";

const REPAIRABLE_CATEGORIES = CATEGORIES.filter((c) => c !== "Accessories");

export function RepairBookingForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState<{
    device: DeviceCategory;
    issue: string;
    date: string;
    name: string;
    email: string;
    phone: string;
  }>({ device: REPAIRABLE_CATEGORIES[0], issue: "", date: "", name: "", email: "", phone: "" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/repairs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } finally {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-7 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-positive/10 text-positive">
          <CheckCircle2 size={26} aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-ink">Booking received</h3>
        <p className="mt-2 text-sm text-ink-soft">
          We&rsquo;ll email {form.email || "you"} within 2 hours to confirm your drop-off or courier collection.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-7">
      <h3 className="text-lg font-bold text-ink">Book a repair</h3>
      <p className="mt-1 text-sm text-ink-soft">Tell us what's wrong — we'll confirm pricing before any work starts.</p>

      <div className="mt-6">
        <FormRow>
          <Label htmlFor="repair-device">Device type</Label>
          <Select id="repair-device" value={form.device} onChange={(e) => setForm({ ...form, device: e.target.value as DeviceCategory })}>
            {REPAIRABLE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </FormRow>
        <FormRow>
          <Label htmlFor="repair-issue">What's the issue?</Label>
          <Textarea
            id="repair-issue"
            required
            rows={3}
            placeholder="e.g. Cracked screen, battery drains fast…"
            value={form.issue}
            onChange={(e) => setForm({ ...form, issue: e.target.value })}
          />
        </FormRow>
        <FormRow>
          <Label htmlFor="repair-date">Preferred date</Label>
          <Input id="repair-date" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </FormRow>
        <FormRow>
          <Label htmlFor="repair-name">Full name</Label>
          <Input id="repair-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </FormRow>
        <FormRow>
          <Label htmlFor="repair-email">Email</Label>
          <Input id="repair-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </FormRow>
        <FormRow className="mb-0">
          <Label htmlFor="repair-phone">Phone</Label>
          <Input id="repair-phone" type="tel" required placeholder="082 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </FormRow>
      </div>

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full" disabled={status === "loading"}>
        {status === "loading" ? "Booking…" : "Book repair"}
      </Button>
    </form>
  );
}
