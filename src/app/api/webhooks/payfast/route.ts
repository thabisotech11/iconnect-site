import { NextResponse } from "next/server";

/**
 * PayFast posts an Instant Transaction Notification (ITN) here after
 * payment. Production checklist (see PayFast's ITN docs before going live):
 *   1. Verify the source IP is one of PayFast's published ranges.
 *   2. Re-post the received data back to PayFast's `validate` endpoint
 *      and confirm it responds "VALID".
 *   3. Recalculate the signature yourself and compare.
 *   4. Confirm `amount_gross` matches your stored order total exactly.
 * Only mark an order paid once all four pass.
 */
export async function POST(request: Request) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData.entries());

  if (payload.payment_status === "COMPLETE") {
    // const supabase = createServiceRoleClient();
    // await supabase.from("orders").update({ status: "Processing" }).eq("reference", payload.m_payment_id);
    // await sendOrderConfirmationEmail(String(payload.email_address), order);
  }

  return new NextResponse("OK", { status: 200 });
}
