import Stripe from "stripe";
import type { CartItem } from "@/lib/types";

let stripeClient: Stripe | null = null;

/**
 * Lazily-constructed Stripe client. NOTE: Stripe does not currently support
 * payouts to South African-registered businesses directly — this exists
 * for international customers / entities incorporated where Stripe is
 * supported. PayFast (src/lib/payfast.ts) is the recommended primary
 * gateway for South African payouts. See README "Payments".
 */
function getStripe() {
  if (stripeClient) return stripeClient;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set — see .env.example.");
  stripeClient = new Stripe(key, { apiVersion: "2025-02-24.acacia" });
  return stripeClient;
}

export async function createStripeCheckoutSession(items: CartItem[], customerEmail?: string) {
  const stripe = getStripe();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: customerEmail,
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "zar",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          description: [item.condition, item.storage, item.color].filter(Boolean).join(" · "),
        },
      },
    })),
    success_url: `${siteUrl}/account?order=placed&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout`,
  });

  return session;
}

export function constructStripeWebhookEvent(payload: string | Buffer, signature: string) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is not set — see .env.example.");
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
