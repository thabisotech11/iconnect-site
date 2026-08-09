import { NextResponse } from "next/server";
import { constructStripeWebhookEvent } from "@/lib/stripe";

/**
 * Verifies and handles Stripe webhook events. Register this endpoint's URL
 * (https://yourdomain/api/webhooks/stripe) in the Stripe dashboard, or run
 * `stripe listen --forward-to localhost:3000/api/webhooks/stripe` locally.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const payload = await request.text();

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event;
  try {
    event = constructStripeWebhookEvent(payload, signature);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      // const session = event.data.object;
      // Mark the matching order as paid, e.g.:
      // const supabase = createServiceRoleClient();
      // await supabase.from("orders").update({ status: "Processing" }).eq("payment_reference", session.id);
      // await sendOrderConfirmationEmail(session.customer_email, order);
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
