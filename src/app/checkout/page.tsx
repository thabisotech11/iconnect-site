"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/providers";
import { formatZAR } from "@/lib/utils";
import { Container } from "@/components/ui/section";
import { Input, Label, FormRow, Select } from "@/components/ui/form-fields";
import { Button, ButtonLink } from "@/components/ui/button";

type PaymentMethod = "payfast" | "stripe";

const PROVINCES = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("payfast");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    line1: "",
    suburb: "",
    city: "",
    province: PROVINCES[2],
    postalCode: "",
    phone: "",
  });

  const shipping = subtotal >= 1000 || items.length === 0 ? 0 : 150;
  const total = subtotal + shipping;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, address: form, method }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      clearCart();
      router.push("/account?order=placed");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="section-y !pt-16 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-ink">Your cart is empty</h1>
          <p className="mt-2 text-ink-soft">Add a device before checking out.</p>
          <ButtonLink href="/shop" variant="primary" size="lg" className="mt-6">
            Shop devices
          </ButtonLink>
        </Container>
      </div>
    );
  }

  return (
    <div className="section-y !pt-12">
      <Container>
        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Checkout</h1>

        <form onSubmit={onSubmit} className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <div>
            <section>
              <h2 className="text-lg font-bold text-ink">Contact</h2>
              <FormRow className="mt-4">
                <Label htmlFor="co-email">Email</Label>
                <Input id="co-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </FormRow>
            </section>

            <section className="mt-8 border-t border-line pt-8">
              <h2 className="text-lg font-bold text-ink">Shipping address</h2>
              <div className="mt-4 grid gap-x-4 sm:grid-cols-2">
                <FormRow className="sm:col-span-2">
                  <Label htmlFor="co-name">Full name</Label>
                  <Input id="co-name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                </FormRow>
                <FormRow className="sm:col-span-2">
                  <Label htmlFor="co-line1">Street address</Label>
                  <Input id="co-line1" required value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} />
                </FormRow>
                <FormRow>
                  <Label htmlFor="co-suburb">Suburb</Label>
                  <Input id="co-suburb" required value={form.suburb} onChange={(e) => setForm({ ...form, suburb: e.target.value })} />
                </FormRow>
                <FormRow>
                  <Label htmlFor="co-city">City</Label>
                  <Input id="co-city" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                </FormRow>
                <FormRow>
                  <Label htmlFor="co-province">Province</Label>
                  <Select id="co-province" value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })}>
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </Select>
                </FormRow>
                <FormRow>
                  <Label htmlFor="co-postal">Postal code</Label>
                  <Input id="co-postal" required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} />
                </FormRow>
                <FormRow className="sm:col-span-2">
                  <Label htmlFor="co-phone">Phone number</Label>
                  <Input id="co-phone" type="tel" required placeholder="082 000 0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </FormRow>
              </div>
            </section>

            <section className="mt-8 border-t border-line pt-8">
              <h2 className="text-lg font-bold text-ink">Payment method</h2>
              <div className="mt-4 space-y-3">
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 ${method === "payfast" ? "border-accent bg-accent-soft" : "border-line"}`}
                >
                  <span className="flex items-center gap-3">
                    <input type="radio" name="method" checked={method === "payfast"} onChange={() => setMethod("payfast")} className="accent-accent" />
                    <span>
                      <span className="block text-sm font-semibold text-ink">Card / Instant EFT — PayFast</span>
                      <span className="block text-xs text-ink-faint">Recommended for South African customers</span>
                    </span>
                  </span>
                </label>
                <label
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 ${method === "stripe" ? "border-accent bg-accent-soft" : "border-line"}`}
                >
                  <span className="flex items-center gap-3">
                    <input type="radio" name="method" checked={method === "stripe"} onChange={() => setMethod("stripe")} className="accent-accent" />
                    <span>
                      <span className="block text-sm font-semibold text-ink">International card — Stripe</span>
                      <span className="block text-xs text-ink-faint">For customers paying from outside South Africa</span>
                    </span>
                  </span>
                </label>
              </div>
            </section>

            {error && <p className="mt-6 text-sm font-medium text-red-600">{error}</p>}
          </div>

          <div className="h-fit rounded-3xl border border-line bg-surface p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-bold text-ink">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {items.map((item) => (
                <li key={item.productId} className="flex justify-between text-sm">
                  <span className="text-ink-soft">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-ink">{formatZAR(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
              <div className="flex justify-between text-ink-soft">
                <span>Subtotal</span>
                <span>{formatZAR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-soft">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatZAR(shipping)}</span>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-line pt-3">
              <span className="font-semibold text-ink">Total</span>
              <span className="text-xl font-bold text-ink">{formatZAR(total)}</span>
            </div>
            <Button type="submit" variant="primary" size="lg" className="mt-6 w-full" disabled={submitting}>
              <Lock size={15} aria-hidden="true" />
              {submitting ? "Redirecting…" : `Pay ${formatZAR(total)}`}
            </Button>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-ink-faint">
              <ShieldCheck size={13} aria-hidden="true" />
              Payments are encrypted and PCI-compliant
            </p>
          </div>
        </form>
      </Container>
    </div>
  );
}
