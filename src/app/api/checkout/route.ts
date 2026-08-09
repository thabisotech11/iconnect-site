import { NextResponse } from "next/server";
import { z } from "zod";
import { buildPayfastPayload } from "@/lib/payfast";
import { createStripeCheckoutSession } from "@/lib/stripe";

const addressSchema = z.object({
  fullName: z.string().min(2),
  line1: z.string().min(3),
  suburb: z.string().min(1),
  city: z.string().min(1),
  province: z.string().min(1),
  postalCode: z.string().min(3),
  phone: z.string().min(6),
});

const cartItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  price: z.number().positive(),
  condition: z.enum(["Pristine", "Excellent", "Good", "Fair"]),
  storage: z.string().optional(),
  color: z.string().optional(),
  quantity: z.number().int().positive(),
  gradient: z.string(),
  category: z.enum(["iPhone", "Samsung Galaxy", "iPad", "Apple Watch", "AirPods", "MacBook", "Accessories"]),
});

const checkoutSchema = z.object({
  items: z.array(cartItemSchema).min(1),
  address: addressSchema,
  method: z.enum(["payfast", "stripe"]),
});

/**
 * Creates a payment session and returns a redirectUrl. This route intentionally
 * does NOT write to Supabase yet — see README "What's wired vs mocked" for the
 * two lines to uncomment once your `orders` table (schema.sql) is live.
 */
export async function POST(request: Request) {
  const body = await request.json();
  const parsed = checkoutSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const { items, address, method } = parsed.data;
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const reference = `IC-${Math.floor(10000 + Math.random() * 89999)}`;

  try {
    if (method === "stripe") {
      if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json(
          { error: "Stripe is not configured on this deployment yet. Add STRIPE_SECRET_KEY to .env.local." },
          { status: 503 }
        );
      }
      const session = await createStripeCheckoutSession(items, undefined);
      return NextResponse.json({ redirectUrl: session.url });
    }

    if (!process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID) {
      return NextResponse.json(
        { error: "PayFast is not configured on this deployment yet. Add PayFast credentials to .env.local." },
        { status: 503 }
      );
    }
    const { action, fields } = buildPayfastPayload({
      reference,
      items,
      total,
      address,
      email: address.fullName, // replace with a real email field once auth is wired
    });
    const redirectUrl = `${action}?${new URLSearchParams(fields).toString()}`;
    return NextResponse.json({ redirectUrl });

    // Once Supabase is connected, persist the order before redirecting:
    // const supabase = createServiceRoleClient();
    // await supabase.from("orders").insert({ reference, total, shipping_address: address, payment_provider: method });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Could not start checkout. Please try again." }, { status: 500 });
  }
}
