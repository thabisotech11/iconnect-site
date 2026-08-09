"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { Input, Label, Textarea, Select, FormRow } from "@/components/ui/form-fields";
import { Button } from "@/components/ui/button";

const TOPICS = ["Order enquiry", "Product question", "Trade-in / Sell", "Repairs", "Financing", "Something else"];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      await fetch("/api/contact", {
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
      <div className="card p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-positive/10 text-positive">
          <CheckCircle2 size={26} aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-ink">Message sent</h3>
        <p className="mt-2 text-sm text-ink-soft">We usually reply within a few hours during business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card p-7 sm:p-8">
      <FormRow>
        <Label htmlFor="contact-name">Full name</Label>
        <Input id="contact-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </FormRow>
      <FormRow>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      </FormRow>
      <FormRow>
        <Label htmlFor="contact-topic">Topic</Label>
        <Select id="contact-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
      </FormRow>
      <FormRow className="mb-0">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea id="contact-message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
      </FormRow>
      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full" disabled={status === "loading"}>
        {status === "loading" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
