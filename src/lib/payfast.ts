import crypto from "crypto";
import type { Address, CartItem } from "@/lib/types";

/**
 * PayFast (https://www.payfast.co.za) is the recommended primary payment
 * gateway for this store: Stripe does not currently support payouts to
 * South African-registered businesses directly. PayFast supports cards,
 * Instant EFT, and South African wallets, settling to a local bank account.
 *
 * PayFast's flow is a signed HTML form POST rather than a hosted-session
 * API call — buildPayfastPayload() returns the exact fields to render as
 * hidden inputs (or POST server-side) to https://sandbox.payfast.co.za/eng/process
 * (sandbox) or https://www.payfast.co.za/eng/process (live).
 */

interface PayfastArgs {
  reference: string;
  items: CartItem[];
  total: number;
  address: Address;
  email: string;
}

function generateSignature(data: Record<string, string>, passphrase?: string) {
  const pairs = Object.entries(data)
    .filter(([, value]) => value !== "" && value !== undefined && value !== null)
    .map(([key, value]) => `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, "+")}`);

  let queryString = pairs.join("&");
  if (passphrase) queryString += `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;

  return crypto.createHash("md5").update(queryString).digest("hex");
}

export function buildPayfastPayload({ reference, items, total, address, email }: PayfastArgs) {
  const merchantId = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID;
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY;
  const passphrase = process.env.PAYFAST_PASSPHRASE;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  if (!merchantId || !merchantKey) {
    throw new Error("PayFast is not configured. Set NEXT_PUBLIC_PAYFAST_MERCHANT_ID and PAYFAST_MERCHANT_KEY — see .env.example.");
  }

  const [firstName, ...rest] = address.fullName.split(" ");

  const fields: Record<string, string> = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    return_url: `${siteUrl}/account?order=placed`,
    cancel_url: `${siteUrl}/checkout`,
    notify_url: `${siteUrl}/api/webhooks/payfast`,
    name_first: firstName ?? "",
    name_last: rest.join(" ") || "Customer",
    email_address: email,
    m_payment_id: reference,
    amount: total.toFixed(2),
    item_name: items.length === 1 ? items[0].name : `iConnect order ${reference} (${items.length} items)`,
  };

  const signature = generateSignature(fields, passphrase);
  const mode = process.env.NEXT_PUBLIC_PAYFAST_MODE === "live" ? "www" : "sandbox";

  return {
    action: `https://${mode}.payfast.co.za/eng/process`,
    fields: { ...fields, signature },
  };
}
