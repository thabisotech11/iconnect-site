import { Resend } from "resend";
import type { Order } from "@/lib/types";
import { formatZAR } from "@/lib/utils";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set — email sending is disabled until it is. See .env.example.");
  return new Resend(key);
}

const FROM = process.env.EMAIL_FROM ?? "orders@iconnectpreowned.co.za";

export async function sendOrderConfirmationEmail(to: string, order: Order) {
  const resend = getResend();
  const itemsHtml = order.items
    .map((item) => `<tr><td style="padding:6px 0">${item.name} × ${item.quantity}</td><td style="text-align:right">${formatZAR(item.price * item.quantity)}</td></tr>`)
    .join("");

  return resend.emails.send({
    from: FROM,
    to,
    subject: `Order confirmed — ${order.reference}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="font-size:20px;">Thanks for your order</h1>
        <p>Your order <strong>${order.reference}</strong> is confirmed and being prepared.</p>
        <table style="width:100%; border-collapse:collapse; margin: 16px 0;">${itemsHtml}</table>
        <p style="font-weight:600;">Total: ${formatZAR(order.total)}</p>
        <p style="color:#6E6E73; font-size:13px;">Track your order any time from your iConnect Pre-Owned account.</p>
      </div>
    `,
  });
}

export async function sendQuoteConfirmationEmail(to: string, name: string, model: string, value: number, goal: "trade-in" | "sell") {
  const resend = getResend();
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Your ${model} quote — ${formatZAR(value)}`,
    html: `
      <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto;">
        <h1 style="font-size:20px;">Hi ${name || "there"},</h1>
        <p>Your ${goal === "trade-in" ? "trade-in credit" : "cash offer"} for the <strong>${model}</strong> is confirmed at
          <strong>${formatZAR(value)}</strong>, reserved for 14 days.</p>
        <p style="color:#6E6E73; font-size:13px;">We'll email your free courier label separately.</p>
      </div>
    `,
  });
}

export async function sendNewsletterWelcomeEmail(to: string) {
  const resend = getResend();
  return resend.emails.send({
    from: FROM,
    to,
    subject: "You're on the list 🎉",
    html: `<p style="font-family: -apple-system, sans-serif;">Thanks for subscribing to iConnect Pre-Owned — we'll send new stock drops and offers your way.</p>`,
  });
}
